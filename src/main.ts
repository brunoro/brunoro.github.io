// Pivots (px, py) by angle using (ox, oy) as an axis
const pivot = (px: number, py: number, ox: number, oy: number, angle: number): [number, number] => {
    if (angle === 0) { return [px, py]; }
    const nx = px - ox;
    const ny = py - oy;
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);
    return [ox + (nx * cos) - (ny * sin), oy + (nx * sin) - (ny * cos)];
};

// Calculates the coordinates a polygon centered at (cx, cy) with the given radius and number of sides
const polygon = (cx: number, cy: number, r: number, n: number): number[][] => {
    const angle = Math.PI * 2 / n;
    const ox = cx + r;
    const p: number[][] = Array(n);
    for (let i = 0; i < n; i++) {
        p[i] = pivot(ox, cy, cx, cy, i * angle);
    }
    return p;
};

const pointsStr = (ps: number[][]): string =>
    ps.map(p => p.map(n => n.toString()).join(',')).join(' ');

// Returns the inscribed radius of a polygon with a given radius and number of sides
const inscribedRadius = (r: number, n: number): number => r * Math.cos((Math.PI) / n);

// The visuals will converge before this
const primes = [
    3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37, 41
];

const draw = () => {
    const element = document.querySelector('#bouwkamp');
    const style = getComputedStyle(element);

    const s = Math.max(Math.min(parseInt(style.width), parseInt(style.height)), 600);

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttributeNS(null, 'width', s.toString());
    svg.setAttributeNS(null, 'height', s.toString());
    element.appendChild(svg);

    const stroke = 0.666;
    const c = s / 2;
    const r = c - stroke * 2;

    const cs = c.toString();
    const strokes = stroke.toString();

    const drawReducer = (r: number, n: number, i: number): number => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttributeNS(null, 'cx', cs);
        circle.setAttributeNS(null, 'cy', cs);
        circle.setAttributeNS(null, 'r', r.toString());
        circle.setAttributeNS(null, 'stroke', 'black');
        circle.setAttributeNS(null, 'stroke-width', strokes);
        circle.setAttributeNS(null, 'fill', 'white');
        svg.appendChild(circle);

        const points = polygon(c, c, r, n);
        const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        poly.setAttributeNS(null, 'points', points.map(coords => coords.join(',')).join(' '));
        poly.setAttributeNS(null, 'stroke', 'black');
        poly.setAttributeNS(null, 'stroke-width', strokes);
        poly.setAttributeNS(null, 'fill', 'white');
        poly.setAttributeNS(null, 'class', i % 2 == 0 ? 'cw' : 'ccw');
        svg.appendChild(poly);

        return inscribedRadius(r, n);

    };
    primes.reduce(drawReducer, r);
};

draw();
