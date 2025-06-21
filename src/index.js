import { format } from "date-fns";

import "./styles.css";
import { default as ToDo } from "./modules/todo";
import { default as Project } from "./modules/project";
import { addToDoToCurrentProject, createProjectElement } from "./modules/UI_interaction";
import { initProjectsList } from "./modules/storage";

export let focusedProject = undefined;
export let projectsList = [];

initProjectsList();
initDOMFromProjectsList();

export function setFocusedProject(project){
    focusedProject = project;
}

function initDOMFromProjectsList(){
    projectsList.forEach((project) => {
        focusedProject = project;
        createProjectElement(project);
    })
}

const newToDoBtn = document.querySelector("#new-todo");
newToDoBtn.addEventListener("click", () => {
    if(projectsList.length !== 0){
        const todo = new ToDo("Title", "description", new Date(), 1);
        addToDoToCurrentProject(todo);
    }
})

const newProjectBtn = document.querySelector("#new-project");
newProjectBtn.addEventListener("click", () => {
    const project = new Project("Project");
    focusedProject = project;
    projectsList.push(project);
    createProjectElement(project);
})
