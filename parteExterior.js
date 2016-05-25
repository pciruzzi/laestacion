function parteExterior() {
    this.formaExterna = [];
    this.formaInterna = [];
    this.camino = null;

    this.externa = null;
    this.colorExterna = getColor("blue");
    this.interna = null;
    this.colorInterna = getColor("red");

    this.tapa1 = null;
    this.tapa2 = null;

    this.escotilla1 = null;
    this.escotilla2 = null;
    this.escotilla3 = null;

    this.createCamino = function() {
        this.camino = new circunferencia(Math.PI*0, Math.PI*1.5, 16, 40);
    }

    this.createFormaExterna = function() {
        var n = 9;
        var P = [];

        //Superficie a barrer
        P.push([0.0, 0.0, 4.0]);
        P.push([-1.5, 0.0, 4.0]);
        P.push([-3.0, 0.0, 2.5]);
        P.push([-3.0, 0.0, 1.0]);
        P.push([-2.75, 0.0, 1.0]);
        P.push([-2.75, 0.0, 1.0]);
        P.push([-2.5, 0.0, 1.0]);
        P.push([-3.0, 0.0, 0.5]);
        P.push([-3.0, 0.0, -0.5]);
        P.push([-2.5, 0.0, -1.0]);
        P.push([-2.75, 0.0, -1.0]);
        P.push([-2.75, 0.0, -1.0]);
        P.push([-3.0, 0.0, -1.0]);
        P.push([-3.0, 0.0, -2.5]);
        P.push([-1.5, 0.0, -4.0]);
        P.push([0.0, 0.0, -4.0]);
        P.push([1.5, 0.0, -4.0]);
        P.push([3.0, 0.0, -2.5]);
        P.push([3.0, 0.0, -1.0]);
        P.push([2.75, 0.0, -1.0]);
        P.push([2.75, 0.0, -1.0]);
        P.push([2.5, 0.0, -1.0]);
        P.push([3.0, 0.0, -0.5]);
        P.push([3.0, 0.0, 0.5]);
        P.push([2.5, 0.0, 1.0]);
        P.push([2.75, 0.0, 1.0]);
        P.push([2.75, 0.0, 1.0]);
        P.push([3.0, 0.0, 1.0]);
        P.push([3.0, 0.0, 2.5]);
        P.push([1.5, 0.0, 4.0]);
        P.push([0.0, 0.0, 4.0]);
        var tramosForma = [];
        var cantPControl = P.length;
        for (var i = 0; i < cantPControl - 3; i+=3){
            tramosForma.push(new curvaBezier(P[i], P[i+1], P[i+2], P[i+3], n));    
        }
        for (var i in tramosForma){
            this.formaExterna = this.formaExterna.concat(tramosForma[i].getVertexBuffer());
        }
    }

    this.createFormaInterna = function() {   
        var n = 9;
        var P = [];

        //Superficie a barrer
        P.push([0.0, 0.0, 3.0]);
        P.push([-1.0, 0.0, 3.0]);
        P.push([-2.0, 0.0, 2.0]);
        P.push([-2.0, 0.0, 1.0]);
        P.push([-2.0, 0.0, 1.0]);
        P.push([-2.0, 0.0, 1.0]);
        P.push([-2.0, 0.0, 1.0]);
        P.push([-2.0, 0.0, 0.0]);
        P.push([-2.0, 0.0, 0.0]);
        P.push([-2.0, 0.0, -1.5]);
        P.push([-2.0, 0.0, -1.5]);
        P.push([-2.0, 0.0, -1.5]);
        P.push([-2.0, 0.0, -1.5]);
        P.push([-1.0, 0.0, -1.5]);
        P.push([-1.0, 0.0, -1.5]);
        P.push([0.0, 0.0, -1.5]);
        P.push([1.0, 0.0, -1.5]);
        P.push([2.0, 0.0, -1.5]);
        P.push([2.0, 0.0, -1.5]);
        P.push([2.0, 0.0, -1.5]);
        P.push([2.0, 0.0, -1.5]);
        P.push([2.0, 0.0, -1.5]);
        P.push([2.0, 0.0, 0.0]);
        P.push([2.0, 0.0, 0.0]);
        P.push([2.0, 0.0, 1.0]);
        P.push([2.0, 0.0, 1.0]);
        P.push([2.0, 0.0, 1.0]);
        P.push([2.0, 0.0, 1.0]);
        P.push([2.0, 0.0, 2.0]);
        P.push([1.0, 0.0, 3.0]);
        P.push([0.0, 0.0, 3.0]);
        var tramosForma = [];
        var cantPControl = P.length;
        for (var i = 0; i < cantPControl - 3; i+=3){
            tramosForma.push(new curvaBezier(P[i], P[i+1], P[i+2], P[i+3], n));    
        }
        for (var i in tramosForma){
            this.formaInterna = this.formaInterna.concat(tramosForma[i].getVertexBuffer());
        }
    }

    this.createExterna = function() {
        this.externa = new SuperficieBarrido(this.formaExterna, this.camino.getVertexBuffer(), this.colorExterna, false);
        this.externa.initBuffers();
    }

    this.createInterna = function() {
        this.interna = new SuperficieBarrido(this.formaInterna, this.camino.getVertexBuffer(), this.colorInterna, false);
        this.interna.initBuffers();
    }

    this.createTapas = function() {
        this.tapa1 = new Tapa(this.formaExterna, this.formaInterna, this.colorExterna, false);
        this.tapa1.initBuffers();
        this.tapa2 = new Tapa(this.formaExterna, this.formaInterna, this.colorExterna, false);
        this.tapa2.initBuffers();
    }

    this.create = function() {
        this.createCamino();
        this.createFormaExterna();
        this.createFormaInterna();
        this.createExterna();
        this.createInterna();
        this.createTapas();
    }

    this.draw = function(modelMatrix) {
        //Aplico las transformaciones que aplican a todo el casco
        var model_matrix_casco = mat4.create();
        mat4.identity(model_matrix_casco);
        mat4.multiply(model_matrix_casco, model_matrix_casco, modelMatrix);

        //Llamo a cada uno de los elementos para que se dibujen con la nueva matriz
        var model_matrix_externa = mat4.create();
        mat4.identity(model_matrix_externa);
        mat4.scale(model_matrix_externa, model_matrix_casco, [0.5, 0.5, 0.5]);
        this.externa.draw(model_matrix_externa);

        var model_matrix_interna = mat4.create();
        mat4.identity(model_matrix_interna);
        mat4.scale(model_matrix_interna, model_matrix_casco, [0.5, 0.5, 0.5]);
        this.interna.draw(model_matrix_interna);

        var model_matrix_tapa1 = mat4.create();
        mat4.identity(model_matrix_tapa1);
        mat4.translate(model_matrix_tapa1, model_matrix_casco, [8, 0, 0]);
        mat4.scale(model_matrix_tapa1, model_matrix_tapa1, [0.5, 0.5, 0.5]);
        this.tapa1.draw(model_matrix_tapa1);

        var model_matrix_tapa2 = mat4.create();
        mat4.identity(model_matrix_tapa2);
        mat4.rotate(model_matrix_tapa2, model_matrix_casco, Math.PI*3/2, [0,0,1]);
        mat4.translate(model_matrix_tapa2, model_matrix_tapa2, [8, 0, 0]);
        mat4.scale(model_matrix_tapa2, model_matrix_tapa2, [0.5, 0.5, 0.5]);
        mat4.rotate(model_matrix_tapa2, model_matrix_tapa2, Math.PI, [0,0,1]);
        this.tapa1.draw(model_matrix_tapa2);
    }
}