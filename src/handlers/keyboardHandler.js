onkeydown = function(evento){
    evento = evento || window.event;
    var teclaAscii = evento.keyCode;
    var tecla = evento.key;

    //Seleccion de camara
    // Numero 1, pone la camara global (aerea).
    if ((teclaAscii == '97') || (teclaAscii == '49')) {
        camaraGlobal        = true;
        camaraCabina        = false;
        camaraPersecucion   = false;
        camaraPersona       = false;
    }
    // Numero 2, pone la camara en la cabina de la nave.
    else if ((teclaAscii == '98') || (teclaAscii == '50')) {
        camaraGlobal        = false;
        camaraCabina        = true;
        camaraPersecucion   = false;
        camaraPersona       = false;
    }
    // Numero 3, pone la camara detras de la nava, a modo de perseucion.
    else if ((teclaAscii == '99') || (teclaAscii == '51')) {
        camaraGlobal        = false;
        camaraCabina        = false;
        camaraPersecucion   = true;
        camaraPersona       = false;
    }
    // Numero 4, pone la camara en la persona en la bahia de carga.
    else if ((teclaAscii == '100') || (teclaAscii == '52')) {
        camaraGlobal        = false;
        camaraCabina        = false;
        camaraPersecucion   = false;
        camaraPersona       = true;
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

    //Teclas para el pliegue y despligue de la antena
    if (tecla == "p") {
        plegarODesplegarAntena = true;
    }

    //Teclas de pliegue y despliegue de las patas de la nave
    if (tecla == "x") {
        plegarODesplegarPatas = true;
    }

    //Estas solo sirven para mover la persona en la bahia de carga.
    //Se puede apreciar mejor cuando la camara esta en la bahia de carga.
    // Muevo persona para adelante
    if (tecla == "w") {
        avancePersona += 0.01;
        traslacionPersonaZ = traslacionPersonaZ - Math.cos(-degToRad(rotarCamaraYPersona));   
        traslacionPersonaX = traslacionPersonaX - Math.sin(-degToRad(rotarCamaraYPersona));
    }
    // Muevo persona para atras
    if (tecla == "s") {
        avancePersona -= 0.01;
        traslacionPersonaZ = traslacionPersonaZ + Math.cos(-degToRad(rotarCamaraYPersona));   
        traslacionPersonaX = traslacionPersonaX + Math.sin(-degToRad(rotarCamaraYPersona));
    }

    // Muevo persona para el costado derecho
    if (tecla == "d") {
        avancePersonaCostado += 0.1;
        traslacionPersonaZ = traslacionPersonaZ + Math.sin(degToRad(rotarCamaraYPersona));   
        traslacionPersonaX = traslacionPersonaX + Math.cos(degToRad(rotarCamaraYPersona));
    }
    // Muevo persona para el costado izquierda
    if (tecla == "a") {
        avancePersonaCostado -= 0.1;
        traslacionPersonaZ = traslacionPersonaZ - Math.sin(degToRad(rotarCamaraYPersona)); 
        traslacionPersonaX = traslacionPersonaX - Math.cos(degToRad(rotarCamaraYPersona));
    }

    if (avancePersona > Math.PI*3/2+0.1) {
        avancePersona = Math.PI*3/2+0.1;
    }
    if (avancePersona < 0.1) {
        avancePersona = 0.1;
    }
    if (avancePersonaCostado > 60) {
        avancePersonaCostado = 60;
    }
    if (avancePersonaCostado < 52) {
        avancePersonaCostado = 52;
    }

    //Estas teclas van a servir para el manejo de la nave
    //Muevo la nave para arriba
    if((tecla == "i") || (tecla == "I")){
        nave.onTeclaDown(nave.TECLA_ARRIBA);
    }
    //Muevo la nave para abajo
    if((tecla == "k") || (tecla == "K")){
        nave.onTeclaDown(nave.TECLA_ABAJO);
    }
    //Muevo la nave para la izquierda
    if((tecla == "j") || (tecla == "J")){
        nave.onTeclaDown(nave.TECLA_IZQUIERDA);
    }
    //Muevo la nave para la derecha
    if((tecla == "l") || (tecla == "L")){
        nave.onTeclaDown(nave.TECLA_DERECHA);
    }
    //Acelero la nave
    if((tecla == "m") || (tecla == "M")){
        nave.onTeclaDown(nave.TECLA_MAS);
    }
    //Desacelero la nave
    if((tecla == "n") || (tecla == "N")){
        nave.onTeclaDown(nave.TECLA_MENOS);
    }
    //Muevo la nave para en sentido horario
    if((tecla == "o") || (tecla == "O")){
        nave.onTeclaDown(nave.TECLA_GIRO_HORARIO);
    }
    //Muevo la nave para en sentido antihorario
    if((tecla == "u") || (tecla == "U")){
        nave.onTeclaDown(nave.TECLA_GIRO_ANTIHORARIO);
    }
}

onkeyup = function(evento){
    evento = evento || window.event;
    var tecla = evento.key;

    //Estas teclas van a servir para el manejo de la nave
    //Dejo de mover la nave para arriba
    if((tecla == "i") || (tecla == "I")){
        nave.onTeclaUp(nave.TECLA_ARRIBA);
    }
    //Dejo de mover la nave para abajo
    if((tecla == "k") || (tecla == "K")){
        nave.onTeclaUp(nave.TECLA_ABAJO);
    }
    //Dejo de mover la nave para la izquierda
    if((tecla == "j") || (tecla == "J")){
        nave.onTeclaUp(nave.TECLA_IZQUIERDA);
    }
    //Dejo de mover la nave para la derecha
    if((tecla == "l") || (tecla == "L")){
        nave.onTeclaUp(nave.TECLA_DERECHA);
    }
    //Dejo de acelerar la nave
    if((tecla == "m") || (tecla == "M")){
        nave.onTeclaUp(nave.TECLA_MAS);
    }
    //Dejo de desacelerar la nave
    if((tecla == "n") || (tecla == "N")){
        nave.onTeclaUp(nave.TECLA_MENOS);
    }
    //Dejo de mover la nave para en sentido horario
    if((tecla == "o") || (tecla == "O")){
        nave.onTeclaUp(nave.TECLA_GIRO_HORARIO);
    }
    //Dejo de mover la nave para en sentido antihorario
    if((tecla == "u") || (tecla == "U")){
        nave.onTeclaUp(nave.TECLA_GIRO_ANTIHORARIO);
    }
}