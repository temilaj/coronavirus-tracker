import React from 'react';
import { StyleSheet } from 'react-native';

import Card from './Card';
import StackPanel from '../primary/StackPanel';
import Text from '../primary/Text';
import { calcWidth, FONTFAMILY, SIZES, COLORS } from '../../constants';

export default function ClosedCases(props) {
  const { recoveries, deaths } = props;
  const totalCases = recoveries + deaths;
  const recoveryPercentage = ((recoveries / totalCases) * 100).toFixed(1);
  const deathPercentage = ((deaths / totalCases) * 100).toFixed(1);
  return (
    <>
      <Card title="CLOSED CASES" style={styles.card}>
        <StackPanel row style={styles.container}>
          <StackPanel row>
            <StackPanel>
              <Text center style={styles.figureText}>
                {totalCases}
              </Text>
              <Text center style={styles.description}>
                TOTAL
              </Text>
            </StackPanel>
            <StackPanel>
              <StackPanel row>
                <Text style={styles.figureText}>{recoveries}</Text>
                <Text style={[styles.figureText, styles.percentageText]}>{`(${recoveryPercentage}%)`}</Text>
              </StackPanel>
              <Text style={styles.description}>RECOVERIES</Text>
            </StackPanel>
            <StackPanel>
              <StackPanel row>
                <Text style={styles.figureText}>{deaths}</Text>
                <Text style={[styles.figureText, styles.percentageText]}>{`(${deathPercentage}%)`}</Text>
              </StackPanel>
              <Text style={styles.description}>DEATHS</Text>
            </StackPanel>
          </StackPanel>
        </StackPanel>
        <StackPanel danger style={styles.divider} />
      </Card>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    // flex: 0,
    marginTop: 8,
    paddingTop: 12,
  },
  container: {
    // flex: 0,
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  circle: {
    borderRadius: 50,
    width: calcWidth(10.5),
    height: calcWidth(10.5),
  },
  figureText: {
    fontFamily: FONTFAMILY.copse,
  },
  percentageText: {
    marginLeft: 4,
  },
  description: {
    fontFamily: FONTFAMILY.openSansBold,
    color: COLORS.lightGray,
    letterSpacing: SIZES.letterSpacingDefault,
    fontSize: SIZES.small,
  },
  divider: {
    height: 5,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
  },
});
