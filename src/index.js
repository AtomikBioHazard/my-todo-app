import "./styles.css";
import { getTranslation } from "./translations.js";

const w = window,
  d = document,
  $installBtn = d.getElementById("installBtn"),
  $title = d.getElementById("title"),
  $placeholder = d.getElementById("input"),
  $sm1 = d.getElementById("sm-1"),
  $sm2 = d.getElementById("sm-2"),
  $form = d.getElementById("form"),
  $input = d.getElementById("input"),
  $todosUL = d.getElementById("todos");

$title.innerText = getTranslation("title");
$placeholder.placeholder = getTranslation("placeholder");
$sm1.innerText = getTranslation("sm1");
$sm2.innerText = getTranslation("sm2");

// Add event listener to beforeinstallprompt
w.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  $installBtn.style.display = "block";
  $installBtn.innerText = getTranslation("installBtnText");
  $installBtn.addEventListener("click", () => {
    e.prompt().then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log(getTranslation("setupAcceptedText"));
      } else {
        console.log(getTranslation("setupRejectedText"));
      }
      $installBtn.style.display = "none";
    });
  });
});

// Register service worker
if ("serviceWorker" in navigator) {
  w.addEventListener("load", async () => {
    try {
      const reg = await navigator.serviceWorker.register("./service-worker.js");
      console.log("Service worker registered: ", reg);
    } catch (err) {
      console.error("Service worker registration failed: ", err);
    }
  });
}

// Retrieve todos from local storage
const todos = JSON.parse(localStorage.getItem("todos")) || [];
// Render todos on page load
todos.forEach(addTodo);

// Add new todo
$form.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoText = $input.value.trim();
  if (todoText) {
    addTodo({ text: todoText, completed: false });
    $input.value = "";
  }
});

// Add todo item to the list
function addTodo(todo) {
  const todoEl = d.createElement("li");
  todoEl.innerText = todo.text;
  if (todo.completed) {
    todoEl.classList.add("completed");
  }

  todoEl.addEventListener("click", () => {
    todoEl.classList.toggle("completed");
    updateLocalStorage();
  });

  todoEl.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    todoEl.remove();
    updateLocalStorage();
  });

  $todosUL.appendChild(todoEl);
  updateLocalStorage();
}

// Update local storage with the todos
function updateLocalStorage() {
  const todos = Array.from($todosUL.children).map((todoEl) => ({
    text: todoEl.innerText,
    completed: todoEl.classList.contains("completed")
  }));
  localStorage.setItem("todos", JSON.stringify(todos));
}

/* Language Functionality */
