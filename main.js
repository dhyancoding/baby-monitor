img = " "
flag = " "
objects = []
alarm = " "

function preload(){
    img = loadImage("dog_cat.jpg")
    alarm = loadSound("Danger Alarm Sound Effect.mp3")
}

function setup(){
   canvas = createCanvas(635, 450)
   canvas.center()
   r = random()*255
   g = random()*255
   b = random()*255
   v = createCapture(VIDEO)
   v.size(635, 450)
   v.hide()
}

function start(){
    od = ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("status").innerHTML = "Status: Detecting babies"
}

function modelLoaded(){
    console.log("modelLoaded")
    flag = true
    od.detect(v, gotResults)
}

function gotResults(error, result){
    if (error){
        console.error(error)
    }
    else{
        console.log(result)
        objects = result
    }
}

function draw(){
    image(v, 0,0)
    if (flag != " "){

        od.detect(v, gotResults)

        for(i = 0; i < objects.length; i++){
        

            fill(r, g, b)
            textSize(20)

            percent = floor(objects[i].confidence*100)

           // stroke(r, g, b)
            //text(objects[i].label + " " + percent + " %", objects[i].x + 15, objects[i].y + 30)
            strokeWeight(1)
            noFill()
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)

            if (objects[i].label == "person"){
                stroke(r, g, b)
                text( "Baby " + percent + " %", objects[i].x + 15, objects[i].y + 30)
    
                alarm.stop()

                document.getElementById("status").innerHTML = "Status: Baby detected"
            }
            else {
                alarm.play()

                document.getElementById("status").innerHTML = "Status: Baby not detected"
            }

        }

        if (objects.length == 0) {
            alarm.play()

            document.getElementById("status").innerHTML = "Status: Baby not detected"
        }
    }
}