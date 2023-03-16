let frog,ball,hat,cookie,book,painting;
let frogani;
let happy = 100;
let hunger = 100;
let grab = 'false';
let collisionTime = 0;
let button;
let guide;
let name;
let playbutton;
let isPlaying = false;
let item = 0;

function preload() {
  frogsong = loadSound('images/Frogsong.mp3');
  frogani = loadAnimation('images/Frogr1.png', 2);
  froganiH = loadAnimation('images/FHat1.png', 2);
  froganiBo = loadAnimation('images/FBook1.png', 2);
  froganiBa = loadAnimation('images/FBall1.png', 2);
  froganiC = loadAnimation('images/FCookie1.png', 2);
  frogani.frameDelay = 10;
  froganiH.frameDelay = 10;
  froganiBo.frameDelay = 10;
  froganiBa.frameDelay = 10;
  froganiC.frameDelay = 10;
  ballI = loadImage('images/Ball.png');
  hatI = loadImage('images/Hat.png');
  bookI = loadImage('images/Book.png');
  cookieI = loadImage('images/Cookie.png');
  wall = loadImage('images/Wall.png');
  trashI = loadImage('images/Trash.png');
  door = loadImage('images/Door.png');
  shelf = loadImage('images/Shelf.png');
  apple = loadImage('images/apple.png');
  smile = loadImage('images/Happy.png');
  swall = loadImage('images/sWall.png');
  flyI = loadImage('images/Fly1.png');
  paintI = loadImage('https://picsum.photos/200/300');
}

function playMusic() {
  if (isPlaying) {
    frogsong.stop();
    isPlaying = false;
    playButton.html('🔈');
  } else {
    frogsong.loop();
    isPlaying = true;
    frogsong.setVolume(0.25);
    playButton.html('🔊');
  }
}


function guidetext() {
  alert('🐸Welcome to your Frog Friend!🐸\nOver time their happiness and hunger will go down.\nBalance feeding and playing with them to keep them satisfied by hovering and dragging items from the shelves to your froggy pal or try petting them!\nIf you pick up the wrong one drag it to the trash can. That is all you have to do to care for your froggy friend. Also, Rename them with the button next to their name!');
}

function changeName() {
  let newName = prompt("Enter a new name:");
  
  if (newName != null && newName != "") {
    storeItem('name', newName);
    name = newName;
  }
}

function drawfrog() {
  frog = new Sprite();
  frog.scale = .05;
  frog.addAni('right', frogani, 1);
  frog.addAni('hat', froganiH, 1);
  frog.addAni('book', froganiBo, 1);
  frog.addAni('ball', froganiBa, 1);
  frog.addAni('cookie', froganiC, 1);

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
    ball.x = windowWidth/5 + 55;
    ball.y = windowHeight/2.2-25;
    ball.color = '#F44336';
    ball.layer = 1;
}

function drawhat() {
  hat = new Sprite();
  hatI.resize(50, 50);
  hat.addImage(hatI);
    hat.diameter = 50;
    hat.x = windowWidth/5 + (200-55);
    hat.y = windowHeight/2.2-25;
    hat.color = '#3668F4';
    hat.layer = 1;
}

function drawbook() {
  book = new Sprite();
  bookI.resize(50, 50);
    book.addImage(bookI);
    book.diameter = 50;
    book.x = windowWidth/5 + 55;
    book.y = windowHeight/1.5-25;
    book.layer = 1;
    book.color = '#B78537';
}

function drawtrash() {
  trash = new Sprite();
  trashI.resize(70, 70);
  trash.addImage(trashI);
    trash.diameter = 60;
    trash.x = windowWidth- (windowWidth/4);
    trash.y = windowHeight-100;
    trash.color = '#817C74';
  
}

function drawcookie() {
  cookie = new Sprite();
  cookieI.resize(50, 50);
  cookie.addImage(cookieI);
    cookie.diameter = 50;
    cookie.x = windowWidth/5 + (200-55);
    cookie.y = windowHeight/1.5-25;
    cookie.layer = 1;
    cookie.color = '#EF9F60';
}

function drawpainting() {
  painting = new Sprite();
  paintI.resize(300, 150);
  painting.addImage(paintI);
	painting.x = windowWidth/2;
	painting.y = 150-45;
	painting.width = 300;
	painting.height = 150;
	painting.color = '#EF9F60';
    painting.collider = 'none';
    painting.layer = 1;
}

function drawfly() {
  fly = new Sprite();
    fly.scale = .015;
    fly.addImage(flyI);
    fly.layer = 2;
    fly.diameter = 50;
    fly.color = '#6D6A67';
}

function boundry() {
  ball.position.x = constrain(ball.position.x, 25, width-25);
  ball.position.y = constrain(ball.position.y, 25, height-25);
  hat.position.x = constrain(hat.position.x, 25, width-25);
  hat.position.y = constrain(hat.position.y, 25, height-25);
  book.position.x = constrain(book.position.x, 25, width-25);
  book.position.y = constrain(book.position.y, 25, height-25);
  cookie.position.x = constrain(cookie.position.x, 25, width-25);
  cookie.position.y = constrain(cookie.position.y, 25, height-25);
  frog.position.x = constrain(frog.position.x, 25, width-25);
  frog.position.y = constrain(frog.position.y, 25, height-25);
}

