let estadoJogo = 0;
let pontuacao = 0;

let fase = 1;
let faseSelecionada = 1;
let maiorFaseDesbloqueada = 1;

let jogadorX, jogadorY;
let jogadorLargura = 100;
let jogadorAltura = 15;
let velocidadeJogador = 7;

let bolaX, bolaY;
let tamanhoBola = 15;
let velBolaX = 5;
let velBolaY = -5;

let blocos = [];

function configurarFase() {
  if (fase === 1) {
    linhasBlocos = 4;
    colunasBlocos = 7;
    velBolaX = 5;
    velBolaY = -5;
  }

  if (fase === 2) {
    linhasBlocos = 5;
    colunasBlocos = 8;
    velBolaX = 6;
    velBolaY = -6;
  }

  if (fase === 3) {
    linhasBlocos = 6;
    colunasBlocos = 10;
    velBolaX = 7;
    velBolaY = -7;
  }
}

let larguraBloco,
  alturaBloco = 25;
let margemBloco = 10;
let offsetTopo = 50;

function setup() {
  createCanvas(600, 400);

  video = createVideo("Gameplay.mp4");
  video.volume(0);
  video.loop();
  video.hide();

  inicializarJogo();
}

function draw() {
  background(30);

  if (estadoJogo === 0) {
    telaInicio();
  } else if (estadoJogo === 1) {
    jogar();
  } else if (estadoJogo === 2) {
    telaGameOver();
  } else if (estadoJogo === 3) {
    telaVitoria();
  }
}

function jogar() {
  desenharJogador();
  desenharBola();
  desenharBlocos();
  mostrarPlacar();
  moverJogador();
  moverBola();
  verificarColisoes();
  verificarVitoria();
}

function inicializarJogo() {
  configurarFase();

  pontuacao = 0;
  jogadorX = width / 2 - jogadorLargura / 2;
  jogadorY = height - 30;
  bolaX = width / 2;
  bolaY = height - 50;
  velBolaX = 5;
  velBolaY = -5;

  blocos = [];
  larguraBloco = (width - (colunasBlocos + 1) * margemBloco) / colunasBlocos;

  for (let c = 0; c < colunasBlocos; c++) {
    blocos[c] = [];
    for (let l = 0; l < linhasBlocos; l++) {
      let blocoX = c * (larguraBloco + margemBloco) + margemBloco;
      let blocoY = l * (alturaBloco + margemBloco) + offsetTopo;
      blocos[c][l] = { x: blocoX, y: blocoY, status: 1 };
    }
  }
}

function keyPressed() {
  if (estadoJogo === 0) {
    if (keyCode === UP_ARROW) {
      faseSelecionada--;
    }

    if (keyCode === DOWN_ARROW) {
      faseSelecionada++;
    }

    faseSelecionada = constrain(faseSelecionada, 1, maiorFaseDesbloqueada);

    if (keyCode === ENTER) {
      fase = faseSelecionada;
      inicializarJogo();
      estadoJogo = 1;
    }

    return;
  }

  if ((estadoJogo === 2 || estadoJogo === 3) && keyCode === ENTER) {
    estadoJogo = 0;
  }
}
