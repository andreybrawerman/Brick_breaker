let pontuacao = 0;

let ESTADO_MENU = 0;
let ESTADO_JOGO = 1;
let ESTADO_GAMEOVER = 2;
let ESTADO_VITORIA = 3;
let ESTADO_CREDITOS = 4;

let estadoJogo = ESTADO_MENU;

let opcaoMenu = 1;

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
    velBolaX = 4.5;
    velBolaY = -4.5;
  }

  if (fase === 2) {
    linhasBlocos = 5;
    colunasBlocos = 8;
    velBolaX = 4.8;
    velBolaY = -4.8;
  }

  if (fase === 3) {
    linhasBlocos = 6;
    colunasBlocos = 10;
    velBolaX = 5.05;
    velBolaY = -5.05;
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
  if (estadoJogo === ESTADO_MENU) {
    telaInicio();
  } else if (estadoJogo === ESTADO_JOGO) {
    jogar();
  } else if (estadoJogo === ESTADO_GAMEOVER) {
    telaGameOver();
  } else if (estadoJogo === ESTADO_VITORIA) {
    telaVitoria();
  } else if (estadoJogo === ESTADO_CREDITOS) {
    telaCreditos();
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
  if (estadoJogo === ESTADO_MENU) {
    if (keyCode === UP_ARROW) {
      opcaoMenu--;
    }

    if (keyCode === DOWN_ARROW) {
      opcaoMenu++;
    }

    opcaoMenu = constrain(opcaoMenu, 1, 4);

    if (keyCode === ENTER) {
      if (opcaoMenu <= 3 && opcaoMenu <= maiorFaseDesbloqueada) {
        fase = opcaoMenu;
        inicializarJogo();
        estadoJogo = ESTADO_JOGO;
      }

      if (opcaoMenu === 4) {
        estadoJogo = ESTADO_CREDITOS;
      }
    }
  }
  if (estadoJogo === ESTADO_CREDITOS && keyCode === ESCAPE) {
    estadoJogo = ESTADO_MENU;
  }

  if (estadoJogo === ESTADO_GAMEOVER && keyCode === ENTER) {
    estadoJogo = ESTADO_MENU;
  }

  if (estadoJogo === ESTADO_VITORIA && keyCode === ENTER) {
    estadoJogo = ESTADO_MENU;
  }
}
