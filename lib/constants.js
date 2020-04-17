import ansi from 'ansicolor';

/* Color Palettes */
// https://www.nordtheme.com/docs/colors-and-palettes
export const Polar_Night = {
    nord0: '#2E3440',
    nord1: '#3B4252',
    nord2: '#434C5E',
    nord3: '#4C566A',
};

export const Snow_Storm = {
    nord4: '#D8DEE9',
    nord5: '#E5E9F0',
    nord6: '#ECEFF4',
};

export const Frost = {
    nord7: '#8FBCBB',
    nord8: '#88C0D0',
    nord9: '#81A1C1',
    nord10: '#5E81AC',
};

export const Aurora = {
    nord11: '#BF616A',
    nord12: '#D08770',
    nord13: '#EBCB8B',
    nord14: '#A3BE8C',
    nord15: '#B48EAD',
};

/* Color Constants */
export const bgColor = Polar_Night.nord0;
// https://gist.github.com/lopspower/03fb1cc0ac9f32ef38f4
const alphaHex = 'B3';
export const bgColor_alpha = `${bgColor}${alphaHex}`;
export const fgColor = '#88C0D0';

const ansiColors = ansi;
ansiColors.rgb = {
    black: [59, 66, 81],
    darkGray: [76, 85, 106],
    lightGray: [229, 233, 240],
    white: [236, 238, 244],

    red: [191, 96, 105],
    lightRed: [191, 96, 105],

    green:        [163, 190, 139],
    lightGreen:   [163, 190, 139],
    
    yellow:       [234, 203, 138],
    lightYellow:  [234, 203, 138],
    
    blue:         [129, 161, 193],
    lightBlue:    [129, 161, 193],
    
    magenta:      [180, 141, 172],
    lightMagenta: [180, 141, 172],
    
    cyan:         [136, 192, 208],
    lightCyan:    [136, 192, 208],
};

export { ansiColors };