import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';

import StackPanel from '../primary/StackPanel';
import { COLORS } from '../../constants';

class Divider extends PureComponent {
  render() {
    const { height, width, color, style } = this.props;

    const containerStyles = StyleSheet.flatten([
      {
        height: 5,
      },
      height && { height },
      style && { ...style },
    ]);

    return (
      <StackPanel style={containerStyles} flex={false} row>
        <StackPanel primary flex={width} style={{ backgroundColor: color || COLORS.primary }} />
      </StackPanel>
    );
  }
}

Divider.defaultProps = {
  style: {},
};

export default Divider;
