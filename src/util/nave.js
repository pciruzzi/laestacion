function Nave() {

    var posicion = vec3.fromValues(0,0,0);

    this.TECLA_ARRIBA = 0;
    this.TECLA_ABAJO = 1;
    this.TECLA_IZQUIERDA = 2;
    this.TECLA_DERECHA = 3;
    this.TECLA_MAS = 4;
    this.TECLA_MENOS = 5;
    this.TECLA_GIRO_HORARIO = 6;
    this.TECLA_GIRO_ANTIHORARIO = 7;

    var estadoTeclas = [false, false, false, false, false, false];
    var rotacion = mat4.create();
    mat4.identity(rotacion);

    /*
        +X frente de la nave
        +Y techo de la nave
        +Z

    */

    var potenciaMotor = 0.01;
    var direccion = vec3.fromValues(0,0,0);
    var velocidad = 0;
    var angCabezeo = 0; // Z
    var anguloCabezeoTotal = 0;
    var angRolido = 0; // respecto del X de la Nave
    var anguloRolidoTotal = 0;
    var angVirada = 0;
    var anguloViradaTotal = 0;

    var momento = vec3.fromValues(0,0,0);

    this.step=function(){

        angCabezeo = 0;
        angCabezeo = (estadoTeclas[this.TECLA_ARRIBA]) ? -0.005 : angCabezeo;
        angCabezeo = (estadoTeclas[this.TECLA_ABAJO])  ?  0.005 : angCabezeo;

        anguloCabezeoTotal += (estadoTeclas[this.TECLA_ARRIBA]) ? -0.005 : 0;
        anguloCabezeoTotal += (estadoTeclas[this.TECLA_ABAJO])  ?  0.005 : 0;

        angRolido = 0;
        angRolido = (estadoTeclas[this.TECLA_GIRO_HORARIO])     ? -0.005 : angRolido;
        angRolido = (estadoTeclas[this.TECLA_GIRO_ANTIHORARIO]) ?  0.005 : angRolido;

        anguloRolidoTotal += (estadoTeclas[this.TECLA_GIRO_HORARIO]) ? -0.005 : 0;
        anguloRolidoTotal += (estadoTeclas[this.TECLA_GIRO_ANTIHORARIO])  ?  0.005 : 0;

        angVirada = 0;
        angVirada = (estadoTeclas[this.TECLA_IZQUIERDA]) ? -0.005 : angVirada;
        angVirada = (estadoTeclas[this.TECLA_DERECHA])   ?  0.005 : angVirada;

        anguloViradaTotal += (estadoTeclas[this.TECLA_IZQUIERDA]) ? -0.005 : 0;
        anguloViradaTotal += (estadoTeclas[this.TECLA_DERECHA])  ?  0.005 : 0;

        var impulso = 0;
        impulso = (estadoTeclas[this.TECLA_MAS])   ?  0.5 : impulso;
        impulso = (estadoTeclas[this.TECLA_MENOS]) ? -0.5 : impulso;

        velocidad += impulso;
        // Para que no sea dificil volver a arrancar...
        if (velocidad < 0) velocidad = 0;

        var ejeX = vec3.fromValues(1,0,0);
        mat4.rotate(rotacion, rotacion, angRolido, ejeX);

        var ejeZ = vec3.fromValues(0,0,1);
        mat4.rotate(rotacion, rotacion, angCabezeo, ejeZ);

        var ejeY = vec3.fromValues(0,1,0);
        mat4.rotate(rotacion, rotacion, angVirada, ejeY);

        direccion = vec3.fromValues(Math.max(0.0001, velocidad), 0, 0);
        vec3.transformMat4(direccion, direccion, rotacion);

        var inercia = 0.99;
        momento[0] = momento[0] * inercia + direccion[0] * 0.0001;
        momento[1] = momento[1] * inercia + direccion[1] * 0.0001;
        momento[2] = momento[2] * inercia + direccion[2] * 0.0001;

        vec3.add(posicion, posicion, momento);
    };

    this.onTeclaDown = function(tecla) {
        var n = parseInt(tecla);
        if (!isNaN(n)) estadoTeclas[n] = true;
    }

    this.onTeclaUp = function(tecla) {
        var n = parseInt(tecla);
        if (!isNaN(n)) estadoTeclas[n] = false;
    }

    this.getMatriz = function(){
        var m = mat4.create();
        mat4.translate(m, m, posicion);
        mat4.multiply(m, m, rotacion);
        return m;
    }

    this.getVelocidad = function() {
        return velocidad;
    }

    this.getDireccion = function() {
        var dir = vec3.create();
        vec3.normalize(dir,direccion);
        return dir;
    }

    this.getTeclaUp = function() {
        return estadoTeclas[this.TECLA_ARRIBA];
    }

    this.getTeclaDown = function() {
        return estadoTeclas[this.TECLA_ABAJO];
    }

    this.getAnguloCabezeo = function() {
        if (anguloCabezeoTotal > Math.PI*2) {
            anguloCabezeoTotal -= Math.PI*2
        } else if (anguloCabezeoTotal < -Math.PI*2) {
            anguloCabezeoTotal += Math.PI*2;
        }
        return anguloCabezeoTotal;
    }

    this.getAnguloRolido = function() {
        if (anguloRolidoTotal > Math.PI*2) {
            anguloRolidoTotal -= Math.PI*2
        } else if (anguloRolidoTotal < -Math.PI*2) {
            anguloRolidoTotal += Math.PI*2;
        }
        return anguloRolidoTotal;
    }

    this.getAnguloVirada = function() {
        if (anguloViradaTotal > Math.PI*2) {
            anguloViradaTotal -= Math.PI*2
        } else if (anguloViradaTotal < -Math.PI*2) {
            anguloViradaTotal += Math.PI*2;
        }
        return anguloViradaTotal;
    }
}