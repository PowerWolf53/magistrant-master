import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SelectedMagistrantServiceService {

  private selected: any;

  constructor() { }

  public selectMagistrant(magistrant: any){
    this.selected = magistrant;
  }

  public getSelectedMagistrant(){
    return this.selected
  }
}
