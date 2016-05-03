function vertice(posicion, color, normal, tangente, coordTextura) {
	this.posicion = posicion;
	this.color = color;
	this.normal = normal;
	this.tangente = tangente;
	this.coordTextura = coordTextura;
	
	var tx = this.tangente[0];
	var ty = this.tangente[1];
	var tz = this.tangente[2];
	var nx = this.normal[0];
	var ny = this.normal[1];
	var nz = this.normal[2];

	this.binormal = [];
	this.binormal[0] = ((ty * nz) - (ny * tz));
	this.binormal[1] = ((tx * nz) - (nx * tz));
	this.binormal[2] = ((tx * ny) - (nx * ty));
}