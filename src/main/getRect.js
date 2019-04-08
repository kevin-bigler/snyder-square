import Colors from './Colors';

const colors = new Colors();


// TODO: replace param object here with a flow type (`opts`) -- same with getRectGraphics (use same for both)
export const getRectSprite = ({texture, color, width, height, x = 0, y = 0}) => {
    const sprite = new PIXI.Sprite(texture);

    sprite.x = x;
    sprite.y = y;

    if (width !== undefined) {
        sprite.width = width;
    }
    if (height !== undefined) {
        sprite.height = height;
    }

    return sprite;
};

// TODO: change opts (param object values here) to be a flow type, replace definition here with just `opts`
export const getRectGraphics = ({x = 0, y = 0, width, height, color, borderWidth = 0, borderColor = colors.black}) => {
    const graphics = new PIXI.Graphics();

    graphics.lineStyle(borderWidth, borderColor);
    graphics.beginFill(color);
    graphics.drawRect(x, y, width, height);

    return graphics;
};