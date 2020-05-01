import * as React from 'react';
import { ActivityIndicator, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { gql } from 'apollo-boost';
import * as WebBrowser from 'expo-web-browser';
import { useQuery } from '@apollo/react-hooks';

import StackPanel from '../components/primary/StackPanel';
import Text from '../components/primary/Text';
import { COLORS } from '../constants';

const LATEST_FIGURES = gql`
  {
    latest {
      confirmed
      recoveries
      deaths
      lastUpdated
    }
  }
`;

export default function HomeScreen() {
  const { loading, error, data } = useQuery(LATEST_FIGURES);

  if (error) {
    return (
      <StackPanel>
        <Text> Error fetching latest data</Text>
      </StackPanel>
    );
  }
  return (
    <StackPanel>
      {loading && <ActivityIndicator size="small" color={COLORS.darkGray} />}
      {!loading && data && (
        <StackPanel style={styles.container}>
          <StackPanel row flex={false} danger style={styles.cardContainer}>
            <StackPanel style={styles.card}>
              <Text center large>
                {data.latest.confirmed}
              </Text>
              <Text center caption>
                confirmed Cases
              </Text>
            </StackPanel>
            <StackPanel style={styles.card}>
              <Text center large>
                {data.latest.recoveries}
              </Text>
              <Text center caption>
                Total recoveries
              </Text>
            </StackPanel>
            <StackPanel style={styles.card}>
              <Text center large>
                {data.latest.deaths}
              </Text>
              <Text center caption>
                Total Deaths
              </Text>
            </StackPanel>
          </StackPanel>
        </StackPanel>
      )}
      <StackPanel style={styles.tabBarInfoContainer}>
        <TouchableOpacity onPress={handleLearnMorePress} style={styles.helpLink}>
          <Text style={styles.helpLinkText}>Learn more</Text>
        </TouchableOpacity>
      </StackPanel>
    </StackPanel>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync('https://covid19.ncdc.gov.ng/');
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 4,
  },
  cardContainer: {
    paddingTop: 12,
  },
  card: {
    backgroundColor: COLORS.white,
    paddingVertical: 16,
    marginHorizontal: 6,
    borderRadius: 4,
    shadowColor: COLORS.black,
    shadowOffset: { width: 4, height: 12 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },

  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
