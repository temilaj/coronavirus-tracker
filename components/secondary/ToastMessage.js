import React from 'react';
import { StyleSheet } from 'react-native';

import { calcWidth, COLORS, calcHeight } from '../../constants';
import StackPanel from '../primary/StackPanel';
import Text from '../primary/Text';

export default function ToastMessage(props) {
  const { backgroundColor } = props;

  const containerStyles = StyleSheet.flatten([
    {
      justifyContent: 'center',
      alignSelf: 'center',
      position: 'absolute',
      zIndex: 999,
      width: '80%',
      bottom: calcHeight(12),
      backgroundColor: COLORS.lightGray,
      borderRadius: 5,
      shadowColor: COLORS.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
    },
    backgroundColor && { backgroundColor },
  ]);
  return (
    <StackPanel row center shadow style={containerStyles}>
      <Text center caption muli style={styles.message}>
        {props.message}
      </Text>
    </StackPanel>
  );
}

const styles = StyleSheet.create({
  message: {
    color: COLORS.white,
    paddingVertical: 6,
    lineHeight: 21,
    letterSpacing: calcWidth(0.02),
  },
});
