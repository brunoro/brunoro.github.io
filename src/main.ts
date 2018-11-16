import * as d3 from 'd3'

const tau = 6.283185307179586

// Pivots (px, py) by angle using (ox, oy) as an axis
const pivot = (px: number, py: number, ox: number, oy: number, angle: number): [number, number] => {
    if (angle == 0) { return [px, py] }
    const nx = px - ox
    const ny = py - oy
    const sin = Math.sin(angle)
    const cos = Math.cos(angle)
    return [ox + (nx * cos) - (ny * sin), oy + (nx * sin) - (ny * cos)]
}

// Calculates the coordinates a polygon centered at (cx, cy) with the given radius and number of sides
const polygon = (cx: number, cy: number, r: number, n: number): number[][] => {
    const angle = tau / n
    const ox = cx + r
    const p: number[][] = Array(n)
    for (let i=0; i < n; i++) {
        p[i] = pivot(ox, cy, cx, cy, i * angle)
    }
    return p
}

const pointsStr = (ps: number[][]): string => 
    ps.map(p => p.map(n => n.toString()).join(',')).join(' ')

// Returns the inscribed radius of a polygon with a given radius and number of sides
const inscribedRadius = (r: number, n: number): number => r * Math.cos((tau / 2) / n)

// The visuals will converge before this
const primes = [3, 5, 7, 11, 13, 17, 19, 23, 27, 31]

const draw = () => {
    const w = 600, h = 600, r = 300, cx = w / 2, cy = h / 2
    const svg = d3.select('svg').attr('width', w).attr('height', h)

    const dur = 1000
    const rot: { [n: number]: number } = {}
    const drawReducer = (r: number, n: number, i: number): number => {
        const ins = inscribedRadius(r, n)
        const tag = `n${n}`

        svg.append('circle')
        .attr('cx', cx).attr('cy', cy).attr('r', r)
        .attr('stroke', 'black')
        .attr('stroke-width', 1)
        .attr('fill', 'white')
        .attr('class', tag)
        
        svg.append('polygon')
        .data([polygon(cx, cy, r, n)])
        .attr('points', pointsStr)
        .attr('stroke', 'black')
        .attr('stroke-width', 1)
        .attr('fill', 'white')
        .attr('class', tag)

        rot[n] = 0

        setInterval(() => {
            const inc = i % 2 == 0 ? -20 : 20
            const interpolator = () => d3.interpolateString(
                `rotate(${rot[n]}, ${cx}, ${cy})`, `rotate(${rot[n] + inc}, ${cx}, ${cy})`
            )
            d3.selectAll(`.${tag}`)
            .transition()
            .duration(dur)
            .ease(d3.easeLinear)
            .attrTween('transform', interpolator)

            rot[n] += inc
        }, dur)

        return ins
    }
    primes.reduce(drawReducer, r)
}

draw()