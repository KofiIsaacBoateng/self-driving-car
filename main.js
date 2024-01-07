const canvas = document.getElementById("sdc")
canvas.width = 200

const ctx = canvas.getContext("2d")

const road = new Road(canvas.width / 2, canvas.width * 0.9)
const car = new Car(road.getLaneCenter(2), 100, 30, 50)


const animate = () => {
    ctx.save()

    car.update()
    canvas.height = window.innerHeight

    ctx.translate(0, - car.y + canvas.height * 0.7 )

    road.draw(ctx)
    car.draw(ctx)

    ctx.restore()

    requestAnimationFrame(animate)
}


animate() 
