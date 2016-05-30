function Estacion() {
    this.parteCentral = null;
    this.parteExterior = null;

    this.cilindro1 = null;
    this.cilindro2 = null;
    this.cilindro3 = null;
    this.cilindro4 = null;

    this.colorCilindros = getColor("green");//getColor("light yellow");

    this.create = function() {
        this.parteCentral = new ParteCentral();
        this.parteCentral.create();
        this.parteExterior = new ParteExterior();
        this.parteExterior.create();

        this.cilindro1 = new Cilindro(4, 30, this.colorCilindros, false);
        this.cilindro1.initBuffers();
        this.cilindro2 = new Cilindro(4, 30, this.colorCilindros, false);
        this.cilindro2.initBuffers();
        this.cilindro3 = new Cilindro(4, 30, this.colorCilindros, false);
        this.cilindro3.initBuffers();
        this.cilindro4 = new Cilindro(4, 30, this.colorCilindros, false);
        this.cilindro4.initBuffers();
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

        var model_matrix_cilindro1 = mat4.create();
        mat4.identity(model_matrix_cilindro1);
        mat4.rotate(model_matrix_cilindro1, model_matrix_estacion, Math.PI*-0.05, [0,0,1]);
        mat4.translate(model_matrix_cilindro1, model_matrix_cilindro1, [0.0, 6.9, 0.0]);
        mat4.scale(model_matrix_cilindro1, model_matrix_cilindro1, [0.5, 13.8, 0.5]);
        mat4.rotate(model_matrix_cilindro1, model_matrix_cilindro1, Math.PI/2, [1,0,0]);
        this.cilindro1.draw(model_matrix_cilindro1);

        var model_matrix_cilindro2 = mat4.create();
        mat4.identity(model_matrix_cilindro2);
        mat4.rotate(model_matrix_cilindro2, model_matrix_estacion, Math.PI*-0.25, [0,0,1]);
        mat4.translate(model_matrix_cilindro2, model_matrix_cilindro2, [0.0, 6.9, 0.0]);
        mat4.scale(model_matrix_cilindro2, model_matrix_cilindro2, [0.5, 13.8, 0.5]);
        mat4.rotate(model_matrix_cilindro2, model_matrix_cilindro2, Math.PI/2, [1,0,0]);
        this.cilindro2.draw(model_matrix_cilindro2);

        var model_matrix_cilindro3 = mat4.create();
        mat4.identity(model_matrix_cilindro3);
        mat4.rotate(model_matrix_cilindro3, model_matrix_estacion, Math.PI*-1.45, [0,0,1]);
        mat4.translate(model_matrix_cilindro3, model_matrix_cilindro3, [0.0, 6.9, 0.0]);
        mat4.scale(model_matrix_cilindro3, model_matrix_cilindro3, [0.5, 13.8, 0.5]);
        mat4.rotate(model_matrix_cilindro3, model_matrix_cilindro3, Math.PI/2, [1,0,0]);
        this.cilindro3.draw(model_matrix_cilindro3);

        var model_matrix_cilindro4 = mat4.create();
        mat4.identity(model_matrix_cilindro4);
        mat4.rotate(model_matrix_cilindro4, model_matrix_estacion, Math.PI*-0.75, [0,0,1]);
        mat4.scale(model_matrix_cilindro4, model_matrix_cilindro4, [0.5, 6.9, 0.5]);
        mat4.rotate(model_matrix_cilindro4, model_matrix_cilindro4, Math.PI/2, [1,0,0]);
        this.cilindro4.draw(model_matrix_cilindro4);
    }
}
