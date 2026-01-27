import {getDatabase, CardObject} from "./db";

function doneTask(order : number) {
    document.getElementById(`doneCardBtn-${order}`)!.style.display = 'none';
    document.getElementById(`card-${order}`)!.className = "done-todo-card";

    getDatabase()[order].status = "done";
}

function deleteTask(order : number) {
    document.getElementById(`card-${order}`)!.style.display = 'none';
    getDatabase()[order].status = "deleted";
}

function editTask(order : number) {
    const title = document.getElementById(`title-${order}`);

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
    getDatabase()[order].title = newTitle;
}

export function cardTemplate(id : number, title : String, status? : String, classname? : String) {
    return `<div class=${classname != undefined ? classname : "todo-card"} id="card-${id}">
                <p id="title-${id}" class="card-title">${title}</p>
                <div class="button-container">
                    ${status == "done" || status == "deleted" ? '' : `<button id="doneCardBtn-${id}" class="done-btn"><p class="done-btn-text">Done</button>`}
                    ${status == "done" || status == "deleted" ? '' : `<button id="delCardBtn-${id}" class="del-btn"><p class="del-btn-text">Delete</button>`}
                    <button id="editCardBtn-${id}" class="edit-btn"><p class="edit-btn-text">Edit</button>
                </div>                
            </div>`;
}

export function createCard(title : String, order : number) {
    const info : CardObject = {
        id: order,
        title: title,
        status: "active"
    };
    getDatabase().push(info);
    console.log(getDatabase());
    document.getElementById("board")!.insertAdjacentHTML('afterbegin',cardTemplate(order, title));
    document.getElementById(`doneCardBtn-${order}`)!.addEventListener('click', ()=>doneTask(order));
    document.getElementById(`delCardBtn-${order}`)!.addEventListener('click',()=>deleteTask(order));
    document.getElementById(`editCardBtn-${order}`)!.addEventListener('click',()=>editTask(order));
}