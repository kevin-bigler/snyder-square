import * as PIXI from 'pixi.js';
import Colors from './main/Colors';

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

        graphics.beginFill(squareColor);
        graphics.lineStyle(borderWidth, squareBorderColor);
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

const { renderer, stage } = initRenderer();
drawSquareTest(stage);

renderer.render(stage);