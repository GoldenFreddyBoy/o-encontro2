import Phaser from 'phaser';

export class EndingScene extends Phaser.Scene {
  constructor() { super('Ending'); }

  create() {
    const { width, height } = this.scale;
    this.add.image(width / 2, height / 2, 'sakura').setDisplaySize(width, height);
    this.add.rectangle(width / 2, height / 2, width, height, 0xf6c9e2, 0.12);

    this.add.text(width / 2, 48, 'ONDE TUDO FLORESCEU', {
      fontSize: '26px', color: '#fff7fc', stroke: '#9b6486', strokeThickness: 5
    }).setOrigin(0.5);

    // Personagem azul e branco fornecido pelo usuário.
    const blue = this.add.image(width * 0.70, height * 0.68, 'blueCharacter')
      .setDisplaySize(160, 104).setDepth(4);
    const pink = this.add.sprite(width * 0.24, height * 0.70, 'girlIdle')
      .setScale(1.15).setDepth(5);
    pink.play('idle');

    const caption = this.add.text(width / 2, height - 100, 'Você finalmente me encontrou. ♥', {
      fontSize: '23px', color: '#fff', stroke: '#9b6486', strokeThickness: 4,
      align: 'center'
    }).setOrigin(0.5).setAlpha(0);

    // Aproximação e abraço simbólico: os sprites ficam lado a lado no centro.
    this.tweens.add({
      targets: pink, x: blue.x - 48, duration: 4200, ease: 'Sine.easeInOut',
      onComplete: () => {
        pink.setFlipX(false);
        this.tweens.add({ targets: [pink, blue], y: '-=5', duration: 380,
          yoyo: true, repeat: 2, ease: 'Sine.easeInOut' });
        this.tweens.add({ targets: caption, alpha: 1, duration: 1600, delay: 500 });
        this.add.text(width / 2, height - 48,
          'Eu estou aqui, Manuela. E sempre irei te segurar em meus braços, para sempre.',
          { fontSize: '13px', color: '#fff7fc', backgroundColor: '#79536b',
            padding: { x: 12, y: 7 }, align: 'center' }).setOrigin(0.5);
      }
    });
  }
}
