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
  if (fase === 1) {
    fill(35, 75, 160); // azul fase 1
  }

  if (fase === 2) {
    fill(90, 30, 170); // roxo fase 2
  }

  if (fase === 3) {
    fill(255, 100, 100); // vermelho fase 3
  }

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

  if (bolaFixada) {
    fill(255);
    textSize(14);
    textAlign(CENTER, CENTER);
    text("Use as setas para lançar a bola", width / 2, height / 2);
  }
}

function moverJogador() {
  if (keyIsDown(LEFT_ARROW) && jogadorX > 0) {
    jogadorX -= velocidadeJogador;
    if (bolaFixada) {
      bolaFixada = false;
      velBolaX = -abs(velBolaX);
      velBolaY = -abs(velBolaY);
    }
  }
  if (keyIsDown(RIGHT_ARROW) && jogadorX < width - jogadorLargura) {
    jogadorX += velocidadeJogador;
    if (bolaFixada) {
      bolaFixada = false;
      velBolaX = abs(velBolaX);
      velBolaY = -abs(velBolaY);
    }
  }
}

function moverBola() {
  if (bolaFixada) {
    bolaX = jogadorX + jogadorLargura / 2;
    bolaY = jogadorY - tamanhoBola / 2;
    return;
  }
  bolaX += velBolaX;
  bolaY += velBolaY;
}
