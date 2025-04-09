import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICreateReport, IGame, IPlayer, IReport } from '@avans-nx-workshop/shared/api';
import { Subscription } from 'rxjs';
import { GameService } from '../../games/game.service';
import { ReportService } from '../report.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../users/user.sevice';

@Component({
    selector: 'avans-nx-workshop-create-report',
    templateUrl: './create-report.component.html',
    styles: ``
})
export class CreateReportComponent implements OnInit, OnDestroy {
    report?: ICreateReport;
    player?: IPlayer;
    game?: IGame;
    subscription?: Subscription;
    goals: { player: IPlayer }[] = [];
    assists: { player: IPlayer }[] = [];
    homeScore: number = 0;
    awayScore: number = 0;
    rating: number = 0;
    reportText: string = '';
    manOfTheMatch!: IPlayer;

    constructor(
        private reportService: ReportService,
        private route: ActivatedRoute,
        private gameService: GameService,
        private userService: UserService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.subscription = this.route.params.subscribe((params) => {
            const gameId = params['gameId'];
            console.log(gameId, 'gameId in create report component');
            this.gameService.getGameById(gameId).subscribe((game) => {
                this.game = game;
            });
            this.userService
                .getPlayersForGameAsync(gameId)
                .subscribe((players) => {
                    console.log(gameId, 'called get players for game ');
                    this.report!.players = players;
                });
        });
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    addGoal(): void {
        this.goals.push({ player: {} as IPlayer });
    }

    removeGoal(index: number): void {
        this.goals.splice(index, 1);
    }

    addAssist(): void {
        this.assists.push({ player: {} as IPlayer });
    }

    removeAssist(index: number): void {
        this.assists.splice(index, 1);
    }

    submitReport(): void{
        const formattedScore = `${this.homeScore}-${this.awayScore}`;
        const reportData: ICreateReport = {
            game: this.game!._id,
            manOfTheMatch: this.manOfTheMatch,
            players: this.report!.players,
            goals: this.goals.map((goal) => goal.player),
            assists: this.assists.map((assist) => assist.player),
            score: formattedScore,
            rating: this.rating,
            reportText: this.reportText,
        }
        this.reportService.createReport(reportData).subscribe((report) => {
            console.log(report, 'report created');
            this.report = report;
            alert('Verslag is aangemaakt');
            this.router.navigate(['/playedgames']);	
        }
        );
    }
}
