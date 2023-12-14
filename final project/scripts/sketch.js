


let chosenWordData = [];
let cookieNum = 0;


console.log('sketch loaded');
function setup(){

    console.log('sketch setup');
    let c = createCanvas(windowWidth,windowHeight);
    c.position(0,0);
    clear();
    
    
    // chrome.runtime.onMessage.addListener(
        // function(request, sender, sendResponse){
            // console.log(sender.tab?
                // 'from a content script:' + sender.tab.url:
                // "from the extension");
            // 
        // }
    // )

    let paragraphList = [];
    
    
    let eligibleTags = document.querySelector('body');


    for(let elem of eligibleTags.getElementsByTagName('p')){
        // console.log(elem.innerHTML.trim())
        if(elem.innerHTML.trim()!='' && !['SCRIPT','A','IMG'].includes(elem.tagName)){
            console.log(elem.innerHTML);
            paragraphList.push(elem);
            // console.log(elem.tagName);
        }
    }
    
    //select a few at random
    
    
    let randomParagraphs = [];
    
    // console.log(paragraphList.length);
    if(paragraphList.length>5){
        for(let i=0; i<paragraphList.length/2;i++){
            let randomIndex = Math.floor(Math.random() * paragraphList.length);
            if(randomParagraphs.includes(randomIndex)){
                i--;
            }else{
                randomParagraphs.push(randomIndex);
            }
        }
        
    }
    else if(paragraphList.length>0){
        randomParagraphs = [0];
    }
    
    // console.log(randomParagraphs);
    //get seperate the innerhtml into a list of words
    
    for(let paraIndex of randomParagraphs){
        let words = paragraphList[paraIndex].innerHTML.split(' ');
    
        //get random word, change it so that it's wrapped in a span with class 'private-eye'
        let randomWord = Math.floor(Math.random()*words.length);
        words[randomWord] = "<span class='private-eye'>" + words[randomWord] + "</span>"
    
        //put the list back into a single string
        //change the innerhtml to that stringified list
        paragraphList[paraIndex].innerHTML = words.join(' ')
        
    }   
    
    let eyeList = document.querySelectorAll('.private-eye');
    // console.log(eyeList);

    
    for(let eyeSpan of eyeList){
        // console.log(eyeSpan);
        chosenWordData.push(eyeSpan.getBoundingClientRect());
        
    }
    // console.log(chosenWordData);
}

function draw(){
    clear();
    console.log('sketch looping');
    fill('orange');
    for(let word of chosenWordData){
        drawEye(word['x'],word['y'],word['width'],word['height']);
    }
}
function drawEye(x1,y1,x2,y2){
    push();
    fill(255);
    noStroke();
    
    //eye white
    ellipse(x1+(x2)/2, y1+(y2)/2, x2,y2);

    //iris (doesn't move)
    fill(3,165,252);
    
    circle(x1+(x2/2),y1+(y2/2),y2);

    fill(0);

    let angle = atan2(mouseY - (y1+y2/2), mouseX - x1+x2/2);

    let x3 = (x1+x2/2) + (y2*.25) * cos(angle);
    let y3 = (y1+y2/2) + (y2*.25) * sin(angle);
    // let pupilX = map(mouseX, 0, windowWidth,(x1+(x2)/2)-y2/4,(x1+(x2)/2)+y2/4);
    // let pupilY = map(mouseY,0,windowHeight,y1+(y2/2)-y2/4,y1+(y2/2)+y2/4);
    circle(x3,y3,y2/2);
    pop();
}