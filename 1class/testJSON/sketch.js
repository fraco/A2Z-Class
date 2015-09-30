var galleryTextedObjects = [];

var data;
var repeatedDescription = [];
var describedObjects = [];
var tNo = '2bc798650125e219377b21f6cfdf5bd5';

var existingDescriptions = [];
var descriptions = [];
var colSize;



function preload() {
  //data = loadJSON('testdata.json');  
  //data = loadJSON('https://api.collection.cooperhewitt.org/rest/?method=api.spec.formats&access_token=tNo&page=1&per_page=100');
  data = loadJSON('https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.objects.tags.getObjects&access_token='+tNo+'&query=3d%20printing&page=1&per_page=100')


}

function setup() {
	createCanvas(600, 10);


	for(i = 0; i < data.objects.length; i++){

		if(data.objects[i].description != null){

			if (existingDescriptions[data.objects[i].description] === true) {

			} else {
				describedObjects.push(data.objects[i]); //objects’ index of JSON, id, text
				existingDescriptions[data.objects[i].description] = true;
				// if (existingDescriptions[i] = true){
					descriptions.push(existingDescriptions[i]);
				// }
				// existingDescriptions.push(data.objects[i].description); //= true;			

			}
			// repeatedDescription.push(data.objects[i].description);
		}

		// if(data.objects[i].description == 'Sixty-eight blocks used for printing the textile "Flowers after Van Huysum," designed by Harry Wearne. The textile was printed by Stead McAlpin and Company Limited, Cummersdale near Carlisle, England. Although printed in England, the design was confined to the American market and did not become available worldwide until 1949. The minimum unit of the completed pattern would have been forty-two inches high and seventeen inches wide and would repeat as a half-drop pattern.'){
		// 	repeatedDescription.push(data.objects[i].id);
		// }
	}

}

function draw() {
  background(0);
  // ellipse(200, 100, 50, 50);
  // colSize = existingDescriptions.length;
  // createP(existingDescriptions[random(existingDescriptions.length)].description);
  // createP(existingDescriptions);

}