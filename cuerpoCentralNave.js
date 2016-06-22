function CuerpoCentralNave() {
    this.vertex_buffer = null;
    this.index_buffer = null;

    this.color_nave = getColor("blue");
    this.color_cabina = getColor("red");
    this.color_vidrio = getColor("black");

    this.webgl_position_buffer = null;
    this.webgl_texture_coord_buffer = null;
    this.webgl_tangent_buffer = null;
    this.webgl_normal_buffer = null;
    this.webgl_color_buffer = null;
    this.webgl_index_buffer = null;

    this.initBuffers = function() {
        this.vertex_buffer = [];
        var ancho = 4;

        var normalDerecha = [0,0,-1];
        var normalIzquierda = [0,0,1];
        var normalTrasera = [-1,0,0];
        var normalDelantera = [2,1,0];
        vec3.normalize(normalDelantera, normalDelantera)
        var normalSuperior = [0,-1,0];
        var normalInferior = [0,1,0];

        //Tapa trasera
        this.vertex_buffer.push(new Vertice([10, 0, 0], this.color_nave, normalTrasera, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([10, 0, 0], this.color_nave, normalTrasera, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([10, 0, 0], this.color_nave, normalTrasera, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([10, 0, 0], this.color_nave, normalTrasera, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([10, 0, 0], this.color_nave, normalTrasera, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([10, 0, 0], this.color_nave, normalTrasera, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([10, 0, 0], this.color_nave, normalTrasera, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([10, 0, 0], this.color_nave, normalTrasera, [0,0,0], [0,0]));


        //Primero con normales para la derecha
        this.vertex_buffer.push(new Vertice([10, -1, ancho], this.color_nave, normalTrasera, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([10, 2, ancho], this.color_nave, normalTrasera, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([10, 2, ancho], this.color_nave, normalTrasera, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([10, 2, -ancho], this.color_nave, normalTrasera, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([10, 2, -ancho], this.color_nave, normalTrasera, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([10, -1, -ancho], this.color_nave, normalTrasera, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([10, -1, -ancho], this.color_nave, normalTrasera, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([10, -1, ancho], this.color_nave, normalTrasera, [0,0,0], [0,0]));

        var normal1 = [-1,1,0];
        vec3.normalize(normal1, normal1);

        //Primero con normales para el lado correspondiente
        this.vertex_buffer.push(new Vertice([10, -1, ancho], this.color_cabina, normalDerecha, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([10, 2, ancho], this.color_cabina, normalDerecha, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([10, 2, ancho], this.color_cabina, normalSuperior, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([10, 2, -ancho], this.color_cabina, normalSuperior, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([10, 2, -ancho], this.color_cabina, normalIzquierda, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([10, -1, -ancho], this.color_cabina, normalIzquierda, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([10, -1, -ancho], this.color_cabina, normal1, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([10, -1, ancho], this.color_cabina, normal1, [0,0,0], [0,0]));

        //Segundo
        this.vertex_buffer.push(new Vertice([9, -2, ancho], this.color_cabina, normalDerecha, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([8, 2, ancho], this.color_cabina, normalDerecha, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([8, 2, ancho], this.color_cabina, normalSuperior, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([8, 2, -ancho], this.color_cabina, normalSuperior, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([8, 2, -ancho], this.color_cabina, normalIzquierda, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([9, -2, -ancho], this.color_cabina, normalIzquierda, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([9, -2, -ancho], this.color_cabina, normal1, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([9, -2, ancho], this.color_cabina, normal1, [0,0,0], [0,0]));

        var normal2 = [-1,-1,0];
        vec3.normalize(normal2, normal2);

        //Segundo bis
        this.vertex_buffer.push(new Vertice([9, -2, ancho], this.color_cabina, normalDerecha, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([8, 2, ancho], this.color_cabina, normalDerecha, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([8, 2, ancho], this.color_cabina, normal2, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([8, 2, -ancho], this.color_cabina, normal2, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([8, 2, -ancho], this.color_cabina, normalIzquierda, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([9, -2, -ancho], this.color_cabina, normalIzquierda, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([9, -2, -ancho], this.color_cabina, normalInferior, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([9, -2, ancho], this.color_cabina, normalInferior, [0,0,0], [0,0]));

        //Tercero
        this.vertex_buffer.push(new Vertice([7, -2, ancho], this.color_cabina, normalDerecha, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([6, 4, ancho], this.color_cabina, normalDerecha, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([6, 4, ancho], this.color_cabina, normal2, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([6, 4, -ancho], this.color_cabina, normal2, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([6, 4, -ancho], this.color_cabina, normalIzquierda, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([7, -2, -ancho], this.color_cabina, normalIzquierda, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([7, -2, -ancho], this.color_cabina, normalInferior, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([7, -2, ancho], this.color_cabina, normalInferior, [0,0,0], [0,0]));

        //Tercero bis
        this.vertex_buffer.push(new Vertice([7, -2, ancho], this.color_cabina, normalDerecha, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([6, 4, ancho], this.color_cabina, normalDerecha, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([6, 4, ancho], this.color_cabina, normalSuperior, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([6, 4, -ancho], this.color_cabina, normalSuperior, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([6, 4, -ancho], this.color_cabina, normalIzquierda, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([7, -2, -ancho], this.color_cabina, normalIzquierda, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([7, -2, -ancho], this.color_cabina, normal1, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([7, -2, ancho], this.color_cabina, normal1, [0,0,0], [0,0]));

        //Cuarto
        this.vertex_buffer.push(new Vertice([5, -4, ancho], this.color_cabina, normalDerecha, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([5, 4, ancho], this.color_cabina, normalDerecha, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([5, 4, ancho], this.color_cabina, normalSuperior, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([5, 4, -ancho], this.color_cabina, normalSuperior, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([5, 4, -ancho], this.color_cabina, normalIzquierda, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([5, -4, -ancho], this.color_cabina, normalIzquierda, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([5, -4, -ancho], this.color_cabina, normal1, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([5, -4, ancho], this.color_cabina, normal1, [0,0,0], [0,0]));

        //Cuarto bis
        this.vertex_buffer.push(new Vertice([5, -4, ancho], this.color_cabina, normalDerecha, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([5, 4, ancho], this.color_cabina, normalDerecha, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([5, 4, ancho], this.color_cabina, normalSuperior, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([5, 4, -ancho], this.color_cabina, normalSuperior, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([5, 4, -ancho], this.color_cabina, normalIzquierda, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([5, -4, -ancho], this.color_cabina, normalIzquierda, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([5, -4, -ancho], this.color_cabina, normalInferior, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([5, -4, ancho], this.color_cabina, normalInferior, [0,0,0], [0,0]));

        //Quinto
        this.vertex_buffer.push(new Vertice([-3, -4, ancho], this.color_cabina, normalDerecha, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([-3, 4, ancho], this.color_cabina, normalDerecha, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([-3, 4, ancho], this.color_cabina, normalSuperior, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([-3, 4, -ancho], this.color_cabina, normalSuperior, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([-3, 4, -ancho], this.color_cabina, normalIzquierda, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([-3, -4, -ancho], this.color_cabina, normalIzquierda, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([-3, -4, -ancho], this.color_cabina, normalInferior, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([-3, -4, ancho], this.color_cabina, normalInferior, [0,0,0], [0,0]));

        var normal3 = [5,-4,0];
        vec3.normalize(normal3, normal3);

        //Quinto bis
        this.vertex_buffer.push(new Vertice([-3, -4, ancho], this.color_cabina, normalDerecha, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([-3, 4, ancho], this.color_cabina, normalDerecha, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([-3, 4, ancho], this.color_vidrio, normal3, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([-3, 4, -ancho], this.color_vidrio, normal3, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([-3, 4, -ancho], this.color_cabina, normalIzquierda, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([-3, -4, -ancho], this.color_cabina, normalIzquierda, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([-3, -4, -ancho], this.color_cabina, normalInferior, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([-3, -4, ancho], this.color_cabina, normalInferior, [0,0,0], [0,0]));

        //Sexto
        this.vertex_buffer.push(new Vertice([-8, -4, ancho], this.color_cabina, normalDerecha, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([-8, 0, ancho], this.color_cabina, normalDerecha, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([-8, 0, ancho], this.color_vidrio, normal3, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([-8, 0, -ancho], this.color_vidrio, normal3, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([-8, 0, -ancho], this.color_cabina, normalIzquierda, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([-8, -4, -ancho], this.color_cabina, normalIzquierda, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([-8, -4, -ancho], this.color_cabina, normalInferior, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([-8, -4, ancho], this.color_cabina, normalInferior, [0,0,0], [0,0]));

        var normal4 = [2,-8,0];
        vec3.normalize(normal4, normal4);

        //Sexto bis
        this.vertex_buffer.push(new Vertice([-8, -4, ancho], this.color_cabina, normalDerecha, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([-8, 0, ancho], this.color_cabina, normalDerecha, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([-8, 0, ancho], this.color_cabina, normal4, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([-8, 0, -ancho], this.color_cabina, normal4, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([-8, 0, -ancho], this.color_cabina, normalIzquierda, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([-8, -4, -ancho], this.color_cabina, normalIzquierda, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([-8, -4, -ancho], this.color_cabina, normalInferior, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([-8, -4, ancho], this.color_cabina, normalInferior, [0,0,0], [0,0]));

        //Septimo con normales para el lado correspondiente
        this.vertex_buffer.push(new Vertice([-15, -4, ancho], this.color_cabina, normalDerecha, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([-16, -2, ancho], this.color_cabina, normalDerecha, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([-16, -2, ancho], this.color_cabina, normal4, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([-16, -2, -ancho], this.color_cabina, normal4, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([-16, -2, -ancho], this.color_cabina, normalIzquierda, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([-15, -4, -ancho], this.color_cabina, normalIzquierda, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([-15, -4, -ancho], this.color_cabina, normalInferior, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([-15, -4, ancho], this.color_cabina, normalInferior, [0,0,0], [0,0]));

        //Septimo con normales para el lado izquierdo
        this.vertex_buffer.push(new Vertice([-15, -4, ancho], this.color_nave, normalDelantera, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([-16, -2, ancho], this.color_nave, normalDelantera, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([-16, -2, ancho], this.color_nave, normalDelantera, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([-16, -2, -ancho], this.color_nave, normalDelantera, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([-16, -2, -ancho], this.color_nave, normalDelantera, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([-15, -4, -ancho], this.color_nave, normalDelantera, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([-15, -4, -ancho], this.color_nave, normalDelantera, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([-15, -4, ancho], this.color_nave, normalDelantera, [0,0,0], [0,0]));

        //Tapa delantera
        this.vertex_buffer.push(new Vertice([-15.5, -3, 0], this.color_nave, normalDelantera, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([-15.5, -3, 0], this.color_nave, normalDelantera, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([-15.5, -3, 0], this.color_nave, normalDelantera, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([-15.5, -3, 0], this.color_nave, normalDelantera, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([-15.5, -3, 0], this.color_nave, normalDelantera, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([-15.5, -3, 0], this.color_nave, normalDelantera, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([-15.5, -3, 0], this.color_nave, normalDelantera, [0,0,0], [0,0]));
        this.vertex_buffer.push(new Vertice([-15.5, -3, 0], this.color_nave, normalDelantera, [0,0,0], [0,0]));


        this.index_buffer = grid(16,8);


        // Creación e Inicialización de los buffers a nivel de OpenGL
        var position_buffer = getPositionBuffer(this.vertex_buffer);
        var normal_buffer = getNormalBuffer(this.vertex_buffer);

        this.webgl_normal_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normal_buffer), gl.STATIC_DRAW);
        this.webgl_normal_buffer.itemSize = 3;
        this.webgl_normal_buffer.numItems = normal_buffer.length / 3;

        this.webgl_position_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(position_buffer), gl.STATIC_DRAW);
        this.webgl_position_buffer.itemSize = 3;
        this.webgl_position_buffer.numItems = position_buffer.length / 3;

        this.webgl_index_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.index_buffer), gl.STATIC_DRAW);
        this.webgl_index_buffer.itemSize = 1;
        this.webgl_index_buffer.numItems = this.index_buffer.length;

        var color_buffer = getColorBuffer(this.vertex_buffer);
        this.webgl_color_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_color_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color_buffer), gl.STATIC_DRAW);
        this.webgl_color_buffer.itemSize = 3;
        this.webgl_color_buffer.numItems = color_buffer.length / 3;
    }

    this.draw = function(modelMatrix, shaderProgram){
        // Se configuran los buffers que alimentarán el pipeline
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.webgl_position_buffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
        gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, this.webgl_normal_buffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_color_buffer);
        gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, this.webgl_color_buffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.uniformMatrix4fv(shaderProgram.ModelMatrixUniform, false, modelMatrix);
        var normalMatrix = mat3.create();
        mat3.fromMat4(normalMatrix, modelMatrix);
        mat3.invert(normalMatrix, normalMatrix);
        mat3.transpose(normalMatrix, normalMatrix);
        gl.uniformMatrix3fv(shaderProgram.nMatrixUniform, false, normalMatrix);
        
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
        //gl.drawElements(gl.LINE_LOOP, this.webgl_index_buffer.numItems, gl.UNSIGNED_SHORT, 0);
        gl.drawElements(gl.TRIANGLE_STRIP, this.webgl_index_buffer.numItems, gl.UNSIGNED_SHORT, 0);
    }
}