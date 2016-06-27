function drawScene() {
    // Se configura la matriz de perspectiva.
    mat4.perspective(pMatrix, degToRad(80), gl.viewportWidth / gl.viewportHeight, 0.01, 2000.0);

    // Definimos la ubicación de la camara
    mat4.identity(cameraMatrix);
    mat4.identity(camaraAux);

    if(camaraGlobal) {
        vec3.set(eye_point, 0, 0, -200 + aumento);
        vec3.set(at_point, 0, 0, 0);

        mat4.lookAt(cameraMatrix, eye_point, at_point, up_point);
        mat4.rotateX(cameraMatrix, cameraMatrix, degToRad(rotarCamaraX));
        mat4.rotateY(cameraMatrix, cameraMatrix, degToRad(rotarCamaraY));
    }

    if(camaraCabina) {
        vec3.set(eye_point, traslacionNave[0], traslacionNave[1] + 1.5, traslacionNave[2]);
        vec3.set(at_point, traslacionNave[0] - 10.0, traslacionNave[1] + 1.5, traslacionNave[2] + 1.0);

        mat4.lookAt(cameraMatrix, eye_point, at_point, up_point); 
        mat4.rotateX(camaraAux, camaraAux, -cabezeoNave);
        mat4.rotateY(camaraAux, camaraAux, Math.PI/11);
        mat4.rotateY(camaraAux, camaraAux, -viradaNave);
        mat4.rotateZ(camaraAux, camaraAux, rolidoNave);
        mat4.multiply(cameraMatrix, camaraAux, cameraMatrix);
    }

    if(camaraPersecucion) {
    	vec3.subtract(eye_point,traslacionNave,vec3.scale([],nave.getDireccion(),-15));
       	at_point = traslacionNave;
		mat4.lookAt(cameraMatrix, eye_point, at_point, up_point);
    }

    if(camaraPersona) {
        var avance = avancePersona - Math.PI;
        vec3.set(eye_point, avancePersonaCostado * Math.cos(-avance + 0.1), 1, avancePersonaCostado * Math.sin(-avance + 0.1));
        vec3.set(at_point, avancePersonaCostado * Math.cos(-avance), 1, avancePersonaCostado * Math.sin(-avance));

        mat4.lookAt(cameraMatrix, eye_point, at_point, up_point);
        mat4.rotateX(camaraAux, camaraAux, degToRad(rotarCamaraXPersona));
        mat4.rotateY(camaraAux, camaraAux, degToRad(rotarCamaraYPersona));
        mat4.multiply(cameraMatrix, camaraAux, cameraMatrix);
    }

    // ################################### CONFIGURACION DEL SHADER ###################################
    gl.useProgram(shaderProgramSimple);
    gl.uniformMatrix4fv(shaderProgramSimple.ViewMatrixUniform, false, cameraMatrix);
    gl.uniformMatrix4fv(shaderProgramSimple.pMatrixUniform, false, pMatrix);
    gl.uniform3fv(shaderProgramSimple.cameraPositionUniform, eye_point);
    gl.uniform3fv(shaderProgramSimple.eyePointUniform, eye_point);
    // En principio no utilizo reflexion
    gl.uniform1f(shaderProgramSimple.useReflectionUniform, 0.0);
    // En principio utilizo texturas
    gl.uniform1i(shaderProgramSimple.useColorUniform, false);
    // En principio no utilizo mapa de normales
    gl.uniform1i(shaderProgramSimple.useNormalUniform, false);
    // En principio no utilizo mapa de iluminacion
    gl.uniform1i(shaderProgramSimple.useIluminationUniform, false);
    // En principio no utilizo luces puntuales(Solo adentro de la bahia de carga)
    gl.uniform1i(shaderProgramSimple.usePunctualLights, false);

    // Configuración de la luz
    // Se inicializan las variables asociadas con la iluminación
    var lighting = true;
    gl.uniform1i(shaderProgramSimple.useLightingUniform, lighting);
    // Sol
    var sunPosition = vec3.fromValues(500.0*Math.cos(rotacionSol), 300.0, 500.0*Math.sin(rotacionSol)); 
    gl.uniform3fv(shaderProgramSimple.lightingPrincipalDirectionUniform, sunPosition);
    gl.uniform3fv(shaderProgramSimple.sunPositionUniform, sunPosition);
    gl.uniform1f(shaderProgramSimple.lightPrincipalIntensity, 1.2);                         //Intensidad
    gl.uniform3f(shaderProgramSimple.ambientColorUniform, 0.3, 0.3, 0.3);                   //Ambiente
    gl.uniform3f(shaderProgramSimple.diffusePrincipalColorUniform, 1.0, 1.0, 1.0);          //Difusa
    gl.uniform3f(shaderProgramSimple.specularPrincipalColorUniform, 0.4, 0.4, 0.4);         //Especular

    // Tierra
    var earthPosition = [0.0, 300.0, 0.0];
    gl.uniform3fv(shaderProgramSimple.lightingSecondaryDirectionUniform, earthPosition);
    gl.uniform1f(shaderProgramSimple.lightSecondaryIntensity, 0.4);                          //Intensidad
    gl.uniform3f(shaderProgramSimple.diffuseSecondaryColorUniform, 46/255, 46/255, 254/255); //Difusa
    gl.uniform3f(shaderProgramSimple.specularSecondaryColorUniform, 0.0, 0.0, 1.0);          //Especular

    //Luces Puntuales
    gl.uniform1f(shaderProgramSimple.lightPunctualIntensity, 6.0);                            //Intensidad 
    gl.uniform3f(shaderProgramSimple.diffusePunctualColorUniform, 1.0, 1.0, 1.0);             //Difusa
    gl.uniform3f(shaderProgramSimple.specularPunctualColorUniform, 1.0, 1.0, 1.0);            //Especular 
    gl.uniform3fv(shaderProgramSimple.lightingPunctual1PositionUniform, [-54, -0.1,  13]);    //Punctual 1
    gl.uniform3fv(shaderProgramSimple.lightingPunctual2PositionUniform, [ 0, -0.1,  57]);     //Punctual 2
    gl.uniform3fv(shaderProgramSimple.lightingPunctual3PositionUniform, [ 57, -0.1,   0]);    //Punctual 3
    gl.uniform3fv(shaderProgramSimple.lightingPunctual4PositionUniform, [ 13, -0.1, -54]);    //Punctual 4

    // ################################### DIBUJADO DE LA ESCENA ###################################
    // Dibujamos la escena        
    var model_matrix_escena = mat4.create();
    mat4.identity(model_matrix_escena);
    mat4.rotate(model_matrix_escena, model_matrix_escena, Math.PI/2, [1,0,0]);
    mat4.rotate(model_matrix_escena, model_matrix_escena, Math.PI, [0,1,0]);

    // Matriz de modelado de la estacion
    var model_matrix_estacion = mat4.create();
    mat4.identity(model_matrix_estacion);
    mat4.scale(model_matrix_estacion, model_matrix_escena, [7.0, 7.0, 7.0]);
    estacion.draw(model_matrix_estacion);

    // Movimiento de las antenas
    if (plegarODesplegarAntena) {
        if (traslacionPlegadoAntena == 4.8) {
            desplegarAntena = true;
            finRotacionAntena = false;
            plegarAntena = false;
            deltaAntenaTraslacion = -0.05; //desplegar
            deltaAntenaRotacion = 0.02;
        } else if (traslacionPlegadoAntena == 0) {
            plegarAntena = true;
            desplegarAntena = false;
            finRotacionAntena = false;
            deltaAntenaTraslacion = 0.05; //plegar
            deltaAntenaRotacion = -0.02;
        }
    }

    if (plegarAntena && traslacionPlegadoAntena < 4.8) {
        if (! finRotacionAntena) {
            rotacionPlegadoAntena += deltaAntenaRotacion;
            plegarODesplegarAntena = false;
            if (rotacionPlegadoAntena < -Math.PI/2 + 0.02) {
                finRotacionAntena = true;
                rotacionPlegadoAntena = -Math.PI/2;
            }
        } else {
            traslacionPlegadoAntena += deltaAntenaTraslacion;
            if (traslacionPlegadoAntena > 4.75) traslacionPlegadoAntena = 4.8;
        }
    } else if (traslacionPlegadoAntena == 4.8) {
        plegarAntena = false;
    }

    if (desplegarAntena && rotacionPlegadoAntena < 0) {
        if (! finRotacionAntena) { //utilizo este booleano aunque primero traslade y despues rote
            traslacionPlegadoAntena += deltaAntenaTraslacion;
            plegarODesplegarAntena = false;
            if (traslacionPlegadoAntena < 0.1) {
                finRotacionAntena = true;
                traslacionPlegadoAntena = 0;
            }
        } else {
            rotacionPlegadoAntena += deltaAntenaRotacion;
            if (rotacionPlegadoAntena > -0.02) rotacionPlegadoAntena = 0;
        }
    } else if (rotacionPlegadoAntena == 0) {
        desplegarAntena = false;
    }

    // Matriz de modelado de la nave
    var position_matrix_nave = mat4.create();
    mat4.identity(position_matrix_nave);
    mat4.rotate(position_matrix_nave, position_matrix_nave, -Math.PI/4-0.1, [0,1,0]);
    mat4.translate(position_matrix_nave, position_matrix_nave, [-40, -2.97, -40]);
    mat4.rotate(position_matrix_nave, position_matrix_nave, -Math.PI*3/4, [0,1,0]);
    mat4.scale(position_matrix_nave, position_matrix_nave, [0.2, 0.2, 0.2]);
    
    nave.step(); 
    var movement_matrix_nave = nave.getMatriz();
    mat4.multiply(position_matrix_nave, position_matrix_nave, movement_matrix_nave);

    // Movimientos del eje de las turbinas y demas
    rotacionEjeNave += (nave.getTeclaUp() && rotacionEjeNave < Math.PI/2) ? 0.01 : 0;
    rotacionEjeNave += (nave.getTeclaDown() && rotacionEjeNave > -Math.PI/2) ? -0.01 : 0;
    cabezeoNave = nave.getAnguloCabezeo();
    rolidoNave = nave.getAnguloRolido();
    viradaNave = nave.getAnguloVirada();
    if (nave.getVelocidad() == 0 && rotacionEjeNave >= -Math.PI/2 + cabezeoNave) {
        if (rotacionEjeNave < (-Math.PI/2 + cabezeoNave) + 0.01) {
            rotacionEjeNave = -Math.PI/2 + cabezeoNave;
            naveVertical = true;
        } else {
            rotacionEjeNave -= 0.01;
        }
    } else if (! nave.getTeclaUp() && ! nave.getTeclaDown()) {
        naveVertical = false;
        if (rotacionEjeNave < 0.01 && rotacionEjeNave > -0.01) {
            rotacionEjeNave = 0;
        }
        if (rotacionEjeNave > 0) {
            rotacionEjeNave -= 0.01;
        } else if (rotacionEjeNave < 0) {
            rotacionEjeNave += 0.01;
        }
    }

    // Movimiento de las patas
    if (plegarODesplegarPatas) {
        if (traslacionPatasNave == 0) {
            desplegarPatas = true;
            plegarPatas = false;
            deltaPatas = -0.05; //desplegar
        } else if (traslacionPatasNave == -4.9) {
            plegarPatas = true;
            desplegarPatas = false;
            deltaPatas = 0.05; //plegar
        }
    }

    if (plegarPatas && traslacionPatasNave < 0) {
        traslacionPatasNave += deltaPatas;
        plegarODesplegarPatas = false;
        if (traslacionPatasNave > -0.05) traslacionPatasNave = 0;
    } else if (traslacionPatasNave == 0) {
        plegarPatas = false;
    }

    if (desplegarPatas && traslacionPatasNave > -4.9) {
        traslacionPatasNave += deltaPatas;
        plegarODesplegarPatas = false;
        if (traslacionPatasNave < -4.85) traslacionPatasNave = -4.9;
    } else if (traslacionPatasNave == -4.9) {
        desplegarPatas = false;
    }

    gl.uniform1i(shaderProgramSimple.usePunctualLights, true);
    modeloNave.draw(position_matrix_nave);
    gl.uniform1i(shaderProgramSimple.usePunctualLights, false);

    // Matriz de modelado de la tierra
    var model_matrix_tierra = mat4.create();
    mat4.identity(model_matrix_tierra);
    mat4.translate(model_matrix_tierra, model_matrix_escena, [0.0, 0.0, -300.0]);
    mat4.rotate(model_matrix_tierra, model_matrix_tierra, Math.PI/2, [1,0,0]);
    mat4.scale(model_matrix_tierra, model_matrix_tierra, [200.0, 200.0, 200.0]);
    tierra.draw(model_matrix_tierra, shaderProgramSimple, false, null, true);

    // Hago que el "universo" no se ilumine
    gl.uniform1i(shaderProgramSimple.useLightingUniform, !lighting);

    var model_matrix_universo = mat4.create();
    mat4.identity(model_matrix_universo);
    mat4.scale(model_matrix_universo, model_matrix_universo, [1000.0, 1000.0, 1000.0]);
    universo.draw(model_matrix_universo, shaderProgramSimple);

    // Hago que el sol se autoilumine, sin necesidad de la luz
    // Matriz de modelado del sol
    var model_matrix_sol = mat4.create();
    mat4.identity(model_matrix_sol);
    mat4.translate(model_matrix_sol, model_matrix_escena, [0.0, 0.0, -300.0]);
    mat4.rotate(model_matrix_sol, model_matrix_sol, -rotacionSol, [0,0,1]);
    mat4.translate(model_matrix_sol, model_matrix_sol, [500.0, 0.0, 0.0]);
    mat4.scale(model_matrix_sol, model_matrix_sol, [20.0, 20.0, 20.0]);
    sol.draw(model_matrix_sol, shaderProgramSimple, true, 1.0);

    gl.uniform1i(shaderProgramSimple.useLightingUniform, lighting);

    astronauta.draw(model_matrix_astronauta, shaderProgramSimple);
}

