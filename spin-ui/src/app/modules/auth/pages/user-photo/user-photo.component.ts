import { Component, OnInit } from '@angular/core';
import * as imagepicker from "nativescript-imagepicker";
import {ImagePickerMediaType} from "nativescript-imagepicker";

@Component({
  selector: 'ns-user-photo',
  templateUrl: './user-photo.component.html',
  styleUrls: ['./user-photo.component.css']
})
export class UserPhotoComponent implements OnInit {

    isSubmitDisabled: boolean = true;

    constructor() { }

    ngOnInit() {
    }

    submitForm(): void {

    }

    selectImage() {
        var context = imagepicker.create({
            mode: "single",
            mediaType: ImagePickerMediaType.Image
        });

        context
            .authorize()
            .then(() => {
                return context.present();
            })
            .then((selection) => {
                console.log("Selection done:");
                selection.forEach( (selected) => {
                    console.log(" - " + JSON.stringify(selected));
                });
            }).catch((e) => {
            console.log(e);
        });
    }

}
