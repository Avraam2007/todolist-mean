import {Component, ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef} from '@angular/core';
import { Card } from '../card/card';
import {CountSingleton} from "./count";
import { clearDatabase, getDatabase } from './db';


@Component({
  selector: 'app-card-field',
  imports: [],
  templateUrl: './card-field.html',
  styleUrl: './card-field.scss',
})
export class CardField {
  count = CountSingleton.instance;
 
    @ViewChild('messagecontainer', { read: ViewContainerRef }) entry!: ViewContainerRef;
    constructor(private resolver: ComponentFactoryResolver) {
      window.onload = () => {
        this.getData();
      }
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
            id:this.count.count,
            title: item.title,
            status: item.status
          });
          this.count.count++;
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
      this.count.count = 0;
      this.sendData();
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

    createComponent(message:String,id1:number,status?:"done" | "active" | "deleted",className?:"todo-card" | "todo-card-done") {     
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
        });

        if(getDatabase()[id1] === undefined) {
          getDatabase().push({
            id: newComponentRef.instance.id, 
            title: newComponentRef.instance.title, 
            status: newComponentRef.instance.status
          });
          this.count.count++;
        }
        const input : HTMLInputElement = (<HTMLInputElement>document.querySelector("#cardTitle"));
        input.value = "";
    }

    getCurrentId():number {
      return this.count.count;
    }

    isEmpty(text:string) {
      return text.trim() === '';
    }

    checkCategory():boolean {
      const selectElement = (<HTMLInputElement>document.querySelector("#cardCategories"));
      return (parseInt(selectElement.value) === 3 || parseInt(selectElement.value) === 4);
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
      this.showCategoryCards()
      this.sendData();
    }
}
