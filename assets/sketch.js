const planets = [];
const max=60;
var sunImg;

var newPlanetSize = 20;

function preload(){
  sunImg= loadImage("https://andersonlot.github.io/planetario/assets/sun_image.png");
}
function setup() {
  canva=createCanvas(600, 600);
  canva.parent('canvas');
  planets.push(new Planet(width * 0.75, height * 0.5,20));
  sun=new Planet(width/2,height/2,1);
  sun.c="#FFEE00";
  sun.mass = 5000;
  sun.deltaX=0;

}
var angle_sun=0;
function draw() {
  strokeWeight(2);
  stroke(0,50);
  angle_sun+=0.0005;
  //clear();
  background(15,16+1,16+7);
  push();
  translate(width / 2, height / 2);
  rotate(angle_sun);
  sunImg.resize(200,200);
  image(sunImg,-100,-100);
  pop();
  for (const planet of planets) {
    planet.draw();
    planet.check(sun);
    //sun.check(planet);
    for(const planetB of planets){
    planet.check(planetB);
    
    }
  }
  push();
  stroke(255,100);
  strokeWeight(5);
  noFill();
  rect(0,0,width,height);
  pop();

  push();
  noFill();
  stroke(255,50);
  drawingContext.setLineDash([newPlanetSize*0.05])
  strokeWeight(3);
  circle(mouseX, mouseY,newPlanetSize/2);
  pop();
}

function mousePressed() {
  planets.push(new Planet(mouseX, mouseY,newPlanetSize));
  if(planets.length>max){
    planets.shift();
  }
}

class Planet {
  constructor(x, y,size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.mass= this.size*this.size*this.size*0.008;
    this.deltaX = 0; 
    this.deltaY = 7;
    this.c = color(random(100, 255), random(100, 255), random(100, 255));
  }

  draw() {

    this.x += 1*0.2*this.deltaX;
    this.y += 1*0.2*this.deltaY;

    fill(this.c);
    ellipse(this.x, this.y, this.size/2);
  }
  check(planetB){
    if(dist(this.x,this.y,planetB.x,planetB.y)<20){
      return;
    }
   this.deltaX += 50 * 0.01 * planetB.mass * (planetB.x - this.x) / (dist(this.x,this.y,planetB.x,planetB.y)*dist(this.x,this.y,planetB.x,planetB.y)*dist(this.x,this.y,planetB.x,planetB.y));
   this.deltaY += 50 * 0.01 * planetB.mass * (planetB.y - this.y) / (dist(this.x,this.y,planetB.x,planetB.y)*dist(this.x,this.y,planetB.x,planetB.y)*dist(this.x,this.y,planetB.x,planetB.y));
  }
}

function mouseWheel(event) {
  if ( mouseX>0 && mouseY>0 && mouseX<width && mouseY<height){
  print(event.delta);
  newPlanetSize += 0.1*event.delta;
  return false;
  }
  return true;
}