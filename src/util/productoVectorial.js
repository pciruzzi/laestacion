function productoVectorial(vector1, vector2) {
    var x1 = vector1[0];
    var y1 = vector1[1];
    var z1 = vector1[2];
    var x2 = vector2[0];
    var y2 = vector2[1];
    var z2 = vector2[2];

    var resultado = [];
    resultado[0] = ((y1 * z2) - (y2 * z1));
    resultado[1] = ((x1 * z2) - (x2 * z1));
    resultado[2] = ((x1 * y2) - (x2 * x1));

    return resultado;
}