function parteCentral() {
    this.centro = null;
    this.perfilCentro = null;
    this.colorCentro = getColor("gray");

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
        P.push([2.0, 0.0, 2.0]);
        P.push([2.0, 0.0, 3.0]);
        P.push([5.0, 0.0, 3.0]);
        P.push([7.0, 0.0, 5.0]);
        P.push([7.0, 0.0, 7.0]);
        P.push([7.0, 0.0, 8.0]);
        P.push([7.0, 0.0, 8.0]);
        P.push([7.0, 0.0, 9.0]);
        P.push([6.5, 0.0, 9.0]);
        P.push([6.5, 0.0, 9.0]);
        P.push([6.0, 0.0, 9.0]);
        P.push([6.0, 0.0, 11.0]);
        P.push([6.0, 0.0, 13.0]);
        P.push([6.0, 0.0, 14.0]);
        P.push([9.0, 0.0, 16.0]);
        P.push([9.0, 0.0, 19.0]);
        P.push([6.0, 0.0, 21.0]);
        P.push([6.0, 0.0, 22.0]);
        P.push([6.0, 0.0, 22.0]);
        P.push([6.0, 0.0, 23.0]);
        P.push([6.0, 0.0, 24.0]);
        P.push([5.0, 0.0, 25.0]);
        P.push([4.0, 0.0, 25.0]);
        P.push([4.0, 0.0, 26.0]);
        P.push([4.0, 0.0, 26.0]);
        P.push([4.0, 0.0, 27.0]);
        P.push([4.0, 0.0, 27.5]);
        P.push([3.5, 0.0, 28.0]);
        P.push([3.0, 0.0, 28.0]);
        P.push([3.0, 0.0, 28.5]);
        P.push([3.0, 0.0, 28.5]);
        P.push([3.0, 0.0, 29.0]);
        P.push([2.0, 0.0, 29.0]);
        P.push([1.0, 0.0, 29.0]);
        P.push([0.0, 0.0, 29.0]);

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
        this.centro = new SuperficieRevolucion(this.perfilCentro, [0,0,1], 37, this.colorCentro, false);
        this.centro.initBuffers();
        this.antenaInf = new Antena();
        this.antenaInf.initBuffers();
        this.antenaSup = new Antena();
        this.antenaSup.initBuffers();
    }

    this.draw = function(modelMatrix) {
        //Aplico las transformaciones que aplican al centro
        var model_matrix_centro = mat4.create();
        mat4.identity(model_matrix_centro);
        mat4.multiply(model_matrix_centro, model_matrix_centro, modelMatrix);

        //Llamo a cada uno de los elementos para que se dibujen con la nueva matriz
        var model_matrix_estructura = mat4.create();
        mat4.identity(model_matrix_estructura);
        mat4.translate(model_matrix_estructura, model_matrix_centro, [0, 0, -2.9]);
        mat4.scale(model_matrix_estructura, model_matrix_estructura, [0.25, 0.25, 0.25]);
        this.centro.draw(model_matrix_estructura);

        // Matriz de modelado de la antena inf
        var model_matrix_antenaInf = mat4.create();
        mat4.identity(model_matrix_antenaInf);
        mat4.rotate(model_matrix_antenaInf, model_matrix_centro, Math.PI, [0,1,0]);
        mat4.translate(model_matrix_antenaInf, model_matrix_antenaInf, [0,1.5,5.8]);
        mat4.scale(model_matrix_antenaInf, model_matrix_antenaInf, [0.75, 0.75, 0.75]);
        this.antenaInf.draw(model_matrix_antenaInf);

        // Matriz de modelado de la antena sup
        var model_matrix_antenaSup = mat4.create();
        mat4.identity(model_matrix_antenaSup);
        mat4.translate(model_matrix_antenaSup, model_matrix_centro, [0,1.5,7.4]);
        mat4.scale(model_matrix_antenaSup, model_matrix_antenaSup, [0.75,0.75,0.75]);
        this.antenaSup.draw(model_matrix_antenaSup);
    }
}