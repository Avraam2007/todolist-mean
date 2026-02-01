import {Component, ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef,inject} from '@angular/core';
import { Card } from '../card/card';
import {CountSingleton} from "../../singletons/count";
import { CardStatus, clearDatabase, getDatabase } from '../../db';
import { MatDialog } from '@angular/material/dialog';
import { InformDialog } from '../inform-dialog/inform-dialog';
import { NgClass } from '@angular/common';
import { IsDarkSingleton } from '../../singletons/isDark';
import { IsSyncSingleton } from '../../singletons/isSync';


@Component({
  selector: 'app-card-field',
  imports: [NgClass],
  templateUrl: './card-field.html',
  styleUrl: './card-field.scss',
})
export class CardField {
  private readonly countObject = CountSingleton.instance;
  private readonly dialog = inject(MatDialog);
  private readonly isSyncObject = IsSyncSingleton.instance;
  
    @ViewChild('messagecontainer', { read: ViewContainerRef }) entry!: ViewContainerRef;
    constructor(private resolver: ComponentFactoryResolver) {
      window.onload = () => {
        if(this.isSyncObject.isSync) {
          this.getData();
        }
      }
    }

    private readonly isDarkObject = IsDarkSingleton.instance;
      isDark() {
        return this.isDarkObject.isDark;
      }
      
    openDialog(myTitle:String,myDesc:String) {
      this.dialog.open(InformDialog, {data:{title:myTitle,desc:myDesc}});
    }

    async getData() {
      try {
        const response : Response = await fetch('http://localhost:3001/api/tasks');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        const data = await response.json();
        if(data !== null && data !== undefined) {
          data.forEach((item: { title: any; status: any; }) => {
          getDatabase().push({
            id:this.countObject.count,
            title: item.title,
            status: item.status
          });
          this.countObject.count++;
          if(getDatabase()[getDatabase().length-1].status !== "deleted") {
            this.countObject.totalCards.update(value => value + 1);
          }
          else {
            this.countObject.deletedCards.update(value => value + 1);
          }

          if(getDatabase()[getDatabase().length-1].status === "active") {
            this.countObject.activeCards.update(value => value + 1);
          }

          if(getDatabase()[getDatabase().length-1].status === "done") {
            this.countObject.doneCards.update(value => value + 1);
          }
        });
        }
      } catch (error) {
        console.error(`Error: ${error}`);
      }
      console.log(getDatabase());
      this.showCategoryCards();
    }
    
 
    cleanBoard(){
      this.entry.clear();
      clearDatabase();
      this.countObject.count = 0;
      this.countObject.totalCards.set(0);
      this.countObject.deletedCards.set(0);
      this.countObject.doneCards.set(0);
      this.countObject.activeCards.set(0);
      if(this.isSyncObject.isSync) {
          this.sendData();
      }
    }

    sendData() {
      fetch('http://localhost:3001/api/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(getDatabase())
        })
        .then(response => response.json())
        .then(data => console.log('Success:', data))
        .catch((error) => console.error('Error:', error));
    }

    createComponent(message:String,id1:number,status?:CardStatus,className?:"todo-card" | "todo-card-done") {     
        const factory = this.resolver.resolveComponentFactory(Card);
        const newComponentRef: ComponentRef<Card> = this.entry.createComponent(factory);
        newComponentRef.instance.title = message;
        newComponentRef.instance.id = id1;
        newComponentRef.instance.status = status == undefined ? "active" : status;
        newComponentRef.instance.cardClass = className == undefined ? "todo-card" : className;

        const sub = newComponentRef.instance.deleteRequest.subscribe((idToDelete) => {
        // Коли картка скаже "видали мене":
        
        // 1. Видаляємо сам компонент з Angular (це прибере і DOM, і відступи)
          newComponentRef.destroy(); 
        
        // 2. Відписуємось від події, щоб не було витоку пам'яті
          sub.unsubscribe(); 
          this.countObject.totalCards.update(value => value - 1);
          this.countObject.deletedCards.update(value => value + 1);
        });

        if(getDatabase()[id1] === undefined) {
          getDatabase().push({
            id: newComponentRef.instance.id, 
            title: newComponentRef.instance.title, 
            status: newComponentRef.instance.status
          });
          this.countObject.count++;
          this.countObject.totalCards.update(value => value + 1);
          this.countObject.activeCards.update(value => value + 1);
        }
        const input : HTMLInputElement = (<HTMLInputElement>document.querySelector("#cardTitle"));
        input.value = "";
    }

    getCurrentId():number {
      return this.countObject.count;
    }

    isEmpty(text:string) {
      return text.trim() === '';
    }

    checkCategory():boolean {
      const selectElement = (<HTMLInputElement>document.querySelector("#cardCategories"));
      return (parseInt(selectElement.value) !== 1);
    }

    showAlert(text:string):void{
      alert(text);
    }

    showCategoryCards():void {
      const selectElement = (<HTMLInputElement>document.querySelector("#cardCategories"));
          getDatabase().forEach( item => {  
              if(parseInt(selectElement.value) === 1 && item.status !== "deleted") {
                  this.createComponent(item.title, item.id, item.status,(item.status == "done" ? "todo-card-done": "todo-card"));
              }
              else if(parseInt(selectElement.value) === 2 && item.status === "active") {
                  this.createComponent(item.title, item.id, item.status);
              }
              else if(parseInt(selectElement.value) === 3 && item.status === "done") {
                  this.createComponent(item.title, item.id, item.status, "todo-card-done");
              }
              else if(parseInt(selectElement.value) === 4 && item.status === "deleted") {
                  this.createComponent(item.title, item.id, item.status);
              }
          });
    }

    showCategoryCardsWithSync():void {
      this.entry.clear();
      this.showCategoryCards();
      if(this.isSyncObject.isSync) {
          this.sendData();
      }
    }
}
