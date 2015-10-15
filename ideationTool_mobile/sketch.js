
//  http://bit.ly/1L7RtlW
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
var rs; var doPos = true;
var contentTokens; var posTokens; 
var nouns = []; var posNouns = [];
var adjs = []; var posAdjs = [];
//verb related variables
var verbs = []; var posVerbs = []; var contentVbz = []; var posVbz = []; 
var vbd = []; existingVbd = []; var delDs = [];
var silentEsList; var stEs; var vrs;
var conjVbz = []; var vbz = [];

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
      var index = floor(random(numObjs));
      var obj = describedObjects[index];
      obj.img = loadImage(obj.images[0].sq.url);
      chObj.push(obj);
     
  };

  for (j = 0; j < chObj.length; j++) {addedDescrips += chObj[j].description}

  button = createButton('submit');  
  button.mousePressed(process);

}

function draw() {
  // background(0,120);
  for(var i = 0; i < 3; i++){
    // console.log(chObj[i].img);
    if (chObj[i].img.width !== 1) {
      image(chObj[i].img, i*310, 10);
    }
  }

  if(keyIsPressed === true){

    //nouns = [];

    nouns = []; posNouns = [];
    verbs = []; posVerbs = [];
    adjs = []; posAdjs = [];
    advs = []; posAdvs = [];

    for (var i = 0; i < 3; i++) {
      var index = floor(random(numObjs));
      var obj = describedObjects[index];
      obj.img = loadImage(obj.images[0].sq.url);
      chObj.push(obj);

      chObj.shift();    
    }
    for (j = 0; j < chObj.length; j++) {addedDescrips += chObj[j].description}
  }
}

function keyReleased() {
  if (inPhrase.length === 3) {
    addedDescrips = 0;
    for (j = 0; j < inPhrase.length; j++) {addedDescrips += inPhrase[j]}
    doPos = true;
  } 
  return false; // prevent any default behavior
}

function process() {

  var lowerSentence = addedDescrips.toLowerCase();
  var sentence = lowerSentence;

  console.log(sentence);
  rs = new RiString(sentence);
  vrs = new RiString(stEs);

if(doPos){
  console.log(rs.get('pos'));
  // console.log(vrs.get('pos'));

  contentTokens = RiTa.tokenize(rs._features.tokens);
  
  // silentEsTokens = RiTa.tokenize(vrs._features.tokens);
  var repeatedTokens;

  posTokens = rs.get('pos').split(' ');
  // posStEs = vrs.get('pos');

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
            var fixed = contentTokens[i].replace(/d$/,'');
            delDs.push(fixed);
            //use substring
            // for (var j = 0; j < vbd.length; i++){
              //delDs = vbd[i];
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

      var args = {
        tense: RiTa.PRESENT_TENSE,
        number: RiTa.SINGULAR,
        person: RiTa.THIRD_PERSON
      };
      // conjVbz = RiTa.conjugate(verbs[2],args)
      conjVbz.push(RiTa.conjugate(verbs[i],args));
      vbz = contentVbz.concat(conjVbz);
    }
  }
  doPos = false;
}
  // delDs = vbd[i].replace(/d\b/gmi, '');
//.remove
//elmt.html('')
//elmt.remove();
  createP('This could be a '+ adjs[int(random(adjs.length))]+ ' ' +
    nouns[int(random(nouns.length))]+' that '+
    verbs[int(random(verbs.length))]);
    // vbz[int(random(vbz.length))]);
}

