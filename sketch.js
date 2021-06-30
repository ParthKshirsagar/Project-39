var playerCar, tire1;
var gameState;
var randomX, x;
var lines1, lines2;
var dist;
var score;
var tireGroup;
var GameOver;
var retry;
var track;
var tireImg;
var carImg;
var trackObj;

function setup() {
  createCanvas(700,657);
  retry = document.getElementById("btn");

  dist = 0;
  score = 0;
  gameState = 0;

  carImg = loadImage("car.png");
  playerCar = createSprite(width/2, 550, 50, 50);
  playerCar.shapeColor = "blue";
  playerCar.addImage(carImg, "car");
  playerCar.scale = 0.1;
  tireGroup = new Group();
  track = loadImage("Track.png");
  track.scale = 0.001;
  tireImg = loadImage("Tire.png");
}

function draw() {
  if(gameState == 0){
    background("brown");
    trackObj = image(track, 0, -displayHeight*4 , 700, displayHeight*5);
  }

  if(gameState === 0){
  camera.position.y = playerCar.y - width/4;

  if(keyDown("space")){
    playerCar.velocityY = 0;
  }

  if(dist <=1700){
  if(keyDown("up")){
    dist = dist + 10;
    playerCar.y = playerCar.y - 20;
  }
  else if(keyDown("left") && playerCar.x>=166.665){
    playerCar.x = playerCar.x - 233.33;
  }
  else if(keyDown("right") && playerCar.x<=583.325){
    playerCar.x = playerCar.x + 233.33;
  }
}

  if(dist%100 == 0 && dist!==0){
    score = score + 1;
  }

  if(frameCount%1 == 0){
  if(frameCount/1===1 || frameCount%30000===0){
  for(var y = -2750; y <= 1; y = y+200){
  randomX = Math.round(random(1,3));
  if(randomX == 1){
    x = 116.665;
  }
  else if(randomX === 2){
    x = 349.995;
  }
  else if(randomX === 3){
    x = 583.325;
  }
   tire1 = createSprite(x, y, 50, 50);
   tire1.lifetime = 25000;
   tire1.shapeColor = "black";
   tire1.addImage(tireImg, "tire");
   tire1.scale = 0.15;
   tireGroup.add(tire1);
  }
  }

    if(playerCar.isTouching(tireGroup)){
      gameState = 1;
      tireGroup.destroyEach();
    }
}

if(gameState === 1){
  playerCar.destroy();
  background("red");
  textSize(100);
  fill(rgb(0,0,0));
  GameOver = text("Game Over!", 100, playerCar.y-125);
  retry.style.display = "block";
}
if(dist>=1690){
  tireGroup.destroyEach();
  playerCar.destroy();
  background(rgb(0,200,0));
  textSize(100);
  fill(rgb(0,0,0));
  text("You Won!", 125, playerCar.y-125);
}
  

  textSize(20);
  fill(0);
  text("Score: " + score, 30, playerCar.y-430);
  drawSprites();
}
}
