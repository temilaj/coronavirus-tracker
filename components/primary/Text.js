import React, { PureComponent } from 'react';
import { Text, StyleSheet } from 'react-native';

import { SIZES, FONTS, COLORS, FONTFAMILY } from '../../constants';

class Typography extends PureComponent {
  render() {
    const {
      // fonts & sizes
      h1,
      h2,
      h3,
      large,
      title,
      subtitle,
      caption,
      small,
      size,
      bold,
      semiBold,
      extraBold,
      weight,
      light,
      center,
      right,
      spacing, // letter-spacing
      lineHeight, // line-height
      // colors
      color,
      fontFamily,
      primary,
      primaryLight,
      secondary,
      black,
      white,
      gray,
      lightGray,
      darkGray,
      warning,
      danger,
      success,
      style,
      children,
      ...props
    } = this.props;

    const textStyles = StyleSheet.flatten([
      {
        fontSize: SIZES.caption,
        color: COLORS.black,
        fontFamily: FONTFAMILY.openSans,
      },
      h1 && FONTS.h1,
      h2 && FONTS.h2,
      h3 && FONTS.h3,
      large && FONTS.large,
      title && FONTS.title,
      subtitle && FONTS.subtitle,
      caption && FONTS.caption,
      small && FONTS.small,
      size && { fontSize: size },
      lineHeight && { lineHeight },
      spacing && { letterSpacing: spacing },

      center && styles.center,
      primary && { color: COLORS.primary },
      primaryLight && { color: COLORS.primaryLight },
      black && { color: COLORS.black },
      white && { color: COLORS.white },
      gray && { color: COLORS.gray },
      darkGray && { color: COLORS.darkGray },
      lightGray && { color: COLORS.lightGray },
      danger && { color: COLORS.danger },
      success && { color: COLORS.success },
      color && { color },

      light && { fontFamily: FONTFAMILY.openSansLight },
      bold && { fontFamily: FONTFAMILY.openSansBold },
      semiBold && { fontFamily: FONTFAMILY.openSansSemiBold },
      fontFamily && { fontFamily },
      style,
    ]);

    return (
      <Text style={textStyles} {...props}>
        {children}
      </Text>
    );
  }
}

Typography.defaultProps = {
  // fonts & sizes
  h1: false,
  h2: false,
  h3: false,
  caption: false,
  small: false,
  large: false,

  center: false,
  spacing: null,
  lineHeight: null,
  // colors
  color: null,
  primary: false,
  primaryLight: false,
  black: false,
  white: false,
  darkGray: false,
  gray: false,
  warning: false,
  danger: false,
  success: false,
  style: {},
};

export default Typography;

const styles = StyleSheet.create({
  // positioning
  center: { textAlign: 'center' },
  right: { textAlign: 'right' },
});
