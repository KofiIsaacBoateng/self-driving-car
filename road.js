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


        // border specifications
        const topLeft = {x: this.left, y: this.top}
        const bottomLeft = {x: this.left, y: this.bottom} 
        const topRight = {x: this.right, y: this.top}
        const bottomRight = {x: this.right, y: this.bottom}

        this.borders = [
            [topLeft, bottomLeft],
            [topRight, bottomRight]
        ]
    }

    getLaneCenter(laneIndex) {
        /** Lane index starts from the first natural number: 1 */
        laneIndex = laneIndex < 1 ? 1: laneIndex
        const laneWidth = this.width / this.laneCount
        return this.left + laneWidth / 2  + laneWidth * (Math.min(this.laneCount, laneIndex) - 1)
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