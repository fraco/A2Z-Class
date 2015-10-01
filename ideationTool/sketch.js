var galleryTextedObjects = [];

var data;
var repeatedDescription = [];
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
var advs = []; var posAdvs = [];

//usuallt add text file of ignnored words
var ignoreList = {
	"in": true,
	"and": true,
}

function preload() {
  //data = loadJSON('testdata.json');    
  data = loadJSON('https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.objects.tags.getObjects&access_token='+tNo+'&query=3d&page=1&per_page=100')
}

function setup() {
	noCanvas();

	for(i = 0; i < data.objects.length; i++){

		if(data.objects[i].description != null){

			if (existingDescriptions[data.objects[i].description] === true) {

			} else {
				describedObjects.push(data.objects[i].description); //objects’ index of JSON, id, text
				// existingDescriptions[data.objects[i].description] = true;
				// // if (existingDescriptions[i] = true){
				// 	descriptions.push(existingDescriptions[i]);
				// // }	
			}				
			
		}
		// if(data.objects[i].description == 'Sixty-eight blocks used for printing the textile "Flowers after Van Huysum," designed by Harry Wearne. The textile was printed by Stead McAlpin and Company Limited, Cummersdale near Carlisle, England. Although printed in England, the design was confined to the American market and did not become available worldwide until 1949. The minimum unit of the completed pattern would have been forty-two inches high and seventeen inches wide and would repeat as a half-drop pattern.'){
		// 	repeatedDescription.push(data.objects[i].id);
		// }
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
  
  // createP("Parts of object's description: " + rs.get('pos'));
  console.log(rs.get('pos'));

  contentTokens = RiTa.tokenize(rs._features.tokens);

  var posTokens = rs.get('pos').split(' ');

  var lexicon = new RiLexicon();

  console.log(posTokens);
  console.log(contentTokens);

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
 
  }

  createP('This could be a '+	adjs[int(random(adjs.length))]+ ' ' +
							  	nouns[int(random(nouns.length))]+' that '+
							  	verbs[int(random(verbs.length))]);

  //var par = createP('hello '+ name + '!');
}