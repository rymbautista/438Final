let frog,ball,hat,cookie,book,painting;
let frogani;
let happy = 100;
let hunger = 100;
let grab = 'false';

function preload() {
  frogani = loadAnimation('images/Frogr1.png', 2);
  frogani.frameDelay = 10;
  ballI = loadImage('images/Ball.png');
  hatI = loadImage('images/Hat.png');
  bookI = loadImage('images/Book.png');
  cookieI = loadImage('images/Cookie.png');
}

function drawfrog() {
  frog = new Sprite();
  //frogani.resize(50, 60);
	frog.width = 50;
	frog.height = 60;
    frog.x = 150;
    frog.y = windowHeight-(windowHeight/16);
  frog.color = '#4CAF50';
}

function drawball() {
  ball = new Sprite();
    ballI.resize(50, 50);
    ball.addImage(ballI);
    ball.diameter = 50;
    ball.x = windowWidth/4;
    ball.y = windowHeight/2.2-25;
    ball.color = '#F44336';
    ball.layer = 1;
}

function drawhat() {
  hat = new Sprite();
  hatI.resize(50, 50);
  hat.addImage(hatI);
    hat.diameter = 50;
    hat.x = windowWidth/4 +100;
    hat.y = windowHeight/2.2-25;
    hat.color = '#3668F4';
    hat.layer = 1;
}

function drawbook() {
  book = new Sprite();
  bookI.resize(50, 50);
    book.addImage(bookI);
    book.diameter = 50;
    book.x = windowWidth/4;
    book.y = windowHeight/1.5-25;
    book.layer = 1;
    book.color = '#B78537';
}

function drawtrash() {
  trash = new Sprite();
  // ballI.resize(50, 50);
  //   ball.addImage(ballI);
    trash.diameter = 50;
    trash.x = windowWidth/4;
    trash.y = windowHeight-100;
    trash.color = '#817C74';
  
}

function drawcookie() {
  cookie = new Sprite();
  cookieI.resize(50, 50);
  cookie.addImage(cookieI);
    cookie.diameter = 50;
    cookie.x = windowWidth/4 +100;
    cookie.y = windowHeight/1.5-25;
    cookie.layer = 1;
    cookie.color = '#EF9F60';
}

function drawpainting() {
  painting = new Sprite();
  // ballI.resize(50, 50);
  //   ball.addImage(ballI);
	painting.x = windowWidth/2;
	painting.y = 150-45;
	painting.width = 300;
	painting.height = 150;
	painting.color = '#EF9F60';
    painting.collider = 'none';
}

function drawfly() {
  fly = new Sprite();
    fly.layer = 2;
    fly.diameter = 20;
    fly.color = '#6D6A67';
  boundry(fly);
}

function boundry() {
  ball.position.x = constrain(ball.position.x, 0, width);
  ball.position.y = constrain(ball.position.y, 0, height);
  hat.position.x = constrain(hat.position.x, 0, width);
  hat.position.y = constrain(hat.position.y, 0, height);
  book.position.x = constrain(book.position.x, 0, width);
  book.position.y = constrain(book.position.y, 0, height);
  cookie.position.x = constrain(cookie.position.x, 0, width);
  cookie.position.y = constrain(cookie.position.y, 0, height);
  frog.position.x = constrain(frog.position.x, 0, width);
  frog.position.y = constrain(frog.position.y, 0, height);
}

function setup() {
  frameRate(60);
  createCanvas(windowWidth, windowHeight);
  drawtrash();
  drawfrog();
  frog.scale = .05;
  frog.addAni('right', frogani, 1);
  drawball();
  drawhat();
  drawbook();
  drawcookie();
  drawpainting();
  drawfly();
  squareSequence();
}

async function squareSequence() {  
  await frog.moveTo(windowWidth- 100, windowHeight-(windowHeight/16));
  frog.mirror.x = true;
  await frog.moveTo(windowWidth - 150, windowHeight-(windowHeight/16+30));
  await frog.moveTo(200, windowHeight-(windowHeight/16+30));
  await frog.moveTo(150,windowHeight-(windowHeight/16))
  frog.mirror.x = false;
  squareSequence();
}

//ball.addEventListener("click", hungy());

function hungy() {
  happy += 5;
}

