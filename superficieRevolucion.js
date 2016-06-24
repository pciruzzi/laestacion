function SuperficieRevolucion(perfil, eje, n, color, esTexturada) { // -> perfil es un buffer de vértices, n es cantidad de repeticiones
    this.columnas = null;
    this.filas = null;
    this.color = color;
    this.esTexturada = esTexturada;

    this.perfil = perfil;
    this.eje = eje;
    this.n = n;
    
    this.vertex_buffer = null;
    this.position_buffer = null;
    this.normal_buffer = null;
    this.binormal_buffer = null;
    this.tangent_buffer = null;
    this.color_buffer = null;
    this.index_buffer = null;

    this.webgl_position_buffer = null;
    this.webgl_normal_buffer = null;
    this.webgl_tangent_buffer = null;
    this.webgl_binormal_buffer = null;
    this.webgl_texture_coord_buffer = null;
    this.webgl_color_buffer = null;
    this.webgl_index_buffer = null;

    this.texture = null;
    this.normalTexture = null;
    this.iluminationTexture = null;
    var weakThis = this;

    this.initTexture = function(texture_file){
        var aux_texture = gl.createTexture();
        this.texture = aux_texture;
        this.texture.image = new Image();

        this.texture.image.onload = function () {
            handleLoadedTexture(weakThis.texture);
        }
        this.texture.image.src = texture_file;
    }

    this.initNormalTexture = function(texture_file){
        var aux_texture = gl.createTexture();
        this.normalTexture = aux_texture;
        this.normalTexture.image = new Image();

        this.normalTexture.image.onload = function () {
            handleLoadedTexture(weakThis.normalTexture);
        }
        this.normalTexture.image.src = texture_file;
    }

    this.initIluminationTexture = function(texture_file){
        var aux_texture = gl.createTexture();
        this.iluminationTexture = aux_texture;
        this.iluminationTexture.image = new Image();

        this.iluminationTexture.image.onload = function () {
            handleLoadedTexture(weakThis.iluminationTexture);
        }
        this.iluminationTexture.image.src = texture_file;
    }

    this.initBuffers = function(cantU, cantV){
        this.vertex_buffer = [];
        this.position_buffer = [];
        this.color_buffer = [];
        this.columnas = this.n;
        this.filas = getCantidadVertices(this.perfil);

        var tangentBufferPerfil = getTangentBuffer(this.perfil);
        var normalBufferPerfil = getNormalBuffer(this.perfil)
        var positionBufferPerfil = getPositionBuffer(this.perfil);

        for (var i = 0; i < 3*this.filas-2; i+=3) {
            var punto = vec3.fromValues(positionBufferPerfil[i], positionBufferPerfil[i+1], positionBufferPerfil[i+2]);
            var tgPunto = vec3.fromValues(tangentBufferPerfil[i], tangentBufferPerfil[i+1], tangentBufferPerfil[i+2]);
            var normalPunto = vec3.fromValues(normalBufferPerfil[i], normalBufferPerfil[i+1], normalBufferPerfil[i+2]);
            for (var j = 0; j < this.columnas; j++) {
                var angle = 2*Math.PI*j/(this.n-1);
                var modelado = mat4.create();
                mat4.identity(modelado);
                mat4.rotate(modelado, modelado, angle, this.eje);

                var position = vec3.create();
                vec3.transformMat4(position, punto, modelado);
                var tangent = vec3.create();
                vec3.transformMat4(tangent, tgPunto, modelado);
                var normal = vec3.create();
                vec3.transformMat4(normal, normalPunto, modelado);
                var color = [this.color[i], this.color[i+1], this.color[i+2]];

                var texture = [0,0];
                // Asi tengo 4 veces la textura en u y 2 en v (La repito 8 veces)
                if (this.esTexturada) {
                    var u = cantU - cantU*(i / (3*this.filas - 2 - 1));
                    var v = cantV - cantV*(j / (this.columnas - 1));
                    texture = [u,v];
                }

                var vertex = new Vertice(position, color, normal, tangent, texture);
                this.vertex_buffer.push(vertex);
            }
        }
        this.position_buffer = getPositionBuffer(this.vertex_buffer);
        this.normal_buffer = getNormalBuffer(this.vertex_buffer);
        this.binormal_buffer = getBinormalBuffer(this.vertex_buffer);
        this.tangent_buffer = getTangentBuffer(this.vertex_buffer);
        this.color_buffer = getColorBuffer(this.vertex_buffer);

        this.index_buffer = grid(this.filas, this.columnas);

        // Creación e Inicialización de los buffers a nivel de OpenGL
        this.webgl_normal_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normal_buffer), gl.STATIC_DRAW);
        this.webgl_normal_buffer.itemSize = 3;
        this.webgl_normal_buffer.numItems = this.normal_buffer.length / 3;

        this.webgl_binormal_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_binormal_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.binormal_buffer), gl.STATIC_DRAW);
        this.webgl_binormal_buffer.itemSize = 3;
        this.webgl_binormal_buffer.numItems = this.binormal_buffer.length / 3;

        this.webgl_tangent_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_tangent_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.tangent_buffer), gl.STATIC_DRAW);
        this.webgl_tangent_buffer.itemSize = 3;
        this.webgl_tangent_buffer.numItems = this.tangent_buffer.length / 3;

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

    this.draw = function(modelMatrix, shaderProgram, conNormalMap, useIlumination, iluminationIntensity){
        // Se configuran los buffers que alimentarán el pipeline
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.webgl_position_buffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
        gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, this.webgl_normal_buffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_binormal_buffer);
        gl.vertexAttribPointer(shaderProgram.vertexBinormalAttribute, this.webgl_binormal_buffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_tangent_buffer);
        gl.vertexAttribPointer(shaderProgram.vertexTangentAttribute, this.webgl_tangent_buffer.itemSize, gl.FLOAT, false, 0, 0);

        if (this.esTexturada) {
            gl.uniform1i(shaderProgram.useColorUniform, false);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_coord_buffer);
            gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, this.webgl_texture_coord_buffer.itemSize, gl.FLOAT, false, 0, 0);

            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            gl.uniform1i(shaderProgram.samplerUniform, 0);
            //gl.bindTexture(gl.TEXTURE_2D, this.texture);
            if (conNormalMap) {
                gl.uniform1f(shaderProgram.useNormalUniform, true);
                gl.activeTexture(gl.TEXTURE1);
                gl.bindTexture(gl.TEXTURE_2D, this.normalTexture);
                gl.uniform1i(shaderProgram.samplerUniformNormal, 1);
            }
        } else {
            gl.uniform1i(shaderProgram.useColorUniform, true);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_color_buffer);
            gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, this.webgl_color_buffer.itemSize, gl.FLOAT, false, 0, 0);
        }

        if (useIlumination) {
            gl.uniform1f(shaderProgram.useIluminationUniform, true);
            gl.uniform1f(shaderProgram.iluminationIntensityUniform, iluminationIntensity);
            gl.activeTexture(gl.TEXTURE2);
            gl.bindTexture(gl.TEXTURE_2D, this.iluminationTexture);
            gl.uniform1i(shaderProgram.samplerUniformIlumination, 2);
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
        gl.uniform1f(shaderProgram.useNormalUniform, false);
        gl.uniform1f(shaderProgram.useIluminationUniform, false);
    }
}