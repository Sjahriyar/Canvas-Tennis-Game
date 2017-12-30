var canvas = document.querySelector('canvas')
if(canvas.getContext){
    var ctx = canvas.getContext('2d')
    // Event Listeners
var up = false
var paddleHeight = 80
var down = false
var paddleR = 150
// var mouse = {
//     x: null,
//     y: null
// }
var Player1 = 0
var Player2 = 0
var winningScore = 3
var Winner = false

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

    document.addEventListener('mousedown',function(event){
        if(event){
            Winner = false
        }
        
    })
}else{
    document.getElementById('msg').innerHTML = 'Your Browser Does not support Canvas.'
}

canvas.width = 800 
canvas.height = 600


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

    //Canvas Page Properties
function CanvasProps(){
    
    ctx.fillStyle = '#F2D6BD'
    ctx.fillRect(0,0,canvas.width,canvas.height)
    if(Winner){
        ctx.font = "20px Verdana";
        ctx.fillStyle = '#0597D5'
        ctx.fillText('Click to Continue', canvas.width / 2 - 20, canvas.height /2)
    }
    ctx.font = "20px Verdana";
    ctx.fillStyle = '#EA2F83'
    ctx.fillText(Player1,60,60);
    ctx.fillText(Player2,canvas.width-60,60);
   
    
}

// #############################################

var pdlLeft = new paddleLeft(0, (canvas.height/2)-80/2, 15, paddleHeight, 10)
var pdlRight = new paddleRight(canvas.width - 15,0, 15, paddleHeight, 10)
var ball = new Ball(canvas.width/2, canvas.height/2, -5, 5, 10)

function BallReset(){
    if(Player1 >=winningScore || Player2 >= winningScore){
        Player1 = 0
        Player2 = 0
        Winner = true
    }
    ball.mx = -ball.mx
    ball.x = canvas.width/2
    ball.y = canvas.height/2
}

function computerAI(){
    let pdlRightMiddle = pdlRight.y + (paddleHeight/2)
    if(pdlRightMiddle < ball.y -20){
        pdlRight.y += 10
    }else if(pdlRightMiddle > ball.y +20){
        pdlRight.y -= 10
    }
}

function animate(){
    requestAnimationFrame(animate)
    ctx.clearRect(0,0, canvas.width,canvas.height)
    computerAI()
    CanvasProps()
    if(Winner){
    return
    }
    pdlLeft.update()
    ball.update()
    pdlRight.update()
    if(ball.x < 0 + ball.radius){
        if(ball.y  > pdlLeft.y  && ball.y < pdlLeft.y + paddleHeight){
            
            ball.mx = -ball.mx
            var deltaY = ball.y - (pdlLeft.y + paddleHeight/2)
            ball.my = deltaY * 0.35
    }else{

        Player2++
        BallReset()
    }
    
    }
    if(ball.x > canvas.width + ball.radius){
        if(ball.y  > pdlRight.y  && ball.y < pdlRight.y + paddleHeight){
            ball.mx = -ball.mx
            var deltaY = ball.y - (pdlRight.y + paddleHeight/2)
            ball.my = deltaY * 0.35
    }else{
        Player1++
        BallReset()
    }
    }
}
animate()