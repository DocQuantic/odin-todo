import { format } from "date-fns";

import "./styles.css";
import { default as ToDo } from "./modules/todo";
import { default as Project } from "./modules/project";
import { addToDoToCurrentProject, addProjectElementToDOM, renderProjectTodos, editProjectTitle, deleteProjectFromDOM } from "./modules/UI_interaction";

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

function deleteProject(projectID){
    console.log(projectsList);
    projectsList.forEach((project) => {
        if(project.id === projectID){
            const index = projectsList.indexOf(project);
            projectsList.splice(index, 1);
        }
    })

    console.log(projectsList);
}

const newToDoBtn = document.querySelector("#new-todo");
newToDoBtn.addEventListener("click", () => {
    const todo = new ToDo("Title", "description", new Date(), 1);
    addToDoToCurrentProject(todo);
})

const newProjectBtn = document.querySelector("#new-project");
newProjectBtn.addEventListener("click", () => {
    const project = new Project("Project");
    focusedProject = project;
    projectsList.push(project);
    const projectElement = addProjectElementToDOM();
    renderProjectTodos();
    projectElement.addEventListener("click", function(event) {
        const project = getProjectFromID(this.getAttribute("data-projectid"));
        if(project !== focusedProject){
            focusedProject = project;
            renderProjectTodos();
        }

        switch(event.target.id){
            case "edit-project-btn":
                editProjectTitle();
                break;
            case "delete-project-btn":
                deleteProjectFromDOM();
                deleteProject(focusedProject.id)
                break;
        }
    })
})
