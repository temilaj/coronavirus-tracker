import React, { PureComponent } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { SIZES, COLORS } from '../../constants';

class Button extends PureComponent {
  render() {
    const {
      color,
      height,
      disabled,
      opacity,
      outlined,
      transparent,
      primaryLight,
      primary,
      black,
      white,
      gray,
      warning,
      danger,
      success,
      theme,
      big,
      style,
      children,
      radius,
      shadow,
      // positioning
      flex,
      row,
      column,
      center,
      middle,
      left,
      right,
      top,
      bottom,
      ...props
    } = this.props;

    const buttonStyles = StyleSheet.flatten([
      {
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
      },
      styles.block,
      shadow && styles.shadow,
      flex && { flex: flex === true ? 1 : flex },
      flex === false && { flex: 0 },
      radius && { borderRadius: radius },
      row && { flexDirection: 'row' },
      big && {
        height: SIZES.defaultButtonHeight,
        maxHeight: SIZES.maxButtonHeight,
      },
      transparent && { backgroundColor: 'transparent' },
      primary && { backgroundColor: COLORS.primary },
      primaryLight && { backgroundColor: COLORS.primaryLight },
      black && { backgroundColor: COLORS.black },
      white && { backgroundColor: COLORS.white },
      gray && { backgroundColor: COLORS.gray },
      success && { backgroundColor: COLORS.success },
      danger && { backgroundColor: COLORS.danger },
      color && { backgroundColor: color },
      height && { height },
      center && { alignItems: 'center' },
      middle && { justifyContent: 'center' },
      left && { justifyContent: 'flex-start' },
      right && { justifyContent: 'flex-end' },
      top && { justifyContent: 'flex-start' },
      bottom && { justifyContent: 'flex-end' },
      outlined && {
        borderWidth: 1,
        color: COLORS.primaryLight,
        borderColor: COLORS.primaryLight,
        backgroundColor: 'transparent',
      },
      style,
    ]);

    // if (disabled) {
    //   // TODO reduce color opacity
    // }

    return (
      <TouchableOpacity disabled={disabled} style={buttonStyles} activeOpacity={opacity} {...props}>
        {children}
      </TouchableOpacity>
    );
  }
}

Button.defaultProps = {
  color: null,
  disabled: false,
  opacity: 0.8,
  outlined: false,
  transparent: false,
  primary: false,
  primaryLight: false,
  black: false,
  white: false,
  gray: false,
  warning: false,
  danger: false,
  success: false,
  theme: {},
  big: false,
  style: {},
};

export default Button;

export const styles = StyleSheet.create({
  block: {
    flex: 0,
  },
  shadow: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 3, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
});
