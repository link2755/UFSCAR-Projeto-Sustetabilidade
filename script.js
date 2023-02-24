import dados from "./dados.json"assert {
    type: 'json'
};



var iterador = 0;

//shuffle array
function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }

    return array;
}

function loadQuestion() {
    if (iterador + 1 < dados.length) {
        document.getElementById('pontuacao_atual').innerHTML = 'Pontuação Atual: ' + iterador;
        document.getElementById('opt1').innerHTML = dados[iterador].questao;
        document.getElementById('opt1_value').innerHTML = dados[iterador].valor;
        
        document.getElementById('opt2').innerHTML = dados[iterador + 1].questao;

        document.body.style.backgroundImage = `url(${dados[iterador].img_src}), url(${dados[iterador + 1].img_src})`;
    } else {
        console.log("erro iterador invalido")
    }
}

function renderNextQuestion() {
    iterador += 1;
    
    if(iterador > localStorage['pontuacaoMax']){
        localStorage['pontuacaoMax'] = iterador;
        document.getElementById('pontuacao_maxima').innerHTML = 'Pontuação Máxima: ' + iterador;
    }
    loadQuestion();
}

function finalizarJogo() {
    console.log('errou finalizar')
    //salvando max
    if (localStorage['pontuacaoMax'] && localStorage['pontuacaoMax'] > iterador) {
        localStorage['pontuacaoMax'] = iterador;
    }
    return;
}

function selecionarOpcao(opcao) {
    var correta = dados[iterador + 1].valor >= dados[iterador].valor ? 'higher' : 'lower';

    if (opcao == correta) {
        console.log('acertou');
        renderNextQuestion();
    } else {
        finalizarJogo();
    }
}

function iniciarQuiz() {
    if(!localStorage['pontuacaoMax']) {
        localStorage['pontuacaoMax'] = 0;
    }
    var max = localStorage['pontuacaoMax']
    document.getElementById('pontuacao_maxima').innerHTML = 'Pontuação Máxima: ' + max;

    //embaralha os dados
    shuffle(dados)
    //inicia as variaveis
    iterador = 0;
    //renderiza a primeira questao
    loadQuestion();
}

//funções onload
window.onload = (event) => {
    iniciarQuiz();
    document.getElementById('higher_select').addEventListener('click', function () {
        selecionarOpcao('higher')
    }, true);
    document.getElementById('lower_select').addEventListener('click', function () {
        selecionarOpcao('lower')
    }, true);
};

iniciarQuiz();