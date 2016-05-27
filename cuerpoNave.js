function CuerpoNave() {
    this.parte1 = null;

    this.pata1 = null;
    this.pata2 = null;
    this.pata3 = null;

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

        this.pata1 = new Pata();
        this.pata1.create();
        this.pata2 = new Pata();
        this.pata2.create();
        this.pata3 = new Pata();
        this.pata3.create();
    }

    this.draw = function(modelMatrix) {
        //Aplico las transformaciones que aplican a todo el cuerpo de la nave
        var model_matrix_cuerpo = mat4.create();
        mat4.identity(model_matrix_cuerpo);
        mat4.multiply(model_matrix_cuerpo, model_matrix_cuerpo, modelMatrix);

        this.parte1.draw(model_matrix_cuerpo);

        var model_matrix_pata1 = mat4.create();
        mat4.identity(model_matrix_pata1);
        mat4.translate(model_matrix_pata1, model_matrix_cuerpo, [-5,traslacionPatasNave-0.1,-10]);
        this.pata1.draw(model_matrix_pata1);

        var model_matrix_pata2 = mat4.create();
        mat4.identity(model_matrix_pata2);
        mat4.translate(model_matrix_pata2, model_matrix_cuerpo, [5,traslacionPatasNave-0.1,-10]);
        this.pata2.draw(model_matrix_pata2);

        var model_matrix_pata3 = mat4.create();
        mat4.identity(model_matrix_pata3);
        mat4.translate(model_matrix_pata3, model_matrix_cuerpo, [0,traslacionPatasNave-0.1,10]);
        this.pata3.draw(model_matrix_pata3);
    }
}