function editTodo(todoElement, todo){
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
}

function deleteTodo(todoElement, project, dataID){
    project.deleteTodo(dataID);
    todoElement.remove();
}

function toggleTodoDone(todo, todoElement, doneIconElement){
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
}

export function taskActions(event, todoElement, project) {
    const target = event.target;

    const dataID = todoElement.getAttribute("data-id");
    const todo = project.getTodoFromID(dataID);

    switch(target.id){
        case "edit-btn":
            editTodo(todoElement, todo);
            break;
        case "delete-btn":
            deleteTodo(todoElement, project, dataID);
            break;
        case "done-btn":
            toggleTodoDone(todo, todoElement, target);
            break;
    }
}