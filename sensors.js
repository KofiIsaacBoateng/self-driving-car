class Sensor {
    constructor(car) {
        this.car = car
        this.rayCount = 30
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
        for (let i = 0; i < roadBorders.length; i++) {
            const touch = getIntersection(
                ray[0],
                ray[1],
                roadBorders[0],
                roadBorders[1]
            )

            if (touch) {
                this.readings.push(touch)
            }

            // console.log(this.readings)
        }
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
            ctx.beginPath()
            ctx.strokeStyle = 'yellow'
            ctx.strokeWidth = 2

            ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y)
            ctx.lineTo(this.rays[i][1].x, this.rays[i][1].y)
            ctx.stroke()
        }
    }
}