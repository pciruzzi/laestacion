function Estacion() {
    this.parteCentral = null;
    this.parteExterior = null;

    this.create = function() {
        this.parteCentral = new parteCentral();
        this.parteCentral.create();
        this.parteExterior = new parteExterior();
        this.parteExterior.create();
    }

    this.draw = function(modelMatrix) {
        //Aplico las transformaciones que aplican a toda la estacion
        var model_matrix_estacion = mat4.create();
        mat4.identity(model_matrix_estacion);
        mat4.multiply(model_matrix_estacion, model_matrix_estacion, modelMatrix);

        //Llamo a cada uno de los elementos para que se dibujen con la nueva matriz
        var model_matrix_central = mat4.create();
        mat4.identity(model_matrix_central);
        mat4.rotate(model_matrix_central, model_matrix_estacion, Math.PI/4, [0,0,1]);
        this.parteCentral.draw(model_matrix_central);
        this.parteExterior.draw(model_matrix_estacion);
    }
}
