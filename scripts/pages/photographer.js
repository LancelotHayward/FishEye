//photographer.html
function toggleModal() {
	document.getElementById("contact_modal").classList.toggle("display-none")
}
function submitModal() {
    const message_firstname = document.getElementById("message_firstname").value
    const message_lastname = document.getElementById("message_lastname").value
    const message_email = document.getElementById("message_email").value
    const message_content = document.getElementById("message_content").value
    const message = message_firstname + " " + message_lastname + " (" + message_email + ") sent " + message_content
    console.log(message)
    toggleModal()
}
document.getElementsByTagName("form")[0].addEventListener('submit', (e) => {
    e.preventDefault()
})

async function getPhotographer(name) {
    const response = await fetch("../../data/photographers.json")
    const photographers_data = await response.json()
    for (const photographer of photographers_data.photographers) {
        if (photographer.name == name) {
            const photographer_media = []
            for (const media of photographers_data.media) {
                if (media.photographerId == photographer.id) {
                    photographer_media.push(media)
                }
            }
            photographer["media"] = photographer_media
            return photographer
        }
    }
    // photographers_data.photographers.forEach(photographer => {
    //     if (photographer.name == name) {
    //         //console.log(photographer)
    //         const desired_photographer = photographer
    //     }
    // });
    // return desired_photographer
}
async function updateHeader(photographer) {
    const { name, portrait, city, country, tagline } = photographer
    const portrait_path = `assets/photographers/${portrait}`
    document.getElementById("name").innerHTML = name
    document.getElementById("localisation").innerHTML = city + ", " + country
    document.getElementById("tagline").innerHTML = tagline;
    document.getElementById("portrait").setAttribute("src", portrait_path)
}
async function displayGalery(photographer) {
    console.log(photographer)
}

async function init() {
    const photographer = await getPhotographer("Ellie-Rose Wilkens")
    updateHeader(photographer)
    displayGalery(photographer)
}
init()