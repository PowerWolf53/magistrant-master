import { Injectable } from '@angular/core';
import {Group} from '../modules/group-list/model/group';
import {Store} from '@ngrx/store';
import {setGroups} from '../modules/group-list/store/group-list.actions';
import {setGroup} from '../modules/magistrant-list/store/magistrant-list.actions';
import {DocCardModel} from '../modules/magistrant-documents/models/doc-card.model';
import {MaigistrantModel} from '../modules/magistrant-list/model/maigistrant.model';
import {Subject} from 'rxjs';

declare var ipcRenderer: any;

@Injectable({
  providedIn: 'root'
})
export class IpcService {

  fileLoaded: Subject<boolean> = new Subject<boolean>();

  constructor(private store: Store<{ groupList: Group[] }>,
              private magistrantsListStore: Store<{ magistrantList }>) {
    this.listenToGroups();
    this.listenToMagistrants();
    this.listenToFileLoaded();
  }

  public pingToDownload(): void{
    // ipcRenderer.send('ping');
    this.pingToGetGroups();
  }

  public pingToGetGroups(): void{
    ipcRenderer.send('get-groups');
  }

  public pingToGetMagistrants(groupNumber: number): void{
    ipcRenderer.send('get-magistrants', groupNumber);
  }

  private listenToGroups(): void {
    ipcRenderer.on('groups', (event, arg) => {
      this.store.dispatch(setGroups({groups: arg}));
    });
  }

  private listenToMagistrants(): void {
    ipcRenderer.on('magistrants', (event, arg) => {
        this.magistrantsListStore.dispatch(setGroup({magistrants: arg.magistrants.magistrants, groupId: arg.groupNumber}));
    });
  }

  public getFile(doc: DocCardModel, magistrant: MaigistrantModel): void{
    ipcRenderer.send('get-file', {
      fileType: doc.type,
      data: {
        magistrant
      }
    });
  }

  public getCommonFile(doc: DocCardModel, magistrants: MaigistrantModel[]): void{
    ipcRenderer.send('get-file', {
      fileType: doc.type,
      data: {
        magistrants
      }
    });
  }

  private listenToFileLoaded(): void {
    ipcRenderer.on('file-loaded', (event, arg) => {
      this.fileLoaded.next(true);
    });
  }
}
