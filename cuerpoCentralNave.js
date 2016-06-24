function CuerpoCentralNave() {
    this.vertex_buffer = null;
    this.index_buffer = null;

    this.color_nave = getColor("light gray");
    this.color_nave.push(2.0);
    // En el vidrio no utilizo reflexion
    this.color_vidrio = getColor("black");
    this.color_vidrio.push(0.0);

    this.webgl_position_buffer = null;
    this.webgl_texture_coord_buffer = null;
    this.webgl_tangent_buffer = null;
    this.webgl_normal_buffer = null;
    this.webgl_color_buffer = null;
    this.webgl_index_buffer = null;

    this.reflectionTexture = null;
    var weakThis = this;

    this.initReflectionTexture = function(texture_file){
        var aux_texture = gl.createTexture();
        this.reflectionTexture = aux_texture;
        this.reflectionTexture.image = new Image();

        this.reflectionTexture.image.onload = function () {
            handleLoadedTexture(weakThis.reflectionTexture);
        }
        this.reflectionTexture.image.src = texture_file;
    }

    this.initBuffers = function() {
        this.vertex_buffer = [];
        var ancho = 4;
        var uvReflection = [0.0,0.0,1.0];
        var uvNoReflection = [0.0,0.0,0.0];

        var normalDerecha = [0,0,-1];
        var normalIzquierda = [0,0,1];
        var normalTrasera = [-1,0,0];
        var normalDelantera = [2,1,0];
        vec3.normalize(normalDelantera, normalDelantera)
        var normalSuperior = [0,-1,0];
        var normalInferior = [0,1,0];

        //Tapa trasera
        this.vertex_buffer.push(new Vertice([10, 0, 0], this.color_nave, normalTrasera, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([10, 0, 0], this.color_nave, normalTrasera, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([10, 0, 0], this.color_nave, normalTrasera, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([10, 0, 0], this.color_nave, normalTrasera, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([10, 0, 0], this.color_nave, normalTrasera, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([10, 0, 0], this.color_nave, normalTrasera, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([10, 0, 0], this.color_nave, normalTrasera, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([10, 0, 0], this.color_nave, normalTrasera, [0,0,0], uvReflection));


        //Primero con normales para la derecha
        this.vertex_buffer.push(new Vertice([10, -1, ancho], this.color_nave, normalTrasera, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([10, 2, ancho], this.color_nave, normalTrasera, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([10, 2, ancho], this.color_nave, normalTrasera, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([10, 2, -ancho], this.color_nave, normalTrasera, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([10, 2, -ancho], this.color_nave, normalTrasera, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([10, -1, -ancho], this.color_nave, normalTrasera, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([10, -1, -ancho], this.color_nave, normalTrasera, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([10, -1, ancho], this.color_nave, normalTrasera, [0,0,0], uvReflection));

        var normal1 = [-1,1,0];
        vec3.normalize(normal1, normal1);

        //Primero con normales para el lado correspondiente
        this.vertex_buffer.push(new Vertice([10, -1, ancho], this.color_nave, normalDerecha, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([10, 2, ancho], this.color_nave, normalDerecha, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([10, 2, ancho], this.color_nave, normalSuperior, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([10, 2, -ancho], this.color_nave, normalSuperior, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([10, 2, -ancho], this.color_nave, normalIzquierda, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([10, -1, -ancho], this.color_nave, normalIzquierda, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([10, -1, -ancho], this.color_nave, normal1, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([10, -1, ancho], this.color_nave, normal1, [0,0,0], uvReflection));

        //Segundo
        this.vertex_buffer.push(new Vertice([9, -2, ancho], this.color_nave, normalDerecha, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([8, 2, ancho], this.color_nave, normalDerecha, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([8, 2, ancho], this.color_nave, normalSuperior, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([8, 2, -ancho], this.color_nave, normalSuperior, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([8, 2, -ancho], this.color_nave, normalIzquierda, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([9, -2, -ancho], this.color_nave, normalIzquierda, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([9, -2, -ancho], this.color_nave, normal1, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([9, -2, ancho], this.color_nave, normal1, [0,0,0], uvReflection));

        var normal2 = [-1,-1,0];
        vec3.normalize(normal2, normal2);

        //Segundo bis
        this.vertex_buffer.push(new Vertice([9, -2, ancho], this.color_nave, normalDerecha, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([8, 2, ancho], this.color_nave, normalDerecha, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([8, 2, ancho], this.color_nave, normal2, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([8, 2, -ancho], this.color_nave, normal2, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([8, 2, -ancho], this.color_nave, normalIzquierda, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([9, -2, -ancho], this.color_nave, normalIzquierda, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([9, -2, -ancho], this.color_nave, normalInferior, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([9, -2, ancho], this.color_nave, normalInferior, [0,0,0], uvReflection));

        //Tercero
        this.vertex_buffer.push(new Vertice([7, -2, ancho], this.color_nave, normalDerecha, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([6, 4, ancho], this.color_nave, normalDerecha, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([6, 4, ancho], this.color_nave, normal2, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([6, 4, -ancho], this.color_nave, normal2, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([6, 4, -ancho], this.color_nave, normalIzquierda, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([7, -2, -ancho], this.color_nave, normalIzquierda, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([7, -2, -ancho], this.color_nave, normalInferior, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([7, -2, ancho], this.color_nave, normalInferior, [0,0,0], uvReflection));

        //Tercero bis
        this.vertex_buffer.push(new Vertice([7, -2, ancho], this.color_nave, normalDerecha, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([6, 4, ancho], this.color_nave, normalDerecha, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([6, 4, ancho], this.color_nave, normalSuperior, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([6, 4, -ancho], this.color_nave, normalSuperior, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([6, 4, -ancho], this.color_nave, normalIzquierda, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([7, -2, -ancho], this.color_nave, normalIzquierda, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([7, -2, -ancho], this.color_nave, normal1, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([7, -2, ancho], this.color_nave, normal1, [0,0,0], uvReflection));

        //Cuarto
        this.vertex_buffer.push(new Vertice([5, -4, ancho], this.color_nave, normalDerecha, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([5, 4, ancho], this.color_nave, normalDerecha, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([5, 4, ancho], this.color_nave, normalSuperior, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([5, 4, -ancho], this.color_nave, normalSuperior, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([5, 4, -ancho], this.color_nave, normalIzquierda, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([5, -4, -ancho], this.color_nave, normalIzquierda, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([5, -4, -ancho], this.color_nave, normal1, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([5, -4, ancho], this.color_nave, normal1, [0,0,0], uvReflection));

        //Cuarto bis
        this.vertex_buffer.push(new Vertice([5, -4, ancho], this.color_nave, normalDerecha, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([5, 4, ancho], this.color_nave, normalDerecha, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([5, 4, ancho], this.color_nave, normalSuperior, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([5, 4, -ancho], this.color_nave, normalSuperior, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([5, 4, -ancho], this.color_nave, normalIzquierda, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([5, -4, -ancho], this.color_nave, normalIzquierda, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([5, -4, -ancho], this.color_nave, normalInferior, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([5, -4, ancho], this.color_nave, normalInferior, [0,0,0], uvReflection));

        //Quinto
        this.vertex_buffer.push(new Vertice([-3, -4, ancho], this.color_nave, normalDerecha, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([-3, 4, ancho], this.color_nave, normalDerecha, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([-3, 4, ancho], this.color_nave, normalSuperior, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([-3, 4, -ancho], this.color_nave, normalSuperior, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([-3, 4, -ancho], this.color_nave, normalIzquierda, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([-3, -4, -ancho], this.color_nave, normalIzquierda, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([-3, -4, -ancho], this.color_nave, normalInferior, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([-3, -4, ancho], this.color_nave, normalInferior, [0,0,0], uvReflection));

        var normal3 = [5,-4,0];
        vec3.normalize(normal3, normal3);

        //Quinto bis
        this.vertex_buffer.push(new Vertice([-3, -4, ancho], this.color_nave, normalDerecha, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([-3, 4, ancho], this.color_nave, normalDerecha, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([-3, 4, ancho], this.color_vidrio, normal3, [0,0,0], uvNoReflection));
        this.vertex_buffer.push(new Vertice([-3, 4, -ancho], this.color_vidrio, normal3, [0,0,0], uvNoReflection));
        this.vertex_buffer.push(new Vertice([-3, 4, -ancho], this.color_nave, normalIzquierda, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([-3, -4, -ancho], this.color_nave, normalIzquierda, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([-3, -4, -ancho], this.color_nave, normalInferior, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([-3, -4, ancho], this.color_nave, normalInferior, [0,0,0], uvReflection));

        //Sexto
        this.vertex_buffer.push(new Vertice([-8, -4, ancho], this.color_nave, normalDerecha, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([-8, 0, ancho], this.color_nave, normalDerecha, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([-8, 0, ancho], this.color_vidrio, normal3, [0,0,0], uvNoReflection));
        this.vertex_buffer.push(new Vertice([-8, 0, -ancho], this.color_vidrio, normal3, [0,0,0], uvNoReflection));
        this.vertex_buffer.push(new Vertice([-8, 0, -ancho], this.color_nave, normalIzquierda, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([-8, -4, -ancho], this.color_nave, normalIzquierda, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([-8, -4, -ancho], this.color_nave, normalInferior, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([-8, -4, ancho], this.color_nave, normalInferior, [0,0,0], uvReflection));

        var normal4 = [2,-8,0];
        vec3.normalize(normal4, normal4);

        //Sexto bis
        this.vertex_buffer.push(new Vertice([-8, -4, ancho], this.color_nave, normalDerecha, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([-8, 0, ancho], this.color_nave, normalDerecha, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([-8, 0, ancho], this.color_nave, normal4, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([-8, 0, -ancho], this.color_nave, normal4, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([-8, 0, -ancho], this.color_nave, normalIzquierda, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([-8, -4, -ancho], this.color_nave, normalIzquierda, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([-8, -4, -ancho], this.color_nave, normalInferior, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([-8, -4, ancho], this.color_nave, normalInferior, [0,0,0], uvReflection));

        //Septimo con normales para el lado correspondiente
        this.vertex_buffer.push(new Vertice([-15, -4, ancho], this.color_nave, normalDerecha, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([-16, -2, ancho], this.color_nave, normalDerecha, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([-16, -2, ancho], this.color_nave, normal4, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([-16, -2, -ancho], this.color_nave, normal4, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([-16, -2, -ancho], this.color_nave, normalIzquierda, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([-15, -4, -ancho], this.color_nave, normalIzquierda, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([-15, -4, -ancho], this.color_nave, normalInferior, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([-15, -4, ancho], this.color_nave, normalInferior, [0,0,0], uvReflection));

        //Septimo con normales para el lado izquierdo
        this.vertex_buffer.push(new Vertice([-15, -4, ancho], this.color_nave, normalDelantera, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([-16, -2, ancho], this.color_nave, normalDelantera, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([-16, -2, ancho], this.color_nave, normalDelantera, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([-16, -2, -ancho], this.color_nave, normalDelantera, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([-16, -2, -ancho], this.color_nave, normalDelantera, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([-15, -4, -ancho], this.color_nave, normalDelantera, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([-15, -4, -ancho], this.color_nave, normalDelantera, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([-15, -4, ancho], this.color_nave, normalDelantera, [0,0,0], uvReflection));

        //Tapa delantera
        this.vertex_buffer.push(new Vertice([-15.5, -3, 0], this.color_nave, normalDelantera, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([-15.5, -3, 0], this.color_nave, normalDelantera, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([-15.5, -3, 0], this.color_nave, normalDelantera, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([-15.5, -3, 0], this.color_nave, normalDelantera, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([-15.5, -3, 0], this.color_nave, normalDelantera, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([-15.5, -3, 0], this.color_nave, normalDelantera, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([-15.5, -3, 0], this.color_nave, normalDelantera, [0,0,0], uvReflection));
        this.vertex_buffer.push(new Vertice([-15.5, -3, 0], this.color_nave, normalDelantera, [0,0,0], uvReflection));


        this.index_buffer = grid(16,8);


        // Creación e Inicialización de los buffers a nivel de OpenGL
        var position_buffer = getPositionBuffer(this.vertex_buffer);
        var normal_buffer = getNormalBuffer(this.vertex_buffer);
        var tangent_buffer = getTangentBuffer(this.vertex_buffer);
        var binormal_buffer = getBinormalBuffer(this.vertex_buffer);

        this.webgl_normal_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normal_buffer), gl.STATIC_DRAW);
        this.webgl_normal_buffer.itemSize = 3;
        this.webgl_normal_buffer.numItems = normal_buffer.length / 3;

        this.webgl_binormal_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_binormal_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(binormal_buffer), gl.STATIC_DRAW);
        this.webgl_binormal_buffer.itemSize = 3;
        this.webgl_binormal_buffer.numItems = binormal_buffer.length / 3;

        this.webgl_tangent_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_tangent_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tangent_buffer), gl.STATIC_DRAW);
        this.webgl_tangent_buffer.itemSize = 3;
        this.webgl_tangent_buffer.numItems = tangent_buffer.length / 3;

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
        this.webgl_color_buffer.itemSize = 4;
        this.webgl_color_buffer.numItems = color_buffer.length / 4;
    }

    this.draw = function(modelMatrix, shaderProgram){
        // Se configuran los buffers que alimentarán el pipeline
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.webgl_position_buffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
        gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, this.webgl_normal_buffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_binormal_buffer);
        gl.vertexAttribPointer(shaderProgram.vertexBinormalAttribute, this.webgl_binormal_buffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_tangent_buffer);
        gl.vertexAttribPointer(shaderProgram.vertexTangentAttribute, this.webgl_tangent_buffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_color_buffer);
        gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, this.webgl_color_buffer.itemSize, gl.FLOAT, false, 0, 0);

        // Reflexion -> No le seteo la variable uUseReflection porque lo hago a traves de la 4° coordenada del color
        gl.activeTexture(gl.TEXTURE3);
        gl.bindTexture(gl.TEXTURE_2D, this.reflectionTexture);
        gl.uniform1i(shaderProgram.samplerUniformReflection, 3);

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