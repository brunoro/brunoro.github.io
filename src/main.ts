// Pivots (px, py) by angle using (ox, oy) as an axis
const pivot = (
  px: number,
  py: number,
  ox: number,
  oy: number,
  angle: number
): [number, number] => {
  if (angle === 0) {
    return [px, py];
  }
  const nx = px - ox;
  const ny = py - oy;
  const sin = Math.sin(angle);
  const cos = Math.cos(angle);
  return [ox + nx * cos - ny * sin, oy + nx * sin - ny * cos];
};

// Calculates the coordinates a polygon centered at (cx, cy) with the given radius and number of sides
const polygon = (cx: number, cy: number, r: number, n: number): number[][] => {
  const angle = (Math.PI * 2) / n;
  const ox = cx + r;
  const p: number[][] = Array(n);
  for (let i = 0; i < n; i++) {
    p[i] = pivot(ox, cy, cx, cy, i * angle);
  }
  return p;
};

// Returns the inscribed radius of a polygon with a given radius and number of sides
const inscribedRadius = (r: number, n: number): number =>
  r * Math.cos(Math.PI / n);

// The visuals will converge before this
const primes = [3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37, 41];

// Draw
const draw = () => {
  const element = document.querySelector("#bouwkamp");
  if (!element) {
    return;
  }

  const style = getComputedStyle(element);

  const s = Math.max(
    Math.min(parseInt(style.width), parseInt(style.height)),
    600
  );

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttributeNS(null, "width", s.toString());
  svg.setAttributeNS(null, "height", s.toString());
  element.appendChild(svg);

  const stroke = 1;
  const c = s / 2;
  const r = c - stroke * 2;

  const cs = c.toString();
  const strokeStr = stroke.toString();

  const drawReducer = (r: number, n: number, i: number): number => {
    const ns = "http://www.w3.org/2000/svg";

    const circle = document.createElementNS(ns, "circle");
    circle.setAttribute("cx", cs);
    circle.setAttribute("cy", cs);
    circle.setAttribute("r", r.toString());
    circle.setAttribute("stroke", "#0e458d");
    circle.setAttribute("stroke-width", strokeStr);
    circle.setAttribute("fill", "white");
    svg.appendChild(circle);

    const points = polygon(c, c, r, n);
    const poly = document.createElementNS(ns, "polygon");
    poly.setAttribute(
      "points",
      points.map((coords) => coords.join(",")).join(" ")
    );
    poly.setAttribute("stroke", "black");
    poly.setAttribute("stroke-width", strokeStr);
    poly.setAttribute("fill", "white");
    poly.setAttribute("class", i % 2 === 0 ? "cw" : "ccw");
    svg.appendChild(poly);

    return inscribedRadius(r, n);
  };
  primes.reduce(drawReducer, r);
};

window.addEventListener("DOMContentLoaded", draw);

// Animation plays for 3 seconds when page is focused, and can be paused/played by a click
let animated = false;
let timeoutId: ReturnType<typeof setTimeout> | null = null;

const setAnimationRunning = (isRunning: boolean) => {
  animated = isRunning;

  const polygons = document.getElementsByTagName("polygon");
  for (const poly of polygons) {
    poly.style.animationPlayState = isRunning ? "running" : "paused";
  }
};

const animateThreeSecs = () => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  setAnimationRunning(true);
  timeoutId = setTimeout(() => setAnimationRunning(false), 3000);
};

const toggleAnimation = (isRunning: boolean) => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  setAnimationRunning(isRunning);
};

const bouwkamp = document.getElementById("bouwkamp");
if (bouwkamp) {
  bouwkamp.addEventListener("click", () => toggleAnimation(!animated));
}

document.addEventListener("blur", () => toggleAnimation(false));
document.addEventListener("focus", animateThreeSecs);
document.addEventListener("DOMContentLoaded", animateThreeSecs);

export {};
