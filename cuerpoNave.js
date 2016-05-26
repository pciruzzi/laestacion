function CuerpoNave() {
    this.parte1 = null;

    this.punto1 = [0,0,8];
    this.punto2 = [8,0,8];
    this.punto3 = [9,-10,9];
    this.punto4 = [-1,-10,9];
    this.punto5 = [0,0,0];
    this.punto6 = [8,0,0];
    this.punto7 = [9,-10,-1];
    this.punto8 = [-1,-10,-1];

    this.create = function() {
        this.parte1 = new Cubo(10.0, 17.0, 30.0, getColor("red"), false);
        //this.parte1 = new Paralelepipedo(this.punto1, this.punto2, this.punto3, this.punto4, this.punto5, this.punto6, this.punto7, this.punto8, getColor("red"), false);
        this.parte1.initBuffers();
    }

    this.draw = function(modelMatrix) {
        //Aplico las transformaciones que aplican a todo el cuerpo de la nave
        var model_matrix_cuerpo = mat4.create();
        mat4.identity(model_matrix_cuerpo);
        mat4.multiply(model_matrix_cuerpo, model_matrix_cuerpo, modelMatrix);

        this.parte1.draw(model_matrix_cuerpo);
    }
}