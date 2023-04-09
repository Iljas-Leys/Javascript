var errors = new Array();

function validateForm(){
    // Maakt de 3 soorten alerts verborgen. De alerts die nodig zijn worden later terug getoond
    document.querySelectorAll(".alert").forEach(x => x.classList.add("d-none"));
    // Verwijdert (tijdelijk) de errors in de alert
    document.querySelectorAll("#lijstErrors")[0].innerHTML = "";

    checkEmptyField(document.querySelector("#inputVoornaam"), "Het veld voornaam is vereist")
    checkEmptyField(document.querySelector("#inputNaam"), "Het veld naam is vereist")
    checkEmptyField(document.querySelector("#inputGebruikersnaam"), "Het veld gebruikersnaam is vereist")
    checkEmptyField(document.querySelector("#inputAdres"), "Het veld adres is vereist")
    checkEmptyField(document.querySelector("#inputLand"), "Het veld land is vereist")
    checkEmptyField(document.querySelector("#inputProvincie"), "Het veld provincie is vereist")

    if (errors.Length == 0){
        // Er zijn geen errors, dus de alert met errors moet niet zichtbaar zijn
        document.querySelectorAll(".alert")[0].classList.remove("d-none");
        // Returnt naar form, returned true want een juiste form wordt opgestuurd
        return true;
    }
    else{
        // Maak de alert box met de errors zeker zichtbaar
        document.querySelectorAll(".alert")[0].classList.remove("d-none");
        // Schrijf elke error in de error alert box
        errors.forEach(x => document.querySelector("#lijstErrors").innerHTML += x + "</br>");
        // Returnt naar form, returned false want form met errors wordt niet opgestuurd
        return false;
    }
}

function checkEmptyField(veld, melding){
    if (veld.value == ""){
        errors.push(melding);
    }
}