function verificarColisoes() {
  // Paredes laterais
  if (bolaX + tamanhoBola / 2 >= width || bolaX - tamanhoBola / 2 <= 0) {
    velBolaX *= -1;
  }
  // Teto
  if (bolaY - tamanhoBola / 2 <= 0) {
    velBolaY *= -1;
  }
  // Chão
  if (bolaY + tamanhoBola / 2 >= height) {
    estadoJogo = 2;
  }

  // Colisão com o Jogador
  if (
    bolaY + tamanhoBola / 2 >= jogadorY &&
    bolaX >= jogadorX &&
    bolaX <= jogadorX + jogadorLargura
  ) {
    velBolaY *= -1;
    bolaY = jogadorY - tamanhoBola / 2;
  }

  // Colisão com os Blocos
  for (let c = 0; c < colunasBlocos; c++) {
    for (let l = 0; l < linhasBlocos; l++) {
      let b = blocos[c][l];
      if (b.status === 1) {
        if (
          bolaX > b.x &&
          bolaX < b.x + larguraBloco &&
          bolaY > b.y &&
          bolaY < b.y + alturaBloco
        ) {
          velBolaY *= -1;
          b.status = 0;
          pontuacao += 10;
        }
      }
    }
  }
}

function verificarVitoria() {
  let blocosAtivos = 0;

  for (let c = 0; c < colunasBlocos; c++) {
    for (let l = 0; l < linhasBlocos; l++) {
      if (blocos[c][l].status === 1) {
        blocosAtivos++;
      }
    }
  }

  if (blocosAtivos === 0) {
    if (fase < 3) {
      if (fase + 1 > maiorFaseDesbloqueada) {
        maiorFaseDesbloqueada = fase + 1;
      }

      fase++;
      inicializarJogo();
    } else {
      estadoJogo = 3;
    }
  }
}

let video;

function telaInicio() {
  image(video, 0, 0, width, height);

  fill(0, 220);
  rect(0, 0, width, height);

  textAlign(CENTER);

  fill(255);
  textSize(40);
  text("BRICK BREAKER", width / 2, 100);

  textSize(22);
  text("Selecione uma opção", width / 2, 160);

  // Fase 1
  fill(35, 75, 160);
  text("Fase 1", width / 2, 220);

  // Fase 2
  if (maiorFaseDesbloqueada >= 2) {
    fill(90, 30, 170);
  } else {
    fill(45, 15, 85);
  }
  text("Fase 2", width / 2, 260);

  // Fase 3
  if (maiorFaseDesbloqueada >= 3) {
    fill(255, 100, 100);
  } else {
    fill(100, 40, 40);
  }
  text("Fase 3", width / 2, 300);

  // Créditos
  fill(220);
  text("Créditos", width / 2, 340);

  // Cursor
  fill(255, 255, 0);
  text("➡️", width / 2 - 80, 220 + (opcaoMenu - 1) * 40);

  fill(200);
  textSize(16);
  text("↑ ↓ para escolher | ENTER para confirmar", width / 2, 380);
}

function telaGameOver() {
  textAlign(CENTER, CENTER);
  fill(255, 50, 50);
  textSize(40);
  text("GAME OVER", width / 2, height / 2 - 20);
  fill(255);
  textSize(20);
  text("Pontuação Final: " + pontuacao, width / 2, height / 2 + 20);
  fill(200);
  textSize(16);
  text("Pressione ENTER para voltar para o menu", width / 2, height / 2 + 60);
}

function telaVitoria() {
  textAlign(CENTER, CENTER);
  fill(50, 255, 50);
  textSize(40);
  text("VOCÊ VENCEU!", width / 2, height / 2 - 20);
  fill(255);
  textSize(20);
  text("Pontuação Final: " + pontuacao, width / 2, height / 2 + 20);
  fill(200);
  textSize(16);
  text("Pressione [ENTER] para jogar novamente", width / 2, height / 2 + 60);
}

function telaCreditos() {
  background(20);

  textAlign(CENTER, CENTER);

  fill(255);
  textSize(40);
  text("CRÉDITOS", width / 2, 80);

  textSize(24);
  text("Desenvolvimento", width / 2, 170);

  textSize(18);
  text("Andrey Paviani, João Gabriel Esperança e Lucas Girata", width / 2, 210);

  textSize(14);
  fill(180);
  text("Pressione ESC para voltar", width / 2, height - 50);
}
