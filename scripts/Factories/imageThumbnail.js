function createImageThumbnail(photographer, media) {
    const thumbnail = document.createElement("img")
    const file_path = "assets/photos/"+photographer.id+"/"+media.image
    thumbnail.setAttribute("src", file_path)
    return thumbnail;
}