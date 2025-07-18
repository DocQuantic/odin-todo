import { focusedProject, setFocusedProject, projectsList } from "..";
import { populateStorage } from "./storage";

/* ToDo DOM manipulation functions */

export function addToDoToCurrentProject(todo){
    focusedProject.addTodo(todo);
    addTodoElementToDOM(todo);
    addToDoElementToProjectElement(todo);
    populateStorage()
}

function addTodoElementToDOM(todo){
    const container = document.querySelector(".todos-list");

    const todoElement = document.createElement("div");
    todoElement.classList.add("todo");
    todoElement.setAttribute("data-id", todo.id.toString())
    if(todo.isDone === false){
        todoElement.classList.add("not-done");
    }else if(todo.isDone & !todo.isDoneInTime){
        todoElement.classList.add("done-late");
    }else{
        todoElement.classList.add("done");
    }
    
    const todoElementBorderUp = document.createElement("div");
    todoElementBorderUp.classList.add("todo-border", "flex-row");

    const todoElementTitle = document.createElement("h3");
    todoElementTitle.classList.add("todo-title", "static");
    todoElementTitle.textContent = todo.title;
    const todoElementTitleEdit = document.createElement("input");
    todoElementTitleEdit.classList.add("todo-title", "edit");
    todoElementTitleEdit.setAttribute("value", todo.title);

    const emptyDivUp = document.createElement("div");
    emptyDivUp.classList.add("flex-row");

    const editIcon = document.createElement("i");
    editIcon.classList.add("fa-regular", "fa-pen-to-square");
    editIcon.setAttribute("id", "edit-btn");
    editIcon.setAttribute("data-id", todo.id);

    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-trash");
    deleteIcon.setAttribute("id", "delete-btn");
    deleteIcon.setAttribute("data-id", todo.id);

    emptyDivUp.appendChild(editIcon);
    emptyDivUp.appendChild(deleteIcon);

    todoElementBorderUp.appendChild(todoElementTitle);
    todoElementBorderUp.appendChild(todoElementTitleEdit);
    todoElementBorderUp.appendChild(emptyDivUp);

    const todoElementDescription = document.createElement("p");
    todoElementDescription.classList.add("todo-description", "static");
    todoElementDescription.textContent = todo.description;
    const todoElementDescriptionEdit = document.createElement("textarea");
    todoElementDescriptionEdit.classList.add("todo-description", "edit");
    todoElementDescriptionEdit.setAttribute("rows", "4");
    todoElementDescriptionEdit.textContent = todo.description;

    const todoElementBorderDown = document.createElement("div");
    todoElementBorderDown.classList.add("todo-border", "flex-row");

    const emptyDiv = document.createElement("div");

    const todoElementDate = document.createElement("p");
    todoElementDate.classList.add("todo-date", "static");
    todoElementDate.textContent = todo.formatDateForDisplay(todo.dueDate);
    
    const todoElementPriorityTitle = document.createElement("p");
    todoElementPriorityTitle.classList.add("todo-priority", "static", "hidden");
    todoElementPriorityTitle.textContent = "Priority: ";
    
    const todoElementPriorityValue = document.createElement("span");
    todoElementPriorityValue.textContent = todo.priority;

    todoElementPriorityTitle.appendChild(todoElementPriorityValue);

    const todoElementDateEdit = document.createElement("input");
    todoElementDateEdit.classList.add("todo-date", "edit");
    todoElementDateEdit.setAttribute("type", "date");
    todoElementDateEdit.setAttribute("value", todo.formatDateForEdit(todo.dueDate));

    const todoElementPriorityTitleEdit = document.createElement("p");
    todoElementPriorityTitleEdit.classList.add("todo-priority", "edit");
    todoElementPriorityTitleEdit.textContent = "Priority: ";

    const todoElementPriorityValueEdit = document.createElement("select");
    for(let i=0; i<3; i++){
        const todoElementOption = document.createElement("option");
        todoElementOption.textContent = i+1;
        todoElementPriorityValueEdit.appendChild(todoElementOption);
    }

    todoElementPriorityTitleEdit.appendChild(todoElementPriorityValueEdit);

    emptyDiv.appendChild(todoElementDate);
    emptyDiv.appendChild(todoElementPriorityTitle);
    emptyDiv.appendChild(todoElementDateEdit);
    emptyDiv.appendChild(todoElementPriorityTitleEdit);

    const doneIcon = document.createElement("i");
    todo.isDone ? doneIcon.classList.add("fa-regular", "fa-square-check") : doneIcon.classList.add("fa-regular", "fa-square");
    doneIcon.setAttribute("id", "done-btn");

    todoElementBorderDown.appendChild(emptyDiv);
    todoElementBorderDown.appendChild(doneIcon);

    todoElement.appendChild(todoElementBorderUp);
    todoElement.appendChild(todoElementDescription);
    todoElement.appendChild(todoElementDescriptionEdit);
    todoElement.appendChild(todoElementBorderDown);

    if(todo.isEditMode){
        todoElementTitle.classList.add("hidden");
        todoElementDescription.classList.add("hidden");
        todoElementDate.classList.add("hidden");
        todoElementPriorityTitle.classList.add("hidden");
    } else {
        todoElementTitleEdit.classList.add("hidden");
        todoElementDescriptionEdit.classList.add("hidden");
        todoElementDateEdit.classList.add("hidden");
        todoElementPriorityTitleEdit.classList.add("hidden");
    }

    container.appendChild(todoElement);
    
    todoElement.addEventListener("click", (event) => {
        todoActions(event, todoElement);
    })
}

