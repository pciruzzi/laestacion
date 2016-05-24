function parteExterior() {
    this.formaExterna = [];
    this.formaInterna = [];
    this.camino = null;

    this.externa = null;
    this.colorExterna = getColor("blue");
    this.interna = null;
    this.colorInterna = getColor("green");

    this.tapa1 = null;
    this.tapa2 = null;

    this.escotilla1 = null;
    this.escotilla2 = null;
    this.escotilla3 = null;

    this.createCamino = function() {
        this.camino = new circunferencia(Math.PI*0, Math.PI*1.5, 4, 40);
    }

    this.createFormaExterna = function() {
        var n = 9;
        var P = [];

        //Superficie a barrer
        P.push([2.0, 0.0, 0.0]);
        P.push([1.0, 0.0, 1.0]);
        P.push([-1.0, 0.0, 1.0]);
        P.push([-2.0, 0.0, 0.0]);
        P.push([-1.0, 0.0, -1.0]);
        P.push([1.0, 0.0, -1.0]);
        P.push([2.0, 0.0, 0.0]);
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
        
    }

    this.createExterna = function() {
        this.externa = new SuperficieBarrido(this.formaExterna, this.camino.getVertexBuffer(), this.colorExterna, false);
        this.externa.initBuffers();
    }

    this.createInterna = function() {

    }

    this.create = function() {
        this.createCamino();
        this.createFormaExterna();
        this.createFormaInterna();
        this.createExterna();
        this.createInterna();
        //this.interna.initBuffers();
    }

    this.draw = function(modelMatrix) {
        //Aplico las transformaciones que aplican a todo el casco
        var model_matrix_casco = mat4.create();
        mat4.identity(model_matrix_casco);
        mat4.multiply(model_matrix_casco, model_matrix_casco, modelMatrix);

        //Llamo a cada uno de los elementos para que se dibujen con la nueva matriz
        this.externa.draw(model_matrix_casco);
        this.interna.draw(model_matrix_casco);
    }
}