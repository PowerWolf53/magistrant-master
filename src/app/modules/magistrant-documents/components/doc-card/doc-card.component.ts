import {Component, Input, OnInit} from '@angular/core';
import {DocCardModel} from '../../models/doc-card.model';

@Component({
  selector: 'app-doc-card',
  templateUrl: './doc-card.component.html',
  styleUrls: ['./doc-card.component.scss']
})
export class DocCardComponent implements OnInit {

  @Input() cardModel: DocCardModel;

  constructor() { }

  ngOnInit(): void {
  }

}
