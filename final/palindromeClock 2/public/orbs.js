//translated from Jorome Herr's "entangled orbs" Processing sketch

function Orb (x, y, sz){

  //this.amplitude = new p5.Amplitude();

  this.x = 0;
  this.y = 0;
  this.sz = sz;    
  this.offSet = random(TWO_PI);
  this.radius = random(20,150);
  this.dir = random(-.5,1.5); /* >.5?1:-1; */
  this.currentOrb;
  this.col = 255;
  //replacing: >.5?1:-1;
  if(this.dir>.75){
  	dir = 1.5;
  }else{
  	dir = -1.5;
  }


  this.run = function() {
    //song
    this.level = amplitude.getLevel();
    //this.level = 1;
    this.size = map(this.level, 0, 1, 0, 6);
    //console.log(this.size());
    this.update();
    this.showLines();
    this.display();
  }
  this.update = function() {
    var vari = map(sin(theta),-1,1,1.2,3.6);    
    this.px = this.x + cos(theta*this.dir+this.offSet)*this.radius*vari;
    this.py = this.y + sin(theta*this.dir+this.offSet)*this.radius*vari;
    // console.log(this.px, this.py, vari);
  }
  this.showLines = function() {
    for (var i=0; i<orbs.length; i++) {
      this.currentOrb = i;
      var distance = dist(this.px, this.py, orbs[i].px, orbs[i].py);
      if (distance>0 && distance<100) {
        stroke(255, 50);
        line(this.px, this.py, orbs[i].px, orbs[i].py);
        // console.log(px,py,this.px, this.py, scal, scal);
      }
    }
  }
  this.display = function() {
    this.glowThing();
  }
  this.glowThing = function() {
    noStroke();
    for (var i=0; i<12; i++) {      
      this.col = 255;
      fill(this.col, 55+180.0/7*i);
      var scal = map(i, 0, 6, 1.2, .6)*(this.sz+this.size);
      ellipse(this.px, this.py, scal, scal);
      // console.log(this.px, this.py, scal, scal);
    }
  }
}