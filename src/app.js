import * as PIXI from 'pixi.js';
import Colors from './main/Colors';
import * as R from 'ramda';

const snyderSquareBorderWidth = 2;

const initRenderer = () => {
    const width = 800;
    const height = 600;

    const renderer = PIXI.autoDetectRenderer(width, height,{backgroundColor : 0x1099bb}); // transparent: true also works
    // document.getElementById('main').appendChild(app.view);
    document.body.appendChild(renderer.view);

    // create the root of the scene graph
    const stage = new PIXI.Container();

    // TODO: move these 2 lines to like a "create box" function
    // const container = new PIXI.Container();
    // stage.addChild(container);

    return {renderer, stage};
};

const drawSquareTest = (stage) => {
    const squareSize = 75;
    const squareColor = new Colors().squareColor;
    const squareBorderColor = new Colors().borderColor;
    const borderWidth = 10;
    const x = 25;
    const y = 40;

    /**
     * Solution from https://stackoverflow.com/questions/22073350/draw-a-rectangle-with-pixi-js
     */
    const tryStackOverflow = () => {
        const graphics = new PIXI.Graphics();

        graphics.lineStyle(borderWidth, squareBorderColor);
        graphics.beginFill(squareColor);
        graphics.drawRect(x, y, squareSize, squareSize);

        stage.addChild(graphics);
    };
    tryStackOverflow();

    return;

    // TODO: rest of code is obsolete/unreachable at least atm, while trying other solutions

    const squareTexture = getSquareTexture(squareSize, squareColor);
    const squareSprite = createSquareSprite(squareTexture, x, y, squareSize);
    stage.addChild(squareSprite);

    function createSquareSprite(texture, x, y, size) {
        const squareSprite = new PIXI.Sprite(texture);

        squareSprite.x = x;
        squareSprite.y = y;
        squareSprite.width = size;
        squareSprite.height = size;

        return squareSprite;
    }

    function createSquare(x, y, size, color) {
        const square = new PIXI.Graphics();

        square.lineStyle(2, 'black', 1);
        square.beginFill(color, 1);
        square.drawRect(x, y, size, size);

        return square;
    }

    /**
     * Used to make a square sprite
     * @param size
     * @param squareColor
     * @returns {*}
     */
    function getSquareTexture(size, squareColor) {
        return createSquare(0, 0, squareSize, squareColor).generateTexture();
    }

};

const getSnyderSquareGraphic = ({x = 0, y = 0, size}) => {
    const graphics = new PIXI.Graphics();

    const colors = new Colors().snyderSquare();
    graphics.lineStyle(snyderSquareBorderWidth, colors.borderColor);
    graphics.beginFill(colors.color);
    graphics.drawRect(x, y, size, size);

    return graphics;
};

/**
 * Get square as a texture, from a snyder square graphics object
 *
 * @param {Object} parameter
 * @param {number} parameter.size
 * @param {number} [parameter.x] Default: 0
 * @param {number} [parameter.y] Default: 0
 * @return {PIXI.Texture}
 */
const getSnyderSquareTexture = R.pipe(getSnyderSquareGraphic, x => x.generateTexture());

/**
 * Get snyder square as a sprite, given a snyder square texture
 *
 * @param {PIXI.Texture} texture snyder square texture
 * @param {number} [size] Height and width of the snyder square sprite
 * @param {number} [x] Default: 0
 * @param {number} [y] Default: 0
 * @returns {PIXI.Sprite}
 */
const getSnyderSquareSprite = ({texture, size, x = 0, y = 0}) => {
    const sprite = new PIXI.Sprite(texture);

    sprite.x = x;
    sprite.y = y;

    if (size !== undefined) {
        sprite.height = size;
        sprite.width = size;
    }

    return sprite;
};

const { renderer, stage } = initRenderer();
// drawSquareTest(stage);
const size = renderer.screen.height / 4;
const x = renderer.screen.width / 2 - size / 2;
const y = renderer.screen.height / 2 - size / 2;
// const square = getSnyderSquare({x, y, size});

const texture = getSnyderSquareTexture({size});
const sprite = getSnyderSquareSprite({texture, size, x, y});

stage.addChild(sprite);
renderer.render(stage);