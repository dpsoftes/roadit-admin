import { Component, signal, inject, OnInit } from '@angular/core';
import { TranslatePipe } from '@i18n/translate.pipe';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TabsComponent } from '@components/tabs.component/tabs.component';
import { TransportsAssignmentComponent } from './components/transports-assignment/transports-assignment.component';
import { TransportsHistoryComponent } from './components/transports-history/transports-history.component';
import { TransportStore } from '@store/transports.state';

@Component({
  selector: 'app-transports',
  imports: [
    TranslatePipe,
    TabsComponent,
    RouterModule,
    TransportsAssignmentComponent,
    TransportsHistoryComponent,
  ],
  templateUrl: './transports.html',
  styleUrl: './transports.scss'
})
export class Transports implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(TransportStore);

  activeTab = signal<string>('assignment');

  ngOnInit() {
    var params = this.store.historyParams();
    params.page = 1;
    params.page_size = 3;
    this.store.updateState({ historyParams: params });
    
    this.route.params.subscribe(params => {
      if(params['tab'] === 'create') {
        this.activeTab.set('create');
      } else if(params['tab'] === 'assignment') {
        this.setHistoryTab();
      } else if(params['tab'] === 'history') {
        this.setAssignmentTab();
      }
    });
  }

  setHistoryTab(){
    this.activeTab.set('history');
  }

  setAssignmentTab(){
    this.store.loadHistory();  
    this.activeTab.set('assignment');
  }

  onTabChange(tab: string) {
    if(tab === 'create') {
      this.router.navigate([`/transports/${tab}`]);
    } else {
      this.activeTab.set(tab);
    }
  }
}
