export default class Project {
    constructor(){
        this.todos = [];
        this.completion = 0;
    }

    checkCompletion(){
        let completedTodos = 0;
        const totalTodos = this.todos.length;
        this.todos.forEach((todo) => {
            if(todo.isDone){
                completedTodos += 1;
            }
        })

        this.completion = completedTodos/totalTodos;
    }

    addTodo(todo){
        this.todos.push(todo);
        this.checkCompletion();
    }

    deleteTodo(todoID){
        this.todos.forEach((todo) => {
            if(todo.id === todoID){
                const index = this.todos.indexOf(todo);
                this.todos.splice(index, 1);
            }
        })
        this.checkCompletion();
    }
}