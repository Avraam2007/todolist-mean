import * as card from "./card.module.js";
import {CountSingleton} from "./count.js";
import {clearDatabase, getDatabase} from "./ds.js";

// function times(el) {
//     const date = new Date();
//     el.innerText = `${date.getHours().toString().padStart(2,'0')}:${date.getMinutes().toString().padStart(2,'0')}:${date.getSeconds().toString().padStart(2,'0')}`;
// }

// const el = document.createElement('p');
// document.body.appendChild(el);
// times(el);
// setInterval(()=>times(el),1000);


const count = CountSingleton.instance;

function clearBoard() {
    document.getElementById("board").innerHTML = "";
    count.count = 0;
    clearDatabase();
};

const titleLine = document.getElementById("cardTitle");

document.getElementById("clearBoard").addEventListener('click', ()=>clearBoard());

document.getElementById("addCard").addEventListener('click', ()=>{
    if (titleLine.value.trim() == ''){
        alert("The field is empty!");
        return;
    }
    card.createCard(titleLine.value, count.count);
    count.count += 1;
    titleLine.value = "";
});

const selectElement = document.querySelector("#cardCategories");
document.getElementById('submitBtn').addEventListener('click', ()=>{
    document.getElementById("board").innerHTML = "";
    getDatabase().forEach( item => {  
        if(selectElement.value == 1 && item.status !== "deleted") {
            document.getElementById("board").insertAdjacentHTML('afterbegin',card.cardTemplate(item.id, item.name, item.status, (item.status == "done" ? "done-todo-card": undefined)))
        }
        else if(selectElement.value == 2 && item.status === "active") {
            document.getElementById("board").insertAdjacentHTML('afterbegin',card.cardTemplate(item.id, item.name, item.status))
        }
        else if(selectElement.value == 3 && item.status === "done") {
            document.getElementById("board").insertAdjacentHTML('afterbegin',card.cardTemplate(item.id, item.name, item.status, "done-todo-card"))
        }
        else if(selectElement.value == 4 && item.status === "deleted") {
            document.getElementById("board").insertAdjacentHTML('afterbegin',card.cardTemplate(item.id, item.name, item.status))
        }
        else {
            console.error("Error");
            return;
        }
    });
});

