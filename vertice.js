function Vertice(posicion, color, normal, tangente, coordTextura) {
    this.posicion = posicion;
    this.color = color;
    
    this.normal = normal;
    vec3.normalize(this.normal,this.normal);
    
    this.tangente = tangente;
    vec3.normalize(this.tangente,this.tangente);

    this.binormal = productoVectorial(tangente,normal);
    vec3.normalize(this.binormal,this.binormal);

    this.coordTextura = coordTextura;
}