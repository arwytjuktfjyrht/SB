var ball,database;
var ballposition,position;

function setup(){
    database=firebase.database();
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    //.ref() is used to refer to the location of the db value we care about.
    var ballposition=database.ref('ball/pos');
    //.on() creates a listener which keeps listening to the changes in the db.

    ballposition.on("value",readPosition,showError);
}

function draw(){
    background("white");
    if (position!==undefined){
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}
}

function writePosition(x,y){
    //.set() is used to set the value in the database

    database.ref('ball/pos').set({
        'x': position.x+x,
        'y': position.y+y

    })
    
}

function readPosition(data){
    position=data.val();
//    console.log(position.x);

    ball.x= position.x;
    ball.y= position.y;
}

function showError(){
console.log("Error in writing to the db")
}