const planets = [];

function setup() {
  canva=createCanvas(600, 600);
  canva.parent('canvas');
  planets.push(new Planet(width * 0.75, height * 0.5));
}

function mousePressed() {
  planets.push(new Planet(mouseX, mouseY));
}

function draw() {
  background(32);
  fill(255, 255, 0);
  circle(width / 2, height / 2, 50);

  for (const planet of planets) {
    planet.draw();
    for(const planetB of planets){
    planet.check(planetB);
    }
  }
}

class Planet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(1, 20);
    this.deltaX =0
    this.deltaY = 0
    this.c = color(random(100, 255), random(100, 255), random(100, 255));
  }

  draw() {
    const sunX = width / 2;
    const sunY = height / 2;
    const distanceSun = dist(this.x, this.y, sunX, sunY);
    if(distanceSun>10){
    this.deltaX += 50*(sunX - this.x) / (distanceSun*distanceSun*distanceSun);
    this.deltaY += 50*(sunY - this.y) / (distanceSun*distanceSun*distanceSun);
    }

    this.x += 0.5*this.deltaX;
    this.y += 0.5*this.deltaY;

    fill(this.c);
    ellipse(this.x, this.y, this.size);
  }
  check(planetB){
    if(dist(this.x,this.y,planetB.x,planetB.y)<5){
      return;
    }
   this.deltaX += 1*planetB.size* (planetB.x - this.x) / (dist(this.x,this.y,planetB.x,planetB.y)*dist(this.x,this.y,planetB.x,planetB.y)*dist(this.x,this.y,planetB.x,planetB.y));
   this.deltaY += 1*planetB.size*(planetB.y - this.y) / (dist(this.x,this.y,planetB.x,planetB.y)*dist(this.x,this.y,planetB.x,planetB.y)*dist(this.x,this.y,planetB.x,planetB.y));
  }
}