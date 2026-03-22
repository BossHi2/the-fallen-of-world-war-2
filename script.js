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


function makeTimeline(){
    var events = document.getElementsByClassName("event-wrapper")

    for(var i = 0; i<events.length; i++){
        var date = parseInt(events[i].getElementsByClassName("date")[0].innerHTML)
        
        events[i].style.left = ((document.body.clientWidth - 50)/(2026-1945)) * (date-1945) + "px"
        console.log(document.body.clientWidth)
    }
}

makeTimeline()