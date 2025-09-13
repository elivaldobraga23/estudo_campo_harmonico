// Campo harmônico de C Maior
const respostasCertasC = {
    I: "C",
    II: "Dm",
    III: "Em",
    IV: "F",
    V: "G",
    VI: "Am",
    VII: "Bdim"
};

// Campo harmônico de C# Maior
const respostasCertasC_sharp = {
    I: "C#",
    II: "D#m",
    III: "Fm",
    IV: "F#",
    V: "G#",
    VI: "A#m",
    VII: "B#dim"
};

// Campo harmônico de D Maior
const respostasCertasD = {
    I: "D",
    II: "Em",
    III: "F#m",
    IV: "G",
    V: "A",
    VI: "Bm",
    VII: "C#dim"
};

// Campo harmônico de D# Maior
const respostasCertasD_sharp = {
    I: "D#",
    II: "Fdim",
    III: "Gm",
    IV: "G#",
    V: "A#",
    VI: "Cm",
    VII: "Ddim"
};

// Campo harmônico de E Maior
const respostasCertasE = {
    I: "E",
    II: "F#m",
    III: "G#m",
    IV: "A",
    V: "B",
    VI: "C#m",
    VII: "D#dim"
};

// Campo harmônico de F Maior
const respostasCertasF = {
    I: "F",
    II: "Gm",
    III: "Am",
    IV: "Bb",
    V: "C",
    VI: "Dm",
    VII: "Edim"
};

// Campo harmônico de F# Maior
const respostasCertasF_sharp = {
    I: "F#",
    II: "G#m",
    III: "A#m",
    IV: "B",
    V: "C#",
    VI: "D#m",
    VII: "E#dim"
};

// Campo harmônico de G Maior
const respostasCertasG = {
    I: "G",
    II: "Am",
    III: "Bm",
    IV: "C",
    V: "D",
    VI: "Em",
    VII: "F#dim"
};

// Campo harmônico de G# Maior
const respostasCertasG_sharp = {
    I: "G#",
    II: "A#m",
    III: "Cm",
    IV: "C#",
    V: "D#",
    VI: "Fm",
    VII: "Gdim"
};

// Campo harmônico de A Maior
const respostasCertasA = {
    I: "A",
    II: "Bm",
    III: "C#m",
    IV: "D",
    V: "E",
    VI: "F#m",
    VII: "G#dim"
};

// Campo harmônico de A# Maior
const respostasCertasA_sharp = {
    I: "A#",
    II: "Cm",
    III: "Dm",
    IV: "D#",
    V: "F",
    VI: "Gm",
    VII: "Adim"
};

// Campo harmônico de B Maior
const respostasCertasB = {
    I: "B",
    II: "C#m",
    III: "D#m",
    IV: "E",
    V: "F#",
    VI: "G#m",
    VII: "A#dim"
};

// Todos os campos harmônicos
const camposHarmônicos = {
    "C": respostasCertasC,
    "C#": respostasCertasC_sharp,
    "D": respostasCertasD,
    "D#": respostasCertasD_sharp,
    "E": respostasCertasE,
    "F": respostasCertasF,
    "F#": respostasCertasF_sharp,
    "G": respostasCertasG,
    "G#": respostasCertasG_sharp,
    "A": respostasCertasA,
    "A#": respostasCertasA_sharp,
    "B": respostasCertasB
};

// Botão "Próxima pergunta" global
const btnProxima = document.getElementById('proximaPergunta');
btnProxima.disabled = true; // começa desativado

let totalPerguntas = 0
let acerto = 0;
let erro = 0;

function escolher() {
    let selecionarNota = document.querySelector('Select#notas');
    let notaEscolhida = selecionarNota.selectedOptions[0].text;
    let pergunta = document.getElementById('perguntaGrau');
    let divPlacares = document.getElementById('placares');
    let telaFinal = document.getElementById('telaFinal')

    pergunta.style.display = 'block'
    telaFinal.style.display = 'none'

    if (selecionarNota.value === "") {
        pergunta.innerHTML = 'Por favor, escolha uma nota para começarmos';
        return;
    }

    // Pega o campo harmônico da nota escolhida
    let campo = camposHarmônicos[notaEscolhida];
    if (!campo) return;

    let chaves = Object.keys(campo);
    let grausAleatorio = Math.floor(Math.random() * chaves.length);
    let grauEscolhido = chaves[grausAleatorio];
    let respostaCerta = campo[grauEscolhido];

    // pega todas as outras como erradas
    let respostaErradas = Object.values(campo).filter(nota => nota !== respostaCerta);

    // embaralha as erradas
    for (let i = respostaErradas.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [respostaErradas[i], respostaErradas[j]] = [respostaErradas[j], respostaErradas[i]];
    }

    respostaErradas = respostaErradas.slice(0, 3);

    // junta certa + erradas e embaralha
    let opcoes = [respostaCerta, ...respostaErradas];
    for (let i = opcoes.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [opcoes[i], opcoes[j]] = [opcoes[j], opcoes[i]];
    }

    let botoes = opcoes.map(opcao => `<input class="escolha" type="button" value="${opcao}">`).join(" ");
    pergunta.innerHTML = `<p id="pergunta">Qual é o ${grauEscolhido} Grau do campo harmônico de ${notaEscolhida} Maior?</p>${botoes}`;

    // Pega todos os botões recém-criados
    let inputs = document.querySelectorAll('#perguntaGrau .escolha');

    inputs.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.value === respostaCerta) {
                btn.style.backgroundColor = 'blue';
                btn.style.color = 'white';
                acerto += 1;
                totalPerguntas += 1
            } else {
                btn.style.backgroundColor = 'red';
                btn.style.color = 'white';
                erro += 1
                totalPerguntas += 1

                //Mostrar a resposta Certa
                inputs.forEach(b =>{
                    if(b.value === respostaCerta){
                        b.style.backgroundColor = 'blue'
                    }
                })
            }

            // desabilita todos os botões após a resposta
            inputs.forEach(b => b.disabled = true);

            // ativa o botão de próxima pergunta
            btnProxima.disabled = false;

            // atualiza o placar
            divPlacares.innerHTML = `<div id="acerto">Acertos: ${acerto}</div><div id="erro">Erros: ${erro}</div>`;
        });
    });
}

// Botão "Próxima pergunta" global
btnProxima.addEventListener('click', () => {
    escolher();           
    btnProxima.disabled = true; 
});

function finalizar(){
    let confirmacao = confirm('Deseja Finalizar ?')
    if(confirmacao){
        let telaPergunta = document.getElementById('perguntaGrau');
        let telaFinal = document.getElementById('telaFinal')
        telaPergunta.style.display = 'none'
        telaFinal.style.display = 'block'
        telaFinal.innerHTML = `
            <h2>Estudo Finalizado</h2>
            <div id="paragrafosFinal">
                <p>Total de Perguntas: ${totalPerguntas}</p>
                <p>Total de Acertos: ${acerto}</p>
                <p>Total de Erros: ${erro}</p>
            </div>`
    }
    
    
}
