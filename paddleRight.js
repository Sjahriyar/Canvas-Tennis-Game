
function paddleRight(x,y,width,height,speed){
this.x = x
this.y = y
this.width = width
this.height = height
this.speed = speed
    this.draw = function(){

        ctx.fillStyle = '#42DA43'
        ctx.fillRect(this.x,this.y, this.width,this.height)

    }
    this.update = function(){

        this.draw()
    }
}
