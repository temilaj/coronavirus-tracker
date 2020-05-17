import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, ImageBackground, StatusBar, TouchableOpacity } from 'react-native';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import MapView, { Marker, Callout, PROVIDER_GOOGLE, Heatmap } from 'react-native-maps';

import StackPanel from '../components/primary/StackPanel';
import Text from '../components/primary/Text';
import { COLORS, SIZES, Images, FONTFAMILY, calcHeight } from '../constants';
import hexToRgba from 'hex-to-rgba';
import StateMapper from '../utils/StateMapper';

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

export default function MapsScreen() {
  const [region, setRegion] = useState({
    latitude: 9.082,
    longitude: 8.6753,
    // latitudeDelta: 7.0922,
    // longitudeDelta: 12.0421,
    latitudeDelta: 2.0922,
    longitudeDelta: 2.0421,
  });

  const [stateStats, setStateStats] = useState([]);
  const [points, setPoints] = useState([]);

  const { loading, error, data } = useQuery(STATE_STATS, {
    onCompleted: () => {
      setStateStats(data.resultsByState);
      formatPointsData(data.resultsByState);
    },
  });

  function formatPointsData(data) {
    const heatItems = [];

    data.forEach((item) => {
      const stateName = StateMapper[item.state] ? StateMapper[item.state].name : item.state;
      const latitude = StateMapper[item.state] ? StateMapper[item.state].lat : false;
      const longitude = StateMapper[item.state] ? StateMapper[item.state].long : false;
      if (longitude && latitude) {
        const heatItem = {
          stateName,
          weight: item.confirmed,
          latitude,
          longitude,
        };

        return heatItems.push(heatItem);
      }
      return;
    });
    console.log(heatItems);
    setPoints(heatItems);
  }

  function onRegionChange(region) {
    setRegion(region);
  }

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

  const mapStyle = [
    {
      elementType: 'geometry',
      stylers: [
        {
          color: '#242f3e',
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#746855',
        },
      ],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#242f3e',
        },
      ],
    },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#d59563',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#d59563',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#263c3f',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#6b9a76',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        {
          color: '#38414e',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#212a37',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9ca5b3',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [
        {
          color: '#746855',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#1f2835',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#f3d19c',
        },
      ],
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [
        {
          color: '#2f3948',
        },
      ],
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#d59563',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#17263c',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#515c6d',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#17263c',
        },
      ],
    },
  ];

  return (
    <StackPanel>
      <MapView
        style={styles.map}
        // initialRegion={region}
        customMapStyle={mapStyle}
        region={region}
        // region={{
        //   latitude: 6.82646681,
        //   longitude: 79.87121907,
        //   latitudeDelta: 0.09,
        //   longitudeDelta: 0.0121,
        // }}
        // onRegionChange={onRegionChange}
        provider={PROVIDER_GOOGLE}
        showsCompass={true}
      >
        <Heatmap
          points={points}
          opacity={1.0}
          radius={300}
          gradient={{
            // colors: ['#ffbaba', '#ff7b7b', '#ff5252', '#ff0000', '#a70000'],
            colors: ['#a70000', '#ff0000', '#ff5252', '#ff7b7b', '#ffbaba'],
            startPoints: [0.2, 0.4, 0.6, 0.8, 1.0],
            colorMapSize: 256,
          }}
          // maxIntensity={100}
          // gradientSmoothing={10}
          // heatmapMode={'POINTS_DENSITY'}
        />
      </MapView>
    </StackPanel>
  );
}

MapsScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {},
  map: {
    flex: 1,
    // borderTopColor: COLORS.sectionBorder,
    // borderTopWidth: StyleSheet.hairlineWidth,
  },
});
