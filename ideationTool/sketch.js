var galleryTextedObjects = [];

var data;
var describedObjects = [];
var tNo = '2bc798650125e219377b21f6cfdf5bd5';

var obj1Img; var obj2Img; var obj3Img;
var obj1ImgUrl; var obj2ImgUrl; var obj3ImgUrl;
var mask;

var existingDescriptions = [];
var descriptions = [];
var colSize;

var numObjs;

var rs;
var contentTokens 
var nouns = []; var posNouns = [];
var adjs = []; var posAdjs = [];

var verbs = []; var posVerbs = []; var contentVbz = []; var posVbz = []; 
var vbd = []; existingVbd = []; var delDs = [];
var silentEsList; var stEs; var vrs;
var conjVbz = [];

var advs = []; var posAdvs = [];

//usually add text file of ignnored words
var ignoreList = {
	"in": true,
	"and": true,
}

function preload() {
  //data = loadJSON('testdata.json');    
  data = loadJSON('https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.objects.tags.getObjects&access_token='+tNo+'&query=3d&page=1&per_page=100');
  stEs = loadStrings('assets/silentEs.txt');
  // stEs = silentEsList.toLowerCase();  
  mask = loadImage("assets/mask.png");
}

function setup() {
	createCanvas(920, 330);

	for(i = 0; i < data.objects.length; i++){

		if(data.objects[i].description != null){

			if (existingDescriptions[data.objects[i].description] === true) {

			} else {
				// describedObjects.push(data.objects[i].description); //objects’ index of JSON, id, text
				describedObjects.push(data.objects[i]); //objects’ index of JSON, id, text
			}				
			
		}
	}
	numObjs = describedObjects.length;

	obj1 = describedObjects[int(random(numObjs))];
	obj2 = describedObjects[int(random(numObjs))];
	obj3 = describedObjects[int(random(numObjs))];

  	// Make an h2 element
  	greeting = createElement('h2', 'Object from Cooper Hewit API tagged with 3D');

  	//objects' images
  	obj1ImgUrl = obj1.images[0].sq.url;
  	obj2ImgUrl = obj2.images[0].sq.url;
  	obj3ImgUrl = obj3.images[0].sq.url;

  	obj1Img = loadImage(obj1ImgUrl);
  	obj2Img = loadImage(obj2ImgUrl);
  	obj3Img = loadImage(obj3ImgUrl);

  	obj1Img.mask(mask);
  	obj2Img.mask(mask);
  	obj3Img.mask(mask);

  	// obj1Img

  	// Make a text input field
  	in1 = createInput(obj1.description);
  	in2 = createInput(obj2.description);
  	in3 = createInput(obj3.description);
  	// input = createInput(describedObjects[42]);
  	in1.size(400);
  	in2.size(400);
  	in3.size(400);

  	// Make a submit button
  	button = createButton('submit');
 	// Here a button triggers the "hello message"
 	button.mousePressed(process);

  	// change input button ∆Console: Uncaught TypeError: fxn.bind is not a function
  	// buttonIn = createButton('change In');
  	// button.mousePressed(int(random(numObjs)));

  }

  function draw() {
  // background(0);
  image(obj1Img,0,15);
  image(obj2Img,310,15);
  image(obj3Img,620,15);

}

