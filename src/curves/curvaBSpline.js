function CurvaBSpline(P0, P1, P2, P3, cantPasos) {
    this.vertex_buffer = [];

    var B0 = function(u) { return (1-u)*(1-u)*(1-u)/6.0;}
    var B1 = function(u) { return (4 - 6*u*u + 3*u*u*u)/6.0;}
    var B2 = function(u) { return (1 + 3*u + 3*u*u - 3*u*u*u)/6.0;}
    var B3 = function(u) { return (u*u*u)/6.0;}

    var B0der = function(u) { return -0.5*u*u + u - 0.5;}
    var B1der = function(u) { return -2*u + 1.5*u*u;}
    var B2der = function(u) { return 0.5 + u - 1.5*u*u;}
    var B3der = function(u) { return 0.5*u*u;}

    for(var u = 0.0; u <= 1.0000001; u += 1.0/cantPasos){
        var x = B0(u)*P0[0] + B1(u)*P1[0] + B2(u)*P2[0] + B3(u)*P3[0];
        var y = B0(u)*P0[1] + B1(u)*P1[1] + B2(u)*P2[1] + B3(u)*P3[1];
        var z = B0(u)*P0[2] + B1(u)*P1[2] + B2(u)*P2[2] + B3(u)*P3[2];

        var posicion = [x,y,z];

        var dx = B0der(u)*P0[0] + B1der(u)*P1[0] + B2der(u)*P2[0] + B3der(u)*P3[0];
        var dy = B0der(u)*P0[1] + B1der(u)*P1[1] + B2der(u)*P2[1] + B3der(u)*P3[1];
        var dz = B0der(u)*P0[2] + B1der(u)*P1[2] + B2der(u)*P2[2] + B3der(u)*P3[2];

        var tangente = [dx,dy,dz];
        var binormalProvisoria = productoVectorial(tangente, [0,1,0]);
        var normal = productoVectorial(tangente, binormalProvisoria);

        var vertex = new Vertice(posicion, [0,0,0], normal, tangente, [0,0,0]);
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