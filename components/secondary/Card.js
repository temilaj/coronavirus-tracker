import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';

import StackPanel from '../primary/StackPanel';
import Text from '../primary/Text';

import { SIZES, COLORS, FONTFAMILY } from '../../constants';

class Card extends PureComponent {
  renderHeader = () => {
    const { title } = this.props;
    if (!title) return null;

    return (
      <StackPanel row style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
      </StackPanel>
    );
  };

  render() {
    const { children } = this.props;

    return (
      <StackPanel style={[styles.card, this.props.style]}>
        {this.renderHeader()}
        {children}
      </StackPanel>
    );
  }
}

Card.defaultProps = {
  style: {},
};

const styles = StyleSheet.create({
  card: {
    // padding: 8,
    backgroundColor: COLORS.white,
    borderRadius: 4,
    shadowColor: COLORS.black,
    shadowOffset: { width: 4, height: 12 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  header: {
    justifyContent: 'space-between',
    paddingBottom: 8,
  },
  headerText: {
    color: COLORS.lightGray,
    lineHeight: SIZES.lineHeightSmallest,
    fontSize: SIZES.small,
    fontFamily: FONTFAMILY.openSansBold,
    letterSpacing: SIZES.letterSpacingDefault,
    paddingLeft: 8,
  },
  border: {
    borderColor: COLORS.gray,
    borderWidth: 1,
  },
  shadow: {
    shadowColor: COLORS.gray,
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 2,
  },
});

export default Card;
