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
		var colorCilindros = [0.2, 0.2, 0.2];//getColor("dark gray");
		//TODO: Arreglar el color de los cilindros union.
		var colorCilindrosUnion = [0.2, 0.2, 0.2];//getColor("gray");
		var esTexturada = false;
		var latitude_bands = 4;
		var longitude_bands = 20;

		this.seccionAntenaUno = new seccionAntena();
		this.seccionAntenaUno.initBuffers();

		this.seccionAntenaDos = new seccionAntena();
		this.seccionAntenaDos.initBuffers();

		this.seccionAntenaTres = new seccionAntena();
		this.seccionAntenaTres.initBuffers();

		this.seccionAntenaCuatro = new seccionAntena();
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
		var scaleCilindrosUnion = [0.5,0.5,0.3];
		var scaleCilindrosLargo = [0.05,0.05,11];

		var matrix_seccionAntenaUno = mat4.create();
	    mat4.identity(matrix_seccionAntenaUno);
	    mat4.multiply(matrix_seccionAntenaUno, matrix_seccionAntenaUno, modelMatrix);
	    this.seccionAntenaUno.draw(matrix_seccionAntenaUno);

	    var matrix_seccionAntenaDos = mat4.create();
	    mat4.identity(matrix_seccionAntenaDos);
	    mat4.multiply(matrix_seccionAntenaDos, matrix_seccionAntenaDos, modelMatrix);
	    mat4.translate(matrix_seccionAntenaDos, matrix_seccionAntenaDos, [0, 0, -2.4]);
	    this.seccionAntenaDos.draw(matrix_seccionAntenaDos);

		var matrix_seccionAntenaTres = mat4.create();
	    mat4.identity(matrix_seccionAntenaTres);
	    mat4.multiply(matrix_seccionAntenaTres, matrix_seccionAntenaTres, modelMatrix);
	    mat4.translate(matrix_seccionAntenaTres, matrix_seccionAntenaTres, [0, 0, 2.4]);
	    this.seccionAntenaTres.draw(matrix_seccionAntenaTres);

		var matrix_seccionAntenaCuatro = mat4.create();
	    mat4.identity(matrix_seccionAntenaCuatro);
	    mat4.multiply(matrix_seccionAntenaCuatro, matrix_seccionAntenaCuatro, modelMatrix);
	    mat4.translate(matrix_seccionAntenaCuatro, matrix_seccionAntenaCuatro, [0,0, 4.8]);
	    this.seccionAntenaCuatro.draw(matrix_seccionAntenaCuatro);

		var matrix_cilindroUnionUno = mat4.create();
	    mat4.identity(matrix_cilindroUnionUno);
	    mat4.multiply(matrix_cilindroUnionUno, matrix_cilindroUnionUno, modelMatrix);
	    mat4.translate(matrix_cilindroUnionUno, matrix_cilindroUnionUno, [0, -2, -0.1]);
	    mat4.scale(matrix_cilindroUnionUno, matrix_cilindroUnionUno, scaleCilindrosUnion);
	    this.cilindroUnionUno.draw(matrix_cilindroUnionUno);

		var matrix_cilindroUnionDos = mat4.create();
	    mat4.identity(matrix_cilindroUnionDos);
	    mat4.multiply(matrix_cilindroUnionDos, matrix_cilindroUnionDos, modelMatrix);
	    mat4.translate(matrix_cilindroUnionDos, matrix_cilindroUnionDos, [0, -2, -2.5]);
	    mat4.scale(matrix_cilindroUnionDos, matrix_cilindroUnionDos, scaleCilindrosUnion);
	    this.cilindroUnionDos.draw(matrix_cilindroUnionDos);

		var matrix_cilindroUnionTres = mat4.create();
	    mat4.identity(matrix_cilindroUnionTres);
	    mat4.multiply(matrix_cilindroUnionTres, matrix_cilindroUnionTres, modelMatrix);
	    mat4.translate(matrix_cilindroUnionTres, matrix_cilindroUnionTres, [0, -2, 2.3]);
	    mat4.scale(matrix_cilindroUnionTres, matrix_cilindroUnionTres, scaleCilindrosUnion);
	    this.cilindroUnionTres.draw(matrix_cilindroUnionTres);

		var matrix_cilindroUnionCuatro = mat4.create();
	    mat4.identity(matrix_cilindroUnionCuatro);
	    mat4.multiply(matrix_cilindroUnionCuatro, matrix_cilindroUnionCuatro, modelMatrix);
	    mat4.translate(matrix_cilindroUnionCuatro, matrix_cilindroUnionCuatro, [0, -2, 4.7]);
	    mat4.scale(matrix_cilindroUnionCuatro, matrix_cilindroUnionCuatro, scaleCilindrosUnion);
	    this.cilindroUnionCuatro.draw(matrix_cilindroUnionCuatro);

		var matrix_cilindroLargoUno = mat4.create();
	    mat4.identity(matrix_cilindroLargoUno);
	    mat4.multiply(matrix_cilindroLargoUno, matrix_cilindroLargoUno, modelMatrix);
	    mat4.translate(matrix_cilindroLargoUno, matrix_cilindroLargoUno, [0.1, -2, -4]);
	    mat4.scale(matrix_cilindroLargoUno, matrix_cilindroLargoUno, scaleCilindrosLargo);
	    this.cilindroLargoUno.draw(matrix_cilindroLargoUno);

		var matrix_cilindroLargoDos = mat4.create();
	    mat4.identity(matrix_cilindroLargoDos);
	    mat4.multiply(matrix_cilindroLargoDos, matrix_cilindroLargoDos, modelMatrix);
	    mat4.translate(matrix_cilindroLargoDos, matrix_cilindroLargoDos, [-0.1, -2, -4]);
	    mat4.scale(matrix_cilindroLargoDos, matrix_cilindroLargoDos, scaleCilindrosLargo);
	    this.cilindroLargoDos.draw(matrix_cilindroLargoDos);
	}
}