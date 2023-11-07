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
    const total_likes = document.getElementById("total-likes")
    const total = parseInt(total_likes.getAttribute("data-before"))
    const heart = document.querySelector('[data-id="'+id+'"]')
    const likes = parseInt(heart.getAttribute("data-before"))
    if (likes == parseInt(heart.getAttribute("data-likes"))) {
        heart.setAttribute("data-before", likes+1)
        total_likes.setAttribute("data-before", total+1)
    }
    else {
        heart.setAttribute("data-before", likes-1)
        total_likes.setAttribute("data-before", total-1)
    }
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
            let thumbnail
            if (media.image) {
                thumbnail = document.createElement("img")
                file_path = "assets/photos/"+photographer.id+"/"+media.image
                thumbnail.setAttribute("src", file_path)
            }
            else {
                thumbnail = document.createElement("video")
                file_path = "assets/photos/"+photographer.id+"/"+media.video
                video_source = document.createElement("source")
                video_source.setAttribute("src", file_path)
                thumbnail.appendChild(video_source)
            }
            thumbnail.classList.add("thumbnail")
            article.appendChild(thumbnail)
        //Title & Likes
            const information_container = document.createElement("div")
            //Title
                const title = document.createElement("p")
                title.classList.add("title")
                title.textContent = media.title
                information_container.appendChild(title)
            //Likes
                const heart = document.createElement("button")
                heart.classList.add("like-button", "heart")
                heart.setAttribute("data-before", media.likes)
                heart.setAttribute("data-likes", media.likes)
                heart.setAttribute("data-id", media.id)
                heart.setAttribute("onclick","likePhoto("+media.id+")")
                information_container.appendChild(heart)
            article.appendChild(information_container)
        gallery.appendChild(article)
    })
}

async function updateAside(photographer) {
    const display = document.getElementById("total-likes")
    let likes = 0
    for (const media of photographer.media) {
        likes += media.likes
    }
    display.setAttribute("data-before", likes)
    document.getElementById("price").textContent = photographer.price + "€ / jour"
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
    updateAside(photographer)
}

init()