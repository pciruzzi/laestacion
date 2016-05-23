onmousedown = function(){
    mouseDown = true;
}

onmouseup = function(){
  mouseDown = false;
}

onmousemove = function(e){
    var x = e.clientX;
    var y = e.clientY; 

    // Con esto roto la camara si tengo el mouse apretado, divido por 5 para que gire mas despacio
    if(mouseDown){
      rotarCamaraY = rotarCamaraY + (x - mouseX) / 5;
      rotarCamaraX = rotarCamaraX - (mouseY - y) / 5;  
    }

    // Esto limita la camara para que no se de vuelta
    if(rotarCamaraX > 90) {
      rotarCamaraX = 90;
    }
    if(rotarCamaraX < -90) {
      rotarCamaraX = -90;
    }      
    mouseX = x;
    mouseY = y;
} 
 
onwheel = function(evento){
    aumento = aumento - (evento.deltaY * 2 );
    // Esto es para evitar que scrollee la pagia cuando gira la rueda
    if (evento.preventDefault) {
    	evento.preventDefault();
    }
    evento.returnValue = false;
}