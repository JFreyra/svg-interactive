var img   = document.getElementById("img");
var move  = document.getElementById("move");
var clear = document.getElementById("clear");

var cirList = [];

function getOffset(el) {
  el = el.getBoundingClientRect();
  return {
    left: el.left,
    top: el.top
  };
};

var createRandDot = function(){
    var x = 100 //Math.floor(Math.random() * img.width);
    var y = 100 //Math.floor(Math.random() * img.height);

    var c1 = document.createElementNS("http://www.w3.org/2000/svg","circle");
    
    c1.setAttribute("cx",x);
    c1.setAttribute("cy",y);
    c1.setAttribute("r",10);
    c1.setAttribute("fill","red");
    c1.setAttribute("stroke","black");

    cirList.push(c1);
    img.appendChild(c1);
};

var clearsvg = function(){
    while(img.lastChild){
	img.removeChild(img.lastChild);
    };
};

clear.addEventListener("click",clearsvg);
img.addEventListener("mousedown",createRandDot);
