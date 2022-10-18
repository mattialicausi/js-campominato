// LIBRERIA FUNZIONI


// GENERA NUMERO RANDOM
function randomNumber(min, max) {
    //console.log(arguments);
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// VERIFICA SE UN NUMERO E' PARI
function isEven(num){
    if(num % 2 === 0){
        return true;
    } else {
        return false;
    }
}

// NOTIFICA DI ERRORE
function notificationError(msgError){
    const alerta = document.createElement('div');
    alerta.className = 'alert alert-danger';
    alerta.innerHTML = msgError;
    return alerta;
}

// RIMUOVE NOTIFICA DI ERRORE
function removeFirstNotification(){
    const alertToRemove = document.querySelector('.alert');
    console.log(alertToRemove);
   if(alertToRemove) alertToRemove.remove();
}

// FUNZIONE PER TROVARE STRINGHE PALINDROMI
function palindromo(inputstring, containerRisultatoHTML){
    let inputstringValue = inputstring.value;
    let parolaGirata = inputstringValue.split('').reverse().join('');

    if(parolaGirata == inputstringValue){
        containerRisultatoHTML.innerHTML = 'Questo è un palindromo: ' + (inputstringValue);
    } else {
        containerRisultatoHTML.innerHTML = 'Questo non è un palindromo: ' + (inputstringValue);
    }
}


