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
  if (bolaY + tamanhoBola / 2 >= jogadorY && 
      bolaX >= jogadorX && 
      bolaX <= jogadorX + jogadorLargura) {
    velBolaY *= -1;
    bolaY = jogadorY - tamanhoBola / 2; 
  }
  
  // Colisão com os Blocos
  for (let c = 0; c < colunasBlocos; c++) {
    for (let l = 0; l < linhasBlocos; l++) {
      let b = blocos[c][l];
      if (b.status === 1) {
        if (bolaX > b.x && bolaX < b.x + larguraBloco &&
            bolaY > b.y && bolaY < b.y + alturaBloco) {
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
      if (blocos[c][l].status === 1) blocosAtivos++;
    }
  }
  if (blocosAtivos === 0) {
    estadoJogo = 3; 
  }
}

function telaInicio() {
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(40);
  text("BRICK BREAKER", width / 2, height / 2 - 20);
  textSize(20);
  fill(200);
  text("Pressione [ENTER] para iniciar", width / 2, height / 2 + 30);
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
  text("Pressione [ENTER] para tentar novamente", width / 2, height / 2 + 60);
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