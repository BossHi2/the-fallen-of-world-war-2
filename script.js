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

var span1 = document.getElementById("page2").getElementsByTagName("span")[2]
var span2 = document.getElementById("page2").getElementsByTagName("span")[3]
var span3 = document.getElementById("page2").getElementsByTagName("span")[4]
var span4 = document.getElementById("page2").getElementsByTagName("span")[5]

var span1Total = 16.4
var span2Total = 45418
var span3Total = 3.5
var span4Total = 196000
var currSpan1 = 0
var currSpan2 = 0
var currSpan3 = 0
var currSpan4 = 0

var didReadFirstSection = false
var didReadSecondSection = false
var didReadThirdSection = false


function makeTimeline(){
    var events = document.getElementsByClassName("event-wrapper")

    for(var i = 0; i<events.length; i++){
        var date = parseInt(events[i].getElementsByClassName("date")[0].innerHTML)
        
        events[i].style.left = ((document.body.clientWidth - 50)/(2026-1945)) * (date-1945) + "px"
    }

    
    

    window.addEventListener('scroll', page2Scroll)
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
        
        currSpan4 += 402
    } else{
        span4.innerHTML = "196,000"
        clearInterval(span4Interval)
    }
}

function page2Scroll(){
    if(window.scrollY == 0){
        didReadFirstSection = false
        didReadSecondSection = false
        didReadThirdSection = false
    }
    //1040. 2184, 3393
    if(window.scrollY > 400 && didReadFirstSection == false){
        didReadFirstSection = true
        window.scrollTo( {top: 1040,
            behavior: "smooth"
        })

        span1Interval = setInterval(span1Anim, 25)
        span2Interval = setInterval(span2Anim, 1)
    }
    if(window.scrollY > 1200 && didReadSecondSection == false){
        didReadSecondSection = true
        window.scrollTo( {top: 2184,
            behavior: "smooth"
        })
        span3Interval = setInterval(span3Anim, 50)
        span4Interval = setInterval(span4Anim, 1)
    }
    if(window.scrollY > 2384 && didReadThirdSection == false){
        didReadThirdSection = true
        window.scrollTo( {top: 3393,
            behavior: "smooth"
        })
    }
}

makeTimeline()