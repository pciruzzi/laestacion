function EjeTurbinas() {
    this.cilindro = null;

    this.turbina1 = null;
    this.turbina2 = null;
    this.turbina3 = null;
    this.turbina4 = null;

    this.unionTurbinas1y2 = null;
    this.unionTurbinas3y4 = null;

    this.create = function() {
        this.turbina1 = new Turbina();
        this.turbina1.create();
        this.turbina2 = new Turbina();
        this.turbina2.create();
        this.turbina3 = new Turbina();
        this.turbina3.create();
        this.turbina4 = new Turbina();
        this.turbina4.create();
        
        this.cilindro = new Cilindro(4, 20, getColor("brown"), false);
        this.cilindro.initBuffers();

        this.unionTurbinas1y2 = new Cubo(30.0, 2.0, 2.0, getColor("brown"), false);
        this.unionTurbinas1y2.initBuffers();
        this.unionTurbinas3y4 = new Cubo(30.0, 2.0, 2.0, getColor("brown"), false);
        this.unionTurbinas3y4.initBuffers();
    }

    this.draw = function(modelMatrix) {
        //Aplico las transformaciones que aplican a toda la nave
        var model_matrix_eje = mat4.create();
        mat4.identity(model_matrix_eje);
        mat4.multiply(model_matrix_eje, model_matrix_eje, modelMatrix);

        //Aplico transformaciones a cada uno de los componentes del eje
        var model_matrix_cilindro = mat4.create();
        mat4.identity(model_matrix_cilindro);
        mat4.translate(model_matrix_cilindro, model_matrix_eje, [-12.5, 0, 0]);
        mat4.rotate(model_matrix_cilindro, model_matrix_cilindro, Math.PI/2, [0, 1, 0]);
        mat4.scale(model_matrix_cilindro, model_matrix_cilindro, [3.0, 3.0, 25.0]);
        this.cilindro.draw(model_matrix_cilindro);

        var model_matrix_turbina1 = mat4.create();
        mat4.identity(model_matrix_turbina1);
        mat4.translate(model_matrix_turbina1, model_matrix_eje, [-14, 15.0, -2.1]);
        this.turbina1.draw(model_matrix_turbina1);

        var model_matrix_turbina2 = mat4.create();
        mat4.identity(model_matrix_turbina2);
        mat4.translate(model_matrix_turbina2, model_matrix_eje, [-14, -15.0, -2.1]);
        this.turbina2.draw(model_matrix_turbina2);

        var model_matrix_turbina3 = mat4.create();
        mat4.identity(model_matrix_turbina3);
        mat4.translate(model_matrix_turbina3, model_matrix_eje, [14, 15.0, -2.1]);
        this.turbina3.draw(model_matrix_turbina3);

        var model_matrix_turbina4 = mat4.create();
        mat4.identity(model_matrix_turbina4);
        mat4.translate(model_matrix_turbina4, model_matrix_eje, [14, -15.0, -2.1]);
        this.turbina4.draw(model_matrix_turbina4);

        var model_matrix_union1y2 = mat4.create();
        mat4.identity(model_matrix_union1y2);
        mat4.translate(model_matrix_union1y2, model_matrix_eje, [-13, 0, 0]);
        this.unionTurbinas1y2.draw(model_matrix_union1y2);

        var model_matrix_union3y4 = mat4.create();
        mat4.identity(model_matrix_union3y4);
        mat4.translate(model_matrix_union3y4, model_matrix_eje, [13, 0, 0]);
        this.unionTurbinas3y4.draw(model_matrix_union3y4);
    }
}