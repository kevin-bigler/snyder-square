'use strict';

import * as PIXI from 'pixi.js';
import {getRectGraphics, getRectSprite} from './main/getRect';
import initRenderer from './main/initRenderer';
import Colors from './main/Colors';

const colors = new Colors();

type Position = {
    x: number,
    y: number
};

type Size = {
    width: number,
    height: number
};

type Rect = {
    position: Position,
    size: Size
};

/**
 * Get coords to center a subject within a container
 *
 * @param {Size} subject object to position
 * @param {Size} container where subject is placed
 * @returns {Position} center position x,y values
 */
const getCenter = (subject, container) => ({
    x: container.width / 2 - subject.width / 2,
    y: container.height / 2 - subject.height / 2,
});

const {renderer, stage} = initRenderer();

const squarePos = {x: renderer.screen.width / 2, y: 25};
const bgOpts = {width: 100, height: 60, color: colors.white, borderWidth: 2, borderColor: colors.black};
const numeralOpts = {x: 25, y: 25, width: 50, height: 30, borderWidth: 1, borderColor: colors.black};

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