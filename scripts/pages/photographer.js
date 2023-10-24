//Mettre le code JavaScript lié à la page photographer.html
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