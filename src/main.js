import Phaser from 'phaser';
import './styles/style.css';
import { MenuScene } from './scenes/MenuScene.js';
import { GardenScene } from './scenes/GardenScene.js';
import { EndingScene } from './scenes/EndingScene.js';

const config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 960,
  height: 540,
  backgroundColor: '#241d2c',
  pixelArt: true,
  roundPixels: true,
  scale: { mode: Phaser.Scale.RESIZE, autoCenter: Phaser.Scale.CENTER_BOTH,
           width: 960, height: 540 },
  physics: { default: 'arcade', arcade: { gravity: { y: 850 }, debug: false } },
  scene: [MenuScene, GardenScene, EndingScene]
};
new Phaser.Game(config);
