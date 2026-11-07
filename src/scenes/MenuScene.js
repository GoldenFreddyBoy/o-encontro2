import Phaser from 'phaser';
export class MenuScene extends Phaser.Scene {
  constructor(){ super('Menu'); }
  preload(){
    this.load.image('sakura','/assets/backgrounds/sakura-garden.png');
    this.load.image('deadForest','/assets/backgrounds/dead-forest.png');
    this.load.image('blueCharacter','/assets/sprites/blue-character.png');
    this.load.image('hug','/assets/sprites/abraço.png.png');
    this.load.spritesheet('girl','/assets/sprites/girl-walk.png',{frameWidth:108,frameHeight:112});
    this.load.spritesheet('girlIdle','/assets/sprites/girl-idle.png',{frameWidth:106,frameHeight:112});
    this.load.audio('phase1','/assets/music/phase-1.mp3');
    this.load.audio('finalMusic','/assets/music/final.m4a');
  }
  create(){ 
    if(!this.anims.exists('walk')) this.anims.create({key:'walk',frames:this.anims.generateFrameNumbers('girl',{start:0,end:3}),frameRate:8,repeat:-1});
    if(!this.anims.exists('idle')) this.anims.create({key:'idle',frames:this.anims.generateFrameNumbers('girlIdle',{start:0,end:3}),frameRate:3,repeat:-1});

    const { width, height } = this.scale;
    this.cameras.main.setBackgroundColor('#29202f');
    // Fundo ilustrado com uma versão dessaturada para antecipar o jardim sem vida.
    this.add.image(width/2, height/2, 'deadForest').setDisplaySize(width, height).setAlpha(0.55);
    this.add.rectangle(width/2,height/2,width,height,0x17131d,0.42);
    this.add.text(width/2,height*0.30,'O ENCONTRO',{
      fontFamily:'Georgia',fontSize:'34px',color:'#ffe8f4',stroke:'#382536',strokeThickness:5
    }).setOrigin(0.5);
    this.add.text(width/2,height*0.42,'Feliz 3 meses, minha princesa.',{
      fontFamily:'Georgia',fontSize:'17px',color:'#f4c9df'
    }).setOrigin(0.5);
    const start=this.add.text(width/2,height*0.64,'▶  COMEÇAR',{
      fontFamily:'Georgia',fontSize:'24px',color:'#ffffff',backgroundColor:'#9b6486',padding:{x:22,y:12}
    }).setOrigin(0.5).setInteractive({useHandCursor:true});
    start.on('pointerdown',()=>this.scene.start('Garden'));
    this.add.text(width/2,height-30,'Use A/D ou ←/→ para andar • Espaço para pular',{
      fontSize:'14px',color:'#e8dce5'
    }).setOrigin(0.5);
  }
}
