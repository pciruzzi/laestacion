function grid(latitud, longitud) {
    var index_buffer = [];

    for (var i = 0; i < latitud; i++) {
        var index;
        for (var j = 0; j <= longitud; j++) {
            index = j + i * (longitud + 1);
            if (i != 0 && j == 0) index_buffer.push(index); //Repito el primero de cada fila, salvo la primera
            index_buffer.push(index);
            index_buffer.push(index + longitud + 1);
        }
        if (i != latitud-1) index_buffer.push(index + longitud + 1); //Repito el ultimo de cada fila, salvo la ultima
    }

    return index_buffer;
}