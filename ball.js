function Ball(x,y,mx,my,radius){
this.x = x
this.y = y
this.mx = mx
this.my = my
this.radius = radius
    this.draw = function(){
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.radius,0,Math.PI * 2,false)
        ctx.fillStyle = 'red'
        ctx.fill()
        ctx.closePath()
    }

    this.update = function(){
        
        if(this.x + this.radius > canvas.width || this.x < 0 + this.radius){
            this.mx = -this.mx
        }
        if(this.y + this.radius > canvas.height || this.y < 0 + this.radius){
            this.my = -this.my
        }
    
       
        
        this.x += this.mx
        this.y += this.my
        this.draw()
    }
}