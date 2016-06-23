function EjeTurbinas() {
    this.cilindro = null;

    this.turbina1 = null;
    this.turbina2 = null;
    this.turbina3 = null;
    this.turbina4 = null;

    this.unionTurbinas1y2 = null;
    this.unionTurbinas3y4 = null;

    this.create = function() {
        this.turbina1 = new Turbina(false);
        this.turbina1.create();
        this.turbina2 = new Turbina(false);
        this.turbina2.create();
        this.turbina3 = new Turbina(false);
        this.turbina3.create();
        this.turbina4 = new Turbina(false);
        this.turbina4.create();
        
        this.cilindro = new Cilindro(4, 20, getColor("opaque yellow"), false);
        this.cilindro.initBuffers();

        var colorUnion = [];
        for (var i = 0; i < 6; i++) {
            colorUnion.push(getColor("opaque yellow"));
        }
        this.unionTurbinas1y2 = new Cubo(15.0, 2.0, 2.0, colorUnion, false);
        this.unionTurbinas1y2.initBuffers();
        this.unionTurbinas3y4 = new Cubo(15.0, 2.0, 2.0, colorUnion, false);
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
        mat4.translate(model_matrix_cilindro, model_matrix_eje, [-7.0, 0, 0]);
        mat4.rotate(model_matrix_cilindro, model_matrix_cilindro, Math.PI/2, [0, 1, 0]);
        mat4.scale(model_matrix_cilindro, model_matrix_cilindro, [3.0, 3.0, 14.0]);
        this.cilindro.draw(model_matrix_cilindro, shaderProgramSimple);

        var model_matrix_turbina1 = mat4.create();
        mat4.identity(model_matrix_turbina1);
        mat4.translate(model_matrix_turbina1, model_matrix_eje, [-9.5, 7.5, -2.1]);
        mat4.scale(model_matrix_turbina1, model_matrix_turbina1, [0.5, 0.5, 1]);
        this.turbina1.draw(model_matrix_turbina1);

        var model_matrix_turbina2 = mat4.create();
        mat4.identity(model_matrix_turbina2);
        mat4.translate(model_matrix_turbina2, model_matrix_eje, [-9.5, -7.5, -2.1]);
        mat4.scale(model_matrix_turbina2, model_matrix_turbina2, [0.5, 0.5, 1]);
        this.turbina2.draw(model_matrix_turbina2);

        var model_matrix_turbina3 = mat4.create();
        mat4.identity(model_matrix_turbina3);
        mat4.translate(model_matrix_turbina3, model_matrix_eje, [9.5, 7.5, -2.1]);
        mat4.scale(model_matrix_turbina3, model_matrix_turbina3, [0.5, 0.5, 1]);
        this.turbina3.draw(model_matrix_turbina3);

        var model_matrix_turbina4 = mat4.create();
        mat4.identity(model_matrix_turbina4);
        mat4.translate(model_matrix_turbina4, model_matrix_eje, [9.5, -7.5, -2.1]);
        mat4.scale(model_matrix_turbina4, model_matrix_turbina4, [0.5, 0.5, 1]);
        this.turbina4.draw(model_matrix_turbina4);

        var model_matrix_union1y2 = mat4.create();
        mat4.identity(model_matrix_union1y2);
        mat4.translate(model_matrix_union1y2, model_matrix_eje, [-8, 0, 0]);
        this.unionTurbinas1y2.draw(model_matrix_union1y2, shaderProgramSimple);

        var model_matrix_union3y4 = mat4.create();
        mat4.identity(model_matrix_union3y4);
        mat4.translate(model_matrix_union3y4, model_matrix_eje, [8, 0, 0]);
        this.unionTurbinas3y4.draw(model_matrix_union3y4, shaderProgramSimple);
    }
}