var galleryTextedObjects = [];

var data;
var describedObjects = [];
var tNo = '2bc798650125e219377b21f6cfdf5bd5';

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
}

function setup() {
	noCanvas();

	for(i = 0; i < data.objects.length; i++){

		if(data.objects[i].description != null){

			if (existingDescriptions[data.objects[i].description] === true) {

			} else {
				describedObjects.push(data.objects[i].description); //objects’ index of JSON, id, text
			}				
			
		}
	}

	numObjs = describedObjects.length;

  	// Make an h2 element
  	greeting = createElement('h2', 'Object from Cooper Hewit API tagged with 3D');
  	// Make a text input field
  	// input = createInput(describedObjects[int(random(numObjs))]);
  	input = createInput(describedObjects[42]);
  	input.size(400);
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

}

function process() {
	var sentence = input.value();
	rs = new RiString(sentence);
	vrs = new RiString(stEs);

  // createP("Parts of object's description: " + rs.get('pos'));
  console.log(rs.get('pos'));
  console.log(vrs.get('pos'));

  contentTokens = RiTa.tokenize(rs._features.tokens);
  silentEsTokens = RiTa.tokenize(vrs._features.tokens);

  var posTokens = rs.get('pos').split(' ');
  var posStEs = rs.get('pos');

  var lexicon = new RiLexicon();

  // console.log(posTokens);
  // console.log(contentTokens);

  for (var i = 0; i < contentTokens.length; i++ ){

  	if (ignoreList[contentTokens[i]]) {
  		// do nothing 
  	} else {

  		//all nouns
  		if (/^nn/.test(posTokens[i])) {
  		// if (posTokens[i] == 'nn' || posTokens[i] == 'nns') {
  			nouns.push(contentTokens[i]);
  			posNouns.push(posTokens[i]);
  		}
  		//all adjectives
  		if (/^jj/.test(posTokens[i])){
  			adjs.push(contentTokens[i]);
  			posAdjs.push(posTokens[i]);
  		}
  		//all verbs
  		if (/^vb/.test(posTokens[i])){
  			verbs.push(contentTokens[i]);
  			posVerbs.push(posTokens[i]);
  			if (posTokens[i] == 'vbz'){
  				contentVbz.push(contentTokens[i]);
  				posVbz.push(posTokens[i]);
  			}
  			//past tense verbs 
  			if (/ed\b/.test(contentTokens[i])){ 
  				if(existingVbd === true){
  					//do nothing (NOT working)
  				} else {			
  					vbd.push(contentTokens[i]);  				
  				}
  				if(vbd[i]>0){ //can a callback be avoided through a conditional where the array has stop "filling" (push has stopped?)
	  				//DELETE all Ds  				
	  				// delDs.push(vbd[0].replace(/d$/, ''));
	  				// delDs.push(vbd[i].replace(/d$/, ''));
	  				delDs.push(vbdD);

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
  			//
  		}
  		//all adverbs
  		if (/^rb/.test(posTokens[i])){
  			advs.push(contentTokens[i]);
  			posAdvs.push(posTokens[i]);
  		}
  		//all prepositions or subordinating conjunction
  		if (posTokens[i] == 'in' || posTokens[i] == 'cc'){

  		}

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

  createP('This could be a '+	adjs[int(random(adjs.length))]+ ' ' +
  	nouns[int(random(nouns.length))]+' that '+
  	verbs[int(random(verbs.length))]);

  //var par = createP('hello '+ name + '!');
}

function deleteDsVb(vbdD){
	setTimeOut(delDs, 10);
	function deleteDs(){
	vbd[0].substring(0, str.length - 1);
	}
}