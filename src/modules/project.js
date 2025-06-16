export default class Project {
    constructor(title){
        this.title = title;
        this.todos = [];
        this.completion = 0;
        this.id = crypto.randomUUID();
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

    addProjectElementToDOM(){
        const container = document.querySelector(".projects-list");

        const projectElement = document.createElement("ul");
        projectElement.classList.add("project");
        projectElement.setAttribute("data-projectID", this.id);

        const projectListElement = document.createElement("li");

        const projectNameDivElement = document.createElement("div");
        projectNameDivElement.classList.add("project-name", "flex-row");

        const projectCompletionElement = document.createElement("div");
        projectCompletionElement.classList.add("completion-circle");
        const projectNameElement = document.createElement("span");
        projectNameElement.textContent = this.title;

        projectNameDivElement.appendChild(projectCompletionElement);
        projectNameDivElement.appendChild(projectNameElement);

        const projectTodoListElement = document.createElement("ul")
        projectTodoListElement.classList.add("project-todos");

        projectListElement.appendChild(projectNameDivElement);
        projectListElement.appendChild(projectTodoListElement);

        projectElement.appendChild(projectListElement);

        container.appendChild(projectElement);
    }
}