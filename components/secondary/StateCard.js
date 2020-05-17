import React from 'react';
import { StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

import Text from '../primary/Text';
import StackPanel from '../primary/StackPanel';
import { COLORS, FONTFAMILY, SIZES } from '../../constants';

import StateMapper from '../../utils/StateMapper';

export default function StateCard({ item }) {
  const stateName = StateMapper[item.state] ? StateMapper[item.state].name : item.state;
  return (
    <StackPanel style={styles.stateCard}>
      <StackPanel row style={{ justifyContent: 'space-between' }}>
        <StackPanel flex={false}>
          <Text>{stateName}</Text>
        </StackPanel>
        <StackPanel flex={false}>
          <StackPanel row>
            <Feather name="bar-chart" color={COLORS.navy} size={SIZES.caption} style={styles.icon} />
            <Text style={styles.figureText}>{item.confirmed}</Text>
          </StackPanel>
        </StackPanel>
      </StackPanel>
    </StackPanel>
  );
}

const styles = StyleSheet.create({
  stateCard: {
    backgroundColor: COLORS.white,
    marginBottom: 4,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  figureText: {
    fontFamily: FONTFAMILY.copse,
  },
  icon: {
    marginTop: 2,
    marginRight: 1,
  },
});
