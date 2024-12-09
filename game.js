var buttoncolors = ["red", "blue", "green", "yellow"];
var gamepattren = [];
var userclickedpattren = [];
var started = false;
var level = 0;


$(document).on("keydown" , function(){
    if(!started){
        nextsequence();
        started = true;
}
    
});



function nextsequence() {
    userclickedpattren = [];
    level++;
    $("#level-title").text("Level "+ level);
    var randnumber = Math.round(Math.random() * 3); // Random number between 0 and 3
    var randomchoosencolor = buttoncolors[randnumber]; // Select a random color
    
    gamepattren.push(randomchoosencolor); // Add to the game pattern

    // Flash the selected color
    flashElement( randomchoosencolor);
}

function flashElement(selector) {
    $("#"+selector).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); // animation of flash
        playSound(selector);
}


$(".btn").on( "click"  , function(event){
        // console.log(event.target.id);
        handlerfunction(event.target.id);
});



function handlerfunction(event){
    var userchoosencolor = event;
    // console.log(userchoosencolor);
    userclickedpattren.push(userchoosencolor);
    //playsound
    playSound(userchoosencolor);
    animatepress(userchoosencolor);
    checkAnswer(userclickedpattren.length - 1);
    
    
}


// sound of colors
function playSound(selector){
    var mp = (selector + ".mp3"); // color + .mp3 for path
    var selector = new Audio('sounds/'+mp); //playing sound
    selector.play();
}

// animation for button press
function animatepress(currentcolor){
    $("#"+ currentcolor).addClass("pressed");

    setTimeout(function(){
        $("#"+currentcolor).removeClass("pressed");
    } , 100);

}


function checkAnswer(currentLevel){
    if(userclickedpattren[currentLevel] === gamepattren[currentLevel])
    {
        console.log("success");
        if(userclickedpattren.length === gamepattren.length)
        {
            console.log("sequence completed");
            setTimeout(function (){
                nextsequence();
            } , 1000);
        }
        else{
            console.log("next");
        }
        
    }
    else{
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        } , 200);
        var wrong = new Audio('sounds/wrong.mp3');
        wrong.play();
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startover();
    }

}

function startover(){
    level = 0;
    started = false ; 
    gamepattren = [];

}





