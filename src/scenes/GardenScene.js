import Phaser from 'phaser';

export class GardenScene extends Phaser.Scene {
  constructor() {
    super('Garden');
    this.phaseWidth = 4500;
    this.worldWidth = this.phaseWidth * 2;
    this.collected = 0;
    this.paperMessages = [
      'Tudo parecia escuro; Vazio.',
      'O mundo não tinha cor, não era?.',
      'Você se sentia sozinha.',
      'Perdida.',
      'A vida era dificil sem um apoio, não é?.',
      'Tudo era dificil, até as coisas mais simples..',
      'Mas, talvez...',
      'Pelo destino do universo...'
    ];
  }

  create() {
    const H = 540;
    this.physics.world.setBounds(0, 0, this.worldWidth, H);
    this.cameras.main.setBounds(0, 0, this.worldWidth, H);

    // Cada metade usa o mesmo enquadramento: primeiro a floresta morta, depois ela renasce.
    this.deadBg = this.add.tileSprite(0, 0, this.phaseWidth, H, 'deadForest')
      .setOrigin(0).setTileScale(0.575).setDepth(-10);
    this.bloomBg = this.add.tileSprite(this.phaseWidth, 0, this.phaseWidth, H, 'sakura')
      .setOrigin(0).setTileScale(0.575).setDepth(-10).setAlpha(0);

    this.add.rectangle(this.worldWidth / 2, 516, this.worldWidth, 48, 0x302633, 0.82).setDepth(-2);
    const ground = this.add.rectangle(this.worldWidth / 2, 530, this.worldWidth, 30, 0x342b36);
    this.physics.add.existing(ground, true);

    this.platforms = this.physics.add.staticGroup();
    const addPlatform = (x, y, w = 150) => {
      const p = this.add.rectangle(x, y, w, 18, 0x655465).setAlpha(0.92);
      this.physics.add.existing(p, true);
      this.platforms.add(p);
      this.add.rectangle(x, y - 10, w, 4, 0xb39aaa).setAlpha(0.65);
    };

    // Fase 1 — percurso longo, com pequenas subidas e caminhos alternativos.
    [
      [360, 430, 150], [650, 365, 150], [930, 420, 180], [1210, 350, 160],
      [1510, 405, 170], [1810, 335, 170], [2110, 420, 190], [2420, 360, 170],
      [2730, 420, 180], [3020, 345, 170], [3320, 405, 190], [3620, 345, 180],
      [3930, 415, 190], [4230, 350, 170]
    ].forEach(p => addPlatform(...p));

    // Fase 2 — o mesmo lugar, agora cheio de vida.
    [
      [4800, 420, 170], [5100, 350, 170], [5400, 410, 190], [5700, 335, 180],
      [6000, 400, 180], [6300, 340, 180], [6600, 415, 190], [6900, 350, 180],
      [7200, 410, 190], [7500, 335, 180], [7800, 400, 180], [8100, 340, 190],
      [8400, 410, 180], [8700, 360, 180]
    ].forEach(p => addPlatform(...p));

    this.player = this.physics.add.sprite(90, 390, 'girl');
    this.player.setScale(1.05).setDepth(5).setCollideWorldBounds(true);
    this.player.body.setSize(34, 75).setOffset(20, 20);
    this.physics.add.collider(this.player, ground);
    this.physics.add.collider(this.player, this.platforms);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys('A,D,W,SPACE');
    this.createTouchControls();

    this.title = this.add.text(26, 22, 'A FLORESTA ESQUECIDA', {
      fontSize: '20px', color: '#fff0f7', stroke: '#302332', strokeThickness: 4
    }).setScrollFactor(0).setDepth(30);
    this.subtitle = this.add.text(26, 50, 'Explore com calma. Há pequenos bilhetes pelo caminho.', {
      fontSize: '14px', color: '#ead9e5'
    }).setScrollFactor(0).setDepth(30);
    this.counter = this.add.text(26, 82, 'Bilhetes: 0/8', {
      fontSize: '16px', color: '#fff4fa', backgroundColor: '#493747',
      padding: { x: 10, y: 7 }
    }).setScrollFactor(0).setDepth(30);

    this.notice = this.add.text(480, 445, '', {
      fontSize: '17px', color: '#fff8fc', backgroundColor: '#493747',
      padding: { x: 14, y: 10 }, align: 'center', wordWrap: { width: 410 }
    }).setOrigin(0.5).setScrollFactor(0).setDepth(40).setVisible(false);

    this.createPapers();
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

    this.phaseMusic = this.sound.add('phase1', { loop: true, volume: 0 });
    this.phaseMusic.play();
    this.tweens.add({ targets: this.phaseMusic, volume: 0.38, duration: 4500, ease: 'Sine.easeInOut' });
    this.finalMusic = this.sound.add('finalMusic', { loop: true, volume: 0 });
    this.musicTransitionStarted = false;
    this.phaseChanged = false;

    this.exit = this.add.rectangle(this.worldWidth - 115, 450, 38, 120, 0xffd5e9, 0.22).setDepth(2);
    this.physics.add.existing(this.exit, true);
    this.physics.add.overlap(this.player, this.exit, () => {
      if (!this.endingStarted) {
        this.endingStarted = true;
        this.scene.start('Ending');
      }
    });
    this.input.keyboard.on('keydown-ESC', () => this.notice.setVisible(false));
  }

