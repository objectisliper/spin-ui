import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'spin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    menuOpened: boolean = false;

    constructor() {
    }

    ngOnInit() {
    }

    toggleSideMenu() {
        console.log('tapped');
        this.menuOpened = !this.menuOpened;
    }

}
