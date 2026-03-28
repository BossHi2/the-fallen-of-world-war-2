//fade out transition not working
var page3Canvas
var ctx
var particles = [];
var numParticles = 1000
var speedMult = 0.5
var mouseX = null
var mouseY = null
var particleImg = "particle.png"

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
    } if(toElem.id == "page3"){
        page3Canvas = document.getElementById("canvas")
        ctx = page3Canvas.getContext("2d")
        page3Canvas.width = window.innerWidth
        page3Canvas.height = 9388 
        window.scrollTo(0,0)
        init()
        animate()
        page3Canvas.addEventListener("mousemove", (e)=>{
            mouseX = e.clientX
            mouseY = e.clientY + window.scrollY
        })
        page3Canvas.addEventListener("mouseleave", (e)=>{
            mouseX = null
            mouseY = null
        })
        window.removeEventListener("scroll", page2Scroll)
        window.addEventListener("scroll", usDeathCount)
    }
}

var span1Interval
var span2Interval
var span3Interval
var span4Interval

var span1
var span2
var span3
var span4

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
    span1 = document.getElementById("page2").getElementsByTagName("span")[2]
    span2 = document.getElementById("page2").getElementsByTagName("span")[3]
    span3 = document.getElementById("page2").getElementsByTagName("span")[4]
    span4 = document.getElementById("page2").getElementsByTagName("span")[5]

    span1Total = 16.4
    span2Total = 45418
    span3Total = 3.5
    span4Total = 196000
    currSpan1 = 0
    currSpan2 = 0
    currSpan3 = 0
    currSpan4 = 0

    didReadFirstSection = false
    didReadSecondSection = false
    didReadThirdSection = false
    events = document.getElementsByClassName("event-wrapper")

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
        
        currSpan2 += 304
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
        
        currSpan4 += 1204
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


function usDeathCount(){
    var h2 = document.getElementsByClassName("scroll-death-count")[0].getElementsByTagName("h2")[0]
    var death
    if(Math.round(window.scrollY*50) < 419400){
        document.getElementsByClassName("scroll-wrapper")[0].style.display = "block"
    }
    if(Math.round(window.scrollY*50) < 0)
        death = 0
    else if(Math.round(window.scrollY*50) > 419400){
        death = 419400
        document.getElementsByClassName("scroll-wrapper")[0].style.display = "none"
    }
    else
        death = Math.round(window.scrollY*50)
    h2.innerHTML = death.toLocaleString() + " deaths"
}   




class Particle{
    hasHovered = false
    ticksSinceHovered = 0

    constructor(size, x, y, speedX, speedY){
        this.size = size
        this.x = x
        this.y = y
        this.speedX = speedX * speedMult
        this.speedY = speedY * speedMult
        this.particleImg = new Image()
        this.particleImg.src = particleImg
    }

    update(){
        this.x += this.speedX
        this.y += this.speedY

        if(this.x + this.size > page3Canvas.width || this.x < 0){
            this.speedX = -this.speedX
        } if(this.y + this.size > page3Canvas.height || this.x < 0){
            this.speedy = -this.speedy
        } 
        
        if(mouseX !== null && mouseY !== null){
            const dist = Math.hypot(mouseX - this.x, mouseY - this.y)
            const angle = Math.atan2(this.y - mouseY, this.x - mouseX)

             if(this.ticksSinceHovered < 200 && this.hasHovered){
                
                this.ticksSinceHovered++
                this.x += Math.cos(angle) * (2 - (this.ticksSinceHovered/100)) 
                this.y += Math.sin(angle) * (2 - (this.ticksSinceHovered/100)) 
            } else if(this.ticksSinceHovered >= 200){

                this.hasHovered = false
                this.ticksSinceHovered = 0

                if(this.x + this.size > page3Canvas.width || this.x < 0){
                    this.x = page3Canvas.width/2
                } if(this.y + this.size > page3Canvas.height || this.x < 0){
                    this.y = page3Canvas.height/2
                } 


            } else if(dist < 150){
                this.hasHovered = true
                this.x += Math.cos(angle) * 2
                this.y += Math.sin(angle) * 2

                if(this.x < 0)
                    this.x = 0
                if(this.x + this.size > page3Canvas.width)
                    this.x = page3Canvas.width - this.size
                if(this.y < 0)
                    this.y = 0
                if(this.y + this.size > page3Canvas.height)
                    this.y = page3Canvas.height - this.size

            }
                
        }
    }

    draw(){
        ctx.drawImage(this.particleImg, this.x, this.y, this.size, this.size)

    }
}

function init(){
    for(let i = 0; i<numParticles; i++){
        const size = 1 + Math.random() * 3
        const x = Math.random() * (page3Canvas.width - size)
        const y = Math.random() * (page3Canvas.height - size)
        const speedX = Math.random() - 0.5
        const speedY = Math.random() - 0.5
        
        particles.push((new Particle(size, x, y, speedX, speedY)))
    }
}

function animate(){
    ctx.clearRect(0,0,page3Canvas.width, page3Canvas.height)

    particles.forEach((particle) =>{
        particle.update()
        particle.draw()
    })

    requestAnimationFrame(animate)
}

var countryids = ["poland", "france", "yugoslavia", "germany", "uk", "soviet-union", "hungary", "romania", "italy", "us"]
var currYear = 1939
function displayFigures(countryid, numDead, src){
    for(var i = 0; i<numDead/1000; i++){
        var img = document.createElement("img")
        img.src = src
        document.getElementById(countryid).appendChild(img)
    }
}

function clearFigures(countryid){
    if(countryid == "all"){
        for(var i = 0; i<countryids.length; i++){
            document.getElementById(countryids[i]).innerHTML = ""
        }
    } else
        document.getElementById(countryid).innerHTML = ""
}


function changeYear(amount){
    currYear += amount
    document.getElementById("year-counter").innerHTML = "Year: " + currYear
    if(currYear <= 1939)
        document.getElementsByClassName("back-button")[0].style.visibility = "hidden"
    else if(currYear >= 1945)
        document.getElementsByClassName("forward-button")[0].style.visibility = "hidden"
    else{
        document.getElementsByClassName("back-button")[0].style.visibility = ""
        document.getElementsByClassName("forward-button")[0].style.visibility = ""
    }

    clearFigures("all")
    if(currYear == 1939){
        displayFigures("poland", 266000, "polish.png")
        displayFigures("france", 2000, "polish.png")
        displayFigures("germany",(17269 + 552), "polish.png")
        displayFigures("soviet-union",(3000 + 5000 + 2000 + 4000 + 20000 + 10000 + 4500 + 100), "polish.png")
    } else if(currYear == 1940){
        displayFigures("poland", (358 + 7000 + 23000 + 11000 + 20000), "polish.png")
        displayFigures("france", (85310), "polish.png")
        displayFigures("germany", (5296 + 27074 + 5296), "polish.png")
    }
}


//page 4
changeYear(0)
window.scrollTo(0,0)