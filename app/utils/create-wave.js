import Board from '../objects/board';
import createUnitCodeLine from 'tower-defense/utils/create-unit-code-line';
import Ember from 'ember';
import Mob from '../objects/mob';
import PathCoords from '../objects/path-coords';
import TowerGroup from '../objects/tower-group';
import Tower from '../objects/tower';
import Wave from '../objects/wave';

function addBoardToWave(wave) {
  const board = Board.create();

  const pathObjects = [
    PathCoords.create({x: 10, y: 5}),
    PathCoords.create({x: 9, y: 5}),
    PathCoords.create({x: 8, y: 5}),
    PathCoords.create({x: 8, y: 4}),
    PathCoords.create({x: 8, y: 3}),
    PathCoords.create({x: 8, y: 2}),
    PathCoords.create({x: 7, y: 2}),
    PathCoords.create({x: 6, y: 2}),
    PathCoords.create({x: 5, y: 2}),
    PathCoords.create({x: 4, y: 2}),
    PathCoords.create({x: 4, y: 3}),
    PathCoords.create({x: 4, y: 4}),
    PathCoords.create({x: 4, y: 5}),
    PathCoords.create({x: 4, y: 6}),
    PathCoords.create({x: 4, y: 7}),
    PathCoords.create({x: 4, y: 8}),
    PathCoords.create({x: 4, y: 9}),
    PathCoords.create({x: 5, y: 9}),
    PathCoords.create({x: 6, y: 9}),
    PathCoords.create({x: 7, y: 9}),
    PathCoords.create({x: 8, y: 9}),
    PathCoords.create({x: 8, y: 10})
  ];

  pathObjects.forEach((pathObject) => {
    board.pathData.pushObject(pathObject);
  });

  // TODO THIS COMMIT: give board `imageUrl`
  wave.set('board', board);
}

function addMobsToWave(wave) {
  const mob = Mob.create();
  mob.set('frequency', 3000); // TODO THIS COMMIT: adjust this
  mob.set('maxHealth', 100); // TODO THIS COMMIT: adjust this
  mob.set('points', 1); // TODO THIS COMMIT: adjust this
  mob.set('quantity', 10); // TODO THIS COMMIT: adjust this
  mob.set('speed', 1000); // TODO THIS COMMIT: adjust this
  mob.set('type', 'standard'); // TODO THIS COMMIT: adjust this

  wave.set('mobs', Ember.A([mob]));
}

function addTowerGroupsToWave(wave) {
  const towerGroupOne = TowerGroup.create();
  const towerOne = Tower.create();
  const towerTwo = Tower.create();
  const towerThree = Tower.create();

  towerOne.set('selector', '.t-1'); // TODO THIS COMMIT: adjust this;
  towerOne.set('type', 1); // TODO THIS COMMIT: adjust this;
  towerOne.set('styles', Ember.A([createUnitCodeLine()]));

  towerTwo.set('selector', '.t-2'); // TODO THIS COMMIT: adjust this;
  towerTwo.set('type', 1); // TODO THIS COMMIT: adjust this;
  towerTwo.set('styles', Ember.A([createUnitCodeLine()]));

  towerThree.set('selector', '.t-3'); // TODO THIS COMMIT: adjust this;
  towerThree.set('type', 1); // TODO THIS COMMIT: adjust this;
  towerThree.set('styles', Ember.A([createUnitCodeLine()]));

  towerGroupOne.set('selector', '.t-g-1');
  towerGroupOne.set('towers', [towerOne, towerTwo, towerThree]);
  towerGroupOne.set('styles', Ember.A([createUnitCodeLine()]));

  const towerGroupTwo = TowerGroup.create();
  const towerFour = Tower.create();
  const towerFive = Tower.create();
  const towerSix = Tower.create();

  towerFour.set('selector', '.t-4'); // TODO THIS COMMIT: adjust this;
  towerFour.set('type', 1); // TODO THIS COMMIT: adjust this;
  towerFour.set('styles', Ember.A([createUnitCodeLine()]));

  towerFive.set('selector', '.t-5'); // TODO THIS COMMIT: adjust this;
  towerFive.set('type', 1); // TODO THIS COMMIT: adjust this;
  towerFive.set('styles', Ember.A([createUnitCodeLine()]));

  towerSix.set('selector', '.t-6'); // TODO THIS COMMIT: adjust this;
  towerSix.set('type', 1); // TODO THIS COMMIT: adjust this;
  towerSix.set('styles', Ember.A([createUnitCodeLine()]));

  towerGroupTwo.set('selector', '.t-g-2');
  towerGroupTwo.set('towers', [towerFour, towerFive, towerSix]);
  towerGroupTwo.set('styles', Ember.A([createUnitCodeLine()]));

  wave.set('towerGroups', [towerGroupOne, towerGroupTwo]);
}

export default function createWave() {
  const wave = Wave.create({ minimumScore: 3 }); // TODO THIS COMMIT: adjust this

  addBoardToWave(wave);
  addMobsToWave(wave);
  addTowerGroupsToWave(wave);

  return wave;
}
