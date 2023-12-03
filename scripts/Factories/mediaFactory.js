function createThumbnail (photographer, media) { 
    if (media.image) {
        return createImageThumbnail(photographer, media)
    }
    return createVideoThumbnail(photographer, media)
}