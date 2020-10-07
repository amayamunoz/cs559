function setup() {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var posX = 250;
    var posY = 250;

    function draw() {
	canvas.width = canvas.width;
	
    var stack = [ mat3.create() ];

	function lineToTx(x,y)
    {var res=vec2.create(); vec2.transformMat3(res,[x,y],stack[0]); context.lineTo(res[0],res[1]);}

	function square(color) {
        context.beginPath();
        context.fillStyle = color;
	    lineToTx(50,50);
	    lineToTx(-50,50);
	    lineToTx(-50,-50);
	    lineToTx(50,-50);
        context.closePath();
        context.fill();
    }
    
    function arm(color) {
        context.beginPath();
        context.fillStyle = color;
	    lineToTx(-50,0);
	    lineToTx(70,-20);
	    lineToTx(-50,-40);
        context.closePath();
        context.fill();
    }
    
    function ringpop() {
        context.beginPath();
        context.fillStyle = "red";
	    lineToTx(50,50);
	    lineToTx(-10,50);
        lineToTx(20,-50);
        context.closePath();
        context.fill();
    }
    
    function update() {
        posX += 1;
        if (posX >= 550) {
            posX = -85;
        }
    }

	var Tsquare_to_canvas = mat3.create();
	mat3.fromTranslation(Tsquare_to_canvas,[posX,posY]);
    mat3.scale(Tsquare_to_canvas,Tsquare_to_canvas,[.5,.5]);
    mat3.multiply(stack[0],stack[0],Tsquare_to_canvas);
    square("blue");
	
    stack.unshift(mat3.clone(stack[0])); 
    var Tarm_to_square = mat3.create();
	mat3.fromTranslation(Tarm_to_square,[75,0]);
    mat3.scale(Tarm_to_square,Tarm_to_square,[.5,.5]);
    mat3.multiply(stack[0],stack[0],Tarm_to_square);
    arm("black");
    stack.shift();

    stack.unshift(mat3.clone(stack[0])); 
    var Tarm2_to_square = mat3.create();
	mat3.fromTranslation(Tarm2_to_square,[-75,-20]);
    mat3.scale(Tarm2_to_square,Tarm2_to_square,[.5,.5]);
    mat3.rotate(Tarm2_to_square,Tarm2_to_square, Math.PI);
    mat3.multiply(stack[0],stack[0],Tarm2_to_square);
    arm("black");

    stack.unshift(mat3.clone(stack[0]));
    var Tring_to_arm2 = mat3.create();
	mat3.fromTranslation(Tring_to_arm2,[0,30]);
    mat3.scale(Tring_to_arm2,Tring_to_arm2,[.75,.75]);
    mat3.multiply(stack[0],stack[0],Tring_to_arm2);
    ringpop();
    stack.shift();
    stack.shift();

    update();
    window.requestAnimationFrame(draw);
    }
    window.requestAnimationFrame(draw);
}
window.onload = setup;