function process() {
	var sentence1 = in1.value();
	var sentence2 = in2.value();
	var sentence3 = in3.value();
	rs1 = new RiString(sentence1);
	rs2 = new RiString(sentence2);
	rs3 = new RiString(sentence3);

	vrs = new RiString(stEs);

  // createP("Parts of object's description: " + rs.get('pos'));
  console.log(rs1.get('pos'));
  console.log(rs2.get('pos'));
  console.log(rs3.get('pos'));  

  contentTokens1 = RiTa.tokenize(rs1._features.tokens);
  contentTokens2 = RiTa.tokenize(rs2._features.tokens);
  contentTokens3 = RiTa.tokenize(rs3._features.tokens);  

  var posTokens1 = rs1.get('pos').split(' ');
  var posTokens2 = rs2.get('pos').split(' ');
  var posTokens3 = rs3.get('pos').split(' ');


  console.log(vrs.get('pos'));
  silentEsTokens = RiTa.tokenize(vrs._features.tokens);
  var posStEs = vrs.get('pos');

  // console.log(posTokens);
  // console.log(contentTokens);

  for (var i = 0; i < contentTokens1.length; i++ ){

  	if (ignoreList[contentTokens1[i]]) {
  		// do nothing 
  	} else {

  		//all nouns
  		if (/^nn/.test(posTokens1[i])) {
  		// if (posTokens[i] == 'nn' || posTokens[i] == 'nns') {
  			nouns.push(contentTokens1[i]);
  			posNouns.push(posTokens1[i]);
  		}

  		//all adjectives
  		if (/^jj/.test(posTokens1[i])){
  			adjs.push(contentTokens1[i]);
  			posAdjs.push(posTokens1[i]);
  		}

  		//all verbs
  		if (/^vb/.test(posTokens1[i])){
  			verbs.push(contentTokens1[i]);
  			posVerbs.push(posTokens1[i]);
  			if (posTokens1[i] == 'vbz'){
  				contentVbz.push(contentTokens1[i]);
  				posVbz.push(posTokens1[i]);
  			}
  			//past tense verbs 
  			if (/ed\b/.test(contentTokens1[i])){ 
  				if(existingVbd === true){
  					//do nothing (NOT working)
  				} else {			
  					vbd.push(contentTokens1[i]);  				
  				}
  				if(vbd[i]>0){ //can a callback be avoided through a conditional where the array has stop "filling" (push has stopped?)
	  				//DELETE all Ds  				
	  				// delDs.push(vbd[0].replace(/d$/, ''));
	  				// delDs.push(vbd[i].replace(/d$/, ''));
	  				// delDs.push(vbdD);

	  				// console.log(delDs);
	  				//loop through the stEs string array
		  				//if silent e == true (delDs[i] matches all words stEs[i])
		  					//ADD s
		  				//else DELETE Es 
			  				//if ENDS (SS,X,CH,SH,O)
			  					//ADD es
			  				//else if ENDS (Consonant + Y)
			  					//DELETE y ADD ies
			  				//else ADD s
			  			}	
			  		}  			
			  	}

  		//all adverbs
  		// if (/^rb/.test(posTokens[i])){
  		// 	advs.push(contentTokens[i]);
  		// 	posAdvs.push(posTokens[i]);
  		// }

  		//all prepositions or subordinating conjunction
  		// if (posTokens[i] == 'in' || posTokens[i] == 'cc'){
  		// }

  	}
  }

  for (var i = 0; i < contentTokens2.length; i++ ){

  	if (ignoreList[contentTokens2[i]]) {
  		// do nothing 
  	} else {

  		//all nouns
  		if (/^nn/.test(posTokens2[i])) {
  		// if (posTokens[i] == 'nn' || posTokens[i] == 'nns') {
  			nouns.push(contentTokens2[i]);
  			posNouns.push(posTokens2[i]);
  		}

  		//all adjectives
  		if (/^jj/.test(posTokens2[i])){
  			adjs.push(contentTokens2[i]);
  			posAdjs.push(posTokens2[i]);
  		}

  		//all verbs
  		if (/^vb/.test(posTokens2[i])){
  			verbs.push(contentTokens2[i]);
  			posVerbs.push(posTokens2[i]);
  			if (posTokens2[i] == 'vbz'){
  				contentVbz.push(contentTokens2[i]);
  				posVbz.push(posTokens2[i]);
  			}
  			//past tense verbs 
  			if (/ed\b/.test(contentTokens2[i])){ 
  				if(existingVbd === true){
  					//do nothing (NOT working)
  				} else {			
  					vbd.push(contentTokens2[i]);  				
  				}
  				if(vbd[i]>0){ //can a callback be avoided through a conditional where the array has stop "filling" (push has stopped?)
	  				//DELETE all Ds  				
	  				// delDs.push(vbd[0].replace(/d$/, ''));
	  				// delDs.push(vbd[i].replace(/d$/, ''));
	  				// delDs.push(vbdD);

	  				// console.log(delDs);
	  				//loop through the stEs string array
		  				//if silent e == true (delDs[i] matches all words stEs[i])
		  					//ADD s
		  				//else DELETE Es 
			  				//if ENDS (SS,X,CH,SH,O)
			  					//ADD es
			  				//else if ENDS (Consonant + Y)
			  					//DELETE y ADD ies
			  				//else ADD s
			  			}	
			  		}  			
			  	}

  		//all adverbs
  		// if (/^rb/.test(posTokens[i])){
  		// 	advs.push(contentTokens[i]);
  		// 	posAdvs.push(posTokens[i]);
  		// }

  		//all prepositions or subordinating conjunction
  		// if (posTokens[i] == 'in' || posTokens[i] == 'cc'){
  		// }

  	}
  }

  for (var i = 0; i < contentTokens3.length; i++ ){

  	if (ignoreList[contentTokens3[i]]) {
  		// do nothing 
  	} else {

  		//all nouns
  		if (/^nn/.test(posTokens3[i])) {
  		// if (posTokens[i] == 'nn' || posTokens[i] == 'nns') {
  			nouns.push(contentTokens3[i]);
  			posNouns.push(posTokens3[i]);
  		}

  		//all adjectives
  		if (/^jj/.test(posTokens3[i])){
  			adjs.push(contentTokens3[i]);
  			posAdjs.push(posTokens3[i]);
  		}

  		//all verbs
  		if (/^vb/.test(posTokens3[i])){
  			verbs.push(contentTokens3[i]);
  			posVerbs.push(posTokens3[i]);
  			if (posTokens1[i] == 'vbz'){
  				contentVbz.push(contentTokens3[i]);
  				posVbz.push(posTokens3[i]);
  			}
  			//past tense verbs 
  			if (/ed\b/.test(contentTokens3[i])){ 
  				if(existingVbd === true){
  					//do nothing (NOT working)
  				} else {			
  					vbd.push(contentTokens3[i]);  				
  				}
  				if(vbd[i]>0){ //can a callback be avoided through a conditional where the array has stop "filling" (push has stopped?)
	  				//DELETE all Ds  				
	  				// delDs.push(vbd[0].replace(/d$/, ''));
	  				// delDs.push(vbd[i].replace(/d$/, ''));
	  				// delDs.push(vbdD);

	  				// console.log(delDs);
	  				//loop through the stEs string array
		  				//if silent e == true (delDs[i] matches all words stEs[i])
		  					//ADD s
		  				//else DELETE Es 
			  				//if ENDS (SS,X,CH,SH,O)
			  					//ADD es
			  				//else if ENDS (Consonant + Y)
			  					//DELETE y ADD ies
			  				//else ADD s
			  			}	
			  		}  			
			  	}

  		//all adverbs
  		// if (/^rb/.test(posTokens[i])){
  		// 	advs.push(contentTokens[i]);
  		// 	posAdvs.push(posTokens[i]);
  		// }

  		//all prepositions or subordinating conjunction
  		// if (posTokens[i] == 'in' || posTokens[i] == 'cc'){
  		// }

  	}

  	var args = {
  		tense: RiTa.PRESENT_TENSE,
  		number: RiTa.SINGULAR,
  		person: RiTa.THIRD_PERSON
  	};
  	conjVbz = RiTa.conjugate(verbs[2],args)
  	// conjVbz.push(RiTa.conjugate(verbs[i],args));

  }

  // delDs = vbd[i].replace(/d\b/gmi, '');

  createP('This could be a ' + 
  	adjs[int(random(adjs.length))] + ' ' +
  	nouns[int(random(nouns.length))] + ' that ' +
  	verbs[int(random(verbs.length))]);

  //var par = createP('hello '+ name + '!');
}

function deleteDsVb(vbdD){
	setTimeOut(delDs, 10);
	function deleteDs(){
		vbd[0].substring(0, str.length - 1);
	}
}