function Turbina() {
    this.perfil = null;
    this.color1 = getColor("brown");
    this.color2 = getColor("light blue");
    this.color = [];
    this.turbina = null;

    this.pushColor = function(buffer, color, n, k) {
        for (var i = 0; i < n; i++) {
            for (var j = 0; j < k; j++) {
                buffer.push(color[0], color[1], color[2]);
            }
        }
    }

    this.create = function() {
        this.perfil = [];
        var n = 9;
        var P = [];

        this.pushColor(this.color, this.color2, n+1, 4/4);
        this.pushColor(this.color, this.color1, n+1, 12/4);
        this.pushColor(this.color, this.color2, n+1, 4/4);

        //Perfil a revolucionar
        P.push([0.0, 0.0, 1.0]);
        P.push([0.0, 0.0, 1.0]);
        P.push([3.0, 0.0, 1.0]);
        P.push([3.0, 0.0, 1.0]);
        P.push([3.0, 0.0, 1.0]);
        P.push([3.0, 0.0, 0.0]);
        P.push([3.0, 0.0, 0.0]);
        P.push([3.0, 0.0, 0.0]);
        P.push([6.0, 0.0, 7.0]);
        P.push([6.0, 0.0, 7.0]);
        P.push([5.0, 0.0, 8.0]);
        P.push([4.0, 0.0, 8.0]);
        P.push([3.0, 0.0, 7.0]);
        P.push([2.0, 0.0, 7.0]);
        P.push([2.0, 0.0, 7.0]);
        P.push([0.0, 0.0, 7.0]);

        var tramosPerfil = [];
        var perfil = [];
        var cantPControl = P.length;
        for (var i = 0; i < cantPControl - 3; i+=3){
            tramosPerfil.push(new CurvaBezier(P[i], P[i+1], P[i+2], P[i+3], n));    
        }
        for (var i in tramosPerfil){
            this.perfil = this.perfil.concat(tramosPerfil[i].getVertexBuffer());
        }

        this.turbina = new SuperficieRevolucion(this.perfil, [0,0,1], 37, this.color, false);
        this.turbina.initBuffers();
    }

    this.draw = function(modelMatrix) {
        //Aplico las transformaciones que aplican a la turbina
        var model_matrix_turbina = mat4.create();
        mat4.identity(model_matrix_turbina);
        mat4.multiply(model_matrix_turbina, model_matrix_turbina, modelMatrix);
        this.turbina.draw(model_matrix_turbina, shaderProgramSimple);
    }
}