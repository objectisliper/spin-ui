import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as imagepicker from "nativescript-imagepicker";
import {ImagePickerMediaType} from "nativescript-imagepicker";
import {BaseService} from "~/app/shared/services/base.service";
import {Store} from "@ngrx/store";
import * as indexReducer from "~/app/root-store";
import {setProfileImage} from "~/app/root-store/actions/root.settings.action";
import {Observable} from "rxjs";
import {isProfileImageSet, selectProfileImage} from "~/app/root-store";
import {ImageAsset, ImageSource, View} from "@nativescript/core";
import {ImageCropper} from "nativescript-imagecropper";
import {skipWhile, take} from "rxjs/internal/operators";

@Component({
  selector: 'ns-user-photo',
  templateUrl: './user-photo.component.html',
  styleUrls: ['./user-photo.component.css']
})
export class UserPhotoComponent implements OnInit, AfterViewInit {

    isProfileImageSet: Observable<boolean> = this._store.select(isProfileImageSet);
    profileImage = this._store.select(selectProfileImage);

    @ViewChild('addPhotoHeader', {static: true}) private _addPhotoHeaderView: ElementRef;

    constructor(private _store: Store<indexReducer.State>) { }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
        // this._addPhotoHeaderView.background = 'none';
        this.profileImage.pipe(skipWhile(image => !image), take(1)).subscribe(image => {
            const addPhotoHeaderElement = <View>this._addPhotoHeaderView.nativeElement;
            addPhotoHeaderElement.className += ' active';
            console.log(JSON.stringify(addPhotoHeaderElement.className));
        })
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
                if(selection.length > 0) {
                    ImageSource.fromAsset(selection[0]).then(asset => {
                        if (asset.width != asset.height) {
                            new ImageCropper().show(asset, {width: 280, height: 280}).then(args => {
                                this._store.dispatch(setProfileImage({payload: {profileImage: args.image}}))
                            })
                        } else {
                            this._store.dispatch(setProfileImage({payload: {profileImage: asset}}))
                        }
                    })
                } else {
                    BaseService.showAlertSomethingWentWrong();
                }
            }).catch((e) => {
            console.log(e);
        });
    }

}
