const prix_operateur_0_12_input = document.getElementById("prix_operateur_0-12") as HTMLInputElement
const prix_operateur_12_24_input = document.getElementById("prix_operateur_12-24") as HTMLInputElement
const prix_operateur_telephone_input = document.getElementById("prix_operateur_telephone") as HTMLInputElement
const prix_operateur_etalement_input = document.getElementById("prix_operateur_etalement") as HTMLInputElement
const prix_operateur_duree_etalement_input = document.getElementById("prix_operateur_duree_etalement") as HTMLInputElement

const prix_telephone_classique_input = document.getElementById("prix_telephone_classique") as HTMLInputElement
const prix_operateur_classique_input = document.getElementById("prix_operateur_classique") as HTMLInputElement

const prix_operateur_final_input = document.getElementById("prix_operateur_final") as HTMLParagraphElement
const prix_classique_final_input = document.getElementById("prix_classique_final") as HTMLParagraphElement
const economie_final_input = document.getElementById("economie_final") as HTMLParagraphElement

const reponse_total_utilisateur_input = document.getElementById("reponse_total_utilisateur") as HTMLParagraphElement
const message_utilisateur_input = document.getElementById("message_utilisateur") as HTMLParagraphElement

const bouton_pdf_input = document.getElementById("bouton_pdf") as HTMLDivElement

function check_input_operateur_has_value(): boolean {
    return prix_operateur_0_12_input.value.trim() !== "" && prix_operateur_12_24_input.value.trim() !== "" && prix_operateur_telephone_input.value.trim() !== ""
}

function check_input_classique_has_value(): boolean {
    return prix_telephone_classique_input.value.trim() !== "" && prix_operateur_classique_input.value.trim() !== ""
}

function check_all_input_has_value(): boolean {    
    return check_input_operateur_has_value() && check_input_classique_has_value()
}

function calcul_conclusion(): void {
    let prix_operateur_final: number = 0
    let prix_classique_final:number = 0

    if (check_input_operateur_has_value()) {
        const prix_operateur_0_12: number = parseFloat(prix_operateur_0_12_input.value);
        const prix_operateur_12_24: number = parseFloat(prix_operateur_12_24_input.value);
        const prix_operateur_telephone: number = parseFloat(prix_operateur_telephone_input.value);
        let operateur_etalement: number = 0

        if (prix_operateur_etalement_input.value.trim() != "" && prix_operateur_duree_etalement_input.value.trim() != "") {
            operateur_etalement = parseFloat(prix_operateur_etalement_input.value) * parseInt(prix_operateur_duree_etalement_input.value)
        }

        prix_operateur_final = prix_operateur_0_12 * 12 + prix_operateur_12_24 * 12 + prix_operateur_telephone + operateur_etalement

        prix_operateur_final_input.textContent = prix_operateur_final.toFixed(2) + " €"
    }
    else {
        prix_operateur_final_input.textContent = ""
    }

    if (check_input_classique_has_value()) {
        const prix_telephone_classique: number = parseFloat(prix_telephone_classique_input.value)
        const prix_operateur_classique: number = parseFloat(prix_operateur_classique_input.value)

        prix_classique_final = prix_telephone_classique + prix_operateur_classique * 24

        prix_classique_final_input.textContent = prix_classique_final.toFixed(2) + " €"
    }
    else {
        prix_classique_final_input.textContent = ""
    }

    if (check_all_input_has_value()) {
        economie_final_input.textContent = (prix_classique_final - prix_operateur_final).toFixed(2) + " €"

        if (prix_classique_final - prix_operateur_final >= 0)
            reponse_total_utilisateur_input.innerHTML = "Vous allez <span style='color: #3CB371; font-weight: bold'>économiser</span>"
        else if (prix_classique_final - prix_operateur_final < 0)
            reponse_total_utilisateur_input.innerHTML = "Vous allez <span style='color: red; font-weight: bold'>perdre</span>"

        if (prix_classique_final - prix_operateur_final >= 500)
            message_utilisateur_input.textContent = "Vous venez de trouver l'affaire du siècle ! 🤯"
        else if (prix_classique_final - prix_operateur_final >= 200)
            message_utilisateur_input.textContent = "Vous venez de trouver une pépite ! 🥳"
        else if (prix_classique_final - prix_operateur_final >= 50)
            message_utilisateur_input.textContent = "Vous venez de trouver une bonne affaire ! Cependant certains constructeurs fournissent des accessoires à l'achat d'un smartphone, vérifiez bien que ceux-ci ne vous sont pas essentiels. 😁"
        else if (prix_classique_final - prix_operateur_final > 0)
            message_utilisateur_input.textContent = "Bonne nouvelle, vous allez économiser de l'argent ! Cependant prennez en considération l'engagement de 24 mois 😁"
        else if (prix_classique_final - prix_operateur_final == 0)
            message_utilisateur_input.textContent = "Hum vous ne gagnerez et ne perdrez rien au moins... La seule chose qui peut tout faire basculer, ce sera le contenu du forfait (les offres qui sont offers) et l'engagement de 24 mois. 🫤"
        else if (prix_classique_final - prix_operateur_final < 0)
            message_utilisateur_input.textContent = "Oula arrêtez tout ! Vous allez perdre de l'argent 😬"

        const parametre_url_pdf: string = "prix_operateur_0_12_input=" + prix_operateur_0_12_input.value + "&prix_operateur_12_24_input=" + prix_operateur_12_24_input.value + "&prix_operateur_telephone_input=" + prix_operateur_telephone_input.value + "&prix_operateur_etalement_input=" + prix_operateur_etalement_input.value + "&prix_operateur_duree_etalement_input=" + prix_operateur_duree_etalement_input.value + "&prix_telephone_classique_input=" + prix_telephone_classique_input.value + "&prix_operateur_classique_input=" + prix_operateur_classique_input.value
        bouton_pdf_input.innerHTML = "<a style='margin-right: 20px; color: royalblue' target='_blank' href='PDF/generateur_pdf.php?" + parametre_url_pdf + "'>Générer un PDF avec ces informations</a>"
    }
    else {
        economie_final_input.textContent = ""

        reponse_total_utilisateur_input.innerHTML = "<span style='text-decoration: underline'>Veuillez remplir les cellules.</span>"
        message_utilisateur_input.textContent = "Une fois les cellules importantes saisies, je pourrai vous donner mon avis 😉"

        bouton_pdf_input.textContent = ""
    }
}