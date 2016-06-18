function Esfera(latitude_bands, longitude_bands, color, esTexturada){

    this.latitudeBands = latitude_bands;
    this.longitudeBands = longitude_bands;
    this.color = color;
    this.esTexturada = esTexturada;

    this.vertex_buffer = null;
    this.index_buffer = null;

    this.webgl_position_buffer = null;
    this.webgl_normal_buffer = null;
    this.webgl_texture_coord_buffer = null;
    this.webgl_color_buffer = null;
    this.webgl_index_buffer = null;

    this.texture = null;

    this.initTexture = function(gl,texture_file) { 
    
        var aux_texture = gl.createTexture();
        this.texture = aux_texture;
        this.texture.image = new Image();

        this.texture.image.onload = function () {
               handleLoadedTexture(gl);
        }
        this.texture.image.src = texture_file;
    }


    // Se generan los vertices para la esfera, calculando los datos para una esfera de radio 1.
    // Y también la información de las normales y coordenadas de textura para cada vertice de la esfera.
    // La esfera se renderizara utilizando triangle_strip, para ello se arma un buffer de índices 
    // de todos los vértices de la esfera.
    this.initBuffers = function(){

        this.vertex_buffer = [];

        var latNumber;
        var longNumber;

        for (latNumber=0; latNumber < this.latitudeBands; latNumber++) {
            var theta = latNumber * Math.PI / (this.latitudeBands - 1);
            var sinTheta = Math.sin(theta);
            var cosTheta = Math.cos(theta);

            for (longNumber=0; longNumber < this.longitudeBands; longNumber++) {
                var phi = longNumber * 2 * Math.PI / (this.longitudeBands - 1);
                var sinPhi = Math.sin(phi);
                var cosPhi = Math.cos(phi);

                var x = cosPhi * sinTheta;
                var y = cosTheta;
                var z = sinPhi * sinTheta;
                
                var position = [x,y,z];
                var normal = [-x,-y,-z];
                var tangent = [-y,x,0];
                var texture = [0,0];

                if (this.esTexturada) {
                    var u = 1.0 - (longNumber / (this.longitudeBands - 1));
                    var v = 1.0 - (latNumber / (this.latitudeBands - 1));
                    texture = [u,v];
                }                

                var verticeActual = new Vertice(position, this.color, normal, tangent, texture);
                this.vertex_buffer.push(verticeActual);
            }
        }
        // Buffer de indices de los triangulos
        this.index_buffer = grid(this.latitudeBands, this.longitudeBands);

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

    this.draw = function(modelMatrix, shaderProgram){

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