  createPapers() {
    // Bilhetes de papel (não folhas de árvore). Edite as mensagens em paperMessages acima.
    const positions = [
      [520, 320], [1090, 290], [1660, 350], [2240, 300],
      [2860, 320], [3480, 290], [4140, 300], [5550, 300]
    ];
    this.papers = this.physics.add.staticGroup();
    positions.forEach(([x, y], i) => {
      const paper = this.add.container(x, y, [
        this.add.rectangle(0, 0, 22, 28, 0xf4e8cf).setStrokeStyle(2, 0x8c7180),
        this.add.rectangle(0, -5, 12, 2, 0xb99eaa),
        this.add.rectangle(0, 1, 12, 2, 0xb99eaa),
        this.add.rectangle(0, 7, 8, 2, 0xb99eaa)
      ]).setDepth(4);
      this.physics.add.existing(paper, true);
      paper.body.setSize(30, 36);
      paper.messageIndex = i;
      this.papers.add(paper);
    });
    this.physics.add.overlap(this.player, this.papers, (player, paper) => {
      if (!paper.active) return;
      const message = this.paperMessages[paper.messageIndex] || 'Um pequeno pedaço dessa história.';
      paper.destroy();
      this.collected++;
      this.counter.setText(`Bilhetes: ${this.collected}/8`);
      this.showNotice(message);
    });
  }

  createTouchControls() {
    const make = (x, label) => this.add.text(x, this.scale.height - 72, label, {
      fontSize: '30px', color: '#fff', backgroundColor: '#76556b',
      padding: { x: 18, y: 12 }
    }).setScrollFactor(0).setDepth(50).setInteractive();
    const left = make(22, '◀'), right = make(100, '▶'), jump = make(this.scale.width - 100, '↑');
    this.touch = { left: false, right: false, jump: false };
    const bind = (obj, key) => {
      obj.on('pointerdown', () => this.touch[key] = true);
      obj.on('pointerup', () => this.touch[key] = false);
      obj.on('pointerout', () => this.touch[key] = false);
    };
    bind(left, 'left'); bind(right, 'right'); bind(jump, 'jump');
  }

  showNotice(message) {
    this.notice.setText(message).setVisible(true).setAlpha(1);
    if (this.noticeTimer) this.noticeTimer.remove(false);
    this.noticeTimer = this.time.delayedCall(3600, () => {
      this.tweens.add({ targets: this.notice, alpha: 0, duration: 500,
        onComplete: () => this.notice.setVisible(false) });
    });
  }

  beginMusicTransition() {
    if (this.musicTransitionStarted) return;
    this.musicTransitionStarted = true;
    // A música especial cresce enquanto a música da floresta diminui.
    this.finalMusic.play();
    this.tweens.add({ targets: this.phaseMusic, volume: 0, duration: 5200, ease: 'Sine.easeInOut' });
    this.tweens.add({ targets: this.finalMusic, volume: 0.45, duration: 5200, ease: 'Sine.easeInOut' });
  }

  bloomIntoSecondPhase() {
    if (this.phaseChanged) return;
    this.phaseChanged = true;
    this.cameras.main.fadeOut(1200, 20, 12, 25);
    this.time.delayedCall(1250, () => {
      this.deadBg.setAlpha(0);
      this.bloomBg.setAlpha(1);
      this.title.setText('A FLORESTA RENASCEU');
      this.subtitle.setText('O mesmo caminho, agora cheio de vida. Continue em frente.');
      this.cameras.main.fadeIn(1600, 255, 230, 245);
    });
  }

  update() {
    if (!this.player?.body) return;
    const left = this.cursors.left.isDown || this.keys.A.isDown || this.touch.left;
    const right = this.cursors.right.isDown || this.keys.D.isDown || this.touch.right;
    const jump = Phaser.Input.Keyboard.JustDown(this.cursors.space) ||
      Phaser.Input.Keyboard.JustDown(this.keys.SPACE) || Phaser.Input.Keyboard.JustDown(this.cursors.up) ||
      Phaser.Input.Keyboard.JustDown(this.keys.W) || this.touch.jump;
    const speed = 205;
    if (left) { this.player.setVelocityX(-speed); this.player.setFlipX(true); }
    else if (right) { this.player.setVelocityX(speed); this.player.setFlipX(false); }
    else this.player.setVelocityX(0);
    if (jump && this.player.body.blocked.down) this.player.setVelocityY(-500);
    if (this.player.body.velocity.x !== 0 && this.player.body.blocked.down) this.player.anims.play('walk', true);
    else this.player.anims.play('idle', true);

    if (this.player.x >= this.phaseWidth - 850) this.beginMusicTransition();
    if (this.player.x >= this.phaseWidth && !this.phaseChanged) this.bloomIntoSecondPhase();
  }
}
