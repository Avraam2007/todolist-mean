import { Component, HostListener, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./header/header";
import { CardField } from "./card-field/card-field";
import { NgClass, NgIf } from '@angular/common';
import { IsDarkSingleton } from '../singletons/isDark';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, CardField, NgClass, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('tosdolist1');
  protected windowScrolled = false;

  constructor() {
    
  }

  isDarkObject = IsDarkSingleton.instance;
    isDark() {
      return this.isDarkObject.isDark;
    }


  @HostListener('window:scroll', [])
  ngOnInit() {
    this.windowScrolled = (window.pageYOffset > 20);
  }

  toTheTop(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}

