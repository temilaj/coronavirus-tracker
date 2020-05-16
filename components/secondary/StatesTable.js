import React from 'react';
import { StyleSheet } from 'react-native';

import StackPanel from '../primary/StackPanel';
import Text from '../primary/Text';
import { COLORS, FONTFAMILY } from '../../constants';
import StateMapper from '../../utils/StateMapper';

export default function StatesTable(props) {
  const { data } = props;
  return (
    <StackPanel style={styles.container}>
      {data.map((item) => {
        console.log(item);
        return (
          <StackPanel style={styles.stateCard} key={item.state}>
            <StackPanel row style={{ justifyContent: 'space-between' }}>
              <StackPanel flex={false}>
                <Text>{StateMapper[item.state] || item.state}</Text>
              </StackPanel>
              <StackPanel flex={false}>
                <Text style={styles.figureText}>{item.confirmed}</Text>
              </StackPanel>
            </StackPanel>
          </StackPanel>
        );
      })}
    </StackPanel>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
  },
  stateCard: {
    backgroundColor: COLORS.white,
    marginBottom: 4,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  figureText: {
    fontFamily: FONTFAMILY.copse,
  },
});
