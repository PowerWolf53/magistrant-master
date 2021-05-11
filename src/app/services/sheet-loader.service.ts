import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class SheetLoaderService {

    magistrants: Subject<any> = new Subject<any>();
    loading: Subject<any> = new Subject<any>();

    subscribtion;

    constructor(private http: HttpClient) {
    }


    public loadMagistrants() {
        this.loading.next(true);
        if (this.subscribtion) {
            this.subscribtion.unsubscribe();
        }
        const sheetno = "od6"
        const sheetid = "1cBSVgW8oV-jLyttsLqG-qNhrcHH3vo988G5DZIIlnVE"
        const url =
            `https://spreadsheets.google.com/feeds/list/${sheetid}/${sheetno}/public/values?alt=json`;
        this.subscribtion = this.http.get(url)
            .pipe(
                map((res: any) => {
                    const data = res.feed.entry;

                    const returnArray: Array<any> = [];
                    if (data && data.length > 0) {
                        data.forEach(entry => {
                            const obj = {};
                            for (const x in entry) {
                                if (x.includes('gsx$') && entry[x].$t) {
                                    obj[x.split('$')[1]] = entry[x]['$t'];
                                }
                            }
                            returnArray.push(obj);
                        });
                    }
                    return returnArray;
                })
            ).subscribe(data => {
                this.loading.next(false);
                this.magistrants.next(data);
                console.log(data);
            });
    }

    public getMagistrans() {
        return this.magistrants;
    }
}
