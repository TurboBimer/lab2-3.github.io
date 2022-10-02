const classNames = {
  TODO_ITEM: "todo-container",
  TODO_CHECKBOX: "todo-checkbox",
  TODO_TEXT: "todo-value",
  TODO_DELETE: "todo-delete",
}

const list = document.getElementById("todo-list")
const itemCountSpan = document.getElementById("item-count")
const uncheckedCountSpan = document.getElementById("unchecked-count")

let todoList = [];

function updateCounters() {
  itemCountSpan.textContent = todoList.length.toString()
  uncheckedCountSpan.textContent = todoList.filter((item) => item.checked === false).length.toString()
}

function newTodo() {
  let value = prompt("Enter new task to do", "Do something");
  const todo = {
    value, checked: false, id: Date.now(),
  }
  todoList.push(todo)
  renderTodo(todo)
  updateCounters()
}

function renderTodo(item) {
  const li = document.createElement("li")
  li.setAttribute("id", `${item.id}`)
  li.setAttribute("class", `${classNames.TODO_ITEM}`)
  li.innerHTML = `<input onClick="toggleCheckbox(${item.id})" class="${classNames.TODO_CHECKBOX}" type="checkbox" ${item.checked ? "checked" : ""}>
                <label class="${classNames.TODO_TEXT}"><span>${item?.value}</span></label>
                <button class="${classNames.TODO_DELETE}" onClick="deleteTodo(${item.id})">delete</button>`
  list.appendChild(li)
  localStorage.setItem('todoList', JSON.stringify(todoList))
  updateCounters()
}

function toggleCheckbox(todoID) {
  todoList = todoList.map(item => {
    if (item.id !== todoID) return item
    return {...item, checked: !item.checked}
  })
  updateCounters()
  localStorage.setItem('todoList', JSON.stringify(todoList))
}

function deleteTodo(todoID) {
  const index = todoList.findIndex(item => item.id === Number(todoID))
  if (index >= 0) {
    todoList = todoList.filter(item => item.id !== Number(todoID))
    const li = document.getElementById(`${todoID}`)
    li.remove()
    updateCounters()
    localStorage.setItem('todoList', JSON.stringify(todoList))
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const localTodos = localStorage.getItem('todoList')
  if (localTodos) {
    todoList = JSON.parse(localTodos)
    todoList.forEach(item => renderTodo(item))
    updateCounters()
  }
})