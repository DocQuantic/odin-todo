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
        taskTitle.classList.add("static");
        taskTitle.textContent = this.title;
        const taskTitleEdit = document.createElement("input");
        taskTitleEdit.classList.add("edit", "hidden");
        taskTitleEdit.setAttribute("value", this.title);

        const emptyDivUp = document.createElement("div");
        emptyDivUp.classList.add("flex-row");

        const editIcon = document.createElement("i");
        editIcon.classList.add("fa-regular", "fa-pen-to-square");
        editIcon.addEventListener("click", () => {
            const editElements = task.querySelectorAll(".edit");
            const staticElements = task.querySelectorAll(".static");

            if(this.isEditMode){
                this.isEditMode = false;
                editElements.forEach((editElement) => {
                    editElement.classList.add("hidden");
                })
                staticElements.forEach((staticElement) => {
                    staticElement.classList.remove("hidden");
                })

                this.title = taskTitleEdit.value;
                this.description = taskDescriptionEdit.value;
                this.dueDate = taskDateEdit.value;
                this.priority = taskPriorityValueEdit.value;

                taskTitle.textContent = this.title;
                taskDescription.textContent = this.description;
                taskDate.textContent = this.dueDate;
                taskPriorityValue.textContent = this.priority;
            } else {
                this.isEditMode = true;
                editElements.forEach((editElement) => {
                    editElement.classList.remove("hidden");
                })
                staticElements.forEach((staticElement) => {
                    staticElement.classList.add("hidden");
                })
            }
        });
        const deleteIcon = document.createElement("i");
        deleteIcon.classList.add("fa-solid", "fa-trash");
        deleteIcon.addEventListener("click", () => {
            task.remove();
        })

        emptyDivUp.appendChild(editIcon);
        emptyDivUp.appendChild(deleteIcon);

        taskBorderUp.appendChild(taskTitle);
        taskBorderUp.appendChild(taskTitleEdit);
        taskBorderUp.appendChild(emptyDivUp);

        const taskDescription = document.createElement("p");
        taskDescription.classList.add("static");
        taskDescription.textContent = this.description;
        const taskDescriptionEdit = document.createElement("textarea");
        taskDescriptionEdit.classList.add("edit", "hidden");
        taskDescriptionEdit.setAttribute("rows", "4");
        taskDescriptionEdit.textContent = this.description;

        const taskBorderDown = document.createElement("div");
        taskBorderDown.classList.add("task-border", "flex-row");

        const emptyDiv = document.createElement("div");

        const taskDate = document.createElement("p");
        taskDate.classList.add("static");
        taskDate.textContent = this.dueDate;
        
        const taskPriorityTitle = document.createElement("p");
        taskPriorityTitle.classList.add("static");
        taskPriorityTitle.textContent = "Priority: ";
        
        const taskPriorityValue = document.createElement("span");
        taskPriorityValue.textContent = this.priority.toString();

        taskPriorityTitle.appendChild(taskPriorityValue);

        const taskDateEdit = document.createElement("input");
        taskDateEdit.classList.add("edit", "hidden");
        taskDateEdit.setAttribute("type", "date");

        const taskPriorityTitleEdit = document.createElement("p");
        taskPriorityTitleEdit.classList.add("edit", "hidden");
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
        doneIcon.addEventListener("click", () => {
            if(this.isDone){
                doneIcon.classList.remove("fa-square-check");
                doneIcon.classList.add("fa-square");
                this.isDone = false;

                task.classList.remove("done", "done-late");
                task.classList.add("not-done");
            } else {
                doneIcon.classList.add("fa-square-check");
                doneIcon.classList.remove("fa-square");
                this.isDone = true;

                task.classList.remove("not-done");
                if(this.checkDoneInTime()){
                    task.classList.add("done");
                } else {
                    task.classList.add("done-late");
                }
            }
        })

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