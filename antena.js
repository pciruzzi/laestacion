function Antena(scaleX, scaleY, scaleZ) {

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

	this.escalaX = scaleX;
	this.escalaY = scaleY;
	this.escalaZ = scaleZ;

	this.initBuffers = function() { 
		var colorCilindros = [0.2,  0.2,  0.2];
		//TODO: Arreglar el color de los cilindros union.
		var colorCilindrosUnion = [0.2,  0.2,  0.2];
		var esTexturada = false;
		var latitude_bands = 64;
		var longitude_bands = 64;

		this.seccionAntenaUno = new seccionAntena(this.escalaX, this.escalaY, this.escalaZ);
		this.seccionAntenaUno.initBuffers();

		this.seccionAntenaDos = new seccionAntena(this.escalaX, this.escalaY, this.escalaZ);
		this.seccionAntenaDos.initBuffers();

		this.seccionAntenaTres = new seccionAntena(this.escalaX, this.escalaY, this.escalaZ);
		this.seccionAntenaTres.initBuffers();

		this.seccionAntenaCuatro = new seccionAntena(this.escalaX, this.escalaY, this.escalaZ);
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

	this.draw = function(modelMatrix) {
		//TODO: Hay que transladar, rotar y escalar algunos elementos.

		var matrix_seccionAntenaUno = mat4.create();
	    mat4.identity(matrix_seccionAntenaUno);
	    mat4.multiply(matrix_seccionAntenaUno, matrix_seccionAntenaUno, modelMatrix);
	    //mat4.translate(matrix_seccionAntenaUno, matrix_seccionAntenaUno, [x * this.escalaX, y * this.escalaY, z * escalaZ]);
	    this.seccionAntenaUno.draw(matrix_seccionAntenaUno);

	    var matrix_seccionAntenaDos = mat4.create();
	    mat4.identity(matrix_seccionAntenaDos);
	    mat4.multiply(matrix_seccionAntenaDos, matrix_seccionAntenaDos, modelMatrix);
	    //mat4.translate(matrix_seccionAntenaDos, matrix_seccionAntenaDos, [x * this.escalaX, y * this.escalaY, z * escalaZ]);
	    this.seccionAntenaDos.draw(matrix_seccionAntenaDos);

		var matrix_seccionAntenaTres = mat4.create();
	    mat4.identity(matrix_seccionAntenaTres);
	    mat4.multiply(matrix_seccionAntenaTres, matrix_seccionAntenaTres, modelMatrix);
	    //mat4.translate(matrix_seccionAntenaTres, matrix_seccionAntenaTres, [x * this.escalaX, y * this.escalaY, z * escalaZ]);
	    this.seccionAntenaTres.draw(matrix_seccionAntenaTres);

		var matrix_seccionAntenaCuatro = mat4.create();
	    mat4.identity(matrix_seccionAntenaCuatro);
	    mat4.multiply(matrix_seccionAntenaCuatro, matrix_seccionAntenaCuatro, modelMatrix);
	    //mat4.translate(matrix_seccionAntenaCuatro, matrix_seccionAntenaCuatro, [x * this.escalaX, y * this.escalaY, z * escalaZ]);
	    this.seccionAntenaCuatro.draw(matrix_seccionAntenaCuatro);

		var matrix_cilindroUnionUno = mat4.create();
	    mat4.identity(matrix_cilindroUnionUno);
	    mat4.multiply(matrix_cilindroUnionUno, matrix_cilindroUnionUno, modelMatrix);
	    //mat4.translate(matrix_cilindroUnionUno, matrix_cilindroUnionUno, [x * this.escalaX, y * this.escalaY, z * escalaZ]);
	    this.cilindroUnionUno.draw(matrix_cilindroUnionUno);

		var matrix_cilindroUnionDos = mat4.create();
	    mat4.identity(matrix_cilindroUnionDos);
	    mat4.multiply(matrix_cilindroUnionDos, matrix_cilindroUnionDos, modelMatrix);
	    //mat4.translate(matrix_cilindroUnionDos, matrix_cilindroUnionDos, [x * this.escalaX, y * this.escalaY, z * escalaZ]);
	    this.cilindroUnionDos.draw(matrix_cilindroUnionDos);

		var matrix_cilindroUnionTres = mat4.create();
	    mat4.identity(matrix_cilindroUnionTres);
	    mat4.multiply(matrix_cilindroUnionTres, matrix_cilindroUnionTres, modelMatrix);
	    //mat4.translate(matrix_cilindroUnionTres, matrix_cilindroUnionTres, [x * this.escalaX, y * this.escalaY, z * escalaZ]);
	    this.cilindroUnionTres.draw(matrix_cilindroUnionTres);

		var matrix_cilindroUnionCuatro = mat4.create();
	    mat4.identity(matrix_cilindroUnionCuatro);
	    mat4.multiply(matrix_cilindroUnionCuatro, matrix_cilindroUnionCuatro, modelMatrix);
	    //mat4.translate(matrix_cilindroUnionCuatro, matrix_cilindroUnionCuatro, [x * this.escalaX, y * this.escalaY, z * escalaZ]);
	    this.cilindroUnionCuatro.draw(matrix_cilindroUnionCuatro);

		var matrix_cilindroLargoUno = mat4.create();
	    mat4.identity(matrix_cilindroLargoUno);
	    mat4.multiply(matrix_cilindroLargoUno, matrix_cilindroLargoUno, modelMatrix);
	    //mat4.translate(matrix_cilindroLargoUno, matrix_cilindroLargoUno, [x * this.escalaX, y * this.escalaY, z * escalaZ]);
	    this.cilindroLargoUno.draw(matrix_cilindroLargoUno);

		var matrix_cilindroLargoDos = mat4.create();
	    mat4.identity(matrix_cilindroLargoDos);
	    mat4.multiply(matrix_cilindroLargoDos, matrix_cilindroLargoDos, modelMatrix);
	    //mat4.translate(matrix_cilindroLargoDos, matrix_cilindroLargoDos, [x * this.escalaX, y * this.escalaY, z * escalaZ]);
	    this.cilindroLargoDos.draw(matrix_cilindroLargoDos);
	}
}