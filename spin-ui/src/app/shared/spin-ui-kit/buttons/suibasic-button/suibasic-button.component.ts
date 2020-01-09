import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'SUIBasicButton',
  templateUrl: './suibasic-button.component.html',
  styleUrls: ['./suibasic-button.component.css']
})
export class SUIBasicButtonComponent implements OnInit, AfterViewInit {

    @Input() text: string;
    @Input() class: string;
    @Input() isEnabled: boolean;
    @Input() arrow: boolean = true;
    @Output() buttonTapped = new EventEmitter();

    tapped: boolean = false;

    @ViewChild('SUIBasicButton', {static: true}) private _SUIBasicButtonRef: ElementRef;

    constructor() { }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
        const SUIBasicButtonNativeElement = this._SUIBasicButtonRef.nativeElement;
        SUIBasicButtonNativeElement.on()
    }

    onButtonTap() {
        if (this.isEnabled) {
            this.buttonTapped.emit();
        }
    }

}
