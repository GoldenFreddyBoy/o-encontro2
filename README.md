# A Jornada do Coração — versão ampliada

Projeto em Phaser 3 + Vite.

## Como executar
1. Instale o Node.js (versão LTS).
2. Extraia o ZIP.
3. Abra a pasta no VS Code.
4. No terminal, execute `npm install`.
5. Execute `npm run dev` e abra o endereço informado pelo Vite.

## Controles
- PC: A/D ou setas para andar; Espaço, W ou ↑ para pular.
- Celular: botões na tela.

## O que foi atualizado
- A primeira fase agora percorre uma floresta morta.
- A segunda metade do percurso revela o mesmo cenário renascido em sakuras.
- O mapa foi ampliado e ganhou mais plataformas e trechos de exploração.
- Oito bilhetes de papel podem ser recolhidos; o contador mostra o progresso.
- A música inicial começa com fade-in. Perto do fim da fase 1, ela diminui enquanto a música especial aumenta.
- O personagem azul e branco fornecido foi colocado na cena final, junto da personagem rosa.

## Onde personalizar
- Bilhetes e mensagens: `src/scenes/GardenScene.js`, no array `paperMessages`.
- Carta final e frase do encontro: `src/scenes/EndingScene.js`.
- Personagem azul/branco: `assets/sprites/blue-character.png`.
- Personagem rosa: `assets/sprites/`.
- Floresta morta: `assets/backgrounds/dead-forest.png`.
- Floresta florida: `assets/backgrounds/sakura-garden.png`.
- Música inicial: `assets/music/phase-1.mp3`.
- Música especial: `assets/music/final.m4a`.

## Observações
A cena de encontro usa os sprites disponíveis e uma animação simples de aproximação/abraço simbólico. Ainda é possível substituir essa animação por frames próprios de abraço quando houver um sprite específico. O jogo não foi executado em navegador nesta etapa; recomenda-se testar com `npm install` e `npm run dev` antes de publicar.
