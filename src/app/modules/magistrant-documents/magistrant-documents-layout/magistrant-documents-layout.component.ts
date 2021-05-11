import {Component, Input, OnInit} from '@angular/core';
import {MaigistrantModel} from '../../magistrant-list/model/maigistrant.model';
import {DocCardModel} from '../models/doc-card.model';
import {IpcService} from '../../../services/ipc.service';

const cards: DocCardModel[] = [
  {
    image: '../../../assets/screens/dogovor.png',
    label: 'Договор Практики',
    type: 'plan'
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

  constructor(private ipcService: IpcService) { }

  ngOnInit(): void {
  }

  handleGetFile(card: DocCardModel): void {
    this.ipcService.getFile(card, this.magistrant);
  }
}
