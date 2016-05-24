function parteCentral() {
    this.centro = null;
    this.perfilCentro = null;
    this.colorCentro = getColor("red");

    this.antenaInf = null;
    this.antenaSup = null;

    this.createPerfilCentro = function() {
        this.perfilCentro = [];
        var n = 9;
        var P = [];

        //Perfil a revolucionar
        P.push([0.0, 0.0, 0.0]);
        P.push([1.0, 0.0, 0.0]);
        P.push([1.0, 0.0, 0.0]);
        P.push([2.0, 0.0, 0.0]);
        P.push([2.0, 0.0, 1.0]);
        P.push([2.0, 0.0, 1.0]);
        P.push([2.0, 0.0, 2.0]);
        P.push([4.0, 0.0, 3.0]);
        P.push([4.0, 0.0, 4.0]);
        P.push([2.0, 0.0, 5.0]);
        P.push([2.0, 0.0, 6.0]);
        P.push([2.0, 0.0, 6.0]);
        P.push([2.0, 0.0, 7.0]);
        P.push([1.0, 0.0, 7.0]);
        P.push([1.0, 0.0, 7.0]);
        P.push([0.0, 0.0, 7.0]);

        var tramosPerfil = [];
        var perfil = [];
        var cantPControl = P.length;
        for (var i = 0; i < cantPControl - 3; i+=3){
            tramosPerfil.push(new curvaBezier(P[i], P[i+1], P[i+2], P[i+3], n));    
        }
        for (var i in tramosPerfil){
            this.perfilCentro = this.perfilCentro.concat(tramosPerfil[i].getVertexBuffer());
        }
    }

    this.create = function() {
        this.createPerfilCentro();
        this.centro = new SuperficieRevolucion(this.perfilCentro, [0,0,1], 37, [0.0,1.0,0.0], false);
        this.centro.initBuffers();
        //this.antenaInf = new antena();
        //this.antenaSup = new antena();
    }

    this.draw = function(modelMatrix) {
        //Aplico las transformaciones que aplican al centro
        var model_matrix_centro = mat4.create();
        mat4.identity(model_matrix_centro);
        mat4.multiply(model_matrix_centro, model_matrix_centro, modelMatrix);

        //Llamo a cada uno de los elementos para que se dibujen con la nueva matriz
        this.centro.draw(model_matrix_centro);
    }
}