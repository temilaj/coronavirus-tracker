import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, ImageBackground, StatusBar, TouchableOpacity } from 'react-native';
import { gql } from 'apollo-boost';
import * as WebBrowser from 'expo-web-browser';
import { useQuery } from '@apollo/react-hooks';
import { ScrollView } from 'react-native-gesture-handler';
import { timeToNow } from '../utils/dateFormatter';

import StackPanel from '../components/primary/StackPanel';
import Text from '../components/primary/Text';
import { COLORS, SIZES, Images, calcWidth, FONTFAMILY, calcHeight } from '../constants';
import StatCard from '../components/secondary/StatCard';
import ClosedCases from '../components/secondary/ClosedCases';
import StatesTable from '../components/secondary/StatesTable';
import hexToRgba from 'hex-to-rgba';
import Divider from '../components/secondary/Divider';

const LATEST_FIGURES = gql`
  {
    latest {
      confirmed
      recoveries
      deaths
      lastUpdated
    }

    todaysCases {
      recoveries
      confirmed
      deaths
      lastUpdated
    }

    resultsByState {
      state
      recoveries
      confirmed
      deaths
    }
  }
`;

export default function HomeScreen() {
  const [confirmed, setConfirmed] = useState(0);
  const [activeCases, setActiveCases] = useState(0);
  const [recoveries, setRecoveries] = useState(0);
  const [recordDate, setRecordDate] = useState(null);
  const [deaths, setDeaths] = useState(0);

  const [confirmedInc, setConfirmedInc] = useState(0);
  const [recoveryInc, setRecoveryInc] = useState(0);
  const [deathInc, setDeathInc] = useState(0);

  const { loading, error, data } = useQuery(LATEST_FIGURES, {
    onCompleted: () => {
      setConfirmed(data.latest.confirmed);
      setRecoveries(data.latest.recoveries);
      setDeaths(data.latest.deaths);
      setActiveCases(data.latest.confirmed - data.latest.recoveries);
      setRecordDate(data.latest.lastUpdated);

      setConfirmedInc(data.todaysCases.confirmed);
      setRecoveryInc(data.todaysCases.recoveries);
      setDeathInc(data.todaysCases.deaths);
    },
  });

  if (error) {
    return (
      <StackPanel safe center>
        <Text> Error fetching latest data</Text>
      </StackPanel>
    );
  }

  return (
    <ImageBackground source={Images.background.home} style={styles.container} resizeMode="cover">
      <StatusBar barStyle="light-content" />
      <StackPanel style={styles.overlay} />
      <ScrollView style={styles.scrollViewContainer} contentContainerStyle={styles.scrollViewContent}>
        <StackPanel style={styles.titleContainer}>
          <Text white style={styles.appName}>
            COVID-19 Tracker
          </Text>
          <Text white style={styles.title}>
            Nigeria
          </Text>
          {loading && <ActivityIndicator size="large" color={COLORS.white} />}
          {!loading && data && (
            <Text white small>
              last updated {timeToNow(new Date(recordDate), { addSuffix: true })}
            </Text>
          )}
        </StackPanel>
        <StackPanel style={styles.contentContainer}>
          {!loading && data && (
            <StackPanel style={styles.statsContainer}>
              <StackPanel row center middle>
                <StatCard text="CONFIRMED" stat={confirmed} statColor={COLORS.red} increment={confirmedInc}></StatCard>
                <StatCard
                  text="ACTIVE"
                  stat={activeCases}
                  statColor={COLORS.primary}
                  increment={confirmedInc - (recoveryInc + deathInc)}
                ></StatCard>
              </StackPanel>
              <StackPanel row center middle>
                <StatCard
                  text="RECOVERIES"
                  stat={recoveries}
                  statColor={COLORS.green}
                  increment={recoveryInc}
                ></StatCard>
                <StatCard text="DEATHS" stat={deaths} statColor={COLORS.gray} increment={deathInc}></StatCard>
              </StackPanel>
              <ClosedCases confirmed={confirmed} recoveries={recoveries} deaths={deaths} />
              {data.resultsByState && <StatesTable data={data.resultsByState} />}
            </StackPanel>
          )}
          <StackPanel style={styles.helpContainer}>
            <TouchableOpacity onPress={handleLearnMorePress} style={styles.helpLink}>
              <Text style={styles.helpLinkText}>Learn more</Text>
            </TouchableOpacity>
          </StackPanel>
        </StackPanel>
      </ScrollView>
    </ImageBackground>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync('https://covid19.ncdc.gov.ng/');
}

const styles = StyleSheet.create({
  container: {},
  titleContainer: {
    paddingHorizontal: 16,
    marginTop: calcHeight(8.33),
    marginBottom: calcHeight(18),
  },
  title: {
    fontSize: SIZES.h1,
    fontFamily: FONTFAMILY.openSansSemiBold,
    letterSpacing: SIZES.letterSpacingDefault,
  },
  appName: {
    fontSize: SIZES.small,
    fontFamily: FONTFAMILY.openSansSemiBold,
    letterSpacing: SIZES.letterSpacingDefault,
    marginBottom: 10,
  },
  overlay: {
    backgroundColor: hexToRgba(COLORS.black, 0.4),
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  scrollViewContainer: {
    // paddingTop: SIZES.deviceHeight/ 3,
    paddingTop: 16,
  },
  scrollViewContent: {},
  contentContainer: {
    backgroundColor: COLORS.backgroundGray,
    paddingTop: 30,
    paddingHorizontal: 16,
  },
  statsContainer: {
    top: -SIZES.deviceHeight / 7,
    marginBottom: -SIZES.deviceHeight / 7.5,
  },
  closedCasesContainer: {
    marginTop: 32,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  helpContainer: {
    marginBottom: 15,
    alignItems: 'center',
  },
  helpLink: {
    marginVertical: 12,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
