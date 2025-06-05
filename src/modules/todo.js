export default class ToDo {
    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isDone = false;
        this.isDoneInTime = undefined;
        this.id = crypto.randomUUID();
    }

    set dueDate(value){
        this.updateDoneInTime();
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