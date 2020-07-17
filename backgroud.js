const body = document.querySelector("body");

const IMG_NUMBER = 7;

function renderImg(imgNumber){
  const image = new Image();  // img태그의 instance
  image.src = `images/${imgNumber + 1}.jpg`;
  image.classList.add("backgroudImg");
  body.appendChild(image);
  
}

function getRandom(){
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init(){
  // generate number function
  const randomNumber = getRandom();
  renderImg(randomNumber);
}

init();