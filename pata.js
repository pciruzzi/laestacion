function Pata() {
    this.pata = null;
    this.base = null;

    this.create = function() {
        this.pata = new Cilindro(4, 20, getColor("blue"), false);
        this.pata.initBuffers();

        this.base = new Cilindro(4, 20, getColor("dark gray"), false);
        this.base.initBuffers();
    }

    this.draw = function(modelMatrix) {
        var model_matrix_pata = mat4.create();
        mat4.identity(model_matrix_pata);
        mat4.multiply(model_matrix_pata, model_matrix_pata, modelMatrix);
        mat4.rotate(model_matrix_pata, model_matrix_pata, Math.PI/2, [1,0,0]);
        mat4.scale(model_matrix_pata, model_matrix_pata, [1,1,6]);
        this.pata.draw(model_matrix_pata, shaderProgramSimple);

        var model_matrix_base = mat4.create();
        mat4.identity(model_matrix_base);
        mat4.multiply(model_matrix_base, model_matrix_base, modelMatrix);
        mat4.translate(model_matrix_base, model_matrix_base, [0,-6,0]);
        mat4.rotate(model_matrix_base, model_matrix_base, Math.PI/2, [1,0,0]);
        mat4.scale(model_matrix_base, model_matrix_base, [3,3,0.5]);
        this.base.draw(model_matrix_base, shaderProgramSimple);
    }
}