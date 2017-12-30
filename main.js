var canvas = document.querySelector('canvas')
if(canvas.getContext){
    var ctx = canvas.getContext('2d')
    // Event Listeners
var up = false
var paddleHeight = 80
var down = false
var paddleR = 150
var mouse = {
    x: null,
    y: null
}

document.addEventListener('keydown',function(event){
    if(event.keyCode == 40){
        up = true
    }else if(event.keyCode == 38)
        down = true
    })
document.addEventListener('keyup',function(event){
    if(event.keyCode == 40){
        up = false
    }else if(event.keyCode == 38)
        down = false
    })

    // document.addEventListener('mousemove',function(event){
    //     var mousePos = calculateMousePos(event)
    //     paddleR = mousePos.y-(paddleHeight/2)
    // })

}else{
    document.getElementById('msg').innerHTML = 'Your Browser Does not support Canvas.'
}

canvas.width = 800
canvas.height = 600

//GAME OVER Function

function GameOver(){
    ctx.font = "30px Arial";
    ctx.fillText("Game Over",canvas.width/2 - 70,canvas.height/2);
    ctx.fillStyle = 'white'
    setTimeout(()=>{ 
    this.x = canvas.width /2
    this.y = canvas.height /2
    }, 4000)
}


//Calculate Position of the mouse
    function calculateMousePos(event){
        //Measure Size of our canvas
        var rect = canvas.getBoundingClientRect()
        var root = document.documentElement
        /*Calculate Position of pointer base on canvas and document by substracting
        position of pointer from size of canvas */
        var mouseX = event.clientX - rect.left - root.scrollLeft
        var mouseY = event.clientY - rect.top - root.scrollTop
        return {
            x: mouseX,
            y: mouseY
        }
        
    }

function CanvasProps(){
    ctx.fillStyle = 'black'
    ctx.fillRect(0,0,canvas.width,canvas.height)
}
// #############################################

var pdlLeft = new paddleLeft(0, (canvas.height/2)-80/2, 10, paddleHeight, 10)
var pdlRight = new paddleRight(canvas.width - 10,0, 10, paddleHeight, 10)
var ball = new Ball(canvas.width/2, canvas.height/2, -5, 5, 10)

function computerAI(){
    let pdlRightMiddle = pdlRight.y + (paddleHeight/2)
    if(pdlRightMiddle < ball.y){
        pdlRight.y += 10
    }else{
        pdlRight.y -= 10
    }
}

function animate(){
    requestAnimationFrame(animate)
    ctx.clearRect(0,0, canvas.width,canvas.height)
    computerAI()
    CanvasProps()
    pdlLeft.update()
    ball.update()
    pdlRight.update()
    if(ball.x < 0 + ball.radius){
        if(ball.y  > pdlLeft.y  && ball.y < pdlLeft.y + paddleHeight){
            ball.mx = -ball.mx
    }else{
        GameOver()
    }
    console.log(pdlRight.y);
    
    }
    if(ball.x > canvas.width + ball.radius){
        if(ball.y  > pdlRight.y  && ball.y < pdlRight.y + paddleHeight){
            ball.mx = -ball.mx
    }else{
        GameOver()
    }
    }
}
animate()