function circunferencia(inicial, final, radio, cantPasos) {
    this.vertex_buffer = [];

    for(var phi = inicial; phi <= final; phi += (final-inicial)/cantPasos){
    	var x = radio*Math.cos(phi);
    	var y = radio*Math.sin(phi);
    	var z = 0;

    	var posicion = [x, y, z];


    	var dx = -y;
    	var dy = x;
    	var dz = 0;

    	var tangente = [dx, dy, dz];
    	var normal = [0,0,0] // No me interesa

    	var vertex = new vertice(posicion, [0,0,0], normal, tangente, [0,0,0]);
        this.vertex_buffer.push(vertex);
    }

    this.getVertexBuffer = function(){
        return this.vertex_buffer;
    }

    this.getPositionBuffer = function(){
        return getPositionBuffer(this.vertex_buffer);
    }

    this.getCantidadVertices = function(){
        return getCantidadVertices(this.vertex_buffer);
    }

    this.getTangentBuffer = function(){
        return getTangentBuffer(this.vertex_buffer);
    }

    this.getNormalBuffer = function(){
        return getNormalBuffer(this.vertex_buffer);
    }
}