import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { LoaderComponentService } from './loader.service';
import { LoaderState } from './loader';

@Component({
    selector: 'angular-loader',
    templateUrl: 'loader.component.html',
    styleUrls: ['loader.component.css']
})
export class LoaderComponent implements OnInit {
    show = false;
    private subscription: Subscription;

    constructor(private loaderService: LoaderComponentService) { }

    ngOnInit() { 
        this.subscription = this.loaderService.loaderState
            .subscribe((state: LoaderState) => {
                this.show = state.show;
              

            });
    }


}