import {Injectable} from '@angular/core';
import {alert} from '@nativescript/core/ui/dialogs'

@Injectable({providedIn: 'root'})
export class BaseService {
    constructor() {
    }

    public static showAlert(title: string, message: string, okButtonText: string = 'OK'): void {
        const options = {
            title,
            message,
            okButtonText
        };

        alert(options).then(() => {console.log('alert was shown')})
    }

    public static showAlertSomethingWentWrong(): void {
        BaseService.showAlert('Something went wrong', 'Please, try again later!')
    }
}
