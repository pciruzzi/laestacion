function degToRad(degrees) {
    return degrees * Math.PI / 180;
}

function useProgram(shaderProgram, perspectiveMatrix, cameraMatrix) {
    gl.useProgram(shaderProgram);
    gl.uniformMatrix4fv(gl.shaderProgram.perspectiveMatrixUniform, false, perspectiveMatrix);
    gl.uniformMatrix4fv(gl.shaderProgram.viewMatrixUniform, false, cameraMatrix );
}