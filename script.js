const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.height = 512;
canvas.width = 288;

const pipSheight = 378;
const pipNheight = 242;

class Pipes {
  constructor(i) {
    this.pipeN = {
      x: rndRange(150*i -(i-1)*50,250*i -(i-1)*150),
      y: -rndRange(10,200)
    }
    this.pipeS = {
      x: this.pipeN.x,
      y: this.pipeN.y + 282 + pipeGap
    }
  }
}
// Assets
const pipesArray = [];
const bgImg = new Image();
bgImg.src = './images/bg.png';

const pipeN = new Image();
pipeN.src = './images/pipeN.png';

const pipeS = new Image();
pipeS.src = './images/pipeS.png';

const bird = {
  x: 25,
  y: 25
}
const pipeGap = 75;

const gravity = 1.5;

const gameSpeed = 1;

const birdImg = new Image();
birdImg.src = './images/bird.png';

const fgImg = new Image();
fgImg.src = './images/fg.png';

const rndRange = (min,max) => {
  return Math.floor(Math.random()*(max-min+1)) + min;
}
let pipeNumber = 5.5;
const resetBoard = () => {
  bird.x = 25;
  bird.y = 25;
  pipesArray.length = 0;
  pipesArray.push(new Pipes(1), new Pipes(3), new Pipes(5));
  pipeNumber = 5.5;
}
pipesArray.push(new Pipes(1), new Pipes(3), new Pipes(5));

const draw = () => {
  requestAnimationFrame(draw);
  ctx.drawImage(bgImg,0,0);
  ctx.drawImage(birdImg, bird.x,bird.y);
  pipesArray.forEach(pipe => {
    ctx.drawImage(pipeN, pipe.pipeN.x, pipe.pipeN.y);
    ctx.drawImage(pipeS, pipe.pipeS.x, pipe.pipeS.y);
    ctx.drawImage(pipeN, pipe.pipeN.x, pipe.pipeN.y);
    ctx.drawImage(pipeS, pipe.pipeS.x, pipe.pipeS.y);
  })
  ctx.drawImage(fgImg, 0, 400);
  bird.y += gravity;
  checkState();
}
const addNewPipe = ()=> {

  pipesArray.shift();
  pipesArray.push(new Pipes(pipeNumber));
  
  pipeNumber += 0.2;
}
const checkState = () => {
  pipesArray.forEach(pipe => {
    pipe.pipeN.x -= gameSpeed;
    pipe.pipeS.x -= gameSpeed;

  })
  if(bird.y>=375){
    resetBoard();
  }
  
  if(pipesArray[0].pipeN.x < -45) {
    addNewPipe();
  }
  if(pipesArray[0].pipeN.x <= bird.x + 35 && pipesArray[0].pipeN.x >= 0){
    const pipeSEnd = pipesArray[0].pipeS.y + pipSheight;
    const pipeNEnd = pipesArray[0].pipeN.y + pipNheight;
    if((bird.y<= pipeNEnd || pipeNEnd + pipeGap + 25 <= bird.y)){
      resetBoard();
    }
    
  }
}
window.addEventListener('click',()=>{
  bird.y -= 30;
})
setTimeout(draw, 500);

console.log(rndRange(0,100));