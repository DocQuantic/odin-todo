import { format } from "date-fns";

import "./styles.css";
import { default as ToDo } from "./modules/todo";
import { default as Project } from "./modules/project";
import { todoActions, addToDoToCurrentProject, addProjectElementToDOM, renderProjectTodos } from "./modules/UI_interaction";

export let focusedProject = undefined;
let projectsList = [];

function getProjectFromID(projectID){
    let searchedProject = null;
    projectsList.forEach(function(project) {
        if(project.id === projectID){
            searchedProject = project;
        }
    })

    return searchedProject;
}

const newToDoBtn = document.querySelector("#new-todo");
newToDoBtn.addEventListener("click", () => {
    const todo = new ToDo("Title", "description", new Date(), 1);
    addToDoToCurrentProject(todo);

    /*
    const todoElement = document.querySelector(".todo[data-id='" + todo.id + "']");
    todoElement.addEventListener("click", (event) => {
        todoActions(event, todoElement);
    })
        */
})

const newProjectBtn = document.querySelector("#new-project");
newProjectBtn.addEventListener("click", () => {
    const project = new Project("Project");
    focusedProject = project;
    projectsList.push(project);
    const projectElement = addProjectElementToDOM();
    renderProjectTodos();
    projectElement.addEventListener("click", function() {
        const project = getProjectFromID(this.getAttribute("data-projectid"));
        if(project !== focusedProject){
            focusedProject = project;
            renderProjectTodos();
        }
    })
})
