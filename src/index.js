import { format } from "date-fns";

import "./styles.css";
import { default as ToDo } from "./modules/todo";
import { default as Project } from "./modules/project";
import { todoActions, addToDoToCurrentProject } from "./modules/UI_interaction";

const project = new Project("Project1");
const todo1 = new ToDo("todo1", "desc1", new Date(2022, 1, 22), 1);
const todo2 = new ToDo("todo2", "desc2", new Date(2026, 1, 22), 1);

project.addTodo(todo1);
project.addTodo(todo2);

project.addProjectElementToDOM();

let focusedProject = project;

const newToDoBtn = document.querySelector("#new-todo");
newToDoBtn.addEventListener("click", (event) => {
    const todo = new ToDo("Title", "description", new Date(), 1);
    addToDoToCurrentProject(focusedProject, todo);

    const todoElement = document.querySelector(".todo[data-id='" + todo.id + "']");
    todoElement.addEventListener("click", (event) => {
        todoActions(event, todoElement, focusedProject);
    })
})
