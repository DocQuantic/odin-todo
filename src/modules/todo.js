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
        this.isEditMode = true;
    }

    toggleIsDone(){
        this.isDone = this.isDone ? false : true;
        this.updateDoneInTime();
    }

    updateDoneInTime(){
        this.isDoneInTime = this.isDone ? this.checkDoneInTime() : undefined;
    }

    checkDoneInTime(){
        const today = new Date()
        return today < this.dueDate ? true : false;
    }

    formatDateForDisplay(date){
        return format(date, "dd/MM/yyyy");
    }
}