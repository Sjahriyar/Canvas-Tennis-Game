
function paddleLeft(x,y,width,height,speed){
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.speed = speed
        this.draw = function(){

            ctx.fillStyle = 'white'
            ctx.fillRect(this.x,this.y, this.width,this.height)

        }
        this.update = function(){
            if(up){
                this.y += this.speed
            }else if(down){
                this.y -= this.speed
            }
            this.draw()
        }
    }
