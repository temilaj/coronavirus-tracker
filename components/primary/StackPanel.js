import React, { PureComponent } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import { SIZES, COLORS } from '../../constants';

class StackPanel extends PureComponent {
  render() {
    const {
      flex,
      row,
      column,
      center,
      middle,
      left,
      right,
      top,
      bottom,
      primary,
      black,
      white,
      lightGray,
      warning,
      success,
      danger,
      relative,
      space,
      radius,
      safe,
      big,
      style,
      children,
      ...props
    } = this.props;

    const viewStyles = StyleSheet.flatten([
      flex && { flex: flex === true ? 1 : flex },
      flex === false && { flex: 0 },
      row && { flexDirection: 'row' },
      relative && { position: 'relative' },
      center && { alignItems: 'center' },
      middle && { justifyContent: 'center' },
      left && { justifyContent: 'flex-start' },
      right && { justifyContent: 'flex-end' },
      top && { justifyContent: 'flex-start' },
      bottom && { justifyContent: 'flex-end' },
      radius && { borderRadius: radius },
      primary && { backgroundColor: COLORS.primary },
      black && { backgroundColor: COLORS.black },
      white && { backgroundColor: COLORS.white },
      lightGray && { backgroundColor: COLORS.backgroundGray },
      warning && { backgroundColor: COLORS.warning },
      success && { backgroundColor: COLORS.success },
      danger && { backgroundColor: COLORS.danger },
      big && {
        height: SIZES.defaultButtonHeight,
        maxHeight: SIZES.maxButtonHeight,
      },
      style,
    ]);

    if (safe) {
      return (
        <SafeAreaView style={viewStyles} {...props}>
          {children}
        </SafeAreaView>
      );
    }

    return (
      <View style={viewStyles} {...props}>
        {children}
      </View>
    );
  }
}

StackPanel.defaultProps = {
  flex: 1,
  row: false,
  column: false,
  center: false,
  middle: false,
  left: false,
  right: false,
  top: false,
  bottom: false,
  radius: null,
  safe: false,
  style: {},
};

export default StackPanel;
