import { Component, EventEmitter, Input, Output } from '@angular/core';
import { getDatabase } from '../../db';
import { NgClass } from '@angular/common';
import { IsDarkSingleton } from '../../singletons/isDark';
import {CountSingleton} from "../../singletons/count";

@Component({
  selector: 'app-card',
  imports: [NgClass],
  templateUrl: './card.html',
  styleUrl: './card.module.scss',
})

export class Card {
  @Input() title: String;
  @Input() id: number;
  @Input() status: "done" | "active" | "deleted";
  @Input() cardClass: "todo-card" | "todo-card-done";
  @Input() isDeleted: boolean;

  countObject = CountSingleton.instance;
  isDarkObject = IsDarkSingleton.instance;

  isDark() {
    return this.isDarkObject.isDark;
  }

  @Output() deleteRequest = new EventEmitter<number>();
  constructor() {
    this.id = 0;
    this.title = "default";
    this.status = "active";
    this.cardClass = "todo-card";
    this.isDeleted = false;
  }

  getIsDeleted() {
    return this.isDeleted;
  }

  deleteTask(id : number) {
      this.isDeleted = true;
      if(getDatabase()[id].status === 'done') {
        this.countObject.doneCards.update(value => value - 1);
      }
      if(getDatabase()[id].status === 'active') {
        this.countObject.activeCards.update(value => value - 1);
      }
      this.deleteRequest.emit(this.id);
      getDatabase()[id].status = "deleted";
  }

  isStatus(stat: "done" | "active" | "deleted"){
    return this.status == stat;
  }
  

  editTask(id:number) {
      const title = document.getElementById(`title-${id}`);
  
      if(!title) {
          return;
      }
  
      const newTitle : string= prompt("Enter new title", title.innerText) as string;

      if (newTitle === null || newTitle.trim() == ''){
          alert("The field is empty!");
          return;
      }
  
      title.innerText = newTitle;
      getDatabase()[id].title = newTitle;
  }

  async doneTask(id : number) {
      this.countObject.doneCards.update(value => value + 1);
      this.countObject.activeCards.update(value => value - 1);
      document.getElementById(`doneCardBtn-${id}`)!.remove();
      document.getElementById(`card-${id}`)!.className = "todo-card-done";
      getDatabase()[id].status = "done";
  }
  
}