function addToDoElementToProjectElement(todo){
    const currentProjectElement = document.querySelector(".project[data-projectID='" + focusedProject.id + "']");

    const todosListElement = currentProjectElement.querySelector(".project-todos");

    const todoElement = document.createElement("li");
    if(todo.isDone === false){
        todoElement.classList.add("not-done");
    }else if(todo.isDone & !todo.isDoneInTime){
        todoElement.classList.add("done-late");
    }else{
        todoElement.classList.add("done");
    }

    todoElement.setAttribute("data-id", todo.id);
    const text = document.createTextNode(todo.title);
    todoElement.appendChild(text);

    todosListElement.appendChild(todoElement);
}

function todoActions(event, todoElement) {
    const target = event.target;

    const dataID = todoElement.getAttribute("data-id");
    const todo = focusedProject.getTodoFromID(dataID);

    switch(target.id){
        case "edit-btn":
            editTodo(todoElement, todo, dataID);
            break;
        case "delete-btn":
            deleteTodo(todoElement, dataID);
            break;
        case "done-btn":
            toggleTodoDone(todo, todoElement, target, dataID);
            break;
    }

    populateStorage();
}

function editTodo(todoElement, todo, dataID){
    const editElements = todoElement.querySelectorAll(".edit");
    const staticElements = todoElement.querySelectorAll(".static");

    if(todo.isEditMode){
        todo.isEditMode = false;
        editElements.forEach((editElement) => {
            editElement.classList.add("hidden");
        })
        staticElements.forEach((staticElement) => {
            staticElement.classList.remove("hidden");
        })

        todo.title = editElements[0].value;
        todo.description = editElements[1].value;
        todo.dueDate = new Date(editElements[2].value.split("-")[0], editElements[2].value.split("-")[1]-1, editElements[2].value.split("-")[2]);
        todo.priority = editElements[3].value;

        staticElements[0].textContent = todo.title;
        staticElements[1].textContent = todo.description;
        staticElements[2].textContent = todo.formatDateForDisplay(todo.dueDate);
        staticElements[3].textContent = todo.priority;
    } else {
        todo.isEditMode = true;
        editElements.forEach((editElement) => {
            editElement.classList.remove("hidden");
        })
        staticElements.forEach((staticElement) => {
            staticElement.classList.add("hidden");
        })
    }

    const projectElement = document.querySelector(".project[data-projectid='" + focusedProject.id + "']");
    const projectTodoElement = projectElement.querySelector("li[data-id='" + dataID + "']");
    projectTodoElement.childNodes[0].textContent = todo.title;
}

function deleteTodo(todoElement, dataID){
    removeProjectTodoElement(dataID);
    todoElement.remove();
    focusedProject.deleteTodo(dataID);
}

function removeProjectTodoElement(dataID){
    const projectElement = document.querySelector(".project[data-projectid='" + focusedProject.id + "']");
    const todoElement = projectElement.querySelector("li[data-id='" + dataID + "']")
    todoElement.remove();
}

function toggleTodoDone(todo, todoElement, doneIconElement, dataID){

    if(todo.isDone){
        doneIconElement.classList.remove("fa-square-check");
        doneIconElement.classList.add("fa-square");
        todo.isDone = false;

        todoElement.classList.remove("done", "done-late");
        todoElement.classList.add("not-done");
    } else {
        doneIconElement.classList.add("fa-square-check");
        doneIconElement.classList.remove("fa-square");
        todo.toggleIsDone();

        todoElement.classList.remove("not-done");
        if(todo.isDoneInTime){
            todoElement.classList.add("done");
        } else {
            todoElement.classList.add("done-late");
        }
    }

    const projectElement = document.querySelector(".project[data-projectid='" + focusedProject.id + "']");
    const projectTodoElement = projectElement.querySelector("li[data-id='" + dataID + "']")
    projectTodoElement.classList.remove("done", "done-late", "not-done");
    if(todo.isDone === false){
        projectTodoElement.classList.add("not-done");
    }else if(todo.isDone & !todo.isDoneInTime){
        projectTodoElement.classList.add("done-late");
    }else{
        projectTodoElement.classList.add("done");
    }

    updateProjectCompletion();
}






/* Project DOM manipulation functions */

