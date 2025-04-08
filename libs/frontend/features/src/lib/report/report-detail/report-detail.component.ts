import { Component, OnDestroy, OnInit } from '@angular/core';
import { IReport } from '@avans-nx-workshop/shared/api';
import { Subscription } from 'rxjs';
import { ReportService } from '../report.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';


@Component({
    selector: 'avans-nx-workshop-report-detail',
    templateUrl: './report-detail.component.html',
    styles: [],
})
export class ReportDetailComponent implements OnInit, OnDestroy {
    report?: IReport
    subscription?: Subscription;
    isAdmin = false;    

    constructor(private reportService: ReportService, private route: ActivatedRoute, private router: Router, private auth: AuthService){
       
    }

    ngOnInit(): void {
       this.route.paramMap.subscribe((params) => {
        const gameId = params.get('id');
        this.subscription = this.reportService.getReportById(String(gameId)).subscribe((report) => {
            this.report = report;

            if (!this.report) {
                console.log('Report not found');
               this.auth.isUserAdmin().subscribe((isAdmin) => {
                    this.isAdmin = isAdmin;
                    if (this.isAdmin) {
                this.router.navigate([`/create-report/${gameId}`]);
                    }
                    else {
                        this.router.navigate(['/playedgames']);
                        alert('Er is nog geen verslag voor deze wedstrijd gemaakt. Vraag een van de admins om er een aan te maken.');
                        
                    }
                });
            }
        });
       });
      
    }
    ngOnDestroy(): void {
       this.subscription?.unsubscribe();
    }
}
