function childConstructor(css, data, tag = "p") {
    const child = document.createElement(tag)
    child.classList.add(css)
    if (tag == "img") {
        child.setAttribute("src", data)
        return child
    }
    else {
        child.textContent = data
        article.appendChild(child)
    }
}

function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;
    const portrait_path = `assets/photographers/${portrait}`;
    function getUserCardDOM() {
        article = document.createElement( 'article' );
        //Link & Image
            link = document.createElement("a")
            link.setAttribute("href", "photographer.html?id="+id)
            img = childConstructor("portrait", portrait_path, "img")
            link.appendChild(img)
            article.appendChild(link)
        //Information
            childConstructor("name", name, "h2")
            childConstructor("localisation", city + ", " + country)
            childConstructor("tagline", tagline)
            childConstructor("price", price + "€/jour")
        return (article);
    }
    return { name, portrait_path, getUserCardDOM }
}