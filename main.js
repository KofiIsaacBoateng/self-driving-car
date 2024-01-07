const canvas = document.getElementById("sdc")
canvas.width = 200

const ctx = canvas.getContext("2d")

const car = new Car(100, 100, 30, 50)


const animate = () => {
    car.update()
    canvas.height = window.innerHeight
    car.draw(ctx)

    requestAnimationFrame(animate)
}


animate() 
