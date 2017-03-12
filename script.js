var img   = document.getElementById("img");
var move  = document.getElementById("move");
var clear = document.getElementById("clear");

var cirList = [];

var cirClick = false;

function getOffset(el) {
  el = el.getBoundingClientRect();
  return {
    left: el.left,
    top: el.top
  };
};

var colorChange = function(c1){
    c1 = null;
    createRandDot();
};

var createDot = function(x,y,r){
    var c1 = document.createElementNS("http://www.w3.org/2000/svg","circle");
    
    c1.setAttribute("cx",x);
    c1.setAttribute("cy",y);
    c1.setAttribute("r",r);
    c1.setAttribute("fill","red");
    c1.setAttribute("stroke","black");

    c1.addEventListener('mousedown',function(){cirClick = true; // prevents creating new dot 
    					       c1.setAttribute("fill","green"); // changes color of dot
    					       setTimeout(function(){cirClick = false;},100); // allows for creation of new dot again
    					       console.log(cirClick);});
    
    //c1.addEventListener('mousedown',colorChange(this));

    return c1
};

var createRandDot = function(){
    var width = img.width['baseVal']['value'];
    var height = img.height['baseVal']['value'];
    console.log(width);
    console.log(width);
    var x = Math.floor(Math.random() * width);
    var y = Math.floor(Math.random() * height);

    var c1 = createDot(x,y,10);

    cirList.push(c1);
    img.appendChild(c1);
};

var createMouseDot = function(){
    if(!cirClick){
	
	var mouseX = event.clientX - getOffset(img).left;
	var mouseY = event.clientY - getOffset(img).top;

	var c1 = createDot(mouseX,mouseY,10);

	cirList.push(c1);
	img.appendChild(c1);
	cirClick = false;
	console.log(cirClick);
    };
};

var clearsvg = function(){
    while(img.lastChild){
	img.removeChild(img.lastChild);
    };
};

clear.addEventListener("click",clearsvg);
img.addEventListener("mousedown",createMouseDot);
