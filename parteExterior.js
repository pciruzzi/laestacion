function ParteExterior() {
    this.formaExterna = [];
    this.formaInterna = [];
    this.caminoEstacion = null;

    this.externa = null;
    this.colorExterna1 = getColor("blue");//getColor("light gray");
    this.colorExterna2 = getColor("black");
    this.colorExterna = [];
    this.interna = null;
    this.colorInterna1 = getColor("violet");
    this.colorInterna = [];

    this.tapa1 = null;
    this.tapa2 = null;

    this.escotilla1 = null;
    this.escotilla2 = null;
    this.escotilla3 = null;

    this.manguera = null;
    this.caminoManguera = [];
    this.formaManguera = null;
    this.coloManguera = getColor("green");

    this.createCaminoEstacion = function() {
        this.caminoEstacion = new Circunferencia(Math.PI*0, Math.PI*1.5, 16, 40);
    }

    this.pushColor = function(buffer, color, n, k) {
        for (var i = 0; i < n; i++) {
            for (var j = 0; j < k; j++) {
                buffer.push(color[0], color[1], color[2]);
            }
        }
    }

    this.createFormaExterna = function() {
        var n = 9;
        var P = [];

        //Superficie a barrer
        this.pushColor(this.colorExterna, this.colorExterna1, n+1, 4/4);
        this.pushColor(this.colorExterna, this.colorExterna2, n+1, 12/4);
        this.pushColor(this.colorExterna, this.colorExterna1, n+1, 8/4);
        this.pushColor(this.colorExterna, this.colorExterna2, n+1, 12/4);
        this.pushColor(this.colorExterna, this.colorExterna1, n+1, 4/4);

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
            tramosForma.push(new CurvaBezier(P[i], P[i+1], P[i+2], P[i+3], n));    
        }
        for (var i in tramosForma){
            this.formaExterna = this.formaExterna.concat(tramosForma[i].getVertexBuffer());
        }
    }

    this.createFormaInterna = function() {   
        var n = 9;
        var P = [];

        this.pushColor(this.colorInterna, this.colorInterna1, n+1, 40/4);

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
            tramosForma.push(new CurvaBezier(P[i], P[i+1], P[i+2], P[i+3], n));    
        }
        for (var i in tramosForma){
            this.formaInterna = this.formaInterna.concat(tramosForma[i].getVertexBuffer());
        }
    }

    this.createExterna = function() {
        this.externa = new SuperficieBarrido(this.formaExterna, this.caminoEstacion.getVertexBuffer(), this.colorExterna, false);
        this.externa.initBuffers();
    }

    this.createInterna = function() {
        this.interna = new SuperficieBarrido(this.formaInterna, this.caminoEstacion.getVertexBuffer(), this.colorInterna, false);
        this.interna.initBuffers();
    }

    this.createTapas = function() {
        this.tapa1 = new Tapa(this.formaExterna, this.formaInterna, this.colorExterna1, false);
        this.tapa1.initBuffers();
        this.tapa2 = new Tapa(this.formaExterna, this.formaInterna, this.colorExterna1, false);
        this.tapa2.initBuffers();
    }

    this.createEscotillas = function() {
        this.escotilla1 = new Cilindro(4, 30, this.colorExterna1, false);
        this.escotilla1.initBuffers();
        this.escotilla2 = new Cilindro(4, 30, this.colorExterna1, false);
        this.escotilla2.initBuffers();
        this.escotilla3 = new Cilindro(4, 30, this.colorExterna1, false);
        this.escotilla3.initBuffers();
    }

    this.createManguera = function() {
        this.formaManguera = new Circunferencia(Math.PI*0, Math.PI*2, 1, 20);

        var n = 9;
        var P = [];

        //Camino de la manguera
        P.push([0.0, 0.0, 0.0]);
        P.push([0.0, 0.0, 0.0]);
        P.push([0.0, 0.0, 0.0]);
        P.push([2.0, 2.0, 0.0]);
        P.push([4.0, 2.0, 0.0]);
        P.push([6.0, 0.0, 0.0]);
        P.push([8.0, -2.0, 0.0]);
        P.push([10.0, -2.0, 0.0]);
        P.push([12.0, 0.0, 0.0]);
        var tramosForma = [];
        var cantPControl = P.length;
        for (var i = 0; i < cantPControl - 3; i++){
            tramosForma.push(new CurvaBSpline(P[i], P[i+1], P[i+2], P[i+3], n));    
        }
/*        tramos.push(new curvaBSpline(P[cantPControl - 2], P[cantPControl - 1], P[cantPControl], P[0], n));    
        tramos.push(new curvaBSpline(P[cantPControl - 1], P[cantPControl], P[0], P[1], n));    
        tramos.push(new curvaBSpline(P[cantPControl], P[0], P[1], P[2], n));  */
        for (var i in tramosForma){
            this.caminoManguera = this.caminoManguera.concat(tramosForma[i].getVertexBuffer());
        }

        this.manguera = new SuperficieBarrido(this.formaManguera.getVertexBuffer(), this.caminoManguera, this.coloManguera, false);
        this.manguera.initBuffers();
    }

    this.create = function() {
        this.createCaminoEstacion();
        this.createFormaExterna();
        this.createFormaInterna();
        this.createExterna();
        this.createInterna();
        this.createTapas();
        this.createEscotillas();
        this.createManguera();
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

        var model_matrix_escotilla1 = mat4.create();
        mat4.identity(model_matrix_escotilla1);
        mat4.rotate(model_matrix_escotilla1, model_matrix_casco, -Math.PI/4, [0,0,1]);
        mat4.translate(model_matrix_escotilla1, model_matrix_escotilla1, [0,10,0]);
        mat4.scale(model_matrix_escotilla1, model_matrix_escotilla1, [1.4,1,1.4]);
        mat4.rotate(model_matrix_escotilla1, model_matrix_escotilla1, Math.PI/2, [1,0,0]);
        this.escotilla1.draw(model_matrix_escotilla1);

        var model_matrix_escotilla2 = mat4.create();
        mat4.identity(model_matrix_escotilla2);
        mat4.rotate(model_matrix_escotilla2, model_matrix_casco, Math.PI/4, [0,0,1]);
        mat4.translate(model_matrix_escotilla2, model_matrix_escotilla2, [0,10,0]);
        mat4.scale(model_matrix_escotilla2, model_matrix_escotilla2, [1.4,1,1.4]);
        mat4.rotate(model_matrix_escotilla2, model_matrix_escotilla2, Math.PI/2, [1,0,0]);
        this.escotilla1.draw(model_matrix_escotilla2);

        var model_matrix_escotilla3 = mat4.create();
        mat4.identity(model_matrix_escotilla3);
        mat4.rotate(model_matrix_escotilla3, model_matrix_casco, Math.PI*3/4, [0,0,1]);
        mat4.translate(model_matrix_escotilla3, model_matrix_escotilla3, [0,10,0]);
        mat4.scale(model_matrix_escotilla3, model_matrix_escotilla3, [1.4,1,1.4]);
        mat4.rotate(model_matrix_escotilla3, model_matrix_escotilla3, Math.PI/2, [1,0,0]);
        this.escotilla1.draw(model_matrix_escotilla3);

        var model_matrix_manguera = mat4.create();
        mat4.identity(model_matrix_manguera);
        mat4.translate(model_matrix_manguera, model_matrix_casco, [2,2,2]);
        //this.manguera.draw(model_matrix_manguera);
    }
}