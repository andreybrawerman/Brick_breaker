function desenharJogador() {
  fill(100, 200, 255);
  noStroke();
  rect(jogadorX, jogadorY, jogadorLargura, jogadorAltura, 5);
}

function desenharBola() {
  fill(255);
  noStroke();
  circle(bolaX, bolaY, tamanhoBola);
}

function desenharBlocos() {
  fill(255, 100, 100);
  for (let c = 0; c < colunasBlocos; c++) {
    for (let l = 0; l < linhasBlocos; l++) {
      if (blocos[c][l].status === 1) {
        rect(blocos[c][l].x, blocos[c][l].y, larguraBloco, alturaBloco, 3);
      }
    }
  }
}

function mostrarPlacar() {
  fill(255);
  textSize(16);

  textAlign(LEFT, TOP);
  text("Pontos: " + pontuacao, 10, 10);

  textAlign(RIGHT, TOP);
  text("Fase: " + fase, width - 10, 10);
}

function moverJogador() {
  if (keyIsDown(LEFT_ARROW) && jogadorX > 0) {
    jogadorX -= velocidadeJogador;
  }
  if (keyIsDown(RIGHT_ARROW) && jogadorX < width - jogadorLargura) {
    jogadorX += velocidadeJogador;
  }
}

function moverBola() {
  bolaX += velBolaX;
  bolaY += velBolaY;
}