export function createProjectElement(project){
    const projectElement = addProjectElementToDOM();
    renderProjectTodos();
    if(project.todos !== undefined){
        project.todos.forEach((todo) => {
            addToDoElementToProjectElement(todo);
        })
    }
    projectElement.addEventListener("click", function(event) {
        const project = getProjectFromID(this.getAttribute("data-projectid"));
        if(project !== focusedProject){
            setFocusedProject(project);
            renderProjectTodos();
        }

        switch(event.target.id){
            case "edit-project-btn":
                editProjectTitle();
                break;
            case "delete-project-btn":
                deleteProject(focusedProject.id);
                deleteProjectFromDOM();
                break;
        }
    })
}

function addProjectElementToDOM(){
    const container = document.querySelector(".projects-list");

    const projectElement = document.createElement("ul");
    projectElement.classList.add("project");
    projectElement.setAttribute("data-projectID", focusedProject.id);

    const projectListElement = document.createElement("li");

    const projectNameDivElement = document.createElement("div");
    projectNameDivElement.classList.add("project-name", "flex-row");

    const projectCompletionElement = document.createElement("div");
    projectCompletionElement.classList.add("completion-circle");

    const projectNameElementContainer = document.createElement("div");

    const projectNameElement = document.createElement("span");
    projectNameElement.textContent = focusedProject.title;
    const projectNameElementEdit = document.createElement("input");
    projectNameElementEdit.classList.add("edit");
    projectNameElementEdit.setAttribute("value", focusedProject.title);

    projectNameElementContainer.appendChild(projectNameElement);
    projectNameElementContainer.appendChild(projectNameElementEdit);

    const projectNameEditElement = document.createElement("i");
    projectNameEditElement.classList.add("fa-regular", "fa-pen-to-square");
    projectNameEditElement.setAttribute("id", "edit-project-btn");
    projectNameEditElement.setAttribute("data-project-id", focusedProject.id);

    const projectNameDeleteElement = document.createElement("i");
    projectNameDeleteElement.classList.add("fa-solid", "fa-trash");
    projectNameDeleteElement.setAttribute("id", "delete-project-btn");
    projectNameDeleteElement.setAttribute("data-project-id", focusedProject.id);

    projectNameDivElement.appendChild(projectCompletionElement);
    projectNameDivElement.appendChild(projectNameElementContainer);
    projectNameDivElement.appendChild(projectNameEditElement);
    projectNameDivElement.appendChild(projectNameDeleteElement);

    const projectTodoListElement = document.createElement("ul")
    projectTodoListElement.classList.add("project-todos");

    projectListElement.appendChild(projectNameDivElement);
    projectListElement.appendChild(projectTodoListElement);

    projectElement.appendChild(projectListElement);

    container.appendChild(projectElement);

    if(focusedProject.isEditMode){
        projectNameElement.classList.add("hidden");
    } else {
        projectNameElementEdit.classList.add("hidden");
    }

    updateProjectCompletion();
    populateStorage();

    return projectElement;
}

function renderProjectTodos(){
    const todos = document.querySelectorAll(".todo");
    todos.forEach((todo) => {
        todo.remove();
    })

    focusedProject.todos.forEach((todo) => {
        addTodoElementToDOM(todo);
    })
}

function getProjectFromID(projectID){
    let searchedProject = null;
    projectsList.forEach(function(project) {
        if(project.id === projectID){
            searchedProject = project;
        }
    })

    return searchedProject;
}

function deleteProject(projectID){
    console.log(projectsList);
    projectsList.forEach((project) => {
        if(project.id === projectID){
            const index = projectsList.indexOf(project);
            projectsList.splice(index, 1);
        }
    })
}

function deleteProjectFromDOM(){
    const projectElement = document.querySelector("[data-projectid='" + focusedProject.id + "']");
    projectElement.remove();

    const todosList = document.querySelectorAll(".todo");
    todosList.forEach((todo) => {
        todo.remove();
    })

    populateStorage();
}

function editProjectTitle(){
    const projectElement = document.querySelector("[data-projectid='" + focusedProject.id + "']");
    
    const editElement = projectElement.querySelector(".edit");
    const staticElement = projectElement.querySelector("span");
    
    if(focusedProject.isEditMode){
        focusedProject.isEditMode = false;

        editElement.classList.add("hidden");
        staticElement.classList.remove("hidden");

        focusedProject.title = editElement.value;
        staticElement.textContent = editElement.value;

        console.log(focusedProject);
    }else{
        focusedProject.isEditMode = true;

        editElement.classList.remove("hidden");
        staticElement.classList.add("hidden");
    }

    populateStorage();
}

function updateProjectCompletion(){
    focusedProject.checkCompletion();
    const projectElement = document.querySelector("[data-projectid='" + focusedProject.id + "']");
    const circleElement = projectElement.querySelector("[class^='completion-circle']");

    if(focusedProject.completion <=0.5){
        circleElement.style["background-image"] = `linear-gradient(-90deg, var(--white) 50%, transparent 50%), linear-gradient(${270 - focusedProject.completion * 360}deg, var(--light-grey) 50%, transparent 50%)`;

    }else{
        circleElement.style["background-image"] = `linear-gradient(${90 - (focusedProject.completion - 0.5) * 360}deg, var(--light-grey) 50%, transparent 50%), linear-gradient(90deg, var(--light-grey) 50%, transparent 50%)`;
    }
}