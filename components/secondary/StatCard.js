import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import hexToRgba from 'hex-to-rgba';
import { Ionicons } from '@expo/vector-icons';

import StackPanel from '../primary/StackPanel';
import Text from '../primary/Text';

import { SIZES, COLORS, FONTFAMILY, calcWidth } from '../../constants';

class StatCard extends PureComponent {
  render() {
    const { stat, text, statColor, increment } = this.props;

    const cardStyles = StyleSheet.flatten([
      {
        backgroundColor: COLORS.white,
        marginHorizontal: 8,
        marginVertical: 8,
        borderRadius: 4,
        padding: 8,
        shadowColor: COLORS.black,
        shadowOffset: { width: 4, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        height: SIZES.deviceHeight / 4,
        maxHeight: 180,
      },
    ]);

    const figureStyles = StyleSheet.flatten([
      {
        color: statColor,
        fontFamily: FONTFAMILY.copse,
      },
    ]);

    const textStyles = StyleSheet.flatten([
      {
        fontSize: SIZES.smaller,
        color: COLORS.gray,
        fontFamily: FONTFAMILY.latoBold,
      },
    ]);

    const incrementTextStyles = StyleSheet.flatten([
      {
        fontSize: SIZES.small,
        color: statColor,
        fontFamily: FONTFAMILY.latoBold,
        marginLeft: 2,
      },
    ]);

    return (
      <StackPanel style={cardStyles} row>
        <StackPanel bottom style={{ marginBottom: 40, paddingLeft: 8 }}>
          <Text large style={figureStyles}>
            {stat}
          </Text>
          <Text style={textStyles}>{text}</Text>
        </StackPanel>
        <StackPanel flex={0.5} row style={{ marginTop: 24 }}>
          <StackPanel
            center
            middle
            row
            flex={false}
            style={[styles.circle, { backgroundColor: hexToRgba(statColor, 0.2) }]}
          >
            <Ionicons
              name={increment > 0 ? 'md-arrow-dropup' : 'ios-remove'}
              color={statColor}
              size={SIZES.h2}
              style={styles.icon}
            />
            <Text center style={incrementTextStyles}>
              {increment}
            </Text>
          </StackPanel>
        </StackPanel>
      </StackPanel>
    );
  }
}

const styles = StyleSheet.create({
  circle: {
    borderRadius: 50,
    width: calcWidth(10.8),
    height: calcWidth(10.8),
  },
  icon: {
    marginTop: 4,
  },
});

export default StatCard;
