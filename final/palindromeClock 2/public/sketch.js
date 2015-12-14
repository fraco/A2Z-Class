
var sound, amplitude;

function preload(){
  sound = loadSound('assets/elPescador.mp3');
}

//type string
var ph = ["00:00","12:21","11:11","10:01"];

var clock;

//orbiting mesh
var num = 50; 
var frames = 240;
var orbs = [];
var theta = 0.0001;
var orbit = false;
var startSong = false;
var stopSong = false;

var debugSong = false;

var fimages = [];
var img;
var backimg;
var imgW;

$(document).ready(function () {
    $.getJSON("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=dcf9928f6cdba4a8a9210c8df2c8dbc7&tags=symmetry&format=json&nojsoncallback=1&auth_token=72157662313929876-be97a07667316c3f&api_sig=9b515034dbb4521d54d69b0ccb935b90", displayImages1)

    function displayImages1(data) {

        $.each(data.photos.photo, function (i, item) {

            var photoURL = 'http://farm' + item.farm + '.static.flickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_b.jpg';

            fimages.push(photoURL);

        });
        return fimages;
    }
});

function setup(){	
	c = createCanvas(windowWidth/2, windowHeight);  
  	c.position(windowWidth/2-width/2, windowHeight/2-height/2);

  	var arrimgs = fimages.length;
  	var ranindex = floor(random(arrimgs));
  	img = fimages[ranindex];
  	backimg = loadImage(img);
  	// imgW = backimg.width;

  	amplitude = new p5.Amplitude();

	for (var i=0; i<74; i++) {
		var d = 150;
		var x = width/2 + cos(TWO_PI/num*i)*d;
		var y = height/2 + sin(TWO_PI/num*i)*d;
		orbs[i] = new Orb(x,y, random(10, 20));
	}

	clock = new StartTime();
	//sound.play();

}

function mousePressed() {
	// debugSong = !debugSong;
	// console.log(debugSong);
}

function draw(){
	// imgW = backimg.width;
	background(255);
	image(backimg, -backimg.width/2, 0);
	//orbiting mesh	
	if(orbit==true){
		
		push();
		translate(width/2,height/2.4);
		for (var i=0; i<orbs.length; i++) {
			orbs[i].run();    
		}
		theta += TWO_PI/frames;
		pop();
	}

	if((debugSong == true || startSong == true) && sound.isPlaying() == false){
		sound.play();		
	} 
	// else if (stopSong){
	// 	sound.stop();
	// stopSong = false;
	// }

	//console.log(amplitude.getLevel());
	
	clock.display();
	//console.log(startSong);	
}

function windowResized() {  
  c.position(windowWidth/2-width/2, windowHeight/2-height/2);
}
