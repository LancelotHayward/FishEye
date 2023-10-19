function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const portrait_path = `assets/photographers/${portrait}`;

    function childConstructor(css, data, tag = "p", set_attribute = false) {
        //Object.keys({name}).pop()
        const child = document.createElement(tag)
        child.classList.add(css)
        if (set_attribute) {
            child.setAttribute("src", data)
        }
        else {
            child.textContent = data
        }
        article.appendChild(child)
    }
    function getUserCardDOM() {
        article = document.createElement( 'article' );
        //Avatar
            //const img = document.createElement( 'img' );
            //img.setAttribute("src", picture)
            //article.appendChild(img)
            childConstructor("portrait", portrait_path, "img", true)
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