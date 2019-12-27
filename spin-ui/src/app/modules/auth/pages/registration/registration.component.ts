import {ItemEventData} from "tns-core-modules/ui/list-view"
import {Component, OnInit} from '@angular/core';
import {User} from "~/app/entity/User";
import {from, Observable} from "rxjs";
import {Store} from "@ngrx/store";
import * as indexReducer from '../../../../root-store';
import {selectEncodingKey} from "~/app/root-store";
import {setEncodingKey} from "~/app/root-store/actions/root.settings.action";

@Component({
    selector: 'ns-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

    constructor(private _store: Store<indexReducer.State>) {
    }

    ngOnInit() {
    }

    onFocus(arg: any) {
        arg.placeholderColor = 'green';
    }

    onBlur(arg: any) {
    }

    onTextChange(arg: any) {
    }

    countries: { name: string, imageSrc: string }[] = [
        {name: "Australia", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/au.png"},
        {name: "Belgium", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/be.png"},
        {name: "Bulgaria", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/bg.png"},
        {name: "Canada", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/ca.png"},
        {name: "Switzerland", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/ch.png"},
        {name: "China", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/cn.png"},
        {name: "Czech Republic", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/cz.png"},
        {name: "Germany", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/de.png"},
        {name: "Spain", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/es.png"},
        {name: "Ethiopia", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/et.png"},
        {name: "Croatia", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/hr.png"},
        {name: "Hungary", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/hu.png"},
        {name: "Italy", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/it.png"},
        {name: "Jamaica", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/jm.png"},
        {name: "Romania", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/ro.png"},
        {name: "Russia", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/ru.png"},
        {name: "United States", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/us.png"},
    ];

    onItemTap(args: ItemEventData): void {
        console.log('Item with index: ' + args.index + ' tapped');
    }
}
