const toDoForm = document.querySelector(".js-toDoForm"),
	toDoInput = toDoForm.querySelector("input"),
	toDoList = document.querySelector(".js-toDoList"),
	finishList = document.querySelector(".js-finishList");

const LS_TODOS = "TODOS";
const LS_FINISH = "FINISHED";

let toDosArr = [];
let finishedArr = [];

function loadToDos() {
	const lodedToDos = localStorage.getItem(LS_TODOS);
	if (lodedToDos !== null) {
		const parsedToDos = JSON.parse(lodedToDos);
		parsedToDos.forEach(toDo => renderToDo(toDo.text));
	}
}
function loadFinish() {
	const loadedFinish = localStorage.getItem(LS_FINISH);
	if (loadedFinish !== null) {
		const parsedFinish = JSON.parse(loadedFinish);
		parsedFinish.forEach(function (check) {
			renderFinish(check.text);
		});
	}
}

function saveToDos() {
	localStorage.setItem(LS_TODOS, JSON.stringify(toDosArr));
}
function saveFinish() {
	localStorage.setItem(LS_FINISH, JSON.stringify(finishedArr));
}

function renderToDo(text) {
	// ul태그에 li달아주기
	const li = document.createElement("li");
	const delBtn = document.createElement("button");
	const checkBtn = document.createElement("button");
	const span = document.createElement("span");
	const newId = toDosArr.length + 1;

	delBtn.addEventListener("click", deleteToDo);
	checkBtn.addEventListener("click", checkToDo);
	delBtn.innerText = "✖️";
	checkBtn.innerText = "✅";
	span.innerText = text;

	delBtn.classList.add("delBtn");
	checkBtn.classList.add("checkBtn");
	li.classList.add("todo");

	li.appendChild(span);
	li.appendChild(delBtn);
	li.appendChild(checkBtn);

	li.id = newId;
	toDoList.appendChild(li);
	// 여기까지 화면에 html제어
	const toDoObj = {
		text: text,
		id: newId,
	};
	toDosArr.push(toDoObj);
	saveToDos();
}
function renderFinish(text) {
	const li = document.createElement("li");
	const delBtn = document.createElement("button");
	const checkBtn = document.createElement("button");
	const span = document.createElement("span");
	const newId = toDosArr.length + 1;

	delBtn.innerText = "✖️";
	checkBtn.innerText = "↩️";
	delBtn.addEventListener("click", deleteCheck);
	checkBtn.addEventListener("click", returnToDo);
	span.innerText = text;

	delBtn.classList.add("delBtn");
	checkBtn.classList.add("checkBtn");
	li.classList.add("todo");

	li.appendChild(span);
	li.appendChild(delBtn);
	li.appendChild(checkBtn);
	li.id = newId;
	finishList.appendChild(li);
	const finishObj = {
		text: text,
		id: newId,
	};
	finishedArr.push(finishObj);
	saveFinish();
}

function deleteToDo(e) {
	const btn = e.target;
	const li = btn.parentNode;
	toDoList.removeChild(li); //요까지만 하면 localStorage에서 삭제된것이 아니라서 새로고침하면 다시 뜬다
	const cleanToDos = toDosArr.filter(
		toDo =>
			// console.log(toDo.id, li.id)
			toDo.id !== parseInt(li.id)
	);
	toDosArr = cleanToDos;
	saveToDos();
}
function deleteCheck(e) {
	const btn = e.target;
	const li = btn.parentNode;
	finishList.removeChild(li);
	const cleanChecks = finishedArr.filter(todo => todo.id !== Number(li.id));
	finishedArr = cleanChecks;
	saveFinish();
}

function checkToDo(e) {
	const btn = e.target;
	const li = btn.parentNode;
	toDoList.removeChild(li);
	const delTodos = toDosArr.filter(todo => todo.id !== parseInt(li.id));
	toDosArr = delTodos;
	saveToDos();
	renderFinish(li.childNodes[0].innerText);
}
function returnToDo(e) {
	const btn = e.target;
	const li = btn.parentNode;
	finishList.removeChild(li);
	const cleanChecks = finishedArr.filter(todo => {
		return todo.id !== parseInt(li.id);
	});
	finishedArr = cleanChecks;
	saveFinish();
	renderToDo(li.childNodes[0].innerText);
}

function handleSubmit(event) {
	event.preventDefault();
	const currentValue = toDoInput.value;
	renderToDo(currentValue);
	toDoInput.value = "";
}
function submitToDos() {
	toDoForm.addEventListener("submit", handleSubmit);
}

function init() {
	loadToDos();
	submitToDos();
}

init();
