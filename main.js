const canvas = document.getElementById('sdc')
canvas.width = 240

const ctx = canvas.getContext('2d')

const car = new Car(120, 120, 30, 50)

animate()

function animate() {
    car.update()
    canvas.height = window.innerHeight
    car.draw(ctx)
    requestAnimationFrame(animate)
}