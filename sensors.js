class Sensor {
    constructor(car) {
        this.car = car
        this.rayCount = 50
        this.raySpread = Math.PI / 2
        this.rayLength = 120

        this.rays = []
        this.readings = []
    }

    update(roadBorders) {
        this.#castRays()
        this.readings = [] 

        for (let i = 0; i < this.rays.length; i++){
            this.readings.push(this.#getIntersectionReading(this.rays[i], roadBorders))
        }

    }

    #getIntersectionReading(ray, roadBorders){
        let touches = []
        for (let i = 0; i < roadBorders.length; i++) {
            const touch = getIntersection(
                ray[0],
                ray[1],
                roadBorders[i][0],
                roadBorders[i][1]
            )

            if (touch) {
                touches.push(touch)
            }
        }

        if (touches.length === 0) {
            return null
        }else {
            const offsets = touches.map(e => e.offset)
            const minOffset = Math.min(...offsets)
            return touches.find(e => e.offset === minOffset)
        }



        return minTouch
    }

    #castRays() {
        this.rays = []

        for (let i = 0; i < this.rayCount; i ++) {
            const angle = lerp(
                - this.raySpread / 2,
                this.raySpread / 2,
                i / (this.rayCount - 1)
            ) - this.car.angle
            const start = {
                x: this.car.x,
                y: this.car.y
            }

            const end = {
                x: this.car.x - Math.sin(angle) * this.rayLength,
                y: this.car.y - Math.cos(angle) * this.rayLength
            }



            this.rays.push([start, end])
        }
    }


    draw(ctx) {
        for(let i = 0; i < this.rays.length; i++ ){
            let end = this.rays[i][1]

            if (this.readings[i]){
                end = this.readings[i]
            }

            ctx.beginPath()
            ctx.strokeStyle = 'yellow'
            ctx.lineWidth = 2

            ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y)
            ctx.lineTo(end.x, end.y)
            ctx.stroke()

            ctx.beginPath() 
            ctx.lineWidth = 2
            ctx.strokeStyle = 'red'

            ctx.moveTo(end.x, end.y)
            ctx.lineTo(this.rays[i][1].x, this.rays[i][1].y)
            ctx.stroke()

        }
    }
}