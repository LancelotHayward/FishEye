function createVideoThumbnail(photographer, media) {
    const thumbnail = document.createElement("video")
    thumbnail.classList.add("video_thumbnail")
    const file_path = "assets/photos/"+photographer.id+"/"+media.video
    const video_source = document.createElement("source")
    video_source.setAttribute("src", file_path)
    thumbnail.appendChild(video_source)
    return thumbnail
}