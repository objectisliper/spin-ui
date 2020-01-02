import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {RadSideDrawerComponent} from "nativescript-ui-sidedrawer/angular";
import {PushTransition, RadSideDrawer} from "nativescript-ui-sidedrawer";
import { getRootView } from "@nativescript/core/application";
import {Page} from "@nativescript/core";
import {Store} from "@ngrx/store";
import * as indexReducer from "~/app/root-store";
import {selectIsSideDrawerOpen} from "~/app/root-store";
import {Observable} from "rxjs";
import {toggleSideDrawerOpen} from "~/app/root-store/actions/root.shared-settings.action";

@Component({
  selector: 'spin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    menuOpened: Observable<boolean> = this._store.select(selectIsSideDrawerOpen);

    private _rootDrawer: RadSideDrawer;

    constructor(private page: Page, private _store: Store<indexReducer.State>) {
    }

    ngOnInit() {
        this.page.on(Page.loadedEvent, this._onPageLoaded.bind(this));
    }

    toggleSideMenu() {
        if (this._rootDrawer) {
            this._rootDrawer.toggleDrawerState();
            this._store.dispatch(toggleSideDrawerOpen())
        }
    }

    private _onPageLoaded(args) {
        this._rootDrawer = getRootView() as RadSideDrawer;
    }

}
