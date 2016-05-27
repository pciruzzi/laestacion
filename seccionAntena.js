function SeccionAntena() {

    this.panelUno = null;
    this.panelDos = null;
    this.panelTres = null;
    this.panelCuatro = null;
    this.cilindroVerticalUno = null;
    this.cilindroVerticalDos = null;
    this.cilindroHorizontal = null;

    this.initBuffers = function() {
        var alto = 0.75;
        var ancho = 2.5;
        var profundo = 0.05;
        var colorAntenas = getColor("opaque blue");
        //Cambiar el color entre antenas y cilindros.
        var colorCilindros = [0.2, 0.2, 0.2];//getColor("dark gray");
        var esTexturada = false;
        var latitude_bands = 64;
        var longitude_bands = 64;

        this.panelUno = new Cubo(alto, ancho, profundo, colorAntenas, esTexturada);
        this.panelUno.initBuffers();

        this.panelDos = new Cubo(alto, ancho, profundo, colorAntenas, esTexturada);
        this.panelDos.initBuffers();

        this.panelTres = new Cubo(alto, ancho, profundo, colorAntenas, esTexturada);
        this.panelTres.initBuffers();

        this.panelCuatro = new Cubo(alto, ancho, profundo, colorAntenas, esTexturada);
        this.panelCuatro.initBuffers();

        this.cilindroVerticalUno = new Cilindro(latitude_bands, longitude_bands, colorCilindros, esTexturada);
        this.cilindroVerticalUno.initBuffers();

        this.cilindroVerticalDos = new Cilindro(latitude_bands, longitude_bands, colorCilindros, esTexturada);
        this.cilindroVerticalDos.initBuffers();

        this.cilindroHorizontal = new Cilindro(latitude_bands, longitude_bands, colorCilindros, esTexturada);
        this.cilindroHorizontal.initBuffers();
    }

    this.draw = function(modelMatrix) {
        var rotationAngle = Math.PI/2;

        var matrix_panelUno = mat4.create();
        mat4.identity(matrix_panelUno);
        mat4.multiply(matrix_panelUno, matrix_panelUno, modelMatrix);
        mat4.translate(matrix_panelUno, matrix_panelUno, [-0.02, 0, 0.6]);
        mat4.rotate(matrix_panelUno,matrix_panelUno,rotationAngle,[1,0,0]);
        this.panelUno.draw(matrix_panelUno);

        var matrix_panelDos = mat4.create();
        mat4.identity(matrix_panelDos);
        mat4.multiply(matrix_panelDos, matrix_panelDos, modelMatrix);
        mat4.translate(matrix_panelDos, matrix_panelDos, [3.98, 0, 0.6]);
        mat4.rotate(matrix_panelDos,matrix_panelDos,rotationAngle,[1,0,0]);
        this.panelDos.draw(matrix_panelDos);

        var matrix_panelTres = mat4.create();
        mat4.identity(matrix_panelTres);
        mat4.multiply(matrix_panelTres, matrix_panelTres, modelMatrix);
        mat4.translate(matrix_panelTres, matrix_panelTres, [-0.02, 0, -0.6]);
        mat4.rotate(matrix_panelTres,matrix_panelTres,rotationAngle,[1,0,0]);
        this.panelTres.draw(matrix_panelTres);

        var matrix_panelCuatro = mat4.create();
        mat4.identity(matrix_panelCuatro);
        mat4.multiply(matrix_panelCuatro, matrix_panelCuatro, modelMatrix);
        mat4.translate(matrix_panelCuatro, matrix_panelCuatro, [3.98, 0, -0.6]);
        mat4.rotate(matrix_panelCuatro,matrix_panelCuatro,rotationAngle,[1,0,0]);
        this.panelCuatro.draw(matrix_panelCuatro);

        var matrix_cilindroVerticalUno = mat4.create();
        mat4.identity(matrix_cilindroVerticalUno);
        mat4.multiply(matrix_cilindroVerticalUno, matrix_cilindroVerticalUno, modelMatrix);
        mat4.translate(matrix_cilindroVerticalUno, matrix_cilindroVerticalUno, [3.98, 0, -0.30]);
        mat4.scale(matrix_cilindroVerticalUno,matrix_cilindroVerticalUno,[0.05,0.05,0.60]);
        this.cilindroVerticalUno.draw(matrix_cilindroVerticalUno);

        var matrix_cilindroVerticalDos = mat4.create();
        mat4.identity(matrix_cilindroVerticalDos);
        mat4.multiply(matrix_cilindroVerticalDos, matrix_cilindroVerticalDos, modelMatrix);
        mat4.translate(matrix_cilindroVerticalDos, matrix_cilindroVerticalDos, [-0.02, 0, -0.30]);
        mat4.scale(matrix_cilindroVerticalDos,matrix_cilindroVerticalDos,[0.05,0.05,0.60]);
        this.cilindroVerticalDos.draw(matrix_cilindroVerticalDos);

        var matrix_cilindroHorizontal = mat4.create();
        mat4.identity(matrix_cilindroHorizontal);
        mat4.multiply(matrix_cilindroHorizontal, matrix_cilindroHorizontal, modelMatrix);
        mat4.rotate(matrix_cilindroHorizontal,matrix_cilindroHorizontal,rotationAngle,[0,1,0]);
        mat4.scale(matrix_cilindroHorizontal,matrix_cilindroHorizontal,[0.05,0.05,4.0]);
        this.cilindroHorizontal.draw(matrix_cilindroHorizontal);                    
    }
}