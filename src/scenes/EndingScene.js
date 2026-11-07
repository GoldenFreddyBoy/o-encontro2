import Phaser from 'phaser';

export class EndingScene extends Phaser.Scene {
  constructor() { super('Ending'); }

  create() {
    const { width, height } = this.scale;
    this.add.image(width / 2, height / 2, 'sakura').setDisplaySize(width, height);
    this.add.rectangle(width / 2, height / 2, width, height, 0xf6c9e2, 0.12);

    this.add.text(width / 2, 48, 'O ENCONTRO', {
      fontSize: '28px', color: '#fff7fc', stroke: '#9b6486', strokeThickness: 5
    }).setOrigin(0.5);

    // Sprite transparente dos dois personagens abraçados.
    const hug = this.add.image(width / 2, height * 0.53, 'hug')
      .setDisplaySize(330, 276).setAlpha(0).setDepth(5);

    const caption = this.add.text(width / 2, height - 100, 'Você me encontrou. ♥', {
      fontSize: '23px', color: '#fff', stroke: '#9b6486', strokeThickness: 4,
      align: 'center'
    }).setOrigin(0.5).setAlpha(0);

    this.tweens.add({
      targets: hug, alpha: 1, scaleX: 1.08, scaleY: 1.08,
      duration: 1800, ease: 'Sine.easeOut',
      onComplete: () => {
        this.tweens.add({ targets: hug, scaleX: 1, scaleY: 1,
          duration: 700, yoyo: true, repeat: 1, ease: 'Sine.easeInOut' });
        this.tweens.add({ targets: caption, alpha: 1, duration: 1600, delay: 400 });
        this.add.text(width / 2, height - 48,
          'Eu estou aqui, Manuela. E sempre irei te segurar em meus braços, para sempre.',
          { fontSize: '13px', color: '#fff7fc', backgroundColor: '#79536b',
            padding: { x: 12, y: 7 }, align: 'center' }).setOrigin(0.5);
      }
    });
  }
}
