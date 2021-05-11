import {Component, Input, NgZone, OnInit} from '@angular/core';
import {MaigistrantModel} from '../../magistrant-list/model/maigistrant.model';
import {DocCardModel} from '../models/doc-card.model';
import {IpcService} from '../../../services/ipc.service';
import {Observable} from 'rxjs';

const cards: DocCardModel[] = [
  {
    image: '../../../assets/screens/dogovor.png',
    label: 'Договор Практики'
  },
  {
    image: '../../../assets/screens/dnevnik.png',
    label: 'Дневник Практики',
    type: 'dairy'
  },
  {
    image: '../../../assets/screens/plan.png',
    label: 'Индивидуальный План',
    type: 'plan'
  }
];

@Component({
  selector: 'app-magistrant-documents-layout',
  templateUrl: './magistrant-documents-layout.component.html',
  styleUrls: ['./magistrant-documents-layout.component.scss']
})
export class MagistrantDocumentsLayoutComponent implements OnInit {

  @Input() magistrant: MaigistrantModel;

  public docCards: DocCardModel[] = cards;

  loading = false;

  constructor(private ipcService: IpcService, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.ipcService.fileLoaded.asObservable().subscribe(s => {
      this.ngZone.run(() => {
        this.loading = false;
      });
    });
  }

  handleGetFile(card: DocCardModel): void {
    this.loading = true;
    this.ipcService.getFile(card, this.magistrant);
  }
}
