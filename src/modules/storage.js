import { projectsList } from "..";
import { default as Project } from "./project";
import { default as ToDo } from "./todo";

export function populateStorage(){
    localStorage.setItem("projectsList", JSON.stringify(projectsList));
}

function loadStorage(){
    const loadedProjects = JSON.parse(localStorage.getItem("projectsList"));
    
    return loadedProjects;
}

export function initProjectsList(){
    const loadedProjects = loadStorage();

    if(loadedProjects === null){
        return;
    } else {
        loadedProjects.forEach((project) => {
            const newProject = new Project(project.title);
            newProject.completion = project.completion;
            newProject.id = project.id;
            newProject.isEditMode = false;

            const projectTodos = project.todos;
            projectTodos.forEach((todo) => {
                const newTodo = new ToDo(todo.title, todo.description, todo.dueDate, todo.priority);
                newTodo.isDone = todo.isDone;
                newTodo.isDoneInTime = todo.isDoneInTime;
                newTodo.id = todo.id;
                newTodo.isEditMode = todo.isEditMode;

                newProject.addTodo(newTodo);
            })

            projectsList.push(newProject);
        })
    }
}