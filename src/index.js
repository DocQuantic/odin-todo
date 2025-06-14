import { format } from "date-fns";

import "./styles.css";
import { default as ToDo } from "./modules/todo";
import { default as Project } from "./modules/project";
import { taskActions } from "./modules/UI_interaction";

const project = new Project();
const todo1 = new ToDo("todo1", "desc1", new Date(2022, 1, 22), 1);
const todo2 = new ToDo("todo2", "desc2", new Date(2026, 1, 22), 1);

project.addTodo(todo1);
project.addTodo(todo2);

console.dir(project);

let focusedProject = project;

const todoElements = document.querySelectorAll(".task");

todoElements.forEach((todoElement) => {
    todoElement.addEventListener("click", (event) => {
        taskActions(event, todoElement, focusedProject);
    })
});

