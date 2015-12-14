// Time functions
var StartTime = function() {

	//amplitude = new p5.Amplitude();

	this.display = function(){
		//song amplitude
		//var level = 1;
		var level = amplitude.getLevel();
  		var size = map(level, 0, 1, 0, width/4);

		// Update Clock
		today=new Date();
		h=today.getHours();
		m=checkTime(today.getMinutes());
		s=checkTime(today.getSeconds());

		//clock frame
		var x= width/2;
		var y= height/2.4;
		var clockFrame = width/1.5+size; 
		var radInner = width/3.45;
		var radOuter = width/3.1+size;		

		noFill();
		stroke(255);    
		strokeWeight(.75);
		// console.log(clockFrame);
		ellipse (x, y, clockFrame, clockFrame);		            

		//reference –background– lines for hours
		for (var ang = -90; ang < 360; ang+= 60) {
			line(radInner * cos(radians(ang)) + x, radInner* sin(radians(ang)) + y, 
				radOuter * cos(radians(ang)) + x, radOuter* sin(radians(ang)) + y);
		}

		noStroke();
		strokeWeight(.75);

		//minutes    
		fill(255,122);
		var arcMnt = map(m, 0, 59, -90, 264);
		arc(x, y, clockFrame-width/16, clockFrame-width/16, -HALF_PI, radians(arcMnt));

		//secs
		var movSec = map(s, 0, 59, -0, 354);
		push();
		translate(x, y);
		rotate(radians(movSec));
		triangle((0-width/28), (-(width/4.5)-width/28), 0, -(width/3.6), (0+width/28), 
			(-(width/4.5)-width/28));    
		pop();

		//hour
		fill(255,0,55);
		var radius = width/5;
		ellipse(radius * cos((h + m/60.0) % 12 * TWO_PI/12 - HALF_PI) + x, 
			radius * sin((h + m/60.0) % 12 * TWO_PI/12 - HALF_PI) + y, width/21, width/21);

		//PALINDROME variable
		var pal = m % 10;
		// console.log(h+":"+m+"\tT:"+t);
		
		//PALINDROME EVENTS
		
		//Military Display
		if((h==13 && m==31) || (h==14 && m==41) || (h==15 && m==51) ||
			(h==20 && m==02)|| (h==21 && m==12) || (h==24 && m==42)){
			h=today.getHours();
		} else {
			h=today.getHours() % 12;
		}
		// trigger event
		if((h==pal || h==m) || (h==12 && m==21) || 
			(h==11 && m==11)|| (h==10 && m==01) ||
			(h==13 && m==31)|| (h==14 && m==41) || (h==15 && m==51) ||
			(h==20 && m==02)|| (h==21 && m==12) || (h==24 && m==42)){

			orbit = true;
			startSong = true;

			fill(38,121);
			textLeading(width/12);
			textSize(width/18);
			textAlign(CENTER);
			text(nf(h)+":"+nf(m),width/2,height/1.1);					
		} else {
			orbit =false;
			startSong = false;
			stopSong = true;
		}		
	}

}				


function checkTime(i) {
	if (i<10) {i = "0" + i};  // add zero in front of numbers < 10
	return i;
}