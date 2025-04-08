import { Component, OnDestroy, OnInit } from '@angular/core';
import { IGame, IReport } from '@avans-nx-workshop/shared/api';
import { Subscription } from 'rxjs';
import { GameService } from '../../games/game.service';
import { ReportService } from '../report.service';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'avans-nx-workshop-create-report',
    templateUrl: './create-report.component.html',
    styles: ``
})
export class CreateReportComponent implements OnInit, OnDestroy {
    report? : IReport
    game? : IGame;
    subscription?: Subscription;
    
    constructor(private reportService: ReportService, private route: ActivatedRoute, private gameService: GameService){
    }
    
    ngOnInit(): void {
        this.subscription = this.route.params.subscribe(params => {
            const gameId = params['gameId'];
            this.gameService.getGameById(gameId).subscribe(game => {
                this.game = game;
            });
        });
        
    }
    ngOnDestroy(): void {
        
    }
}
