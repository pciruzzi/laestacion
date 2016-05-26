function Paralelepipedo(punto1, punto2, punto3, punto4, punto5, punto6, punto7, punto8, color, esTexturada) {
    this.punto1 = punto1;
    this.punto2 = punto2;
    this.punto3 = punto3;
    this.punto4 = punto4;
    this.punto5 = punto5;
    this.punto6 = punto6;
    this.punto7 = punto7;
    this.punto8 = punto8;
    this.color = color;
    this.esTexturada = esTexturada;

    this.vertex_buffer = null;
    this.index_buffer = null;

    this.webgl_position_buffer = null;
    this.webgl_texture_coord_buffer = null;
    this.webgl_tangent_buffer = null;
    this.webgl_normal_buffer = null;
    this.webgl_color_buffer = null;
    this.webgl_index_buffer = null;

    this.texture = null;

    this.initTexture = function(gl,texture_file){
        
        var aux_texture = gl.createTexture();
        this.texture = aux_texture;
        this.texture.image = new Image();

        this.texture.image.onload = function () {
               handleLoadedTexture(gl);
        }
        this.texture.image.src = texture_file;
    }

    this.calcularNormal = function(puntoA, puntoB, puntoC) {
        var A = vec3.fromValues(puntoA[0], puntoA[1], puntoA[2]);
        var B = vec3.fromValues(puntoB[0], puntoB[1], puntoB[2]);
        var C = vec3.fromValues(puntoC[0], puntoC[1], puntoC[2]);

        vec3.subtract(A, B, A);
        vec3.subtract(B, C, B);

        var normal = vec3.create();
        vec3.cross(normal, B, A);
        vec3.normalize(normal, normal);

        return normal;
    }

    this.initBuffers = function(){
        this.vertex_buffer = [];
        //Funcion para llenar el vertex_buffer del paralelepipedo con los vertices correspondientes.
        //Cara Delantera
        //Normal
        var normalDelantera = this.calcularNormal(punto5, punto6, punto2);
        //Tangente
        var tangenteDelantera = [1.0,0.0,0.0];
        //Textura
        var textureDelantera = [0,0];
        if (this.esTexturada) {
            //Ver que hacer con los u y v
            //textureDelantera = [u,v];
        }
        //Vertices
        this.vertex_buffer.push(new vertice(this.punto5, this.color, normalDelantera, tangenteDelantera, textureDelantera));
        this.vertex_buffer.push(new vertice(this.punto6, this.color, normalDelantera, tangenteDelantera, textureDelantera));
        this.vertex_buffer.push(new vertice(this.punto2, this.color, normalDelantera, tangenteDelantera, textureDelantera));
        this.vertex_buffer.push(new vertice(this.punto1, this.color, normalDelantera, tangenteDelantera, textureDelantera));

        //Cara Trasera
        //Normal
        var normalTrasera = this.calcularNormal(punto8, punto7, punto3);
        //Tangente
        var tangenteTrasera = [-1.0,0.0,0.0];
        //Textura
        var textureTrasera = [0,0];
        if (this.esTexturada) {
            //Ver que hacer con los u y v
            //textureTrasera = [u,v];
        }
        //Vertices
        this.vertex_buffer.push(new vertice(this.punto8, this.color, normalTrasera, tangenteTrasera, textureTrasera));
        this.vertex_buffer.push(new vertice(this.punto7, this.color, normalTrasera, tangenteTrasera, textureTrasera));
        this.vertex_buffer.push(new vertice(this.punto3, this.color, normalTrasera, tangenteTrasera, textureTrasera));
        this.vertex_buffer.push(new vertice(this.punto4, this.color, normalTrasera, tangenteTrasera, textureTrasera));

        //Cara Izquierda
        //Normal
        var normalIzquierda = this.calcularNormal(punto8, punto5, punto1);
        //Tangente
        var tangenteIzquierda = [0.0,0.0,1.0];
        //Textura
        var textureIzquierda = [0,0];
        if (this.esTexturada) {
            //Ver que hacer con los u y v
            //textureIzquierda = [u,v];
        }
        //Vertices
        this.vertex_buffer.push(new vertice(this.punto8, this.color, normalIzquierda, tangenteIzquierda, textureIzquierda));
        this.vertex_buffer.push(new vertice(this.punto5, this.color, normalIzquierda, tangenteIzquierda, textureIzquierda));
        this.vertex_buffer.push(new vertice(this.punto1, this.color, normalIzquierda, tangenteIzquierda, textureIzquierda));
        this.vertex_buffer.push(new vertice(this.punto4, this.color, normalIzquierda, tangenteIzquierda, textureIzquierda));

        //Cara Derecha
        //Normal
        var normalDerecha = this.calcularNormal(punto7, punto6, punto2);;
        //Tangente
        var tangenteDerecha = [0.0,0.0,-1.0];
        //Textura
        var textureDerecha = [0,0];
        if (this.esTexturada) {
            //Ver que hacer con los u y v
            //textureDerecha = [u,v];
        }
        //Vertices
        this.vertex_buffer.push(new vertice(this.punto7, this.color, normalDerecha, tangenteDerecha, textureDerecha));
        this.vertex_buffer.push(new vertice(this.punto6, this.color, normalDerecha, tangenteDerecha, textureDerecha));
        this.vertex_buffer.push(new vertice(this.punto2, this.color, normalDerecha, tangenteDerecha, textureDerecha));
        this.vertex_buffer.push(new vertice(this.punto3, this.color, normalDerecha, tangenteDerecha, textureDerecha));

        //Cara Superior
        //Normal
        var normalSuperior = this.calcularNormal(punto1, punto2, punto3);
        //Tangente
        var tangenteSuperior = [1.0,0.0,0.0];
        //Textura
        var textureSuperior = [0,0];
        if (this.esTexturada) {
            //Ver que hacer con los u y v
            //textureSuperior = [u,v];
        }
        //Vertices
        this.vertex_buffer.push(new vertice(this.punto1, this.color, normalSuperior, tangenteSuperior, textureSuperior));
        this.vertex_buffer.push(new vertice(this.punto2, this.color, normalSuperior, tangenteSuperior, textureSuperior));
        this.vertex_buffer.push(new vertice(this.punto3, this.color, normalSuperior, tangenteSuperior, textureSuperior));
        this.vertex_buffer.push(new vertice(this.punto4, this.color, normalSuperior, tangenteSuperior, textureSuperior));

        //Cara Inferior
        //Normal
        var normalInferior = this.calcularNormal(punto5, punto6, punto7);
        //Tangente
        var tangenteInferior = [-1.0,0.0,0.0];
        //Textura
        var textureInferior = [0,0];
        if (this.esTexturada) {
            //Ver que hacer con los u y v
            //textureInferior = [u,v];
        }
        //Vertices
        this.vertex_buffer.push(new vertice(this.punto5, this.color, normalInferior, tangenteInferior, textureInferior));
        this.vertex_buffer.push(new vertice(this.punto6, this.color, normalInferior, tangenteInferior, textureInferior));
        this.vertex_buffer.push(new vertice(this.punto7, this.color, normalInferior, tangenteInferior, textureInferior));
        this.vertex_buffer.push(new vertice(this.punto8, this.color, normalInferior, tangenteInferior, textureInferior));

        // Buffer de indices de los triangulos
        this.index_buffer = [

            // Cara Delantera
            0, 1, 2,
            0, 2, 3,

            // Cara Trasera
            4, 5, 6,
            4, 6, 7,

            // Cara Izquierda
            8,  9, 10,
            8, 10, 11,

            // Cara Derecha
            12, 14, 13,
            12, 15, 14,

            // Cara Superior
            16, 17, 18,
            16, 18, 19,

            // Cara Inferior
            20, 21, 22,
            20, 22, 23

        ];


        // Creación e Inicialización de los buffers a nivel de OpenGL
        var position_buffer = getPositionBuffer(this.vertex_buffer);
        console.log(position_buffer);
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

        if (this.esTexturada) {
            var texture_coord_buffer = getTextureBuffer(this.vertex_buffer);

            this.webgl_texture_coord_buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_coord_buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texture_coord_buffer), gl.STATIC_DRAW);
            this.webgl_texture_coord_buffer.itemSize = 2;
            this.webgl_texture_coord_buffer.numItems = texture_coord_buffer.length / 2;
        } else {
            var color_buffer = getColorBuffer(this.vertex_buffer);

            this.webgl_color_buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_color_buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color_buffer), gl.STATIC_DRAW);
            this.webgl_color_buffer.itemSize = 3;
            this.webgl_color_buffer.numItems = color_buffer.length / 3;
        }
    }

    this.draw = function(modelMatrix){
        // Se configuran los buffers que alimentarán el pipeline
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.webgl_position_buffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
        gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, this.webgl_normal_buffer.itemSize, gl.FLOAT, false, 0, 0);

        if (this.esTexturada) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_coord_buffer);
            gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, this.webgl_texture_coord_buffer.itemSize, gl.FLOAT, false, 0, 0);

            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            gl.uniform1i(shaderProgram.samplerUniform, 0);
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
        } else {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_color_buffer);
            gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, this.webgl_color_buffer.itemSize, gl.FLOAT, false, 0, 0);
        }

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