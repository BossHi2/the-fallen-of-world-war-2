//fade out transition not working

function changePages(from, to){
    const fromElem = document.getElementById(from)
    const toElem = document.getElementById(to)
    
    fromElem.classList.add('page-closed')
    
    

    setTimeout( () =>{
        fromElem.style.display = "none"
        //fromElem.classList.remove('animate-out')
        toElem.style.display = 'block'
        toElem.classList.remove('page-closed')
        
        //toElem.classList.add('page-opened')
        
    }, 1000)
}