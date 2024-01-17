class Car {
    constructor(x, y, width, height) {
        this.x = x 
        this.y = y 
        this.width = width 
        this.height = height
        this.speed =  0
        this.acceleration = 0.3
        this.maxSpeed = 3
        this.friction = 0.05
        this.angle = 0

        this.controls = new Controls()
        this.sensors = new Sensor(this)
    }

    update (roadBorders) {
       this.#move()
       this.sensors.update(roadBorders)
    }

    #move(){
        if (this.controls.forward) this.speed += this.acceleration

        if (this.controls.backward) this.speed -= this.acceleration

        if (this.speed > 0) this.speed -= this.friction

        if (this.speed < 0) this.speed += this.friction

        if (this.speed > this.maxSpeed) this.speed = this.maxSpeed

        if (this.speed < -this.maxSpeed / 2) this.speed = -this.maxSpeed / 2

        if (Math.abs(this.speed) < this.friction) this.speed = 0

        
        if (this.speed != 0) {
            const flip = this.speed > 0 ? 1: -1
            
            if (this.controls.left) this.angle -= 0.01 * flip
            if (this.controls.right) this.angle += 0.01 * flip
        }

        
        this.x += Math.sin(this.angle) * this.speed
        this.y -= Math.cos(this.angle) * this.speed
    }

    draw(ctx) {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.angle)
        ctx.beginPath()
        ctx.fillStyle = '#939274'

        ctx.rect(
            - this.width / 2,
            - this.height / 2,
            this.width,
            this.height
        )

        ctx.fill()
        ctx.restore()

        this.sensors.draw(ctx)

    }
}