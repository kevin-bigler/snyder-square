'use strict';

import * as PIXI from 'pixi.js';
import initRenderer from './main/initRenderer';
import getLittleSquare from "./main/getLittleSquares";
import {getSnyderSquareTexture, getSnyderSquareSprite} from "./main/snyderSquare";
import * as R from "ramda";
import flatTo2d from "./main/flatTo2d";

const { renderer, stage } = initRenderer();
const snyderSquareContainer = new PIXI.Container();

const getSnyderSquareSize = (renderer) => renderer.screen.height / 4;
const getSnyderSquareCoords = (renderer) => ({
    x: renderer.screen.width / 2 - getSnyderSquareSize(renderer) / 2,
    y: renderer.screen.height / 2 - getSnyderSquareSize(renderer) / 2
});

const bgSquareSize = getSnyderSquareSize(renderer);
const {x, y} = getSnyderSquareCoords(renderer);
console.log('bgSquareSize', bgSquareSize);
console.log('bgSquareCoords', {x, y});
snyderSquareContainer.x = x;
snyderSquareContainer.y = y;

const texture = getSnyderSquareTexture({size: bgSquareSize});
const snyderSquareSprite = getSnyderSquareSprite({texture, size: bgSquareSize});


snyderSquareContainer.addChild(snyderSquareSprite);

// TODO: figure out why this isn't working (replaces the [0, 1, 2].map... stuff below
// const sprites = R.range(0, 9)
//     .map(flatTo2d)
//     .map(getLittleSquare({size: parseInt(bgSquareSize / 3), borderWidth: 2}));


const createSq = getLittleSquare({size: bgSquareSize / 3, borderWidth: 2});
const sprites = [0, 1, 2].map(x =>
    [0, 1, 2].map(y =>
        createSq({x, y})
)).flat();

console.log('sprites', sprites);

sprites
    .forEach(sprite => snyderSquareContainer.addChild(sprite));


stage.addChild(snyderSquareContainer);
renderer.render(stage);