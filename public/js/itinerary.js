const itineraryhandeler = (event)=>{
    event.preventDefault()
    const name = document.querySelector("#name-element").value
    const description = document.querySelector("#description-element")

    if (name, description){
        fetch ("/api/projects", {
            method:"POST",
            body: JSON.stringify({
                itinerary_name:name,
                description:description
            }),
            headers: { 'Content-Type': 'application/json' },
        })
        document.location.replace("/profile")
    }
}


document.querySelector("#itinerary-submit").addEventListener("click",itineraryhandeler)