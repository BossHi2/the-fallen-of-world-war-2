//fade out transition not working

function changePages(from, to){
    const fromElem = document.getElementById(from)
    const toElem = document.getElementById(to)
    
    fromElem.classList.remove("page-opened")
    
    

    setTimeout( () =>{
        fromElem.style.display = "none"
        toElem.style.display = 'block'

        void toElem.offsetHeight;

        toElem.classList.add('page-opened')
        
        
    }, 1000)

    if(toElem.id == "page2"){
        makeTimeline()
    }
}

var span1Interval
var span2Interval
var span3Interval
var span4Interval

var span1 = document.getElementById("page2").getElementsByTagName("span")[0]
var span2 = document.getElementById("page2").getElementsByTagName("span")[1]
var span3 = document.getElementById("page2").getElementsByTagName("span")[2]
var span4 = document.getElementById("page2").getElementsByTagName("span")[3]

var span1Total = 16.4
var span2Total = 45418
var span3Total = 3.5
var span4Total = 196000
var currSpan1 = 0
var currSpan2 = 0
var currSpan3 = 0
var currSpan4 = 0

function makeTimeline(){
    var events = document.getElementsByClassName("event-wrapper")

    for(var i = 0; i<events.length; i++){
        var date = parseInt(events[i].getElementsByClassName("date")[0].innerHTML)
        
        events[i].style.left = ((document.body.clientWidth - 50)/(2026-1945)) * (date-1945) + "px"
    }

    span1Interval = setInterval(span1Anim, 25)
    span2Interval = setInterval(span2Anim, 1)
    span3Interval = setInterval(span3Anim, 50)
    span4Interval = setInterval(span4Anim, 1)
}



function span1Anim(){
    if(currSpan1 < span1Total){
        if(((Math.round(currSpan1 * 10) / 10)%1) == 0){
            span1.innerHTML = (Math.round(currSpan1 * 10) / 10) + ".0 million"
        } else
            span1.innerHTML = (Math.round(currSpan1 * 10) / 10) + " million"
        currSpan1 += 0.1
    } else{
        clearInterval(span1Interval)
    }
}

function span2Anim(){
    if(currSpan2 < span2Total){
        span2.innerHTML = currSpan2.toLocaleString()
        
        currSpan2 += 52
    } else{
        span2.innerHTML = "45,418"
        clearInterval(span2Interval)
    }
}

function span3Anim(){
    if(currSpan3 < span3Total){
        if(((Math.round(currSpan3 * 10) / 10)%1) == 0){
            span3.innerHTML = (Math.round(currSpan3 * 10) / 10) + ".0 million"
        } else
            span3.innerHTML = (Math.round(currSpan3 * 10) / 10) + " million"
        currSpan3 += 0.1
    } else{
        clearInterval(span3Interval)
    }
}

function span4Anim(){
    if(currSpan4 < span4Total){
        span4.innerHTML = currSpan4.toLocaleString()
        
        currSpan4 += 202
    } else{
        span4.innerHTML = "196,000"
        clearInterval(span4Interval)
    }
}

makeTimeline()