function setup() {
  noCursor();
  frameRate(60);
  createCanvas(windowWidth, windowHeight);
  button = createButton('📝');
  button.position(110, 13);
  button.mousePressed(changeName);
  playButton = createButton('🎵');
  playButton.size(35,30)
  playButton.position(windowWidth-40, 13);
  playButton.mousePressed(playMusic);
  guide = createButton('📔');
  guide.size(35,30)
  guide.position(windowWidth-40, 48);
  guide.mousePressed(guidetext);
  name = getItem('name');
   if (name === null) {
     name = 'Froggy';
   }
  drawtrash();
  drawfrog();
  frog.changeAnimation('right');
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

function Fchange(item) {
  if (item === hat) {
    collisionTime = millis();
    frog.changeAnimation('hat');
  }
  if (item === book) {
    collisionTime = millis();
    frog.changeAnimation('book');
  }
  if (item === ball) {
    collisionTime = millis();
    frog.changeAnimation('ball');
  }
  if (item === cookie) {
    collisionTime = millis();
    frog.changeAnimation('cookie');
  }
}

function draw() {
  clear();
  image(wall, 0, 0, windowWidth, windowHeight);
  if (millis() - collisionTime > 5000) {
    frog.changeAnimation('right');
  }
  fill('white'); 
  boundry();
  fly.moveTowards(mouse,1);
  
  happy -= 1/60;
  hunger -= 1/180;

  if (fly.overlapping(book)) {
    cookie.collider = 'none';
    ball.collider = 'none';
    hat.collider = 'none';
    book.moveTowards(mouse,1);
    if (book.overlaps(trash)) {
      hunger -= 1;
      book.remove();
      drawbook();
      cookie.collider = 'dynamic';
      ball.collider = 'dynamic';
      hat.collider = 'dynamic';
    }
    if (book.overlaps(frog)) {
      hunger -= 10;
      happy += 10;
      book.remove();
      drawbook();
      Fchange(book);
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
      hunger -= 1;
      hat.remove();
      drawhat();
      cookie.collider = 'dynamic';
    ball.collider = 'dynamic';
    book.collider = 'dynamic';
    }
    if (hat.overlaps(frog)) {
      happy += 5;
      hunger -= 3;
      hat.remove();
      drawhat();
      Fchange(hat);
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
      hunger -= 1;
      cookie.remove();
      drawcookie();
      book.collider = 'dynamic';
    ball.collider = 'dynamic';
    hat.collider = 'dynamic';
    }
    if (cookie.overlaps(frog)) {
      hunger += 10;
      happy += 2;
      cookie.remove();
      drawcookie();
      Fchange(cookie);
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
      hunger -= 1;
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
      Fchange(ball);
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
  
  image(door, windowWidth/2+20, (windowHeight-(windowHeight/10) -315), 200, windowHeight/1.75, 0, 0, door.width, door.height, CONTAIN, LEFT);

  fill('white');
  image(swall, 0, 0, windowWidth/10, windowHeight); //Left Wall
  image(swall, (windowWidth-(windowWidth/10)), 0, windowWidth/10, windowHeight); //Right Wall
  fill(color('#F1E077'));
  quad(windowWidth/10,windowHeight-(windowHeight/10),(windowWidth-(windowWidth/10)),windowHeight-(windowHeight/10), windowWidth,windowHeight,0,windowHeight); //Floor
  fill('green');
  ellipse(windowWidth/3,windowHeight-(windowHeight/20),300,30) //Rug
  image(shelf, windowWidth/5, windowHeight/2.2, 200, 25);
  image(shelf, windowWidth/5, windowHeight/1.5, 200, 25);
  noStroke();
  fill('white');
  rect(7,9,140,100,10); //Stat BG
  fill('green');
  rect(40,45,happy,25,5); //Happy bar
  image(smile, 10, 45, 25, 25); //Smile
  fill('rgb(221,183,78)');
  rect(40,75,hunger,25,5); //Hunger Bar
  noFill();
  stroke('black')
  strokeWeight(1);
  rect(40,45,100,25,5); //Happy bar outline
  rect(40,75,100,25,5); //Hunger Bar outline
  image(apple, 10, 75, 25, 25); //Apple
  fill('black');
  textSize(23);
  noStroke();
  text(Math.floor(happy), 42, 46, [100], [25]); //happy points
  text(Math.floor(hunger), 42, 77, [100], [25]); //hunger points  
  text(name, 12, 15, [100], [25]); //Name
  drawSprites();
  noFill();
  stroke(color('#BD8B32'));
  strokeWeight(10);
  rect(windowWidth/2-150,150-45-75,300,150,10);

  noStroke();
  textSize(15);
  if (happy > 50) {
    fill(color('#95F192'));
    rect(7,115,110,44,10);
    fill('black');
    text("I'm having fun right now!", 12, 120, [100], [25]); 
  }
  if (happy < 50 && happy > 25 ) {
    fill(color('#F1ED92'));
    rect(7,115,110,44,10); 
    fill('black');
    text("I want to do something", 12, 120, [100], [25]); 
  }
  if (happy < 25 && happy != 0) {
    fill(color('#F1C392'));
    rect(7,115,110,25,10); 
    fill('black');
    text("I'm bored", 12, 120, [100], [25]); 
  }
  if (happy < 1) {
    fill(color('#F1AA92'));
    rect(7,115,110,44,10); 
    fill('black');
    text("This place sucks", 12, 120, [100], [25]); 
  }

  if (hunger < 50 && hunger > 25 ) {
    fill(color('#F1ED92'));
    rect(7,165,110,44,10); 
    fill('black');
    text("I'm Getting hungry :(", 12, 170, [100], [25]); 
  }
  if (hunger < 25 && hunger != 0) {
    fill(color('#F1C392'));
    rect(7,165,110,25,10); 
    fill('black');
    text("Feed me ;-;", 12, 170, [100], [25]); //Name
  }
  if (hunger < 1) {
    fill(color('#F1AA92'));
    rect(7,165,110,25,10); 
    fill('black');
    text("I'm starving", 12, 170, [100], [25]); //Name
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}