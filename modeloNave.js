function ModeloNave() {
	this.ejeTurbinas = null;
	this.cuerpo = null;

	this.create = function() {
		this.ejeTurbinas = new EjeTurbinas();
		this.ejeTurbinas.create();
		this.cuerpo = new CuerpoNave();
		this.cuerpo.create();
	}

	this.draw = function(modelMatrix) {
        //Aplico las transformaciones que aplican a toda la nave
        var model_matrix_nave = mat4.create();
        mat4.identity(model_matrix_nave);
        mat4.multiply(model_matrix_nave, model_matrix_nave, modelMatrix);
        mat4.rotate(model_matrix_nave, model_matrix_nave, Math.PI/2, [0,1,0]);

        //Aplico transformaciones a cada uno de los componentes de la nave
        var model_matrix_eje = mat4.create();
        mat4.identity(model_matrix_eje);
        mat4.rotate(model_matrix_eje, model_matrix_nave, rotacionEjeNave, [1,0,0]);
        this.ejeTurbinas.draw(model_matrix_eje);

        var model_matrix_cuerpo = mat4.create();
        mat4.identity(model_matrix_cuerpo);
        mat4.translate(model_matrix_cuerpo, model_matrix_nave, [0,0,0]);
        this.cuerpo.draw(model_matrix_cuerpo);
	}
}