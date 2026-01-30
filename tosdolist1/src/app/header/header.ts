import { Component } from '@angular/core';
import {MatSlideToggleChange, MatSlideToggleModule} from '@angular/material/slide-toggle';
import { NgClass } from '@angular/common';
import { IsDarkSingleton } from '../card-field/isDark';

@Component({
  selector: 'app-header',
  imports: [MatSlideToggleModule, NgClass],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  isDarkObject = IsDarkSingleton.instance;
    isDark() {
      return this.isDarkObject.isDark;
    }
  
  onChange(event: MatSlideToggleChange) {
    this.isDarkObject.isDark = event.checked;
  }
}
