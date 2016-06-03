function CuerpoNave() {
    this.cuerpo = null;

    this.pata1 = null;
    this.pata2 = null;
    this.pata3 = null;

    this.create = function() {
        var color = [];
        color.push(getColor("brown"));
        color.push(getColor("red"));
        color.push(getColor("green"));
        color.push(getColor("blue"));
        color.push(getColor("yellow"));
        color.push(getColor("violet"));
        this.cuerpo = new CuerpoCentralNave();
        this.cuerpo.initBuffers();

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

        var model_matrix_cuerpo_central = mat4.create();
        mat4.identity(model_matrix_cuerpo_central);
        mat4.rotate(model_matrix_cuerpo_central, model_matrix_cuerpo, Math.PI/2, [0,1,0]);
        mat4.scale(model_matrix_cuerpo_central, model_matrix_cuerpo_central, [1.5,1.5,1.5]);
        this.cuerpo.draw(model_matrix_cuerpo_central);

        var posicionNave = vec3.create();
        vec3.set(posicionNave,1,1,1);
        vec3.transformMat4(traslacionNave, posicionNave, model_matrix_cuerpo);

        var model_matrix_pata1 = mat4.create();
        mat4.identity(model_matrix_pata1);
        mat4.translate(model_matrix_pata1, model_matrix_cuerpo, [-3,traslacionPatasNave,-7.5]);
        mat4.scale(model_matrix_pata1, model_matrix_pata1, [0.9,1,0.9]);
        this.pata1.draw(model_matrix_pata1);

        var model_matrix_pata2 = mat4.create();
        mat4.identity(model_matrix_pata2);
        mat4.translate(model_matrix_pata2, model_matrix_cuerpo, [3,traslacionPatasNave,-7.5]);
        mat4.scale(model_matrix_pata2, model_matrix_pata2, [0.9,1,0.9]);
        this.pata2.draw(model_matrix_pata2);

        var model_matrix_pata3 = mat4.create();
        mat4.identity(model_matrix_pata3);
        mat4.translate(model_matrix_pata3, model_matrix_cuerpo, [0,traslacionPatasNave-0.9,14]);
        mat4.scale(model_matrix_pata3, model_matrix_pata3, [1.0,0.85,1.0])
        this.pata3.draw(model_matrix_pata3);
    }
}