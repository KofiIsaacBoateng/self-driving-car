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

    getLaneCenter(laneIndex) {
        /** Lane index starts from the first natural number: 1 */
        laneIndex = laneIndex < 1 ? 1: laneIndex
        const laneWidth = this.width / this.laneCount
        return laneWidth / 2  + laneWidth * (Math.min(this.laneCount, laneIndex) - 1) + 10
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