function draw() {
  clear();
  background(220);
  frog.ani = 'right';
  // noStroke();
  fill('white'); 
  // fly.position.x = mouseX;
  // fly.position.y = mouseY;
  boundry();
  fly.moveTowards(mouse,1);
  
  // painting.mousepressed 
  
  happy -= 1/60;

  if (fly.overlapping(book)) {
    cookie.collider = 'none';
    ball.collider = 'none';
    hat.collider = 'none';
    book.moveTowards(mouse,1);
    if (book.overlaps(trash)) {
      book.remove();
      drawbook();
      cookie.collider = 'dynamic';
      ball.collider = 'dynamic';
      hat.collider = 'dynamic';
    }
    if (book.overlaps(frog)) {
      hunger -= 10;
      happy += 5;
      book.remove();
      drawbook();
      cookie.collider = 'dynamic';
      ball.collider = 'dynamic';
      hat.collider = 'dynamic';
    }
  }
  
  if (fly.overlapping(hat)) {
    cookie.collider = 'none';
    ball.collider = 'none';
    book.collider = 'none';
    hat.moveTowards(mouse,1);
    if (hat.overlaps(trash)) {
      hat.remove();
      drawhat();
      cookie.collider = 'dynamic';
    ball.collider = 'dynamic';
    book.collider = 'dynamic';
    }
    if (hat.overlaps(frog)) {
      happy += 5;
      hat.remove();
      drawhat();
      cookie.collider = 'dynamic';
    ball.collider = 'dynamic';
    book.collider = 'dynamic';
    }
  }
  
  if (fly.overlapping(cookie)) {
    book.collider = 'none';
    ball.collider = 'none';
    hat.collider = 'none';
    cookie.moveTowards(mouse,1);
    if (cookie.overlaps(trash)) {
      cookie.remove();
      drawcookie();
      book.collider = 'dynamic';
    ball.collider = 'dynamic';
    hat.collider = 'dynamic';
    }
    if (cookie.overlaps(frog)) {
      hunger += 10;
      cookie.remove();
      drawcookie();
      book.collider = 'dynamic';
    ball.collider = 'dynamic';
    hat.collider = 'dynamic';
    }
  }
  
  if (fly.overlapping(ball)) {
    book.collider = 'none';
    cookie.collider = 'none';
    hat.collider = 'none';
    ball.moveTowards(mouse,1);
    if (ball.overlaps(trash)) {
      ball.remove();
      drawball();
      book.collider = 'dynamic';
    cookie.collider = 'dynamic';
    hat.collider = 'dynamic';
    }
    if (ball.overlaps(frog)) {
      hunger -= 10;
      happy += 5;
      ball.remove();
      drawball();
      book.collider = 'dynamic';
      cookie.collider = 'dynamic';
      hat.collider = 'dynamic';
    }
  }
 
  if (fly.overlaps(frog)) {
    hunger -= 1;
    happy += 1;
    console.log("the frog is overlapped");
  }
  
  if (fly.overlaps(trash)) {
    console.log("the trash is overlapped");
  }
  if (frog.overlaps(trash)) {
    console.log("the trash is overlapped");
  }
  
  if (happy > 100) {
    happy = 100;
  }
  if (hunger > 100) {
    hunger = 100;
  }
  
  if (happy < 0) {
    happy = 0;
  }
  if (hunger < 0) {
    hunger = 0;
  }
  
  rect(windowWidth/2+20,windowHeight/3,200,windowHeight);//Door
  rect(0,windowHeight-(windowHeight/10),windowWidth,windowHeight/10) //Floor
  ellipse(windowWidth/3,windowHeight-(windowHeight/20),300,30) //Rug
  quad(0,0,windowWidth/10,0,windowWidth/10,windowHeight-(windowHeight/10),0,windowHeight); //Left Wall
  quad((windowWidth-(windowWidth/10)), 0, windowWidth,0, windowWidth, windowHeight,windowWidth-(windowWidth/10), windowHeight-(windowHeight/10)); //Right Wall
  rect(windowWidth/5,windowHeight/2.2,200,25);  //Top Shelf
  rect(windowWidth/5,windowHeight/1.5,200,25);  //Bottom Shelf
  fill('green');
  rect(10,10,happy,25); //Happy bar
  fill('rgb(221,183,78)');
  rect(10,45,hunger,25); //Hunger Bar
  noFill();
  rect(10,10,100,25); //Happy bar outline
  rect(10,45,100,25); //Hunger Bar outline
  fill('black');
  textSize(23);
  text(Math.floor(happy), 12, 12, [100], [25]); //happy points
  text(hunger, 12, 47, [100], [25]); //hunger points  
  text("Froggy", 12, 75, [100], [25]); //Name
  //drawSprites();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


//windos local storage and store item in p5