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
let bolaFixada = true;

let blocos = [];

class Bloco {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.status = 1;
  }
}

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
  bolaY = jogadorY - tamanhoBola / 2;
  bolaFixada = true;

  blocos = [];
  larguraBloco = (width - (colunasBlocos + 1) * margemBloco) / colunasBlocos;

  for (let c = 0; c < colunasBlocos; c++) {
    blocos[c] = [];
    for (let l = 0; l < linhasBlocos; l++) {
      let blocoX = c * (larguraBloco + margemBloco) + margemBloco;
      let blocoY = l * (alturaBloco + margemBloco) + offsetTopo;
      blocos[c][l] = new Bloco(blocoX, blocoY);
    }
  }
}

// --- Sons sintetizados ---

function tocarBeep(freq, tipo, duracao, volume) {
  let osc = new p5.Oscillator(tipo);
  osc.amp(volume);
  osc.freq(freq);
  osc.start();
  setTimeout(() => osc.stop(), duracao * 1000);
}

function somBarra() {
  tocarBeep(300, 'square', 0.06, 0.12);
}

function somBloco() {
  tocarBeep(700, 'sine', 0.07, 0.18);
}

function somGameOver() {
  [280, 230, 180, 130].forEach((f, i) =>
    setTimeout(() => tocarBeep(f, 'sawtooth', 0.18, 0.2), i * 140)
  );
}

function somFaseConcluida() {
  [523, 659, 784].forEach((f, i) =>
    setTimeout(() => tocarBeep(f, 'sine', 0.18, 0.25), i * 130)
  );
}

function somVitoria() {
  [523, 659, 784, 1047, 784, 1047, 1319].forEach((f, i) =>
    setTimeout(() => tocarBeep(f, 'sine', 0.2, 0.3), i * 120)
  );
}

// --- Fim dos sons ---

function keyPressed() {
  userStartAudio();

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
