export default class Project {
    constructor(title){
        this.title = title;
        this.todos = [];
        this.completion = 0;
        this.id = crypto.randomUUID();
        this.isEditMode = false;
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

    getTodoFromID(todoID){
        let searchedTodo = null;
        this.todos.forEach(function(todo) {
            if(todo.id === todoID){
                searchedTodo = todo;
            }
        })

        return searchedTodo;
    }
}