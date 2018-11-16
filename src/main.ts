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
    const w = 600, h = 600, r = 290, cx = w / 2, cy = h / 2
    const svg = d3.select('svg').attr('width', w).attr('height', h)

    const drawReducer = (r: number, n: number): number => {
        console.log('inscribed polygon!', svg)
        const ins = inscribedRadius(r, n)
        svg.append('circle')
        .attr('cx', cx).attr('cy', cy).attr('r', r)
        .attr('stroke', 'black')
        .attr('stroke-width', 1)
        .attr('fill', 'white')
        
        svg.append('polygon')
        .data([polygon(cx, cy, r, n)])
        .attr('points', pointsStr)
        .attr('stroke', 'black')
        .attr('stroke-width', 1)
        .attr('fill', 'white')

        return ins
    }
    primes.reduce(drawReducer, r)

    const dur = 1000
    let rot = 0
    setInterval(() => {
        rot -= 20
        svg.transition()
           .duration(dur)
           .ease(d3.easeLinear)
           .attr('transform', `rotate(${rot})`)
    }, dur)
}

draw()