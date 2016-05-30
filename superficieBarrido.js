function SuperficieBarrido(forma, camino, color, esTexturada) { // -> forma y camino son buffers de vértices
    this.columnas = null;
    this.filas = null;
    this.color = color;
    this.esTexturada = esTexturada;

    this.camino = camino;
    this.forma = forma;
    
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

    this.calcularTangentes = function(){
        this.tangent_buffer = [];
        var caminoTangentBuffer = getTangentBuffer(this.camino);
        for (var i = 0; i < 3*this.filas-2; i+=3) {
            var tgx = caminoTangentBuffer[i];
            var tgy = caminoTangentBuffer[i+1];
            var tgz = caminoTangentBuffer[i+2];
            for (var j = 0; j < this.columnas; j++) {
                this.tangent_buffer.push(tgx, tgy, tgz);
            }
        }
    }

    this.posicion = function(i,j){
        if (j < 0)
            return this.posicion(i,0);
        if (j >= this.columnas)
            return this.posicion(i, this.columnas-1);

        var posicion = vec3.create();
        posicion[0] = this.position_buffer[3*(this.columnas*i + j)];
        posicion[1] = this.position_buffer[3*(this.columnas*i + j) + 1];
        posicion[2] = this.position_buffer[3*(this.columnas*i + j) + 2];
        return posicion;
    }

    this.calcularNormales = function(){
        this.normal_buffer = [];
        for (var i = 0; i < this.filas; i++) {
            for (var j = 0; j < this.columnas; j++) {
                var anterior = this.posicion(i,j-1);
                var siguiente = this.posicion(i,j+1);

                var resta = vec3.create();
                vec3.subtract(resta, siguiente, anterior);

                var tangentePunto = [this.tangent_buffer[3*(this.columnas*i + j)], this.tangent_buffer[3*(this.columnas*i + j)+1], this.tangent_buffer[3*(this.columnas*i + j)+2]];
                var normal = vec3.create();
                vec3.cross(normal, tangentePunto, resta);
                vec3.normalize(normal, normal);

                this.normal_buffer.push(normal[0], normal[1], normal[2]);
            }
        }
    }

    this.calcularAngulo = function(vector1, vector2){
        var dotProduct = vec3.dot(vector1, vector2);
        var acos = dotProduct/(vec3.length(vector1)*vec3.length(vector2));
        return Math.acos(acos);
    }

    this.initBuffers = function(){
        this.vertex_buffer = [];
        this.position_buffer = [];
        this.color_buffer = [];
        this.normal_buffer = [];
        this.columnas = getCantidadVertices(this.forma);
        this.filas = getCantidadVertices(this.camino);

        var positionBufferCamino = getPositionBuffer(this.camino);
        var tangentBufferCamino = getTangentBuffer(this.camino);
        var normalBufferCamino = getNormalBuffer(this.camino);
        var binormalBufferCamino = getBinormalBuffer(this.camino);

        var positionBufferForma = getPositionBuffer(this.forma);
        var normalBufferForma = getNormalBuffer(this.forma);

        for (var i = 0; i < this.filas; i++) {
            var xCamino = positionBufferCamino[3*i];
            var yCamino = positionBufferCamino[3*i+1];
            var zCamino = positionBufferCamino[3*i+2];

            var tgxCamino = tangentBufferCamino[3*i];
            var tgyCamino = tangentBufferCamino[3*i+1];
            var tgzCamino = tangentBufferCamino[3*i+2];

            var nxCamino = normalBufferCamino[3*i];
            var nyCamino = normalBufferCamino[3*i+1];
            var nzCamino = normalBufferCamino[3*i+2];

            var bnxCamino = binormalBufferCamino[3*i];
            var bnyCamino = binormalBufferCamino[3*i+1];
            var bnzCamino = binormalBufferCamino[3*i+2];

            for (var j = 0; j < 3*this.columnas-2; j+=3) {
                var rotacion = mat4.create();
                mat4.rotate(rotacion, rotacion, Math.PI/2, [0,1,0]);
                var posicion = vec3.fromValues(positionBufferForma[j], positionBufferForma[j+1], positionBufferForma[j+2]);
                var normal = vec3.fromValues(normalBufferForma[j], normalBufferForma[j+1], normalBufferForma[j+2]);
                var vertice = vec3.create();
                vec3.transformMat4(vertice, posicion, rotacion);

                var xForma = vertice[0];
                var yForma = vertice[1];
                var zForma = vertice[2];

                vec3.transformMat4(vertice, normal, rotacion);
                var nxForma = vertice[0];
                var nyForma = vertice[1];
                var nzForma = vertice[2];

                var x = bnxCamino * xForma + nxCamino * zForma - tgxCamino * yForma + xCamino;
                var y = bnyCamino * xForma + nyCamino * zForma - tgyCamino * yForma + yCamino;
                var z = bnzCamino * xForma + nzCamino * zForma - tgzCamino * yForma + zCamino;
                this.position_buffer.push(x, y, z);

                var nx = bnxCamino * nxForma + nxCamino * nyForma + tgxCamino * nzForma;
                var ny = bnyCamino * nxForma + nyCamino * nyForma + tgyCamino * nzForma;
                var nz = bnzCamino * nxForma + nzCamino * nyForma + tgzCamino * nzForma;
                this.normal_buffer.push(nx, ny, nz);

                this.color_buffer.push(this.color[j], this.color[j+1], this.color[j+2]);
            }
        }

        this.calcularTangentes();
        //this.calcularNormales();

        this.index_buffer = grid(this.filas, this.columnas);

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