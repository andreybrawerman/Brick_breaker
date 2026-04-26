let estadoJogo = 0; 
let pontuacao = 0;

let jogadorX, jogadorY;
let jogadorLargura = 100;
let jogadorAltura = 15;
let velocidadeJogador = 7;

let bolaX, bolaY;
let tamanhoBola = 15;
let velBolaX = 5;
let velBolaY = -5;

let blocos = [];
let linhasBlocos = 4;
let colunasBlocos = 7;
let larguraBloco, alturaBloco = 25;
let margemBloco = 10;
let offsetTopo = 50;

function setup() {
  createCanvas(600, 400);
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
      let blocoX = (c * (larguraBloco + margemBloco)) + margemBloco;
      let blocoY = (l * (alturaBloco + margemBloco)) + offsetTopo;
      blocos[c][l] = { x: blocoX, y: blocoY, status: 1 };
    }
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    if (estadoJogo === 0 || estadoJogo === 2 || estadoJogo === 3) {
      inicializarJogo();
      estadoJogo = 1; 
    }
  }
}