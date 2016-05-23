function seccionAntena(scaleX, scaleY, scaleZ) {

	this.panelUno = null;
	this.panelDos = null;
	this.panelTres = null;
	this.panelCuatro = null;
	this.cilindroVerticalUno = null;
	this.cilindroVerticalDos = null;
	this.cilindroHorizontalUno = null;
	this.cilindroHorizontalDos = null;

	this.escalaX = scaleX;
	this.escalaY = scaleY;
	this.escalaZ = scaleZ;

	this.initBuffers = function() {
		var alto = 1.0;
		var ancho = 3.0;
		var profundo = 0.05;
		var colorAntenas = [0.2,  0.2,  0.2];
		//Cambiar el color entre antenas y cilindros.
		var colorCilindros = [0.2,  0.2,  0.2];
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

		this.cilindroVerticalUno = Cilindro(latitude_bands, longitude_bands, colorCilindros, esTexturada);
		this.cilindroVerticalUno.initBuffers();

		this.cilindroVerticalDos = Cilindro(latitude_bands, longitude_bands, colorCilindros, esTexturada);
		this.cilindroVerticalDos.initBuffers();

		this.cilindroHorizontalUno = Cilindro(latitude_bands, longitude_bands, colorCilindros, esTexturada);
		this.cilindroHorizontalUno.initBuffers();

		this.cilindroHorizontalDos = Cilindro(latitude_bands, longitude_bands, colorCilindros, esTexturada);
		this.cilindroHorizontalDos.initBuffers();

	}

	this.draw = function(modelMatrix) {
		//TODO: Hay que transladar, rotar y escalar algunos elementos.

		var matrix_panelUno = mat4.create();
	    mat4.identity(matrix_panelUno);
	    mat4.multiply(matrix_panelUno, matrix_panelUno, modelMatrix);
	    //mat4.translate(matrix_panelUno, matrix_panelUno, [x * this.escalaX, y * this.escalaY, z * escalaZ]);
	    this.panelUno.draw(matrix_panelUno);

		var matrix_panelDos = mat4.create();
	    mat4.identity(matrix_panelDos);
	    mat4.multiply(matrix_panelDos, matrix_panelDos, modelMatrix);
	    //mat4.translate(matrix_panelDos, matrix_panelDos, [x * this.escalaX, y * this.escalaY, z * escalaZ]);
	    this.panelDos.draw(matrix_panelDos);

		var matrix_panelTres = mat4.create();
	    mat4.identity(matrix_panelTres);
	    mat4.multiply(matrix_panelTres, matrix_panelTres, modelMatrix);
	    //mat4.translate(matrix_panelTres, matrix_panelTres, [x * this.escalaX, y * this.escalaY, z * escalaZ]);
	    this.panelTres.draw(matrix_panelTres);

		var matrix_panelCuatro = mat4.create();
	    mat4.identity(matrix_panelCuatro);
	    mat4.multiply(matrix_panelCuatro, matrix_panelCuatro, modelMatrix);
	    //mat4.translate(matrix_panelCuatro, matrix_panelCuatro, [x * this.escalaX, y * this.escalaY, z * escalaZ]);
	    this.panelCuatro.draw(matrix_panelCuatro);

		var matrix_cilindroVerticalUno = mat4.create();
	    mat4.identity(matrix_cilindroVerticalUno);
	    mat4.multiply(matrix_cilindroVerticalUno, matrix_cilindroVerticalUno, modelMatrix);
	    //mat4.translate(matrix_cilindroVerticalUno, matrix_cilindroVerticalUno, [x * this.escalaX, y * this.escalaY, z * escalaZ]);
	    this.cilindroVerticalUno.draw(matrix_cilindroVerticalUno);

		var matrix_cilindroVerticalDos = mat4.create();
	    mat4.identity(matrix_cilindroVerticalDos);
	    mat4.multiply(matrix_cilindroVerticalDos, matrix_cilindroVerticalDos, modelMatrix);
	    //mat4.translate(matrix_cilindroVerticalDos, matrix_cilindroVerticalDos, [x * this.escalaX, y * this.escalaY, z * escalaZ]);
	    this.cilindroVerticalDos.draw(matrix_cilindroVerticalDos);

		var matrix_cilindroHorizontalUno = mat4.create();
	    mat4.identity(matrix_cilindroHorizontalUno);
	    mat4.multiply(matrix_cilindroHorizontalUno, matrix_cilindroHorizontalUno, modelMatrix);
	    //mat4.translate(matrix_cilindroHorizontalUno, matrix_cilindroHorizontalUno, [x * this.escalaX, y * this.escalaY, z * escalaZ]);
	    this.cilindroHorizontalUno.draw(matrix_cilindroHorizontalUno);

		var matrix_cilindroHorizontalDos = mat4.create();
	    mat4.identity(matrix_cilindroHorizontalDos);
	    mat4.multiply(matrix_cilindroHorizontalDos, matrix_cilindroHorizontalDos, modelMatrix);
	    //mat4.translate(matrix_cilindroHorizontalDos, matrix_cilindroHorizontalDos, [x * this.escalaX, y * this.escalaY, z * escalaZ]);
	    this.cilindroHorizontalDos.draw(matrix_cilindroHorizontalDos);	    	    	    
	}

}