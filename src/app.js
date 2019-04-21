'use strict';

import * as PIXI from 'pixi.js';
import {getRectGraphics, getRectSprite} from './main/getRect';
import initRenderer from './main/initRenderer';
import Colors from './main/Colors';
import type {Rect, Size} from './main/types';
import {getOrigin} from './main/types';

const colors = new Colors();

const stageSize: Size = {width: 100, height: 50};

/**
 * Get coords to center a subject within a container
 *
 * @param {Size} subject object to position
 * @param {Size} container where subject is placed
 * @returns {Position} center position x,y values
 */
const getCenter = (subject: Size, container: Size): Position => ({
    x: container.width / 2 - subject.width / 2,
    y: container.height / 2 - subject.height / 2,
});



const {renderer, stage} = initRenderer();

const squareSize: Size = {width: 150, height: 150};
const squarePos: Position = getCenter(squareSize, renderer.screen);
const square: Rect = {
    size: squareSize,
    position: squarePos
};

const squareBg = {
    size: square.size,
    position: getOrigin(),
    color: colors.white,
    border: {
        width: 2,
        color: colors.black
    }
};

const numeralSq = {
    size: {width: square.size.width / 3, height: square.size.height / 3},
    position: {x: 1 * (square.size.width / 3), y: 2 * (square.size.height / 3)},
    color: colors.lightGreen,
    border: {
        width: 1,
        color: colors.black
    }
};

const bgGraphics = getRectGraphics(squareBg);
const bgTexture = renderer.generateTexture(bgGraphics);
const bgSprite = getRectSprite({texture: bgTexture, ...squareBg});

const numeralGraphics = getRectGraphics(numeralSq);
const numeralTexture = renderer.generateTexture(numeralGraphics);
const numeralSprite = getRectSprite({texture: numeralTexture, ...numeralSq});

const squareContainer = new PIXI.Container();
squareContainer.x = square.position.x;
squareContainer.y = square.position.y;

squareContainer.addChild(bgSprite);
squareContainer.addChild(numeralSprite);

stage.addChild(squareContainer);

renderer.render(stage);

// // TODO: figure out why this isn't working (replaces the [0, 1, 2].map... stuff below
// // const sprites = R.range(0, 9)
// //     .map(flatTo2d)
// //     .map(getLittleSquare({size: parseInt(bgSquareSize / 3), borderWidth: 2}));
//
//
// const createSq = getLittleSquare({size: bgSquareSize / 3, borderWidth: 2});
// const sprites = [0, 1, 2].map(x =>
//     [0, 1, 2].map(y =>
//         createSq({x, y})
// )).flat();
//
// console.log('sprites', sprites);
//
// sprites
//     .forEach(sprite => snyderSquareContainer.addChild(sprite));
//
//
// stage.addChild(snyderSquareContainer);
// renderer.render(stage);