import {getDatabase} from "./ds.js";

function doneTask(order) {
    document.getElementById(`doneCardBtn-${order}`).style.display = 'none';
    document.getElementById(`card-${order}`).className = "done-todo-card";

    getDatabase()[order].status = "done";
}

function deleteTask(order) {
    document.getElementById(`card-${order}`).style.display = 'none';
    getDatabase()[order].status = "deleted";
}

function editTask(order) {
    const newTitle = prompt("Enter new title", document.getElementById(`title-${order}`).innerText);
    if (newTitle.trim() == ''){
        alert("The field is empty!");
        return;
    }
    document.getElementById(`title-${order}`).innerText = newTitle;
    getDatabase()[order].name = newTitle;
}

export function cardTemplate(id,title,status,classname) {
    return `<div class=${classname != undefined ? classname : "todo-card"} id="card-${id}">
                <p id="title-${id}" class="card-title">${title}</p>
                <div class="button-container">
                    ${status == "done" || status == "deleted" ? '' : `<button id="doneCardBtn-${id}" class="done-btn"><p class="done-btn-text">Done</button>`}
                    ${status == "done" || status == "deleted" ? '' : `<button id="delCardBtn-${id}" class="del-btn"><p class="del-btn-text">Delete</button>`}
                    <button id="editCardBtn-${id}" class="edit-btn"><p class="edit-btn-text">Edit</button>
                </div>                
            </div>`;
}

export function createCard(title, order) {
    const info = {
        id: order,
        name: title,
        status: "active"
    };
    getDatabase().push(info);
    console.log(getDatabase());
    document.getElementById("board").insertAdjacentHTML('afterbegin',cardTemplate(order, title));
    document.getElementById(`doneCardBtn-${order}`).addEventListener('click', ()=>doneTask(order));
    document.getElementById(`delCardBtn-${order}`).addEventListener('click',()=>deleteTask(order));
    document.getElementById(`editCardBtn-${order}`).addEventListener('click',()=>editTask(order));
}