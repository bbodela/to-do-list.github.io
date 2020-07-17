const clockContainer = document.querySelector('.js-clock');
const clockTitle = clockContainer.querySelector('h1');

function getTime(){
  const date = new Date();
  
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // clockTitle.innerText = `${hours}:${minutes}:${seconds}`

  // 3항 연산자, mini if
  clockTitle.innerText = `${
    hours <10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes}:${
    seconds < 10 ? `0${seconds}` : seconds}`;
}

function init(){
  // 현재시각을 얻기위한 로직이 필요
  // getTime(); // 계속 새로고침해야 seconds가 바뀜
  setInterval(getTime, 1000);
}

init();