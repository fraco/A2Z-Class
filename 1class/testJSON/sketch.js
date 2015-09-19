var data;
var tNo = '2bc798650125e219377b21f6cfdf5bd5';

function preload() {
  //data = loadJSON('testdata.json');  
  //data = loadJSON('https://api.collection.cooperhewitt.org/rest/?method=api.spec.formats&access_token=tNo&page=1&per_page=100');
  data = loadJSON('https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.objects.tags.getObjects&access_token='+tNo+'&query=3d%20printing&page=1&per_page=100')


}

function setup() {
  createCanvas(600, 10);
  //createParagraph
  // createP(data.formats);
  //println(data.object.justification);
  //createP(data.getObjects);
  createP(data.objects[0].gallery_text);
  // println(data.objects)
}

function draw() {
  background(0);
  // ellipse(200, 100, 50, 50);
}