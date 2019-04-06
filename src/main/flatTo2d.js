import * as R from 'ramda';

const flatTo2d = (width, index) => ({
    x: R.modulo(index, width),
    y: Math.floor(index / width)
});

export default flatTo2d;