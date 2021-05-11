import {Component, Input, NgZone, OnInit} from '@angular/core';
import {TabInfoModel} from '../../core-tab-controll/model/tab-info.model';
import {MaigistrantModel} from '../../magistrant-list/model/maigistrant.model';
import {DocCardModel} from '../models/doc-card.model';
import {IpcService} from '../../../services/ipc.service';

const cards: DocCardModel[] = [
  {
    image: '../../../assets/screens/practice_order.png',
    label: 'Приказ о направлении на практику'
  },
  {
    image: '../../../assets/screens/topic_change.png',
    label: 'Приказ на смену темы',
    type: 'topic_change'
  },
  {
    image: '../../../assets/screens/determine_order.png',
    label: 'Приказ об утверждении темы',
    type: 'topic_determine'
  }
];

@Component({
  selector: 'app-common-documents-layout',
  templateUrl: './common-documents-layout.component.html',
  styleUrls: ['./common-documents-layout.component.scss']
})
export class CommonDocumentsLayoutComponent implements OnInit {

  loading = false;

  @Input() tabInfo: TabInfoModel;

  public selectedMagistrants: MaigistrantModel[];

  public docCards: DocCardModel[] = cards;

  constructor(private ipcService: IpcService, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.selectedMagistrants = JSON.parse(JSON.stringify(this.tabInfo.data.selectedMagistrants));
    this.ipcService.fileLoaded.asObservable().subscribe(s => {
      this.ngZone.run(() => {
        this.loading = false;
      });
    });
  }

  remove(mag: any): void {
    if (this.selectedMagistrants.length > 2) {
      const index = this.selectedMagistrants.indexOf(mag);
      if (index >= 0) {
        this.selectedMagistrants.splice(index, 1);
      }
    }
  }

  getInitials(name: string): string{
    return name.trim().split(' ').map((n, index) => {
      if (index === 0){
        return n + ' ';
      } else {
        if (index === 1){
          return n[0] + '.';
        }else {
          return n[0];
        }
      }
    }).join('');
  }

  handleGetFile(card: DocCardModel): void {
    this.loading = true;
    this.ipcService.getCommonFile(card, this.selectedMagistrants);
  }
}
