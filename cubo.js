// La textura es para aplicarle a un solo lado del cubo!
function Cubo(alto, ancho, profundo, color, esTexturada) {
    this.alto = alto;
    this.ancho = ancho;
    this.profundo = profundo;
    if (! esTexturada) {
        this.colorInferior = color[0];
        this.colorDelantera = color[1];
        this.colorDerecha = color[2];
        this.colorTrasera = color[3];
        this.colorIzquierda = color[4];
        this.colorSuperior = color[5];
    }
    this.esTexturada = esTexturada;

    this.vertex_buffer = null;
    this.index_buffer = null;

    this.webgl_position_buffer = null;
    this.webgl_texture_coord_buffer = null;
    this.webgl_tangent_buffer = null;
    this.webgl_normal_buffer = null;
    this.webgl_binormal_buffer = null;
    this.webgl_color_buffer = null;
    this.webgl_index_buffer = null;

    this.texture = null;
    this.normalTexture = null;
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

    // Se generan los Vertices para el cubo con alto, ancho y profundo pasados por parametro.
    // El cubo se renderizara utilizando triangle_strip, para ello se arma un buffer de índices a todos los vértices del cubo.
    this.initBuffers = function(simpleCara, cantidadAlto, cantidadAncho){

        this.vertex_buffer = [];
        //Funcion para llenar el vertex_buffer del cubo con los Vertices correspondientes.
        var width   = this.ancho / 2.0;
        var height  = this.alto / 2.0;
        var z       = this.profundo / 2.0;

        //Voy a construir el cubo cara por cara, cada uno con sus 4 Vertices.
        //Cara Delantera
        var normalDelantera = [0.0,0.0,-1.0];
        var tangenteDelantera = [1.0,0.0,0.0];
        var textureDelanteraInferiorIzquierda = [0,0];
        var textureDelanteraInferiorDerecha = [0,0];
        var textureDelanteraSuperiorIzquierda = [0,0];
        var textureDelanteraSuperiorDerecha = [0,0];

        //Cara Trasera
        var normalTrasera = [0.0,0.0,1.0];
        var tangenteTrasera = [-1.0,0.0,0.0];
        var textureTraseraInferiorIzquierda = [0,0];
        var textureTraseraInferiorDerecha = [0,0];
        var textureTraseraSuperiorIzquierda = [0,0];
        var textureTraseraSuperiorDerecha = [0,0];

        if (this.esTexturada) {
            if (simpleCara) {
                textureDelanteraInferiorIzquierda = [0,0];
                textureDelanteraInferiorDerecha = [0,1];
                textureDelanteraSuperiorIzquierda = [1,0];
                textureDelanteraSuperiorDerecha = [1,1];
            } else {
                textureDelanteraInferiorIzquierda = [0,0];
                textureDelanteraInferiorDerecha = [0,cantidadAlto];
                textureDelanteraSuperiorIzquierda = [cantidadAncho,0];
                textureDelanteraSuperiorDerecha = [cantidadAncho,cantidadAlto];

                textureTraseraInferiorIzquierda = [0,0];
                textureTraseraInferiorDerecha = [0,cantidadAlto];
                textureTraseraSuperiorIzquierda = [cantidadAncho,0];
                textureTraseraSuperiorDerecha = [cantidadAncho,cantidadAlto];
            }
        }

        //Cara Derecha
        var normalDerecha = [-1.0,0.0,0.0];
        var tangenteDerecha = [0.0,0.0,-1.0];
        var textureDerecha = [0,0];


        //Cara Izquierda
        var normalIzquierda = [1.0,0.0,0.0];
        var tangenteIzquierda = [0.0,0.0,1.0];
        var textureIzquierda = [0,0];

        //Cara Superior
        var normalSuperior = [0.0,-1.0,0.0];
        var tangenteSuperior = [1.0,0.0,0.0];
        var textureSuperior = [0,0];

        //Cara Inferior
        var normalInferior = [0.0,1.0,0.0];
        var tangenteInferior = [-1.0,0.0,0.0];
        var textureInferior = [0,0];


        //inferior
        for (var i = 0; i < 8; i++) {
            this.vertex_buffer.push(new Vertice([0,-height,0], this.colorInferior, normalInferior, tangenteInferior, textureInferior));
        }

        // Repito los vertices pero con la normal, tangente y demás, de la cara inferior
        //delantera
        this.vertex_buffer.push(new Vertice([-width,-height,z], this.colorInferior, normalInferior, tangenteInferior, textureInferior));
        this.vertex_buffer.push(new Vertice([width,-height,z], this.colorInferior, normalInferior, tangenteInferior, textureInferior));
        //derecha
        this.vertex_buffer.push(new Vertice([width,-height,z], this.colorInferior, normalInferior, tangenteInferior, textureInferior));
        this.vertex_buffer.push(new Vertice([width,-height,-z], this.colorInferior, normalInferior, tangenteInferior, textureInferior));
        //trasera
        this.vertex_buffer.push(new Vertice([width,-height,-z], this.colorInferior, normalInferior, tangenteInferior, textureInferior));
        this.vertex_buffer.push(new Vertice([-width,-height,-z], this.colorInferior, normalInferior, tangenteInferior, textureInferior));
        //izquierda
        this.vertex_buffer.push(new Vertice([-width,-height,-z], this.colorInferior, normalInferior, tangenteInferior, textureInferior));
        this.vertex_buffer.push(new Vertice([-width,-height,z], this.colorInferior, normalInferior, tangenteInferior, textureInferior));


        //delantera
        this.vertex_buffer.push(new Vertice([-width,-height,z], this.colorDelantera, normalDelantera, tangenteDelantera, textureDelanteraInferiorIzquierda));
        this.vertex_buffer.push(new Vertice([width,-height,z], this.colorDelantera, normalDelantera, tangenteDelantera, textureDelanteraInferiorDerecha));
        //derecha
        this.vertex_buffer.push(new Vertice([width,-height,z], this.colorDerecha, normalDerecha, tangenteDerecha, textureDerecha));
        this.vertex_buffer.push(new Vertice([width,-height,-z], this.colorDerecha, normalDerecha, tangenteDerecha, textureDerecha));
        //trasera
        this.vertex_buffer.push(new Vertice([width,-height,-z], this.colorTrasera, normalTrasera, tangenteTrasera, textureTraseraInferiorDerecha));
        this.vertex_buffer.push(new Vertice([-width,-height,-z], this.colorTrasera, normalTrasera, tangenteTrasera, textureTraseraInferiorIzquierda));
        //izquierda
        this.vertex_buffer.push(new Vertice([-width,-height,-z], this.colorIzquierda, normalIzquierda, tangenteIzquierda, textureIzquierda));
        this.vertex_buffer.push(new Vertice([-width,-height,z], this.colorIzquierda, normalIzquierda, tangenteIzquierda, textureIzquierda));

        //delantera
        this.vertex_buffer.push(new Vertice([-width,height,z], this.colorDelantera, normalDelantera, tangenteDelantera, textureDelanteraSuperiorIzquierda));
        this.vertex_buffer.push(new Vertice([width,height,z], this.colorDelantera, normalDelantera, tangenteDelantera, textureDelanteraSuperiorDerecha));
        //derecha
        this.vertex_buffer.push(new Vertice([width,height,z], this.colorDerecha, normalDerecha, tangenteDerecha, textureDerecha));
        this.vertex_buffer.push(new Vertice([width,height,-z], this.colorDerecha, normalDerecha, tangenteDerecha, textureDerecha));
        //trasera
        this.vertex_buffer.push(new Vertice([width,height,-z], this.colorTrasera, normalTrasera, tangenteTrasera, textureTraseraSuperiorDerecha));
        this.vertex_buffer.push(new Vertice([-width,height,-z], this.colorTrasera, normalTrasera, tangenteTrasera, textureTraseraSuperiorIzquierda));
        //izquierda
        this.vertex_buffer.push(new Vertice([-width,height,-z], this.colorIzquierda, normalIzquierda, tangenteIzquierda, textureIzquierda));
        this.vertex_buffer.push(new Vertice([-width,height,z], this.colorIzquierda, normalIzquierda, tangenteIzquierda, textureIzquierda));


        // Repito los vertices pero con la normal, tangente y demás, de la cara superior
        //delantera
        this.vertex_buffer.push(new Vertice([-width,height,z], this.colorSuperior, normalSuperior, tangenteSuperior, textureSuperior));
        this.vertex_buffer.push(new Vertice([width,height,z], this.colorSuperior, normalSuperior, tangenteSuperior, textureSuperior));
        //derecha
        this.vertex_buffer.push(new Vertice([width,height,z], this.colorSuperior, normalSuperior, tangenteSuperior, textureSuperior));
        this.vertex_buffer.push(new Vertice([width,height,-z], this.colorSuperior, normalSuperior, tangenteSuperior, textureSuperior));
        //trasera
        this.vertex_buffer.push(new Vertice([width,height,-z], this.colorSuperior, normalSuperior, tangenteSuperior, textureSuperior));
        this.vertex_buffer.push(new Vertice([-width,height,-z], this.colorSuperior, normalSuperior, tangenteSuperior, textureSuperior));
        //izquierda
        this.vertex_buffer.push(new Vertice([-width,height,-z], this.colorSuperior, normalSuperior, tangenteSuperior, textureSuperior));
        this.vertex_buffer.push(new Vertice([-width,height,z], this.colorSuperior, normalSuperior, tangenteSuperior, textureSuperior));

        //superior
        for (var i = 0; i < 8; i++) {
            this.vertex_buffer.push(new Vertice([0,height,0], this.colorSuperior, normalSuperior, tangenteSuperior, textureSuperior));
        }


        // Buffer de indices de los triangulos
        this.index_buffer = grid(6, 8);

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

    this.draw = function(modelMatrix, shaderProgram, conNormalMap){
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
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
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
    }
}