const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const LS_TODOS = "toDos";

let toDos = [];

function deleteToDo(e){
  const btn = e.target;
  const li = btn.parentNode;
  toDoList.removeChild(li); //요까지만 하면 localStorage에서 삭제된것이 아니라서 새로고침하면 다시 뜬다
  const cleanToDos = toDos.filter(toDo => 
    // console.log(toDo.id, li.id)
    toDo.id !== parseInt(li.id)
  )
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos(){
  localStorage.setItem(LS_TODOS, JSON.stringify(toDos));
}

function renderToDo(text){
  // ul태그에 li달아주기
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;

  delBtn.addEventListener("click", deleteToDo);
  delBtn.innerText = "✖️";
  span.innerText = text;
  delBtn.classList.add("delBtn")
  li.classList.add("todo")
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  toDoList.appendChild(li);
  // 여기까지 화면에 html제어
  const toDoObj = {
    text: text,
    id: newId
  }
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event){
  event.preventDefault();
  // toDoInput.value를 toDoList에 붙여줌 & localStorage저장
  const currentValue = toDoInput.value;
  renderToDo(currentValue);
  toDoInput.value = "";
}

function submitToDos(){
  toDoForm.addEventListener("submit", handleSubmit);
}

function loadToDos(){
  const lodedToDos = localStorage.getItem(LS_TODOS);
  // if(toDos === null){} 
    // 저장된 투두가 없으면 아무것도 안한다 todo 공간은 항상 showing일 것이기 때문
  if(lodedToDos !== null) {
    // 저장된 투두를 뿌려줌
    const parsedToDos = JSON.parse(lodedToDos);
    parsedToDos.forEach(toDo => renderToDo(toDo.text));
  }
}

function init(){
  loadToDos();
  submitToDos();
}

init();
