//Modal
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
//Like
function likePhoto(id) {
    const heart = document.querySelector('[data-id="'+id+'"]')
    likes = parseInt(heart.getAttribute("data-before"))
    heart.setAttribute("data-before", likes+1)
}
//Data
async function getPhotographer(id) {
    const response = await fetch("../../data/photographers.json")
    const photographers_data = await response.json()
    for (const photographer of photographers_data.photographers) {
        if (photographer.id == id) {
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
    return false
}

//Generate page
async function updateHeader(photographer) {
    const { name, portrait, city, country, tagline } = photographer
    const portrait_path = `assets/photographers/${portrait}`
    document.getElementById("name").innerHTML = name
    document.getElementById("localisation").innerHTML = city + ", " + country
    document.getElementById("tagline").innerHTML = tagline;
    document.getElementById("portrait").setAttribute("src", portrait_path)
}

async function displayGallery(photographer) {
    const gallery = document.getElementById("gallery")
    photographer.media.forEach(media => {
        const article = document.createElement("article")
        //Thumbnail
            img = document.createElement("img")
            if (media.image) {
                file_path = "assets/photos/"+photographer.id+"/"+media.image
                img.setAttribute("src", file_path)
            }
            else {
                file_path = "assets/photos/"+photographer.id+"/"+media.video
                img.setAttribute("src", file_path)
            }
            article.appendChild(img)
        //Title & Likes
            const information_container = document.createElement("div")
            //Title
                const title = document.createElement("p")
                title.classList.add("title")
                title.textContent = media.title
                information_container.appendChild(title)
            //Likes
                const heart = document.createElement("button")
                heart.classList.add("like-button")
                heart.setAttribute("data-before", media.likes)
                heart.setAttribute("data-id", media.id)
                heart.setAttribute("onclick","likePhoto("+media.id+")")
                information_container.appendChild(heart)
            article.appendChild(information_container)
        gallery.appendChild(article)
    })
}

async function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const photographer_id = urlParams.get('id')
    const photographer = await getPhotographer(photographer_id)
    if (!photographer) {
        window.location = "index.html"
    }
    updateHeader(photographer)
    displayGallery(photographer)
}

init()