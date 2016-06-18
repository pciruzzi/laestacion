function drawScene() {
    // Se configura el viewport dentro de área ¨canvas¨. en este caso se utiliza toda el área disponible
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    
    // Se habilita el color de borrado para la pantalla (Color Buffer) y otros buffers
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

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
        vec3.set(eye_point, traslacionNave[0] + 15.0, traslacionNave[1] + 1.5, traslacionNave[2]);
        vec3.set(at_point, traslacionNave[0] - 15.0, traslacionNave[1] + 1.5, traslacionNave[2] + 1.0);

        mat4.lookAt(cameraMatrix, eye_point, at_point, up_point);
        mat4.rotateX(camaraAux, camaraAux, -cabezeoNave);
        mat4.rotateY(camaraAux, camaraAux, -viradaNave);
        mat4.rotateZ(camaraAux, camaraAux, rolidoNave);
        mat4.multiply(cameraMatrix, camaraAux, cameraMatrix);
    }

    if(camaraPersona) {
        vec3.set(eye_point, traslacionPersonaX, 1, traslacionPersonaZ);
        vec3.set(at_point, traslacionPersonaX, 1, traslacionPersonaZ - 1.0);

        mat4.lookAt(cameraMatrix, eye_point, at_point, up_point);
        mat4.rotateX(camaraAux, camaraAux, degToRad(rotarCamaraXPersona));
        mat4.rotateY(camaraAux, camaraAux, degToRad(rotarCamaraYPersona));
        mat4.multiply(cameraMatrix, camaraAux, cameraMatrix);
    }

    // ################################### CONTEXTO COLORES ###################################
    gl.useProgram(shaderProgramSimple);
    gl.uniformMatrix4fv(shaderProgramSimple.ViewMatrixUniform, false, cameraMatrix);
    gl.uniformMatrix4fv(shaderProgramSimple.pMatrixUniform, false, pMatrix);

    // Configuración de la luz
    // Se inicializan las variables asociadas con la iluminación
    var lighting = true;
    gl.uniform1i(shaderProgramSimple.useLightingUniform, lighting);
    var lightPosition = vec3.fromValues(500.0*Math.cos(rotacionSol), 0.0, 500.0*Math.sin(rotacionSol)); 
    //vec3.transformMat4(lightPosition, lightPosition, cameraMatrix);
    gl.uniform3fv(shaderProgramSimple.lightingDirectionUniform, lightPosition);

    // Configuramos la iluminación
    gl.uniform3f(shaderProgramSimple.ambientColorUniform, 0.3, 0.3, 0.3);
    gl.uniform3f(shaderProgramSimple.directionalColorUniform, 0.05, 0.05, 0.05);


    // Dibujamos la escena        
    var model_matrix_escena = mat4.create();
    mat4.identity(model_matrix_escena);
    mat4.rotate(model_matrix_escena, model_matrix_escena, Math.PI/2, [1,0,0]);
    mat4.rotate(model_matrix_escena, model_matrix_escena, Math.PI, [0,1,0]);

    // Matriz de modelado de la estacion
    var model_matrix_estacion = mat4.create();
    mat4.identity(model_matrix_estacion);
    mat4.scale(model_matrix_estacion, model_matrix_escena, [7.0, 7.0, 7.0]);
    //mat4.rotate(model_matrix_estacion, model_matrix_estacion, angle, [0,1,0]);
    estacion.draw(model_matrix_estacion);

    //Movimiento de las antenas
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

    //Movimientos del eje de las turbinas y demas
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

    //Movimiento de las patas
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

    modeloNave.draw(position_matrix_nave);

    // ################################### CONTEXTO TEXTURAS ###################################
    gl.useProgram(shaderProgramTextura);
    gl.uniformMatrix4fv(shaderProgramTextura.ViewMatrixUniform, false, cameraMatrix);
    gl.uniformMatrix4fv(shaderProgramTextura.pMatrixUniform, false, pMatrix);

    // Configuración de la luz
    // Se inicializan las variables asociadas con la iluminación
    var lighting = true;
    gl.uniform1i(shaderProgramTextura.useLightingUniform, lighting);
    var lightPosition = vec3.fromValues(500.0*Math.cos(rotacionSol), 0.0, 500.0*Math.sin(rotacionSol)); 
    //vec3.transformMat4(lightPosition, lightPosition, cameraMatrix);
    gl.uniform3fv(shaderProgramTextura.lightingDirectionUniform, lightPosition);

    // Configuramos la iluminación
    gl.uniform3f(shaderProgramTextura.ambientColorUniform, 0.3, 0.3, 0.3);
    gl.uniform3f(shaderProgramTextura.directionalColorUniform, 0.05, 0.05, 0.05);

    // Matriz de modelado del sol
    var model_matrix_sol = mat4.create();
    mat4.identity(model_matrix_sol);
    mat4.translate(model_matrix_sol, model_matrix_escena, [0.0, 0.0, -300.0]);
    mat4.rotate(model_matrix_sol, model_matrix_sol, -rotacionSol, [0,0,1]);
    mat4.translate(model_matrix_sol, model_matrix_sol, [500.0, 0.0, 0.0]);
    mat4.scale(model_matrix_sol, model_matrix_sol, [20.0, 20.0, 20.0]);
    sol.draw(model_matrix_sol, shaderProgramTextura);

    // Matriz de modelado de la tierra
    var model_matrix_tierra = mat4.create();
    mat4.identity(model_matrix_tierra);
    mat4.translate(model_matrix_tierra, model_matrix_escena, [0.0, 0.0, -300.0]);
    mat4.rotate(model_matrix_tierra, model_matrix_tierra, Math.PI/2, [1,0,0]);
    mat4.scale(model_matrix_tierra, model_matrix_tierra, [200.0, 200.0, 200.0]);
    tierra.draw(model_matrix_tierra, shaderProgramTextura);
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
    sol.initBuffers();
    sol.initTexture("images/sun.jpg");

    tierra = new Esfera(30, 30, getColor("light blue"), true);
    tierra.initBuffers();
    tierra.initTexture("images/earth_2.jpg");
    
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    tick();
}