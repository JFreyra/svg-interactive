var img   = document.getElementById("img");

var width = img.width['baseVal']['value'];
var height = img.height['baseVal']['value'];

var move  = document.getElementById("move");
move.clicked = -1;
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

var add = function(cir){
    cirList.push(cir);
    img.appendChild(cir);
};

var createDot = function(x,y,r){
    var c1 = document.createElementNS("http://www.w3.org/2000/svg","circle");
    c1.clicked = 0; // clicked checker bc c1.style shows nothing for some reason
    
    c1.setAttribute("cx",x);
    c1.setAttribute("cy",y);
    c1.setAttribute("r",r);
    c1.setAttribute("fill","red");
    //console.log(c1.style);
    c1.setAttribute("stroke","black");
    c1.directionX = 1;
    c1.directionY = 1;

    // chrome auto triggers non-anonymous functions for some reason?
    c1.addEventListener('mousedown',function(){if(c1.clicked == 1){console.log("entered");
								   img.removeChild(c1);
								   cirList.pop(c1);
							           createRandDot();};});
    
    c1.addEventListener('mousedown',function(){cirClick = true; // prevents creating new dot 
    					       c1.setAttribute("fill","green"); // changes color of dot
					       c1.clicked = 1;
					       //console.log(c1.style);
    					       setTimeout(function(){cirClick = false;},100); // allows for creation of new dot again
    					       console.log(cirClick);});

    return c1
};

var createRandDot = function(){
    var x = Math.floor(Math.random() * width);
    var y = Math.floor(Math.random() * height);

    var c1 = createDot(x,y,20);

    add(c1);
};

var createMouseDot = function(){
    if(!cirClick){
	
	var mouseX = event.clientX - getOffset(img).left;
	var mouseY = event.clientY - getOffset(img).top;

	var c1 = createDot(mouseX,mouseY,20);

	add(c1);
	cirClick = false;
	console.log(cirClick);
    };
};

// Deprecated animation :(

// var animate = function(cir){
//     var ani = document.createElementNS("http://www.w3.org/2000/svg","animate");
//     ani.setAttribute("attributeType","XML");
//     ani.setAttribute("attributeName","x");
//     ani.setAttribute("from",0);
//     ani.setAttribute("to",width);
//     ani.setAttribute("dur","5s");
//     ani.setAttribute("repeatCount","indefinite");

//     cir.appendChild(ani);
// };

// var moveDots = function(){
//     for(var i = 0; i < cirList.length; i++){
// 	animate(cirList[i]);
//     };
// };

var split = function(cir){
    var r = cir.r["baseVal"]["value"];
    if(r > 2){
	var prevClicked = cir.clicked;
	var x = cir.cx["baseVal"]["value"];
	var y = cir.cy["baseVal"]["value"];
	var c1 = createDot(x,y,Math.floor(r/2));
	//var c2 = createDot(x,y,Math.floor(r/2));
	c1.clicked = prevClicked;
	//c2.clicked = prevClicked;
	//c2.directionX *= -1;
	//c2.directionY *= -1;

	img.appendChild(c1);
	//img.appendChild(c2);
    };
    cirList.pop(cir);
    img.removeChild(cir);
};

var prevCD = 0;
var lineCheck = function(line,cir){
    var x1 = line.x1["baseVal"]["value"];
    var x2 = line.x2["baseVal"]["value"];
    var y1 = line.y1["baseVal"]["value"];
    var y2 = line.y2["baseVal"]["value"];
    var deltaX = x2 - x1;
    //console.log(deltaX);
    var deltaY = y2 - y1;
    var prevD = (deltaY/deltaX);
    
    var cx = cir.cx["baseVal"]["value"];
    var cy = cir.cy["baseVal"]["value"];
    var deltaCx = cx - x1;
    //console.log(deltaCx);
    var deltaCy = cy - y1;
    var curCD = (deltaCy/deltaCx);

    var deltaPCDD = prevCD - prevD;
    var deltaCCDD = curCD - prevD;
    if(/*prevCD < 0 &&*/ (deltaPCDD) < 0 && (deltaCCDD) > 0 && deltaPCDD != (-1/0)){
	console.log("entered");
	// console.log("case1");
	// console.log(deltaPCDD);
	// console.log(deltaCCDD);
	// //split(cir);
	// console.log("passed");
    };
    
    if(/*prevCD > 0 &&*/ (deltaPCDD) > 0 && (deltaCCDD) < 0 && deltaCCDD != (-1/0)){ // deltaCCDD != (-1/0) prevents bug of triggering when dot is above x1
	// console.log("case2");
	// console.log(deltaPCDD);
	// console.log(deltaCCDD);
	// //split(cir);
	// console.log("passed");
    };
    prevCD = (deltaCy/deltaCx);
}

var drawLine = function(){
    var hlow = height / 3;
    var wlow = width / 3;
    
    var l = document.createElementNS("http://www.w3.org/2000/svg","line");
    var x1;
    var x2;
    var y1;
    var y2;
    
    if(Math.random() >= .5){
	x1 = 0;
	y1 = Math.floor(Math.random()*(hlow)+hlow);
    } else {
	x1 = Math.floor(Math.random()*(wlow)+wlow);
	y1 = height;
    };

    if(Math.random() >= .5){
	x2 = width;
	y2 = Math.floor(Math.random()*(hlow)+hlow);
    } else {
	x2 = Math.floor(Math.random()*(wlow)+wlow);
	y2 = 0;
    };

    if((x1 == 0 && y1 == 0) || (x2 == width && y2 == height)){
	return drawLine();
    };
    
    l.setAttribute("x1",x1);
    l.setAttribute("x2",x2);
    l.setAttribute("y1",y1);
    l.setAttribute("y2",y2);
    l.setAttribute("stroke","black");

    img.appendChild(l);
    return l;
};

var animate = function(){
    console.log(move.clicked);
    moveDots();
    move.clicked *= -1;
};

var line = drawLine();
var moveDots = function(){
    var animList = cirList;
    var frame = function(){
	if(move.clicked == 1){
	    for(var i = 0; i < animList.length; i++){
		c = animList[i];
		var prevX = c.cx["baseVal"]["value"];
		var prevY = c.cy["baseVal"]["value"];
		c.setAttribute("cx",prevX += 1*c.directionX);
		c.setAttribute("cy",prevY += 1*c.directionY);
		if(prevX >= width || prevX <= 0){
		    c.directionX *= -1;
		};
		if(prevY >= height || prevY <= 0){
		    c.directionY *= -1;
		};
		lineCheck(line,c);
	    };	    
	} else{
	    clearInterval(id);
	};
    };
    var id = setInterval(frame,10);
};

var clearsvg = function(){
    while(img.lastChild){
	img.removeChild(img.lastChild);
	cirList.pop(img.lastChild);
    };
    line = drawLine();
};

clear.addEventListener("click",clearsvg);
img.addEventListener("mousedown",createMouseDot);
move.addEventListener("click",animate);
