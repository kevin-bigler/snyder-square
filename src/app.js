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

    return {renderer, stage};
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
 * TODO: change to use renderer to generate texture (graphics.genereateTexture() is deprecated D: )
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

const snyderSquareContainer = new PIXI.Container();
stage.addChild(snyderSquareContainer);

const size = renderer.screen.height / 4;
const x = renderer.screen.width / 2 - size / 2;
const y = renderer.screen.height / 2 - size / 2;

const texture = getSnyderSquareTexture({size});
const sprite = getSnyderSquareSprite({texture, size, x, y});

snyderSquareContainer.addChild(sprite);

[0..9].map(num => {
    const {x, y} = getCoords(num);
    const numeralSquare = getSnyderSquareSprite({texture, size: size * 0.33, x, y});
    snyderSquareContainer.addChild(numeralSquare);
});

renderer.render(stage);