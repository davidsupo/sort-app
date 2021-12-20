const EMPTY_DIV = document.querySelector('#empty-list');
const WINNER_DIV = document.querySelector('#winner-list');
const WINNER_TOTAL = document.querySelector('#winner-total');

let listaParticipantes = [];

function sortear() {
    resetMessages();
    if (agregar()) {
        let randomWinners = [];
        const total = Number(WINNER_TOTAL.value);
        if (total < 1) return notAward();
        let totalList = listaParticipantes.length;
        for (let i = 0; i < total; i++) {
            let random = getFakeList() === -1 ? Math.floor(Math.random() * totalList) : getFakeList();
            randomWinners.push(random);
            totalList--;
        }
        winnerList(randomWinners);
    }
}

function getFakeList() {
    const listaFake = JSON.parse(window.localStorage.getItem('fake-list'));
    let indexFake = -1;
    if (listaFake && listaFake.length > 0) {
        for (let participante of listaFake){
            indexFake = listaParticipantes.indexOf(participante);
            if (indexFake !== -1) break;
        }
    }
    return indexFake;
}

function agregar() {
    const listaText = document.querySelector('#list-area');
    listaParticipantes = listaText.value.replace(/\r\n/g,"\n").split("\n");
    if (listaParticipantes === [""] || listaParticipantes === []) {
        emptyList();
        return false;
    }
    return true;
}

function notAward() {
    EMPTY_DIV.innerHTML = `<p>Por favor agregar cantidad de premios</p>`;
}

function emptyList() {
    EMPTY_DIV.innerHTML = `<p>Por favor agregar elementos a la lista</p>`;
}

function winnerList(items) {
    let lista = '';
    items.forEach(item => {
        lista += `<p>El ganador del sorteo es: ${listaParticipantes[item]}</p>`;
    });
    WINNER_DIV.innerHTML = lista;
}

function resetMessages() {
    EMPTY_DIV.innerHTML = '';
    WINNER_DIV.innerHTML = '';
}

function agregarFake() {
    const fakeList = document.querySelector('#fake-list');
    const fakeParticipantes = document.querySelector('#fake-participantes');
    listaFakeParticipantes = fakeParticipantes.value.replace(/\r\n/g,"\n").split("\n");
    window.localStorage.setItem('fake-list', JSON.stringify(listaFakeParticipantes));
    fakeList.innerHTML = '';
}

document.addEventListener('DOMContentLoaded', () => {
    listaParticipantes = [];
    resetMessages();
});

document.addEventListener('keydown', event => {
    if (event.shiftKey && event.key === 'J') {
        const fakeList = document.querySelector('#fake-list');
        fakeList.innerHTML = `<textarea name="" id="fake-participantes" cols="30" rows="10"></textarea><button onclick="agregarFake()">AGREGAR</button>`;
    }
});