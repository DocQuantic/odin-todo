function editTodo(project, todoElement, todo, dataID){
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
        todo.dueDate = editElements[2].value;
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

    const projectElement = document.querySelector(".project[data-projectid='" + project.id + "']");
    const projectTodoElement = projectElement.querySelector("li[data-id='" + dataID + "']")
    projectTodoElement.childNodes[0].textContent = todo.title;
}

function removeProjectTodoElement(project, dataID){
    const projectElement = document.querySelector(".project[data-projectid='" + project.id + "']");
    const todoElement = projectElement.querySelector("li[data-id='" + dataID + "']")
    todoElement.remove();
}

function deleteTodo(todoElement, project, dataID){
    removeProjectTodoElement(project, dataID);
    todoElement.remove();
    project.deleteTodo(dataID);
}

function toggleTodoDone(project, todo, todoElement, doneIconElement, dataID){
    if(todo.isDone){
        doneIconElement.classList.remove("fa-square-check");
        doneIconElement.classList.add("fa-square");
        todo.isDone = false;

        todoElement.classList.remove("done", "done-late");
        todoElement.classList.add("not-done");
    } else {
        doneIconElement.classList.add("fa-square-check");
        doneIconElement.classList.remove("fa-square");
        todo.isDone = true;

        todoElement.classList.remove("not-done");
        if(todo.checkDoneInTime()){
            todoElement.classList.add("done");
        } else {
            todoElement.classList.add("done-late");
        }
    }

    const projectElement = document.querySelector(".project[data-projectid='" + project.id + "']");
    const projectTodoElement = projectElement.querySelector("li[data-id='" + dataID + "']")
    projectTodoElement.classList.remove("done", "done-late", "not-done");
    if(todo.isDone === false){
        projectTodoElement.classList.add("not-done");
    }else if(todo.isDone & !todo.isDoneInTime){
        projectTodoElement.classList.add("done-late");
    }else{
        projectTodoElement.classList.add("done");
    }
}

export function todoActions(event, todoElement, project) {
    const target = event.target;

    const dataID = todoElement.getAttribute("data-id");
    const todo = project.getTodoFromID(dataID);

    switch(target.id){
        case "edit-btn":
            editTodo(project, todoElement, todo, dataID);
            break;
        case "delete-btn":
            deleteTodo(todoElement, project, dataID);
            break;
        case "done-btn":
            toggleTodoDone(project, todo, todoElement, target, dataID);
            break;
    }
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
    todoElementTitleEdit.classList.add("todo-title", "edit", "hidden");
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
    todoElementDescriptionEdit.classList.add("todo-description", "edit", "hidden");
    todoElementDescriptionEdit.setAttribute("rows", "4");
    todoElementDescriptionEdit.textContent = todo.description;

    const todoElementBorderDown = document.createElement("div");
    todoElementBorderDown.classList.add("todo-border", "flex-row");

    const emptyDiv = document.createElement("div");

    const todoElementDate = document.createElement("p");
    todoElementDate.classList.add("todo-date", "static");
    todoElementDate.textContent = todo.formatDateForDisplay(todo.dueDate);
    
    const todoElementPriorityTitle = document.createElement("p");
    todoElementPriorityTitle.classList.add("todo-priority", "static");
    todoElementPriorityTitle.textContent = "Priority: ";
    
    const todoElementPriorityValue = document.createElement("span");
    todoElementPriorityValue.textContent = todo.priority.toString();

    todoElementPriorityTitle.appendChild(todoElementPriorityValue);

    const todoElementDateEdit = document.createElement("input");
    todoElementDateEdit.classList.add("todo-date", "edit", "hidden");
    todoElementDateEdit.setAttribute("type", "date");

    const todoElementPriorityTitleEdit = document.createElement("p");
    todoElementPriorityTitleEdit.classList.add("todo-priority", "edit", "hidden");
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
    doneIcon.classList.add("fa-regular", "fa-square");
    doneIcon.setAttribute("id", "done-btn");

    todoElementBorderDown.appendChild(emptyDiv);
    todoElementBorderDown.appendChild(doneIcon);

    todoElement.appendChild(todoElementBorderUp);
    todoElement.appendChild(todoElementDescription);
    todoElement.appendChild(todoElementDescriptionEdit);
    todoElement.appendChild(todoElementBorderDown);

    container.appendChild(todoElement);
}

function addToDoElementToProjectElement(project, todo){
    const currentProjectElement = document.querySelector(".project[data-projectID='" + project.id + "']");

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

export function addToDoToCurrentProject(project, todo){
    project.addTodo(todo);
    const todoElement = addTodoElementToDOM(todo);
    addToDoElementToProjectElement(project, todo);
}