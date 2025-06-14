import { format } from "date-fns";

export default class ToDo {
    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isDone = false;
        this.isDoneInTime = undefined;
        this.id = crypto.randomUUID();
        this.isEditMode = false;
    }

    updateDoneInTime(){
        this.isDoneInTime = this.isDone ? this.checkDoneInTime() : undefined;
    }

    toggleIsDone(){
        this.isDone = this.isDone ? false : true;
        this.updateDoneInTime();
    }

    checkDoneInTime(){
        const today = new Date();
        return today < this.dueDate ? true : false;
    }

    formatDateForDisplay(date){
        return format(date, "dd/MM/yyyy");
    }

    addTaskElementToDOM(){
        const container = document.querySelector(".tasks-list");

        const task = document.createElement("div");
        task.classList.add("task");
        task.setAttribute("data-id", this.id.toString())
        if(this.isDone === false){
            task.classList.add("not-done");
        }else if(this.isDone & !this.isDoneInTime){
            task.classList.add("done-late");
        }else{
            task.classList.add("done");
        }
        
        const taskBorderUp = document.createElement("div");
        taskBorderUp.classList.add("task-border", "flex-row");

        const taskTitle = document.createElement("h3");
        taskTitle.classList.add("task-title", "static");
        taskTitle.textContent = this.title;
        const taskTitleEdit = document.createElement("input");
        taskTitleEdit.classList.add("task-title", "edit", "hidden");
        taskTitleEdit.setAttribute("value", this.title);

        const emptyDivUp = document.createElement("div");
        emptyDivUp.classList.add("flex-row");

        const editIcon = document.createElement("i");
        editIcon.classList.add("fa-regular", "fa-pen-to-square");
        editIcon.setAttribute("id", "edit-btn");
        editIcon.setAttribute("data-id", this.id);

        const deleteIcon = document.createElement("i");
        deleteIcon.classList.add("fa-solid", "fa-trash");
        deleteIcon.setAttribute("id", "delete-btn");
        deleteIcon.setAttribute("data-id", this.id);

        emptyDivUp.appendChild(editIcon);
        emptyDivUp.appendChild(deleteIcon);

        taskBorderUp.appendChild(taskTitle);
        taskBorderUp.appendChild(taskTitleEdit);
        taskBorderUp.appendChild(emptyDivUp);

        const taskDescription = document.createElement("p");
        taskDescription.classList.add("task-description", "static");
        taskDescription.textContent = this.description;
        const taskDescriptionEdit = document.createElement("textarea");
        taskDescriptionEdit.classList.add("task-description", "edit", "hidden");
        taskDescriptionEdit.setAttribute("rows", "4");
        taskDescriptionEdit.textContent = this.description;

        const taskBorderDown = document.createElement("div");
        taskBorderDown.classList.add("task-border", "flex-row");

        const emptyDiv = document.createElement("div");

        const taskDate = document.createElement("p");
        taskDate.classList.add("task-date", "static");
        taskDate.textContent = this.formatDateForDisplay(this.dueDate);
        
        const taskPriorityTitle = document.createElement("p");
        taskPriorityTitle.classList.add("task-priority", "static");
        taskPriorityTitle.textContent = "Priority: ";
        
        const taskPriorityValue = document.createElement("span");
        taskPriorityValue.textContent = this.priority.toString();

        taskPriorityTitle.appendChild(taskPriorityValue);

        const taskDateEdit = document.createElement("input");
        taskDateEdit.classList.add("task-date", "edit", "hidden");
        taskDateEdit.setAttribute("type", "date");

        const taskPriorityTitleEdit = document.createElement("p");
        taskPriorityTitleEdit.classList.add("task-priority", "edit", "hidden");
        taskPriorityTitleEdit.textContent = "Priority: ";

        const taskPriorityValueEdit = document.createElement("select");
        for(let i=0; i<3; i++){
            const taskOption = document.createElement("option");
            taskOption.textContent = i+1;
            taskPriorityValueEdit.appendChild(taskOption);
        }

        taskPriorityTitleEdit.appendChild(taskPriorityValueEdit);

        emptyDiv.appendChild(taskDate);
        emptyDiv.appendChild(taskPriorityTitle);
        emptyDiv.appendChild(taskDateEdit);
        emptyDiv.appendChild(taskPriorityTitleEdit);

        const doneIcon = document.createElement("i");
        doneIcon.classList.add("fa-regular", "fa-square");
        doneIcon.setAttribute("id", "done-btn");

        taskBorderDown.appendChild(emptyDiv);
        taskBorderDown.appendChild(doneIcon);

        task.appendChild(taskBorderUp);
        task.appendChild(taskDescription);
        task.appendChild(taskDescriptionEdit);
        task.appendChild(taskBorderDown);

        container.appendChild(task);
    }

    switchToEditMode(){
        
    }
}