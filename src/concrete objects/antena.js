function Antena() {
    this.seccionAntenaUno = null;
    this.seccionAntenaDos = null;
    this.seccionAntenaTres = null;
    this.seccionAntenaCuatro = null;
    this.cilindroUnionUno = null;
    this.cilindroUnionDos = null;
    this.cilindroUnionTres = null;
    this.cilindroUnionCuatro = null;
    this.cilindroLargoUno = null;
    this.cilindroLargoDos = null;

    this.initBuffers = function() {
        var colorCilindros = getColor("gray2");
        var colorCilindrosUnion = getColor("gray2");
        var esTexturada = false;
        var latitude_bands = 4;
        var longitude_bands = 20;

        this.seccionAntenaUno = new SeccionAntena();
        this.seccionAntenaUno.initBuffers();

        this.seccionAntenaDos = new SeccionAntena();
        this.seccionAntenaDos.initBuffers();

        this.seccionAntenaTres = new SeccionAntena();
        this.seccionAntenaTres.initBuffers();

        this.seccionAntenaCuatro = new SeccionAntena();
        this.seccionAntenaCuatro.initBuffers();

        this.cilindroUnionUno = new Cilindro(latitude_bands, longitude_bands, colorCilindrosUnion, esTexturada);
        this.cilindroUnionUno.initBuffers();

        this.cilindroUnionDos = new Cilindro(latitude_bands, longitude_bands, colorCilindrosUnion, esTexturada);
        this.cilindroUnionDos.initBuffers();

        this.cilindroUnionTres = new Cilindro(latitude_bands, longitude_bands, colorCilindrosUnion, esTexturada);
        this.cilindroUnionTres.initBuffers();

        this.cilindroUnionCuatro = new Cilindro(latitude_bands, longitude_bands, colorCilindrosUnion, esTexturada);
        this.cilindroUnionCuatro.initBuffers();

        this.cilindroLargoUno = new Cilindro(latitude_bands, longitude_bands, colorCilindros, esTexturada);
        this.cilindroLargoUno.initBuffers();

        this.cilindroLargoDos = new Cilindro(latitude_bands, longitude_bands, colorCilindros, esTexturada);
        this.cilindroLargoDos.initBuffers();
    }

    this.draw = function(modelMatrix, rotacionPlegado, shaderProgram) {
        var scaleCilindrosUnion = [0.5,0.5,0.3];
        var scaleCilindrosLargo = [0.05,0.05,11];

        var matrix_seccionAntenaUno = mat4.create();
        mat4.identity(matrix_seccionAntenaUno);
        mat4.translate(matrix_seccionAntenaUno, modelMatrix, [-1.98, -2, 0]);
        mat4.rotate(matrix_seccionAntenaUno, matrix_seccionAntenaUno, rotacionPlegado, [1,0,0]);
        this.seccionAntenaUno.draw(matrix_seccionAntenaUno, shaderProgram);

        var matrix_seccionAntenaDos = mat4.create();
        mat4.identity(matrix_seccionAntenaDos);
        mat4.multiply(matrix_seccionAntenaDos, matrix_seccionAntenaDos, modelMatrix);
        if (3.2 < traslacionPlegadoAntena && traslacionPlegadoAntena < 4.8) mat4.translate(matrix_seccionAntenaDos, matrix_seccionAntenaDos, [0,0,-traslacionPlegadoAntena+3.2]);
        if (4.8 <= traslacionPlegadoAntena) mat4.translate(matrix_seccionAntenaDos, matrix_seccionAntenaDos, [0,0,-4.8+3.2]);
        mat4.translate(matrix_seccionAntenaDos, matrix_seccionAntenaDos, [0, 0, 2.4]);
        mat4.translate(matrix_seccionAntenaDos, matrix_seccionAntenaDos, [-1.98, -2, 0]);
        mat4.rotate(matrix_seccionAntenaDos, matrix_seccionAntenaDos, rotacionPlegado, [1,0,0]);
        this.seccionAntenaDos.draw(matrix_seccionAntenaDos, shaderProgram);

        var matrix_seccionAntenaTres = mat4.create();
        mat4.identity(matrix_seccionAntenaTres);
        mat4.multiply(matrix_seccionAntenaTres, matrix_seccionAntenaTres, modelMatrix);
        if (1.6 < traslacionPlegadoAntena && traslacionPlegadoAntena < 4.8) mat4.translate(matrix_seccionAntenaTres, matrix_seccionAntenaTres, [0,0,-traslacionPlegadoAntena+1.6]);
        if (4.8 <= traslacionPlegadoAntena) mat4.translate(matrix_seccionAntenaTres, matrix_seccionAntenaTres, [0,0,-4.8+1.6]);
        mat4.translate(matrix_seccionAntenaTres, matrix_seccionAntenaTres, [0, 0, 4.8]);
        mat4.translate(matrix_seccionAntenaTres, matrix_seccionAntenaTres, [-1.98, -2, 0]);
        mat4.rotate(matrix_seccionAntenaTres, matrix_seccionAntenaTres, rotacionPlegado, [1,0,0]);
        this.seccionAntenaTres.draw(matrix_seccionAntenaTres, shaderProgram);

        var matrix_seccionAntenaCuatro = mat4.create();
        mat4.identity(matrix_seccionAntenaCuatro);
        mat4.multiply(matrix_seccionAntenaCuatro, matrix_seccionAntenaCuatro, modelMatrix);
        if (0 < traslacionPlegadoAntena && traslacionPlegadoAntena < 4.8) mat4.translate(matrix_seccionAntenaCuatro, matrix_seccionAntenaCuatro, [0,0,-traslacionPlegadoAntena]);
        if (4.8 <= traslacionPlegadoAntena) mat4.translate(matrix_seccionAntenaCuatro, matrix_seccionAntenaCuatro, [0,0,-4.8]);
        mat4.translate(matrix_seccionAntenaCuatro, matrix_seccionAntenaCuatro, [0,0, 7.2]);
        mat4.translate(matrix_seccionAntenaCuatro, matrix_seccionAntenaCuatro, [-1.98, -2, 0]);
        mat4.rotate(matrix_seccionAntenaCuatro, matrix_seccionAntenaCuatro, rotacionPlegado, [1,0,0]);
        this.seccionAntenaCuatro.draw(matrix_seccionAntenaCuatro, shaderProgram);

        var matrix_cilindroUnionUno = mat4.create();
        mat4.identity(matrix_cilindroUnionUno);
        mat4.multiply(matrix_cilindroUnionUno, matrix_cilindroUnionUno, modelMatrix);
        mat4.translate(matrix_cilindroUnionUno, matrix_cilindroUnionUno, [0, -2, -0.1]);
        mat4.scale(matrix_cilindroUnionUno, matrix_cilindroUnionUno, scaleCilindrosUnion);
        this.cilindroUnionDos.draw(matrix_cilindroUnionUno, shaderProgram);

        var matrix_cilindroUnionDos = mat4.create();
        mat4.identity(matrix_cilindroUnionDos);
        mat4.multiply(matrix_cilindroUnionDos, matrix_cilindroUnionDos, modelMatrix);
        if (3.2 < traslacionPlegadoAntena && traslacionPlegadoAntena < 4.8) mat4.translate(matrix_cilindroUnionDos, matrix_cilindroUnionDos, [0,0,-traslacionPlegadoAntena+3.2]);
        if (4.8 <= traslacionPlegadoAntena) mat4.translate(matrix_cilindroUnionDos, matrix_cilindroUnionDos, [0,0,-4.8+3.2]);
        mat4.translate(matrix_cilindroUnionDos, matrix_cilindroUnionDos, [0, -2, 2.3]);
        mat4.scale(matrix_cilindroUnionDos, matrix_cilindroUnionDos, scaleCilindrosUnion);
        this.cilindroUnionUno.draw(matrix_cilindroUnionDos, shaderProgram);

        var matrix_cilindroUnionTres = mat4.create();
        mat4.identity(matrix_cilindroUnionTres);
        mat4.multiply(matrix_cilindroUnionTres, matrix_cilindroUnionTres, modelMatrix);
        if (1.6 < traslacionPlegadoAntena && traslacionPlegadoAntena < 4.8) mat4.translate(matrix_cilindroUnionTres, matrix_cilindroUnionTres, [0,0,-traslacionPlegadoAntena+1.6]);
        if (4.8 <= traslacionPlegadoAntena) mat4.translate(matrix_cilindroUnionTres, matrix_cilindroUnionTres, [0,0,-4.8+1.6]);
        mat4.translate(matrix_cilindroUnionTres, matrix_cilindroUnionTres, [0, -2, 4.7]);
        mat4.scale(matrix_cilindroUnionTres, matrix_cilindroUnionTres, scaleCilindrosUnion);
        this.cilindroUnionTres.draw(matrix_cilindroUnionTres, shaderProgram);

        var matrix_cilindroUnionCuatro = mat4.create();
        mat4.identity(matrix_cilindroUnionCuatro);
        mat4.multiply(matrix_cilindroUnionCuatro, matrix_cilindroUnionCuatro, modelMatrix);
        if (0 < traslacionPlegadoAntena && traslacionPlegadoAntena < 4.8) mat4.translate(matrix_cilindroUnionCuatro, matrix_cilindroUnionCuatro, [0,0,-traslacionPlegadoAntena]);
        if (4.8 <= traslacionPlegadoAntena) mat4.translate(matrix_cilindroUnionCuatro, matrix_cilindroUnionCuatro, [0,0,-4.8]);
        mat4.translate(matrix_cilindroUnionCuatro, matrix_cilindroUnionCuatro, [0, -2, 7.1]);
        mat4.scale(matrix_cilindroUnionCuatro, matrix_cilindroUnionCuatro, scaleCilindrosUnion);
        this.cilindroUnionCuatro.draw(matrix_cilindroUnionCuatro, shaderProgram);

        var matrix_cilindroLargoUno = mat4.create();
        mat4.identity(matrix_cilindroLargoUno);
        mat4.translate(matrix_cilindroLargoUno, modelMatrix, [0.1, -2, -1.6]);
        mat4.scale(matrix_cilindroLargoUno, matrix_cilindroLargoUno, scaleCilindrosLargo);
        this.cilindroLargoUno.draw(matrix_cilindroLargoUno, shaderProgram);

        var matrix_cilindroLargoDos = mat4.create();
        mat4.identity(matrix_cilindroLargoDos);
        mat4.translate(matrix_cilindroLargoDos, modelMatrix, [-0.1, -2, -1.6]);
        mat4.scale(matrix_cilindroLargoDos, matrix_cilindroLargoDos, scaleCilindrosLargo);
        this.cilindroLargoDos.draw(matrix_cilindroLargoDos, shaderProgram);
    }
}