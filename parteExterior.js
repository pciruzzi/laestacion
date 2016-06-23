function ParteExterior() {
    this.formaExterna = [];
    this.formaTechoExterna = null;
    this.formaVentanalExterna1 = null;
    this.formaPisoExterna = null;
    this.formaVentanalExterna2 = null;

    this.formaInterna = [];
    this.formaTechoInterna = null;
    this.formaParedInterna1 = null;
    this.formaPisoInterna = null;
    this.formaParedInterna2 = null;

    this.formaInternaParaTapa = [];
    this.caminoEstacion = null;

    this.externa = null;
    this.techoExterna = null;
    this.ventanalExterna1 = null;
    this.pisoExterna = null;
    this.ventanalExterna2 = null;
    this.colorExterna1 = getColor("blue");//getColor("light gray");
    this.colorExterna2 = getColor("black");
    this.colorExterna = [];

    this.interna = null;
    this.techoInterna = null;
    this.paredInterna1 = null;
    this.pisoInterna = null;
    this.paredInterna2 = null;
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
    this.colorManguera1 = getColor("red");
    this.colorManguera = [];

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

    this.createForma = function(P) {
        var forma = [];
        var n = 9;
        var tramosForma = [];
        var cantPControl = P.length;
        for (var i = 0; i < cantPControl - 3; i+=3){
            tramosForma.push(new CurvaBezier(P[i], P[i+1], P[i+2], P[i+3], n));    
        }
        for (var i in tramosForma){
            forma = forma.concat(tramosForma[i].getVertexBuffer());
        }
        return forma;
    }

    this.createFormaExternaPorPartes = function() {
        var P = [];
        P.push([3.0, 0.0, 1.0]);
        P.push([3.0, 0.0, 2.5]);
        P.push([1.5, 0.0, 4.0]);
        P.push([0.0, 0.0, 4.0]);
        P.push([-1.5, 0.0, 4.0]);
        P.push([-3.0, 0.0, 2.5]);
        P.push([-3.0, 0.0, 1.0]);
        this.formaTechoExterna = this.createForma(P);

        var P = [];
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
        this.formaVentanalExterna1 = this.createForma(P);

        var P = [];
        P.push([-3.0, 0.0, -1.0]);
        P.push([-3.0, 0.0, -2.5]);
        P.push([-1.5, 0.0, -4.0]);
        P.push([0.0, 0.0, -4.0]);
        P.push([1.5, 0.0, -4.0]);
        P.push([3.0, 0.0, -2.5]);
        P.push([3.0, 0.0, -1.0]);
        this.formaPisoExterna = this.createForma(P);

        var P = [];
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
        this.formaVentanalExterna2 = this.createForma(P);
    }

    this.createFormaExterna = function() {
        this.createFormaExternaPorPartes();

        //Superficie a barrer
        var n = 9;
        this.pushColor(this.colorExterna, this.colorExterna1, n+1, 8/4);
        this.pushColor(this.colorExterna, this.colorExterna2, n+1, 12/4);
        this.pushColor(this.colorExterna, this.colorExterna1, n+1, 8/4);
        this.pushColor(this.colorExterna, this.colorExterna2, n+1, 12/4);

        var P = [];
        P.push([3.0, 0.0, 1.0]);
        P.push([3.0, 0.0, 2.5]);
        P.push([1.5, 0.0, 4.0]);
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
        this.formaExterna = this.createForma(P);
    }

    this.createFormaInternaPorPartes = function() {
        var P = [];
        P.push([2.0, 0.0, 1.0]);
        P.push([2.0, 0.0, 2.0]);
        P.push([1.0, 0.0, 3.0]);
        P.push([0.0, 0.0, 3.0]);
        P.push([-1.0, 0.0, 3.0]);
        P.push([-2.0, 0.0, 2.0]);
        P.push([-2.0, 0.0, 1.0]);
        this.formaTechoInterna = this.createForma(P);

        var P = [];
        P.push([2.0, 0.0, -1.5]);
        P.push([2.0, 0.0, -2/3]);
        P.push([2.0, 0.0, 1/6]);
        P.push([2.0, 0.0, 1.0]);
        this.formaParedInterna1 = this.createForma(P);

        var P = [];
        P.push([2.0, 0.0, -1.5]);
        P.push([2/3, 0.0, -1.5]);
        P.push([-2/3, 0.0, -1.5]);
        P.push([-2.0, 0.0, -1.5]);
        this.formaPisoInterna = this.createForma(P);

        var P = [];
        P.push([-2.0, 0.0, 1.0]);
        P.push([-2.0, 0.0, 1/6]);
        P.push([-2.0, 0.0, -2/3]);
        P.push([-2.0, 0.0, -1.5]);
        this.formaParedInterna2 = this.createForma(P);
    }

    this.createFormaInterna = function() {  
        this.createFormaInternaPorPartes();

        var n = 9;
        var P = [];

        this.pushColor(this.colorInterna, this.colorInterna1, n+1, 40/4);

        //Superficie a barrer
        P.push([2.0, 0.0, 1.0]);
        P.push([2.0, 0.0, 1.0]);
        P.push([2.0, 0.0, 1.0]);
        P.push([2.0, 0.0, 1.0]);
        P.push([2.0, 0.0, 0.0]);
        P.push([2.0, 0.0, 0.0]);
        P.push([2.0, 0.0, -1.5]);
        P.push([2.0, 0.0, -1.5]);
        P.push([2.0, 0.0, -1.5]);
        P.push([2.0, 0.0, -1.5]);
        P.push([2.0, 0.0, -1.5]);
        P.push([1.0, 0.0, -1.5]);
        P.push([0.0, 0.0, -1.5]);
        P.push([-1.0, 0.0, -1.5]);
        P.push([-1.0, 0.0, -1.5]);
        P.push([-2.0, 0.0, -1.5]);
        P.push([-2.0, 0.0, -1.5]);
        P.push([-2.0, 0.0, -1.5]);
        P.push([-2.0, 0.0, -1.5]);
        P.push([-2.0, 0.0, 0.0]);
        P.push([-2.0, 0.0, 0.0]);
        P.push([-2.0, 0.0, 1.0]);
        P.push([-2.0, 0.0, 1.0]);
        P.push([-2.0, 0.0, 1.0]);
        P.push([-2.0, 0.0, 1.0]);
        P.push([-2.0, 0.0, 2.0]);
        P.push([-1.0, 0.0, 3.0]);
        P.push([0.0, 0.0, 3.0]);
        P.push([1.0, 0.0, 3.0]);
        P.push([2.0, 0.0, 2.0]);
        P.push([2.0, 0.0, 1.0]);

        this.formaInterna = this.createForma(P);
    }

    this.createFormaInternaParaTapa = function() {   
        var n = 9;
        var P = [];

        //Superficie a barrer
        P.push([2.0, 0.0, 1.0]);
        P.push([2.0, 0.0, 2.0]);
        P.push([1.0, 0.0, 3.0]);
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
        this.formaInternaParaTapa = this.createForma(P)
    }

    this.createExterna = function() {
        this.externa = new SuperficieBarrido(this.formaExterna, this.caminoEstacion.getVertexBuffer(), this.colorExterna, false);
        this.externa.initBuffers();

        this.pisoExterna = new SuperficieBarrido(this.formaPisoExterna, this.caminoEstacion.getVertexBuffer(), null, true);
        this.pisoExterna.initBuffers(2,20);
        this.pisoExterna.initTexture("images/shiphull512.jpg");
        this.pisoExterna.initNormalTexture("images/shiphull_normalmap512.jpg");

        this.ventanalExterna1 = new SuperficieBarrido(this.formaVentanalExterna1, this.caminoEstacion.getVertexBuffer(), null, true);
        this.ventanalExterna1.initBuffers(1,4,true);
        this.ventanalExterna1.initTexture("images/ventanal2.jpg");
        this.ventanalExterna1.initIluminationTexture("images/white.jpg");

        this.techoExterna = new SuperficieBarrido(this.formaTechoExterna, this.caminoEstacion.getVertexBuffer(), null, true);
        this.techoExterna.initBuffers(2,20);
        this.techoExterna.initTexture("images/shiphull512.jpg");
        this.techoExterna.initNormalTexture("images/shiphull_normalmap512.jpg");

        this.ventanalExterna2 = new SuperficieBarrido(this.formaVentanalExterna2, this.caminoEstacion.getVertexBuffer(), null, true);
        this.ventanalExterna2.initBuffers(1,4);
        this.ventanalExterna2.initTexture("images/ventanal2.jpg");
        this.ventanalExterna2.initIluminationTexture("images/white.jpg");
    }

    this.createInterna = function() {
        this.interna = new SuperficieBarrido(this.formaInterna, this.caminoEstacion.getVertexBuffer(), this.colorInterna, false);
        this.interna.initBuffers();

        this.pisoInterna = new SuperficieBarrido(this.formaPisoInterna, this.caminoEstacion.getVertexBuffer(), null, true);
        this.pisoInterna.initBuffers(1,20);
        this.pisoInterna.initTexture("images/piso.jpg");

        this.paredInterna1 = new SuperficieBarrido(this.formaParedInterna1, this.caminoEstacion.getVertexBuffer(), null, true);
        this.paredInterna1.initBuffers(1,5);
        this.paredInterna1.initTexture("images/paredInterna11024.jpg");

        this.techoInterna = new SuperficieBarrido(this.formaTechoInterna, this.caminoEstacion.getVertexBuffer(), null, true);
        this.techoInterna.initBuffers(1,10);
        this.techoInterna.initTexture("images/techo.jpg");
        this.techoInterna.initIluminationTexture("images/techo-ilumMap.jpg");

        this.paredInterna2 = new SuperficieBarrido(this.formaParedInterna2, this.caminoEstacion.getVertexBuffer(), null, true);
        this.paredInterna2.initBuffers(1,5,true);
        this.paredInterna2.initTexture("images/paredInterna11024.jpg");
    }

    this.createTapas = function() {
        this.tapa1 = new Tapa(this.formaExterna, this.formaInternaParaTapa, this.colorExterna1, true);
        this.tapa1.initBuffers();
        this.tapa1.initTexture("images/gray.jpg");
        this.tapa2 = new Tapa(this.formaExterna, this.formaInternaParaTapa, this.colorExterna1, true);
        this.tapa2.initBuffers();
        this.tapa2.initTexture("images/gray.jpg");
    }

    this.createEscotillas = function() {
        this.escotilla1 = new Cilindro(4, 30, this.colorExterna1, true);
        this.escotilla1.initBuffers();
        this.escotilla1.initTexture("images/gray.jpg");
        this.escotilla2 = new Cilindro(4, 30, this.colorExterna1, true);
        this.escotilla2.initBuffers();
        this.escotilla2.initTexture("images/gray.jpg");
        this.escotilla3 = new Cilindro(4, 30, this.colorExterna1, true);
        this.escotilla3.initBuffers();
        this.escotilla3.initTexture("images/gray.jpg");
    }

    this.createManguera = function() {
        this.formaManguera = new CircunferenciaXZ(Math.PI*0, Math.PI*2, 0.15, 20);

        var n = 9;
        var P = [];

        this.pushColor(this.colorManguera, this.colorManguera1, n+1, 12);

        var radio = 4;
        var paso = -0.3;

        //Camino de la manguera
        P.push([0.0, 0.0, 0.0]);
        P.push([0.0, 0.0, 0.0]);
        P.push([0.0, 0.0, 0.0]);
        P.push([radio, paso, -radio]);
        P.push([0.0, 2*paso, -2*radio]);
        P.push([-radio, 3*paso, -radio]);
        P.push([0.0, 4*paso, 0.0]);
        P.push([radio, 5*paso, -radio]);
        P.push([0.0, 6*paso, -2*radio]);
        P.push([-radio, 7*paso, -radio]);
        P.push([0.0, 8*paso, 0.0]);
        P.push([radio, 9*paso, -radio]);
        P.push([0.0, 10*paso, -2*radio]);
        P.push([0.0, 10*paso, -2*radio]);
        P.push([0.0, 10*paso, -2*radio]);
        //P.push([-radio, 11*paso, -radio]);
        //P.push([0.0, 12*paso, 0.0]);
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

        this.manguera = new SuperficieBarrido(this.formaManguera.getVertexBuffer(), this.caminoManguera, this.colorManguera, false);
        this.manguera.initBuffers();
    }

    this.create = function() {
        this.createCaminoEstacion();
        this.createFormaExterna();
        this.createFormaInterna();
        this.createFormaInternaParaTapa();
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
        //this.externa.draw(model_matrix_externa, shaderProgramSimple);
        this.techoExterna.draw(model_matrix_externa, shaderProgramSimple, false);
        this.pisoExterna.draw(model_matrix_externa, shaderProgramSimple, false);
        gl.uniform1i(shaderProgramSimple.useLightingUniform, false);
        this.ventanalExterna1.draw(model_matrix_externa, shaderProgramSimple, false, true, 2.0);
        this.ventanalExterna2.draw(model_matrix_externa, shaderProgramSimple, false, true, 2.0);

        var model_matrix_interna = mat4.create();
        mat4.identity(model_matrix_interna);
        mat4.scale(model_matrix_interna, model_matrix_casco, [0.5, 0.5, 0.5]);
        //this.interna.draw(model_matrix_interna, shaderProgramSimple);
        this.techoInterna.draw(model_matrix_interna, shaderProgramSimple, false, true, 1.0);
        this.pisoInterna.draw(model_matrix_interna, shaderProgramSimple);
        this.paredInterna1.draw(model_matrix_interna, shaderProgramSimple);
        this.paredInterna2.draw(model_matrix_interna, shaderProgramSimple);
        gl.uniform1i(shaderProgramSimple.useLightingUniform, true);

        var model_matrix_tapa1 = mat4.create();
        mat4.identity(model_matrix_tapa1);
        mat4.translate(model_matrix_tapa1, model_matrix_casco, [8, 0, 0]);
        mat4.scale(model_matrix_tapa1, model_matrix_tapa1, [0.5, 0.5, 0.5]);
        this.tapa1.draw(model_matrix_tapa1, shaderProgramSimple);

        var model_matrix_tapa2 = mat4.create();
        mat4.identity(model_matrix_tapa2);
        mat4.rotate(model_matrix_tapa2, model_matrix_casco, Math.PI*3/2, [0,0,1]);
        mat4.translate(model_matrix_tapa2, model_matrix_tapa2, [8, 0, 0]);
        mat4.scale(model_matrix_tapa2, model_matrix_tapa2, [0.5, 0.5, 0.5]);
        mat4.rotate(model_matrix_tapa2, model_matrix_tapa2, Math.PI, [0,0,1]);
        this.tapa2.draw(model_matrix_tapa2, shaderProgramSimple);

        var model_matrix_escotilla1 = mat4.create();
        mat4.identity(model_matrix_escotilla1);
        mat4.rotate(model_matrix_escotilla1, model_matrix_casco, -Math.PI/4, [0,0,1]);
        mat4.translate(model_matrix_escotilla1, model_matrix_escotilla1, [0,10,0]);
        mat4.scale(model_matrix_escotilla1, model_matrix_escotilla1, [1.4,1,1.4]);
        mat4.rotate(model_matrix_escotilla1, model_matrix_escotilla1, Math.PI/2, [1,0,0]);
        this.escotilla1.draw(model_matrix_escotilla1, shaderProgramSimple);

        var model_matrix_escotilla2 = mat4.create();
        mat4.identity(model_matrix_escotilla2);
        mat4.rotate(model_matrix_escotilla2, model_matrix_casco, Math.PI/4, [0,0,1]);
        mat4.translate(model_matrix_escotilla2, model_matrix_escotilla2, [0,10,0]);
        mat4.scale(model_matrix_escotilla2, model_matrix_escotilla2, [1.4,1,1.4]);
        mat4.rotate(model_matrix_escotilla2, model_matrix_escotilla2, Math.PI/2, [1,0,0]);
        this.escotilla1.draw(model_matrix_escotilla2, shaderProgramSimple);

        var model_matrix_escotilla3 = mat4.create();
        mat4.identity(model_matrix_escotilla3);
        mat4.rotate(model_matrix_escotilla3, model_matrix_casco, Math.PI*3/4, [0,0,1]);
        mat4.translate(model_matrix_escotilla3, model_matrix_escotilla3, [0,10,0]);
        mat4.scale(model_matrix_escotilla3, model_matrix_escotilla3, [1.4,1,1.4]);
        mat4.rotate(model_matrix_escotilla3, model_matrix_escotilla3, Math.PI/2, [1,0,0]);
        this.escotilla1.draw(model_matrix_escotilla3, shaderProgramSimple);

        var model_matrix_manguera = mat4.create();
        mat4.identity(model_matrix_manguera);
        mat4.rotate(model_matrix_manguera, model_matrix_casco, Math.PI*3/4, [0,0,1]);
        mat4.translate(model_matrix_manguera, model_matrix_manguera, [0,10,0]);
        mat4.rotate(model_matrix_manguera, model_matrix_manguera, Math.PI/2, [1,0,0]);
        mat4.rotate(model_matrix_manguera, model_matrix_manguera, Math.PI/4, [0,1,0]);
        this.manguera.draw(model_matrix_manguera, shaderProgramSimple);

        // Como el astronauta tiene texturas se dibuja en el loop principal
        model_matrix_astronauta = mat4.create();
        mat4.identity(model_matrix_astronauta);
        mat4.translate(model_matrix_astronauta, model_matrix_manguera, [0.0, -3.0, -8]);
        mat4.rotate(model_matrix_astronauta, model_matrix_astronauta, Math.PI, [0,1,0]);
        mat4.rotate(model_matrix_astronauta, model_matrix_astronauta, Math.PI/2, [0,0,1]);
        mat4.rotate(model_matrix_astronauta, model_matrix_astronauta, Math.PI/3, [1,0,0]);
    }
}