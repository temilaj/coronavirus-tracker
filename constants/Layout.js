import { Dimensions, PixelRatio } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const calcWidth = (x) => PixelRatio.roundToNearestPixel((deviceWidth * x) / 100);
const calcHeight = (x) => PixelRatio.roundToNearestPixel((deviceHeight * x) / 100);
const isSmallDevice = deviceWidth < 375;

const SIZES = {
  base: 16,
  radius: calcWidth(1.11),
  lineHeight: 22, // 22
  lineHeightSmaller: 20,
  lineHeightSmallest: 15,
  letterSpacingDefault: calcWidth(-0.152), // -0.55
  letterSpacingSmall: calcWidth(-0.131), // -0.47
  letterSpacingSmaller: calcWidth(-0.0556), // -0.2
  letterSpacingSmallest: calcWidth(-0.0472), // -0.17

  h1: calcWidth(6.94), //30
  h2: calcWidth(4.72), //17
  h3: calcWidth(4.167), //fontSize 15
  caption: calcWidth(3.61), //fontSize 13
  small: calcWidth(3.06), //fontsize 11
  smaller: calcWidth(2.5),
  large: calcWidth(9.44),
  defaultButtonHeight: calcHeight(7.5),
  maxButtonHeight: 54,

  deviceWidth,
  deviceHeight,
  isSmallDevice,
};

const FONTS = {
  h1: {
    fontSize: SIZES.h1,
  },
  h2: {
    fontSize: SIZES.h2,
  },
  h3: {
    fontSize: SIZES.h3,
  },
  caption: {
    fontSize: SIZES.caption,
  },
  small: {
    fontSize: SIZES.small,
  },
  large: {
    fontSize: SIZES.large,
  },
};

export { calcWidth, calcHeight, SIZES, FONTS };
