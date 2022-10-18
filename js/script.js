'use strict';

// PROCEDIMENTO
// Attribuisco a variabile (playButton) il bottone in HTML
// Creo funzione click del bottone 
// Creo funzione (creaGriglia) per creare la griglia centrale
// Creo funzione (creaBox) per creare i box e le varie dimensioni in base al livello
// Creo ciclo for in (creaGriglia) in cui all'incremento dell'indice attiva la funzione (creaBox) con argomento i  creaBox(i)
// Aggiungo evento ('click') e function (scegli) al box in (creaBox), per creare una funzione che permetta di aggiungere un bg-color e che possa togliere la funzione click quando vogliao
// Creo function (scegli) e metto in una variabile lo span creato in (creaBox) e prendo ciò che è all'interno per convertirlo in numero con parseInt
// Rimuovo evento click e scegli da box in modo che possiamo effettuare solo una volta il click su un box
// Creo costante con il numero di bombe da creare e un array per inserirci i numeri generati random (numeroRosso) in base a numBombe con un ciclo while
//Creo un if in cui se l' indice di ciclo for in (creaGriglia) (i) non è presente in array listaB aggiungo classe css bg-blu. Else presente in lista bg-rosso.
// Creo variabile score = 0 che incrementa (score++)in function (scegli) if, 
//Creo variabile MAXATTEMPT = numero dei box - numBombe;
// Inserisco if in if(bg-color) in scegli per richiamare funzione (gameOver), per terminare il gioco, se score è uguale a MAXATTEMPT finisce il gioco perchè il giocatore ha vinto, "da dichiarare in funzione (gameOver)"
// Creo funzione gameOver per far ternimare il gioco.


const playButton = document.getElementById('play-button');

function play(){

    let numBox;
    const contenitoreMain = document.getElementById('contenitore-main');
    contenitoreMain.innerHTML = '';
    const livelliDifficoltaHTML = document.getElementById('livelli-difficolta');
    const livelli = livelliDifficoltaHTML.value;
    const numBombe = 16;
    let listaB = [];
    
    let score = 0;

    // CREO SWITCH PER CAMBIARE N BOX AL CAMBIO DIFFICOLTA'
    switch(livelli){
        case '1':
            default:
            numBox = 100;
            break;

        case '2':
             numBox = 81;
            break;

        case '3':
            numBox = 49;
            break;
    } 


    //CREO 16 NUMERI DA INSERIRE IN UN ARRAY PER CREARE BOMBE

        while(listaB.length < numBombe){
            let numeroRosso = randomNumber(1, numBox);
            // BLOCCO IF PER NON GENERARE I NUMERI SOLO UNA VOLTA
            if(!listaB.includes(numeroRosso)){
                listaB.push(numeroRosso);
            }
            
        }

        // VARIABILE PER DETERMINARE IL NUMERO MASSIMO DI CLICK PRIMA DI PERDERE
        const MAXATTEMPT = numBox - numBombe;


      //CREO FUNZIONE PER CREARE DIV FIELD GAME CHE CONTERRA' I DIV BOXES
    function creaGriglia(){
        
        const griglia = document.createElement('div');
        griglia.className = 'field-game';
        
        // UTILIZZO FUNZIONE CREABOX CON ARGOMENTO (i) OVVERO CONTATORE PER APPENDERE ALL'INTERNO DEI BOX IL NUMERO CORRETTO
        for(let i = 1; i <= numBox; i++){
            const square = creaBox(i);
            griglia.append(square);
         }
         contenitoreMain.append(griglia);
         
    }

 

    //CREO FUNZIONE PER CREARE BOX DA INSERIRE DENTRO IL FIELD, (NUM) SERVE PER ARGOMENTARE LA FUNZIONE
    function creaBox(num){
        const box = document.createElement('div');
        box.className = 'boxes'; 
        const spaceLevel = Math.sqrt(numBox);
        box.style.width = `calc(100% / ${spaceLevel})`;
        box.style.height = `calc(100% / ${spaceLevel})`;
        box.innerHTML = `
        <span> ${num}</span>
        `;   
        
        //AGGIUNGO EVENTO CLICK PER CAMBIARE BG COLOR AGGIUNGENDO CLASSI CSS
        box.addEventListener('click', scegli);

         return box;  
    }
    creaGriglia(); 


    // AGGIUNGO FUNZIONE  PER RIMUOVERE EVENTO CLICK
    function scegli(){

            // SELEZIONO L'INTERNO DELLO SPAN PER CONVERTIRLO IN UN NUMERO
        const span = this.querySelector('span');
        const num = parseInt(span.innerText);
        console.log(num);

        this.removeEventListener('click', scegli);
       
        //BLOCCO IF PER AGGIUNGERE CLASSE BG COLOR BLU O ROSSO
    if(!listaB.includes(num)){
        this.classList.add('bg-blu');
        //console.log(listaB)

        score++;
        if(score === MAXATTEMPT){
            gameOver();
        }
        console.log(score);
        //SE NON RAGGIUNGE IL MAXATTEMPT IL GIOCO TERMINA PERCHE BECCA IL ROSSO
    }else{
        this.classList.add('bg-rosso');
       // gameOver();
    } 
    }

    // CREO FUNZIONE PER FAR TERMINARE IL GIOCO
    function gameOver(){
        const squares = document.getElementsByClassName('box');
        console.log(squares);

        for (let i = 0; i < squares.length; i++){
            squares[i].removeEventListener('click', scegli);
            console.log(squares[i])
            // SE I+1 E' NELL'ARRAY L0 SCOPERCHIAMO
            // IF SQUARE [I] == LISTAB
            let num = i+1;
            if(listaB.includes(num)){
                squares[i].classList.add('bg-rosso');
                console.log(num);
            }
           
        }
            
        if(score === MAXATTEMPT){
            console.log('Ha vinto!!');
            contenitoreMain.append('Hai vinto!');

        } else{
            console.log('Hai perso!!');
            
        }
    }

}

playButton.addEventListener('click', play);