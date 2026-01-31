import { Component, signal } from '@angular/core';
import {MatSlideToggleChange, MatSlideToggleModule} from '@angular/material/slide-toggle';
import { NgClass } from '@angular/common';
import { IsDarkSingleton } from '../../singletons/isDark';
import {MatInput} from '@angular/material/input';
import { CountSingleton } from '../../singletons/count';

@Component({
  selector: 'app-header',
  imports: [MatSlideToggleModule, NgClass, MatInput],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private countObject = CountSingleton.instance;
  total = this.countObject.totalCards;
  deleted = this.countObject.deletedCards;
  done = this.countObject.doneCards;
  active = this.countObject.activeCards;

  private isDarkObject = IsDarkSingleton.instance;
    isDark() {
      return this.isDarkObject.isDark;
    }
  
  onChange(event: MatSlideToggleChange) {
    this.isDarkObject.isDark = event.checked;
  }
}
