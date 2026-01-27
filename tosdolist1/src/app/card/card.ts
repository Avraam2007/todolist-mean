import { Component, EventEmitter, Input, Output } from '@angular/core';
import { getDatabase } from '../card-field/db';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.module.scss',
})

export class Card {
  @Input() title: String;
  @Input() id: number;
  @Input() status: "done" | "active" | "deleted";
  @Input() cardClass: "todo-card" | "todo-card-done";
  @Input() isDeleted: boolean;

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
    //   document.getElementById(`card1-${id}`)!.remove();
      this.deleteRequest.emit(this.id);
      getDatabase()[id].status = "deleted";
  }

  isStatus(stat: "done" | "active" | "deleted"){
    return this.status == stat;
  }
  

  editTask(id:number) {
      const title = document.getElementById(`title-${id}`);
  
      if(!title) {
          return
      }
  
      const newTitle = prompt("Enter new title", title.innerText);
  
      if (newTitle === null) {
          return;
      }
  
      if (newTitle!.trim() == ''){
          alert("The field is empty!");
          return;
      }
  
      title.innerText = newTitle;
      getDatabase()[id].title = newTitle;
  }

  doneTask(id : number) {
      document.getElementById(`doneCardBtn-${id}`)!.remove();
      document.getElementById(`card-${id}`)!.className = "todo-card-done";
      getDatabase()[id].status = "done";
  }
  
}
