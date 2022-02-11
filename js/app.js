

//VARIABLES
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];



//EVENTS LISTENERS

eventLesteners();
function eventLesteners() {
    //cuando el usuario agrega un nuevo tweets
    formulario.addEventListener('submit', agregarTweets);

    //cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];


        crearHtml();
    });


}


//FUNCIONES

function agregarTweets(e) {
    e.preventDefault();

    const tweet = document.querySelector('#tweet').value;

    if (tweet === '') {
        mostrarError('el mensaje no puede ir vacio');

        return;
    }


    const tweetObj = {
        id: Date.now(),
        texto: tweet
    }

    //agregar en arreglo de tweets
    tweets = [...tweets, tweetObj];

    //crear el html de los tweets
    crearHtml();

    //reiniciar el formulario
    formulario.reset();

}


//mostrar error

function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //insertar el contenido error
    const contenido = document.querySelector('#contenido');

    contenido.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove();
    }, 3000);

}


function crearHtml() {

    //limpiar el html
    limpiarHtml();


    if (tweets.length > 0) {
        tweets.forEach(tweet => {
            //agregar un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'x';

            //anadir la funcion de eliminar
            btnEliminar.onclick = () =>{
             
                borrarTweets(tweet.id);
            };


            //crear el html
            const li = document.createElement('li');

            //agregar el texto
            li.textContent = tweet.texto;

            //insertar el boton eliminar
            li.appendChild(btnEliminar);

            //insertando el html
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}



//agrega los tweets actuales en local Storage

function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}


//eliminando tweets
function borrarTweets(id){
tweets = tweets.filter(tweet => tweet.id !== id);
crearHtml();

}


function limpiarHtml() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}