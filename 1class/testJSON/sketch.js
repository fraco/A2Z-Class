var data;
var describedObjects = [];
var galleryTextedObjects = [];
var objWithDescOrGalText = [];
var notDesOrTexObjs = [];
var repeatedDescription = [];
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
  createP(data.objects[34].gallery_text);
  // println(data.objects)
  for(i = 0; i < data.objects.length; i++){
	data.objects[i];
	if(data.objects[i].description != null){
		describedObjects.push(data.objects[i].description); //objects’ index of JSON, id, text
	}
	if(data.objects[i].gallery_text != null){
		galleryTextedObjects.push(data.objects[i].gallery_text); //objects’ index of JSON, id, text
	}
	if(data.objects[i].gallery_text != null || data.objects[i].description != null){
		objWithDescOrGalText.push(data.objects[i].index); //objects’ index of JSON, id, text
	}
	if(data.objects[i].description == null && data.objects[i].gallery_text == null){
		notDesOrTexObjs.push(data.objects[i].index);
	}
	if(data.objects[i].description == 'Sixty-eight blocks used for printing the textile "Flowers after Van Huysum," designed by Harry Wearne. The textile was printed by Stead McAlpin and Company Limited, Cummersdale near Carlisle, England. Although printed in England, the design was confined to the American market and did not become available worldwide until 1949. The minimum unit of the completed pattern would have been forty-two inches high and seventeen inches wide and would repeat as a half-drop pattern.'){
		repeatedDescription.push(data.objects[i].id);
	}
} 
}

function draw() {
  background(0);
  // ellipse(200, 100, 50, 50);
}