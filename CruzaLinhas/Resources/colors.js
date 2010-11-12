var colors = { seed: 1 };

colors.next = function() {
    colors.seed += 3;
    if (colors.seed > 62) {
        colors.seed -= 62;
    }
    var h = colors.seed.toString(4);
    while (h.length < 3) {
		h = "0" + h;
	}
    var c = h[0] * 256 * 4 + h[1] * 16 * 4 + h[2] * 4;
    color = c.toString(16)
    while (color.length < 3) {
		color = "0" + color;
	}
    return "#" + color;
}