const input = document.querySelector("#task-input");
const addBtn = document.querySelector(".addBtn");
const ul = document.querySelector("#lists");

let tasks = [];
let editMode = false;
let editIndex = null;

function createTaskObj() {
  if (input.value.trim()) {
    return {
      text: input.value.trim(),
      done: false,
    };
  }
}

function addOrEditTask() {
  if (editMode) {
    if (input.value.trim()) {
      tasks[editIndex].text = input.value.trim();
      editMode = false;
      editIndex = null;
      input.value = "";
      addBtn.innerHTML = `<i class="fa fa-plus"></i>`;
      renderTasks();
    }
  } else {
    const taskObj = createTaskObj();
    if (taskObj) {
      tasks.unshift(taskObj);
      input.value = "";
      renderTasks();
    }
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function editTask(index) {
  input.value = tasks[index].text;
  editMode = true;
  editIndex = index;
  addBtn.innerHTML = `<i class="fa fa-save"></i>`;
}

function toggleStatus(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
}

function renderTasks() {
  ul.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const textContainer = document.createElement("span");
    textContainer.classList.add("task");
    if (task.done) textContainer.classList.add("done");

    const p = document.createElement("p");
    p.textContent = task.text;
    textContainer.append(p);
    textContainer.addEventListener("click", () => toggleStatus(index));

    const actionsBtn = document.createElement("span");
    actionsBtn.setAttribute("id", "edit-delete");
    actionsBtn.innerHTML = `
      <i class="fa-solid fa-pencil edit"></i> 
      <i class="fa-solid fa-trash trash"></i>
    `;

    actionsBtn
      .querySelector(".edit")
      .addEventListener("click", () => editTask(index));
    actionsBtn
      .querySelector(".trash")
      .addEventListener("click", () => deleteTask(index));

    li.appendChild(textContainer);
    li.appendChild(actionsBtn);
    ul.appendChild(li);
  });
}

addBtn.addEventListener("click", addOrEditTask);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addOrEditTask();
});
