const form = document.querySelector(".js-form");
const input = document.querySelector("input");  // === form.querySelector("input")
const greeting = document.querySelector(".js-greetings");

const LS_USER = "currentUser";  // localS에 저장되어있는 유저이름
const CN_SHOWING = "showing"

function saveName(text){
  localStorage.setItem(LS_USER, text);
}

function handleSubmit(e){
  e.preventDefault();
  const currentValue = input.value;
  paintGreetingMsg(currentValue);
  saveName(currentValue);
}

function askForName(){
  form.classList.add(CN_SHOWING);
  form.addEventListener("submit", handleSubmit);
}

function paintGreetingMsg(text){
  form.classList.remove(CN_SHOWING); //환영msg를 띄우려면 form입력창을 안보이게!
  greeting.classList.add(CN_SHOWING); // h4태그에 class="showing"을 추가하겠다
  greeting.innerText = `Willkommen, ${text}!`;
}

// localStorage에 저장한 값을 가져오는 함수
/* 저장된 값이 있거나 없으면 input창이 사라지고(display:none) 
  
*/

function loadName(){
  const currentUser = localStorage.getItem(LS_USER);
  // LS_USER키가 있다면 currentUser에 값이 담길 것이고, 없다면 currentUser값은 null일 것이다
  if(currentUser === null){
    // 저장된 값이 없다면 (유저가 이름을 submit하지 않았다면)
    askForName();
  } else {
    // localStorage에 저장된 유저이름이 있다면 화면에 나타난 이름을 색칠하자
    paintGreetingMsg(currentUser);
  }
}

function init(){
  loadName();
}

init();