onkeydown = function(evento){
    evento = evento || window.event;
    var teclaAscii = evento.keyCode;
    var tecla = evento.key;

    //Seleccion de camara
    // Numero 1, pone la camara global (aerea).
    if ((teclaAscii == '97') || (teclaAscii == '49')) {
       camaraGlobal    		= true;
       camaraCabina			  = false;
       camaraPersecucion 	= false;
       camaraPersona  		= false;
       rotarCamaraY 		  = 0.0;
       rotarCamaraX 		  = 0.0;
    }
    // Numero 2, pone la camara en la cabina de la nave.
    else if ((teclaAscii == '98') || (teclaAscii == '50')) {
       camaraGlobal    		= false;
       camaraCabina   		= true;
       camaraPersecucion  = false;
       camaraPersona  		= false;
       rotarCamaraY 		  = 0.0;
       rotarCamaraX 		  = 0.0;
    }
    // Numero 3, pone la camara detras de la nava, a modo de perseucion.
    else if ((teclaAscii == '99') || (teclaAscii == '51')) {
       camaraGlobal    		= false;
       camaraCabina   		= false;
       camaraPersecucion 	= true;
       camaraPersona  		= false;
       rotarCamaraY 		  = 0.0;
       rotarCamaraX 		  = 0.0;
    }
    // Numero 4, pone la camara en la persona en la bahia de carga.
    else if ((teclaAscii == '100') || (teclaAscii == '52')) {
       camaraGlobal    		= false;
       camaraCabina   		= false;
       camaraPersecucion 	= false;
       camaraPersona  		= true;
       rotarCamaraY 		  = 0.0;
       rotarCamaraX 		  = 0.0;
    }

    //Manejo del Zoom
    // Zoom '+'
    else if ((teclaAscii == '107') || (teclaAscii == '171')) {
       aumento = aumento + 4;
    }
    // Zoom '-'
    else if ((teclaAscii == '173') || (teclaAscii == '109')) {
       aumento = aumento - 4;
    }


    //Estas solo sirven para mover la persona en la bahia de carga.
    //Se puede apreciar mejor cuando la camara esta en la bahia de carga.
    // Muevo persona para adelante
    if((tecla == "w") || (tecla == "W")){
      traslacionPersonaZ = traslacionPersonaZ - Math.cos(-degToRad(rotarCamaraY));   
      traslacionPersonaX = traslacionPersonaX - Math.sin(-degToRad(rotarCamaraY));
    }
    // Muevo persona para atras
    if((tecla == "s") || (tecla == "S")){
      traslacionPersonaZ = traslacionPersonaZ + Math.cos(-degToRad(rotarCamaraY));   
      traslacionPersonaX = traslacionPersonaX + Math.sin(-degToRad(rotarCamaraY));
    }

    // Muevo persona para el costado derecho
    if((tecla == "d") || (tecla == "D")){
      traslacionPersonaZ = traslacionPersonaZ + Math.sin(degToRad(rotarCamaraY));   
      traslacionPersonaX = traslacionPersonaX + Math.cos(degToRad(rotarCamaraY));
    }
    // Muevo persona para el costado izquierda
    if((tecla == "a") || (tecla == "A")){
      traslacionPersonaZ = traslacionPersonaZ - Math.sin(degToRad(rotarCamaraY)); 
      traslacionPersonaX = traslacionPersonaX - Math.cos(degToRad(rotarCamaraY));
    }
}