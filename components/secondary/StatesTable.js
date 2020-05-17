import React, { useState } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import hexToRgba from 'hex-to-rgba';

import StackPanel from '../primary/StackPanel';
import Text from '../primary/Text';
import StateCard from './StateCard';
import { COLORS, FONTFAMILY, SIZES } from '../../constants';

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
      <StackPanel style={styles.tableHeader}>
        <StackPanel row style={{ justifyContent: 'space-between' }}>
          <StackPanel flex={false}>
            <Text small style={styles.title}>
              STATES
            </Text>
          </StackPanel>
          <StackPanel flex={false}>
            <StackPanel row>
              <Text small style={styles.confirmedText}>
                CONFIRMED CASES
              </Text>
            </StackPanel>
          </StackPanel>
        </StackPanel>
      </StackPanel>
      {stats.map((item) => {
        return <StateCard item={item} key={item.state} />;
      })}
    </StackPanel>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    borderColor: hexToRgba(COLORS.lightGray, 0.1),
    borderWidth: 3,
    borderRadius: 6,
  },
  tableHeader: {
    backgroundColor: COLORS.white,
    marginBottom: 4,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    lineHeight: SIZES.lineHeightSmallest,
    fontFamily: FONTFAMILY.openSansBold,
    letterSpacing: SIZES.letterSpacingDefault,
  },
  confirmedText: {
    lineHeight: SIZES.lineHeightSmallest,
    fontFamily: FONTFAMILY.openSansSemiBold,
    letterSpacing: SIZES.letterSpacingDefault,
  },
});
