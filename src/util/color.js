function getColor(color) {
    if (color == "red") return [1.0, 0.0, 0.0];
    if (color == "green") return [0.0, 1.0, 0.0];
    if (color == "blue") return [0.0, 0.0, 1.0];
    if (color == "black") return [0.0, 0.0, 0.0];
    if (color == "white") return [1.0, 1.0, 1.0];
    if (color == "yellow") return [1.0, 1.0, 0.0];

    if (color == "gray") return [205/255, 200/255, 177/255];
    if (color == "gray2") return [51/255, 51/255, 51/255];
    if (color == "light gray") return [184/255, 189/255, 142/255];
    if (color == "dark gray") return [70/255, 70/255, 70/255];

    if (color == "light yellow") return [1.0, 1.0, 102/255];
    if (color == "opaque yellow") return [231/255, 231/255, 40/255];
    if (color == "light blue") return [51/255, 153/255, 254/255];
    if (color == "opaque blue") return [74/255, 74/255, 127/255];

    if (color == "violet") return [102/255, 0.0, 102/255];
    if (color == "brown") return [102/255, 51/255, 0.0];
}