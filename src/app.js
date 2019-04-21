'use strict';

import * as PIXI from 'pixi.js';
import {getRectGraphics, getRectSprite} from './main/getRect';
import initRenderer from './main/initRenderer';
import Colors from './main/Colors';
import type {Rect, RectOpts, Size} from './main/types';

const colors = new Colors();

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

const square: Rect = {
    size: {width: 25, height: 25},
    // TODO: I'm not sure that this.size works for getCenter() here.... does it?
    position: getCenter(this.size, renderer.screen)
};

const squareBg: RectOpts = {
    size: square.size,
    position: getOrigin(),
    color: colors.white,
    border: {
        width: 2,
        color: colors.black
    }
};

const numeralSq: RectOpts = {
    size: {width: square.size.width / 3, height: square.size.height / 3},
    position: {x: 1 * (square.size.width / 3), y: 2 * (square.size.height / 3)},
    border: {
        width: 1,
        color: colors.black
    }
};

const bgTexture = renderer.generateTexture(getRectGraphics(bgOpts));
// const numeralTexture = renderer.generateTexture(getRectGraphics({}));

const bgSprite = getRectSprite({texture: bgTexture, ...bgOpts});
const numeralSprite = getRectSprite({texture: bgTexture, ...numeralOpts});

const squareContainer = new PIXI.Container();
squareContainer.x = squarePos.x;
squareContainer.y = squarePos.y;

squareContainer.addChild(bgSprite);
squareContainer.addChild(numeralSprite);

stage.addChild(squareContainer);

renderer.render(stage);

// import * as PIXI from 'pixi.js';
// import initRenderer from './main/initRenderer';
// import getLittleSquare from "./main/getLittleSquares";
// import {getSnyderSquareTexture, getSnyderSquareSprite} from "./main/snyderSquare";
// import * as R from "ramda";
// import flatTo2d from "./main/flatTo2d";
//
// const { renderer, stage } = initRenderer();
// const snyderSquareContainer = new PIXI.Container();
//
// const getSnyderSquareSize = (renderer) => renderer.screen.height / 4;
// const getSnyderSquareCoords = (renderer) => ({
//     x: renderer.screen.width / 2 - getSnyderSquareSize(renderer) / 2,
//     y: renderer.screen.height / 2 - getSnyderSquareSize(renderer) / 2
// });
//
// const bgSquareSize = getSnyderSquareSize(renderer);
// const {x, y} = getSnyderSquareCoords(renderer);
// console.log('bgSquareSize', bgSquareSize);
// console.log('bgSquareCoords', {x, y});
// snyderSquareContainer.x = x;
// snyderSquareContainer.y = y;
//
// const texture = getSnyderSquareTexture({size: bgSquareSize});
// const snyderSquareSprite = getSnyderSquareSprite({texture, size: bgSquareSize});
//
//
// snyderSquareContainer.addChild(snyderSquareSprite);
//
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