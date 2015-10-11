
var galleryTextedObjects = [];

var data;
var describedObjects = [];
var tNo = '2bc798650125e219377b21f6cfdf5bd5';

var chObj = [];
var objImg = [];
var objImgUrl = [];

var existingDescriptions = [];

var numObjs;
//RiTa related variables
var rs;
var contentTokens 
var nouns = []; var posNouns = [];
var adjs = []; var posAdjs = [];
//verb related variables
var verbs = []; var posVerbs = []; var contentVbz = []; var posVbz = []; 
var vbd = []; existingVbd = []; var delDs = [];
var silentEsList; var stEs; var vrs;
var conjVbz = [];

var advs = []; var posAdvs = [];

var inPhrase = []; var addedDescrips = 0;
// var sentence;

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
  createCanvas(920, 330);

  for(i = 0; i < data.objects.length; i++){

    if(data.objects[i].description != null && 
      data.objects[i].images.length > 0){

      if (existingDescriptions[data.objects[i].description] === true) {

      } else {
        describedObjects.push(data.objects[i]); //objects’ index of JSON, id, text
      }       
      
    }
  }

  numObjs = describedObjects.length;

  for (var i = 0; i < 3; i++) {
    chObj.push(describedObjects[floor(random(numObjs))]);
    inPhrase.push(chObj[i].description);
    objImgUrl.push(chObj[i].images[0].sq.url);
    objImg.push(loadImage(objImgUrl[i]));    
  };

  for (j = 0; j < inPhrase.length; j++) {addedDescrips += inPhrase[j]}

  // chObj = describedObjects[floor(random(numObjs))];
  // inPhrase = chObj.description;
  // objImgUrl = chObj.images[0].sq.url;
  // objImg = loadImage(objImgUrl);

  // Make a submit button
  button = createButton('submit');
  // Here a button triggers the "hello message"
  button.mousePressed(process);

}

function draw() {
  // background(0,120);
  for(var i = 0; i < 3; i++){
    image(objImg[i], i*310, 10);
  }

  if(keyIsPressed === true){
    nouns.length = 0; posNouns.length = 0;
    verbs.length = 0; posVerbs.length = 0;
    adjs.length = 0; posAdjs.length = 0;
    advs.length = 0; posAdvs.length = 0;

    for (var i = 0; i < 3; i++) {
      chObj.push(describedObjects[floor(random(numObjs))]);
      inPhrase.push(chObj[i].description);
      objImgUrl.push(chObj[i].images[0].sq.url);
      objImg.push(loadImage(objImgUrl[i]));
      addedDescrips += inPhrase[i];
    }
    // addedDescrips += inPhrase[0]+inPhrase[1]+inPhrase[2];
    // chObj = describedObjects[floor(random(numObjs))];
    // inPhrase = chObj.description;
    // objImgUrl = chObj.images[0].sq.url;
    // objImg = loadImage(objImgUrl);    
  }
}

function process() {

  var sentence = addedDescrips;

  console.log(sentence);
  rs = new RiString(sentence);
  vrs = new RiString(stEs);

  console.log(rs.get('pos'));
  console.log(vrs.get('pos'));

  contentTokens = RiTa.tokenize(rs._features.tokens);
  silentEsTokens = RiTa.tokenize(vrs._features.tokens);

  var posTokens = rs.get('pos').split(' ');
  var posStEs = vrs.get('pos');

  var lexicon = new RiLexicon();

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
            // for (var j = 0; j < vbd.length; i++){
              delDs = vbd[i];
              // delDs.replace(/d$/, " ");  
            // // delDs[i].replace(/d$/gi, '');
            // }      
          }          
            //DELETE all Ds         
            // delDs.push(vbd[0].replace(/d$/, ''));
            // delDs.push(vbd[i].replace(/d$/, ''));

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

  createP('This could be a '+ adjs[int(random(adjs.length))]+ ' ' +
    nouns[int(random(nouns.length))]+' that '+
    verbs[int(random(verbs.length))]);
}