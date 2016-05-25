function Tapa(externo, interno, color, esTexturada) { // -> externo e interno son buffers de vértices a unir
    this.columnas = null;
    this.filas = null;
    this.color = color;
    this.esTexturada = esTexturada;

    this.externo = externo;
    this.interno = interno;
	
    this.vertex_buffer = null;
    this.position_buffer = null;
    this.tangent_buffer = null;
    this.color_buffer = null;
    this.index_buffer = null;

    this.webgl_position_buffer = null;
    this.webgl_normal_buffer = null;
    this.webgl_texture_coord_buffer = null;
    this.webgl_color_buffer = null;
    this.webgl_index_buffer = null;

    this.texture = null;

    this.initTexture = function(texture_file){
        var aux_texture = gl.createTexture();
        this.texture = aux_texture;
        this.texture.image = new Image();

        this.texture.image.onload = function () {
               handleLoadedTexture()
        }
        this.texture.image.src = texture_file;
    }

    this.initBuffers = function(){
        this.vertex_buffer = [];
        this.position_buffer = [];
        this.color_buffer = [];
        this.columnas = getCantidadVertices(this.externo);
        this.filas = getCantidadVertices(this.interno);
        if (this.filas != this.columnas) console.log("HACIENDO TAPA CON FORMAS DE DISTINTA CANTIDAD DE PUNTOS!!");

        var tangentBufferExterno = getTangentBuffer(this.externo);
        var tangentBufferInterno = getTangentBuffer(this.interno);
        var positionBufferExterno = getPositionBuffer(this.externo);
        var positionBufferInterno = getPositionBuffer(this.interno);

        for (var i = 0; i < 3*this.filas-2; i+=3) {
            var puntoExt = vec3.fromValues(positionBufferExterno[i], positionBufferExterno[i+1], positionBufferExterno[i+2]);
            var tgPuntoExt = vec3.fromValues(tangentBufferExterno[i], tangentBufferExterno[i+1], tangentBufferExterno[i+2]);

            var puntoInt = vec3.fromValues(positionBufferInterno[i], positionBufferInterno[i+1], positionBufferInterno[i+2]);
            var tgPuntoInt = vec3.fromValues(tangentBufferInterno[i], tangentBufferInterno[i+1], tangentBufferInterno[i+2]);

            var normalPunto = vec3.fromValues(0,1,0);
            var color = [this.color[0], this.color[1], this.color[2]];

            var vertexExt = new vertice(puntoExt, color, normalPunto, tgPuntoExt, [0,0]);
            var vertexInt = new vertice(puntoInt, color, normalPunto, tgPuntoInt, [0,0]);

            this.vertex_buffer.push(vertexExt);
            this.vertex_buffer.push(vertexInt);
        }
        this.position_buffer = getPositionBuffer(this.vertex_buffer);
        this.normal_buffer = getNormalBuffer(this.vertex_buffer);
        this.tangent_buffer = getTangentBuffer(this.vertex_buffer);
        this.color_buffer = getColorBuffer(this.vertex_buffer);

        this.index_buffer = grid(this.filas, 2);

        // Creación e Inicialización de los buffers a nivel de OpenGL
        this.webgl_normal_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normal_buffer), gl.STATIC_DRAW);
        this.webgl_normal_buffer.itemSize = 3;
        this.webgl_normal_buffer.numItems = this.normal_buffer.length / 3;

        this.webgl_position_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.position_buffer), gl.STATIC_DRAW);
        this.webgl_position_buffer.itemSize = 3;
        this.webgl_position_buffer.numItems = this.position_buffer.length / 3;

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
            //var color_buffer = getColorBuffer(this.vertex_buffer);

            this.webgl_color_buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_color_buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.color_buffer), gl.STATIC_DRAW);
            this.webgl_color_buffer.itemSize = 3;
            this.webgl_color_buffer.numItems = this.color_buffer.length / 3;
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