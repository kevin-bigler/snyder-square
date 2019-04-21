type Position = {
    x: number,
    y: number
};
const getOrigin = () => ({x: 0, y: 0});

type Size = {
    width: number,
    height: number
};

type Border = {
    color: number,
    width: number
};

type Rect = {
    position: Position,
    size: Size
};

type Color = number | string;

export {
    Position,
    getOrigin,
    Size,
    Border,
    Rect,
    Color
};