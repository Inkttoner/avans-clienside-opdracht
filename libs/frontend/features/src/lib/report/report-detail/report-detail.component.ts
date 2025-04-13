import { Component, OnDestroy, OnInit } from '@angular/core';
import { IGame, IReport } from '@avans-nx-workshop/shared/api';
import { Subscription } from 'rxjs';
import { ReportService } from '../report.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { GameService } from '../../games/game.service';
import { UserService } from '../../users/user.sevice';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';



@Component({
    selector: 'avans-nx-workshop-report-detail',
    templateUrl: './report-detail.component.html',
    styles: [],
})
export class ReportDetailComponent implements OnInit, OnDestroy {
    report?: IReport
    subscription?: Subscription;
    isAdmin = false; 
    game?: IGame;   

    constructor(private userService: UserService ,private reportService: ReportService, private route: ActivatedRoute, private router: Router, private auth: AuthService, private gameService: GameService){
       
    }


    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            const gameId = params.get('id');
    
            this.subscription = this.reportService.getReportByGameId(String(gameId))
                .pipe(
                    catchError((error) => {
                        console.error('Error fetching report:', error);
    
                        // Check if the error is a 404
                        if (error.status === 404) {
                            this.auth.isUserAdmin().subscribe((isAdmin) => {
                                this.isAdmin = isAdmin;
                                if (this.isAdmin) {
                                    this.router.navigate([`/create-report/${gameId}`]);
                                } else {
                                    this.router.navigate(['/playedgames']);
                                    alert('Er is nog geen verslag voor deze wedstrijd gemaakt. Vraag een van de admins om er een aan te maken.');
                                }
                            });
                        }
    
                        // Return an empty observable to complete the stream
                        return of(null);
                    })
                )
                .subscribe((report) => {
                    if (report) {
                        this.report = report;
    
                        // Fetch the game details
                        this.gameService.getGameById(String(gameId)).subscribe((game) => {
                            this.game = game;
                        });
                    }
                });
        });
    }


    ngOnDestroy(): void {
       this.subscription?.unsubscribe();
    }
}
