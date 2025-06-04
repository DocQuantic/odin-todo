class ToDo {
    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isDone = false;
        this.isDoneInTime = undefined;
    }

    updateTitle(value){
        this.title = value;
    }

    updateDescription(value){
        this.description = value;
    }

    updateDueDate(value){
        this.dueDate = value;
        this.updateDoneInTime();
    }

    updatePriority(value){
        this.priority = value;
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
}

export const todo = new ToDo("title", "description", new Date(2026, 0, 20), 1);