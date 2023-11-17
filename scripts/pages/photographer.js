//Modal
function submitModal() {
    const message_firstname = document.getElementById("message_firstname").value
    const message_lastname = document.getElementById("message_lastname").value
    const message_email = document.getElementById("message_email").value
    const message_content = document.getElementById("message_content").value
    const message = message_firstname + " " + message_lastname + " (" + message_email + ") sent " + message_content
    console.log(message)
    toggleDialog("contact_modal")
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
//Toggle Lightbox
function toggleDialog(id) {
    const dialog = document.getElementById(id)
    if (dialog.open) {
        dialog.close()
    }
    else {
        dialog.showModal()
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
//Filters
function sortMedia(photographer, filter) {
    let sorting = []
    for (let i = 0; i < photographer.media.length; i++) {
        let media = photographer.media[i]
        sorting.push([media[filter], media["id"]])
    }
    if (filter == "likes") {
        sorting.sort(function(a, b){return b[0] - a[0]})
    }
    else {
        sorting.sort()
    }
    let sorted_media = []
    for (let i = 0; i<sorting.length; i++) {
        photographer.media.forEach(media => {
            if (sorting[i][1] == media.id) {
                sorted_media.push(media)
            }
        })
    }
    return sorted_media
}
//Generate page
async function updateHeader(photographer) {
    const { name, portrait, city, country, tagline } = photographer
    const portrait_path = `assets/photographers/${portrait}`
    document.getElementById("name").innerHTML = name
    document.getElementById("localisation").innerHTML = city + ", " + country
    document.getElementById("tagline").innerHTML = tagline;
    document.getElementById("portrait").setAttribute("src", portrait_path)
    document.getElementById("portrait").setAttribute("alt", "Portrait de " + name)
}

//Create article
function createArticle(photographer, media) {
    const article = document.createElement("article")
    //Thumbnail
        let thumbnail
        if (media.image) {
            thumbnail = document.createElement("img")
            const file_path = "assets/photos/"+photographer.id+"/"+media.image
            thumbnail.setAttribute("src", file_path)
        }
        else {
            thumbnail = document.createElement("video")
            const file_path = "assets/photos/"+photographer.id+"/"+media.video
            const video_source = document.createElement("source")
            video_source.setAttribute("src", file_path)
            thumbnail.appendChild(video_source)
        }
        thumbnail.setAttribute("tabindex", "0")
        thumbnail.setAttribute("alt", media.title)
        thumbnail.addEventListener('click', function() {
            toggleDialog(media.id)
        })
        thumbnail.addEventListener("keydown", (e) => {
            if (!e.repeat && e.key == "Enter") {
                toggleDialog(media.id)
            }
        })
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
    return article
}

//Create lightbox
function createLightbox(photographer, media, previousID) {
    //Update next from previous Lightbox
    if (previousID) {
        const previous_article = document.getElementById(previousID)
        previous_article.getElementsByClassName("dialog_arrow")[1].onclick = function () {
            toggleDialog(previousID)
            toggleDialog(media.id)
        }
        previous_article.addEventListener("keydown", (e) => {
            if (!e.repeat && e.key == "ArrowRight") {
                toggleDialog(previousID)
                toggleDialog(media.id)
            }
        })
    }
    const lightbox = document.createElement("dialog")
    lightbox.setAttribute("id", media.id)
    lightbox.classList.add("lightbox")
    //Previous
        const previous = document.createElement("img")
        previous.setAttribute("src","assets/icons/arrow.png")
        previous.setAttribute("alt","Previous")
        previous.classList.add("dialog_arrow")
        previous.onclick = function () {
            toggleDialog(media.id)
            if (previousID) {
                toggleDialog(previousID)
            }
        }
        lightbox.addEventListener("keydown", (e) => {
            if (!e.repeat && e.key == "ArrowLeft") {
                toggleDialog(media.id)
                if (previousID) {
                    toggleDialog(previousID)
                }
            }
        })
        lightbox.appendChild(previous)
    //Media container
        const media_container = document.createElement("div")
        media_container.classList.add("dialog_media")
        //Media
            if (media.image) {
                const image = document.createElement("img")
                const file_path = "assets/photos/"+photographer.id+"/"+media.image
                image.setAttribute("src", file_path)
                media_container.appendChild(image)
            }
            else {
                let video = document.createElement("video")
                const file_path = "assets/photos/"+photographer.id+"/"+media.video
                const video_source = document.createElement("source")
                video_source.setAttribute("src", file_path)
                video.appendChild(video_source)
                media_container.appendChild(video)
            }
        //Title
            const title = document.createElement("p")
            title.classList.add("title")
            title.textContent = media.title
            media_container.appendChild(title)
        lightbox.appendChild(media_container)
    //Right
        const next_container = document.createElement("div")
        next_container.classList.add("dialog_right")
        //Exit
            let exit = document.createElement("img")
            exit.setAttribute("src","assets/icons/close-24px.png")
            exit.setAttribute("alt","Exit")
            exit.onclick = function () {
                toggleDialog(media.id)
            }
            next_container.appendChild(exit)
        //Next
            let next = document.createElement("img")
            next.setAttribute("src","assets/icons/arrow.png")
            next.setAttribute("alt","Next")
            next.classList.add("dialog_arrow")
            next.onclick = function () {
                toggleDialog(media.id)
            }
            next_container.appendChild(next)
        //Spacer
            next_container.appendChild(document.createElement("div"))
        lightbox.appendChild(next_container)
    return lightbox
}

async function displayGallery(photographer) {
    const gallery = document.getElementById("gallery")
    while (gallery.firstChild) {
        gallery.removeChild(gallery.firstChild);
    }
    const filter_selector = document.getElementById("filters")
    const filter = filter_selector.selectedOptions[0].value
    filter_selector.onchange = function() {
        displayGallery(photographer)
    }
    
    const sorted_media = sortMedia(photographer, filter)
    let previousID
    sorted_media.forEach(media => {
        gallery.appendChild(createArticle(photographer, media))
        gallery.appendChild(createLightbox(photographer, media, previousID))
        previousID = media.id
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