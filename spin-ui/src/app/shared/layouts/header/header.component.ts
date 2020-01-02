import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {RadSideDrawerComponent} from "nativescript-ui-sidedrawer/angular";
import {PushTransition, RadSideDrawer} from "nativescript-ui-sidedrawer";
import { getRootView } from "@nativescript/core/application";
import {Page} from "@nativescript/core";

@Component({
  selector: 'spin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    menuOpened: boolean = false;

    private _rootDrawer: RadSideDrawer;

    constructor(private page: Page) {
    }

    ngOnInit() {
        this.page.on(Page.loadedEvent, this._onPageLoaded.bind(this));
    }

    toggleSideMenu() {
        console.log('tapped');
        this.menuOpened = !this.menuOpened;
        if (this._rootDrawer) {
            console.log('test');
            this._rootDrawer.toggleDrawerState();
        }
    }

    private _onPageLoaded(args) {
        this._rootDrawer = getRootView() as RadSideDrawer;
    }

}
