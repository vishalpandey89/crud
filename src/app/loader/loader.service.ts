import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { LoaderState } from './loader';

@Injectable()

export class LoaderComponentService {

    private loaderSubject = new Subject<LoaderState>();
    private apiArray:string[]=[];

    loaderState = this.loaderSubject.asObservable();

    constructor() { }

    show() {
        this.apiArray.push("api");
        this.loaderSubject.next(<LoaderState>{show: true});
    }

    hide() {
        if(this.apiArray.length<=1){
        this.apiArray.pop();   
       this.loaderSubject.next(<LoaderState>{show: false});
        }else{
         this.apiArray.pop();   
        }
    }
}