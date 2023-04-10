var errors = new Array();

function validateForm(){
    // Maakt de 3 soorten alerts verborgen. De alerts die nodig zijn worden later terug getoond
    document.querySelectorAll(".alert").forEach(x => x.classList.add("d-none"));
    // Verwijder de errors in de alert en de globale array
    document.querySelectorAll("#lijstErrors")[0].innerHTML = "";
    errors = [];

    // Controleer op lege velden
    checkEmptyField(document.querySelector("#inputVoornaam"), "Het veld voornaam is vereist")
    checkEmptyField(document.querySelector("#inputNaam"), "Het veld naam is vereist")

    // Als gebruikersnaam niet leeg is, kijk dan of het geldig is
    // Ik heb de functie checkEmptyField een bolean return waarde gegeven voor het makkelijk in if statements te kunnen gebruiken
    if (checkEmptyField(document.querySelector("#inputGebruikersnaam"), "Het veld gebruikersnaam is vereist") == true){
        if (/^[\w,\d]+[\w,\d,_.-]*$/.test(document.querySelector("#inputGebruikersnaam").value) == false){
            errors.push("De gebruikersnaam voldoet niet aan de voorwaarden")
        }
    }
    checkEmptyField(document.querySelector("#inputAdres"), "Het veld adres is vereist")
    checkEmptyField(document.querySelector("#inputLand"), "Het veld land is vereist")
    checkEmptyField(document.querySelector("#inputProvincie"), "Het veld provincie is vereist")

    // Controleren email
    if (validateEmail(document.querySelector("#inputEmail").value) == false){
        errors.push("Het veld email is vereist");
    }

    // Controleren wachtwoord
    inputWachtwoord = document.querySelector("#inputWachtwoord");
    inputHerhaalWachtwoord = document.querySelector("#inputWachtwoordHerhaal");
    // Ik heb de functie checkEmptyField een boolean return waarde gegeven
    if (checkEmptyField(inputWachtwoord, "Het veld wachtwoord is vereist") && checkEmptyField(inputHerhaalWachtwoord, "Het veld herhaal wachtwoord is vereist")){
        if (inputWachtwoord.value.length <= 7){
            errors.push("Het wachtwoord moet meer dan 7 karakters bevatten")
        }
        else if (inputWachtwoord.value != inputHerhaalWachtwoord.value){
            errors.push("Het veld wachtwoord en herhaal wachtwoord zijn niet gelijk")
        }
    }
    
    // Doe validatePayment, maar enkel als er een radiobutton is aangeduid, anders veroorzaakt dit een error
    if (document.querySelectorAll(".betaling:checked")[0] != null){
        validatePayment(document.querySelectorAll(".betaling:checked")[0]);
    }

    checkPC(document.querySelector("#inputPostcode"));

    // Kijk of de algemene voorwaarden geaccepteerd zijn
    if (document.querySelector("#inputAlgemeneVoorwaarden").checked == false){
        errors.push("Je moet de algemene voorwaarden accepteren")
    }

    if (errors.length == 0){
        // Er zijn geen errors, dus de alert met errors moet niet zichtbaar zijn. De succesvolle alert mag zichtbaar worden.
        document.querySelectorAll(".alert")[0].classList.add("d-none");
        ocument.querySelectorAll(".alert")[1].classList.remove("d-none");
        // Returnt naar form, returned true want een juiste form wordt opgestuurd
        return true;
    }
    else{
        // Maak de alert box met de errors zichtbaar
        document.querySelectorAll(".alert")[0].classList.remove("d-none");
        // Schrijf elke error in de error alert box
        errors.forEach(x => document.querySelector("#lijstErrors").innerHTML += x + "</br>");
        // Returnt naar form, returned false want form met errors wordt niet opgestuurd
        return false;
    }
}

// Voegt een error aan array errors toe als een gegeven veld leeg is, maar returnt ook true/false afhankelijk van of het veld is ingevuld
// Ik heb gekozen om deze functie true/false te laten returnen voor het gemakkelijk in if statements te kunnen gebruiken
function checkEmptyField(veld, melding){
    if (veld.value == ""){
        errors.push(melding);
        return false;
    }
    return true;
}

// Returnt true/false afhankelijk van dat de gegeven email een geldig mailadres is
function validateEmail(emailString){
    // Bron: https://regexr.com/3e48o
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(emailString);
}

function validatePayment(veld){
    document.querySelector("#betalingswijze").textContent = veld.value;
    document.querySelectorAll(".alert")[2].classList.remove("d-none");
}

function checkPC(veld){
    if (checkEmptyField(veld, "Het veld postcode is vereist.") == true){
        postcodeInt = Number(veld.value);
        console.log(postcodeInt);
        if (postcodeInt < 1000 || postcodeInt > 10000){
            errors.push("De waarde van postcode moet tussen 1000 en 9999 liggen.")
        }   
    }
}