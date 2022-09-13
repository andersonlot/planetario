class Bolinha {
  constructor(px, py, raio, colorR, colorG, colorB) {
    this.p = createVector(px, py);
    this.v = createVector(0, 0);
    this.a = createVector(0, 0);
    this.raio = raio;
    this.colorR = colorR;
    this.colorG = colorG;
    this.colorB = colorB;
    this.mass = 0.005*30;
  }
  desenhar() {
    fill(this.colorR, this.colorG, this.colorB);
    noStroke();
    circle(this.p.x, this.p.y, this.raio);
  }
  atualizar() {
    this.p.add(this.v);
    this.v.add(this.a);
  }
  colidir_bordas(largura, altura, fator_restaura) {
    if (this.p.x >= largura) {
      this.v.x = -fator_restaura * this.v.x;
      this.p.x = largura;
    }
    if (this.p.x <= 0) {
      this.v.x = -fator_restaura * this.v.x;
      this.p.x = 0;
    }
    if (this.p.y >= altura) {
      this.v.y = -fator_restaura * this.v.y;
      this.p.y = altura;
    }
    if (this.p.y <= 0) {
      this.v.y = -fator_restaura * this.v.y;
      this.p.y = 0;
    }
  }
}

function setup() {
  frameRate(30);
  larg = 600;
  altu = 600;
  G = 9.8;
  canva=createCanvas(larg, altu);
  canva.parent('canvas');
  B = [];
  numero = 20;
  for (i = 0; i < numero; i++) {
    B[i] = new Bolinha(
      random(100, larg - 100),
      random(100, altu - 100),
      30 * random(0.1, 1) * random(0.1, 1),
      random(0, 255),
      random(0, 255),
      random(0, 255)
    );
  }
}

trans=200;

function draw() {
  B[0].p.x=mouseX;
  B[0].p.y=mouseY;
  B[0].mass=30;
   B[0].raio=100;
  
  
  
  background(0,trans);

  
  massatotal = 0;
  massa=createVector(0,0);
  
  for (i = 0; i < numero; i++) {
    massatotal = massatotal + B[i].mass;
    let p_0 =B[i].p.copy(); 
    let p_1=p_0.mult(B[i].mass);
    massa.add(p_1);
  }
  cm = massa.mult(1/massatotal);

  for (i = 0; i < numero; i++) {
    B[i].desenhar();
    B[i].atualizar();
    B[i].colidir_bordas(larg, altu, 0.5);
    Fx = 0;
    Fy = 0;
    for (j = 0; j < numero; j++) {
      if (i == j) {
      } else {
        Fx =
          Fx +
          (B[i].mass * B[j].mass * G * (B[j].p.x - B[i].p.x)) /
            sqrt(
              (B[j].p.x - B[i].p.x) * (B[j].p.x - B[i].p.x) +
                (B[j].p.y - B[i].p.y) * (B[j].p.y - B[i].p.y)
            );
        Fy =
          Fy +
          (B[i].mass * B[j].mass * G * (B[j].p.y - B[i].p.y)) /
            sqrt(
              (B[j].p.y - B[i].p.y) * (B[j].p.y - B[i].p.y) +
                (B[j].p.x - B[i].p.x) * (B[j].p.x - B[i].p.x)
            );
      }
    }
    B[i].a.x = (0.001 * Fx) / B[i].mass;
    B[i].a.y = (0.001 * Fy) / B[i].mass;
  }
  fill("red");
  //square(cm.x-10,cm.y-10, 20);
}
