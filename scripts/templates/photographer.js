function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const portrait_path = `assets/photographers/${portrait}`;

    function childConstructor(css, data, tag = "p") {
        //Object.keys({name}).pop()
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
    function getUserCardDOM() {
        article = document.createElement( 'article' );
        //Avatar
            //const img = document.createElement( 'img' );
            //img.setAttribute("src", picture)
            //article.appendChild(img)
            link = document.createElement("a")
            link.setAttribute("href", "photographer.html?id="+id)
            link.appendChild(childConstructor("portrait", portrait_path, "img"))
            article.appendChild(link)
        //Name
            // const h2 = document.createElement( 'h2' );
            // h2.textContent = name;
            // article.appendChild(h2);
            //article.appendChild(h2)
            childConstructor("name", name, "h2")
        //Localisation
            // const localisation = document.createElement( 'p' )
            // localisation.classList.add("localisation")
            // localisation.textContent = city + ", " + country
            // article.appendChild(localisation);
            childConstructor("localisation", city + ", " + country)
        //Tagline
            // const phrase = document.createElement( 'p' )
            // phrase.classList.add("tagline")
            // phrase.textContent = tagline
            //article.appendChild(phrase)
            childConstructor("tagline", tagline)
        //Price
            // const cost = document.createElement( 'p' )
            // cost.classList.add("price")
            // cost.textContent = price + "€/jour"
            //article.appendChild(cost)
            childConstructor("price", price + "€/jour")
        return (article);
    }
    return { name, portrait_path, getUserCardDOM }
}