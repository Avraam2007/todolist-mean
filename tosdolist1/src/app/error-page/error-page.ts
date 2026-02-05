import { Component } from '@angular/core';
import { IsDarkSingleton } from '../../singletons/isDark';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-error-page',
  imports: [NgClass],
  templateUrl: './error-page.html',
  styleUrl: './error-page.scss',
})
export class ErrorPage {
  private readonly isDarkObject = IsDarkSingleton.instance;
  
  isDark() {
    return (localStorage.getItem('isDark')==="true");
  }
}
