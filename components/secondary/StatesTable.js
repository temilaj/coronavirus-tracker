import React, { useState } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Feather } from '@expo/vector-icons';

import StackPanel from '../primary/StackPanel';
import Text from '../primary/Text';
import { COLORS, FONTFAMILY, SIZES } from '../../constants';
import StateMapper from '../../utils/StateMapper';

const STATE_STATS = gql`
  {
    resultsByState {
      state
      recoveries
      confirmed
      deaths
    }
  }
`;

export default function StatesTable(props) {
  const [stats, setStats] = useState([]);

  const { loading, error, data } = useQuery(STATE_STATS, {
    onCompleted: () => {
      setStats(data.resultsByState);
    },
  });

  if (error) {
    return (
      <StackPanel safe center>
        <Text> Error fetching states data</Text>
      </StackPanel>
    );
  }

  if (loading) {
    return (
      <StackPanel style={styles.container}>
        <ActivityIndicator size="small" color={COLORS.darkGray} />
      </StackPanel>
    );
  }

  return (
    <StackPanel style={styles.container}>
      {stats.map((item) => {
        return (
          <StackPanel style={styles.stateCard} key={item.state}>
            <StackPanel row style={{ justifyContent: 'space-between' }}>
              <StackPanel flex={false}>
                <Text>{StateMapper[item.state] || item.state}</Text>
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
  icon: {
    marginTop: 2,
    marginRight: 1,
  },
});