function tick() {
    requestAnimFrame(tick);
    rotacionSol += 0.005;
    drawScene();
}

function initGL(canvas) {
    try {
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
    } catch (e) {

    } if (! gl) {
        alert("Could not initialise WebGL, sorry :-(");
        return;
    }
}

function start() {
    var canvas = document.getElementById("glcanvas");
    initGL(canvas);

    // Inicializo todos los shaders que se van a usar
    initShaders();

    estacion = new Estacion();
    estacion.create();

    nave = new Nave();

    modeloNave = new ModeloNave();
    modeloNave.create();

    sol = new Esfera(30, 30, getColor("yellow"), true);
    sol.initBuffers(false);
    sol.initTexture("images/sun.jpg");
    sol.initIluminationTexture("images/white.jpg");

    tierra = new Esfera(30, 30, getColor("light blue"), true);
    tierra.initBuffers(false);
    tierra.initTexture("images/earth_2.jpg");
    // Para testear reflexion en una esfera más fácilmente
    //tierra.initTexture("images/gray.jpg");
    //tierra.initReflectionTexture("images/refMap2.jpg");

    universo = new Esfera(30, 30, getColor("black"), true);
    universo.initBuffers(true);
    universo.initTexture("images/sky.jpg");

    astronauta = new Cubo(1.5, 3.0, 0.1, null, true);
    astronauta.initBuffers(true);
    astronauta.initTexture("images/astronauta256.png");

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    // Se configura el viewport dentro de área "canvas". En este caso se utiliza toda el área disponible
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    // Se habilita el color de borrado para la pantalla (Color Buffer) y otros buffers
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Para que los PNG se vean con la transparencia -> Astronauta
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.enable(gl.BLEND);

    tick();
}