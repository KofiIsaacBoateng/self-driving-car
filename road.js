class Road {
    constructor(x, width, laneCount = 3) {
        this.x = x
        this.width = width 
        this.laneCount = laneCount

        this.left = this.x - this.width / 2
        this.right = this.x + this.width / 2

        const INFINITY = 1000000
        this.top = -INFINITY
        this.bottom = INFINITY
    }

    draw(ctx) {
        ctx.strokeStyle = '#fff'
        ctx.lineWidth = 5

        for (let i = 0; i <= this.laneCount; i ++){
            const x = lerp(
                this.left,
                this.right,
                i / this.laneCount
            )

            if (i > 0 && i < this.laneCount){
                ctx.setLineDash([20, 20])   
            }else {
                ctx.setLineDash([])
            }

            ctx.beginPath()

            ctx.moveTo(x, this.top)
            ctx.lineTo(x, this.bottom)
            ctx.stroke() 
        }

    }
}


const lerp = (A, B, t) => {
    return A + (B - A) * t
}