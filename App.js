import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import { Asset } from 'expo-asset';

import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';

import useLinking from './navigation/useLinking';
import config from './config';
import AppNavigator from './navigation/AppNavigator';
import imageCache from './constants/imageCache';

const client = new ApolloClient({
  uri: config.baseURL,
  cache: new InMemoryCache(),
});

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // import all used images and fonts
        const cacheImages = imageCache.map((image) => {
          return Asset.fromModule(image).downloadAsync();
        });
        await Promise.all([
          cacheImages,
          Font.loadAsync({
            ...Ionicons.font,
            'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
            openSans: require('./assets/fonts/OpenSans-Regular.ttf'),
            'OpenSans-Light': require('./assets/fonts/OpenSans-Light.ttf'),
            'OpenSans-SemiBold': require('./assets/fonts/OpenSans-SemiBold.ttf'),
            'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
            'OpenSans-ExtraBold': require('./assets/fonts/OpenSans-ExtraBold.ttf'),
            copse: require('./assets/fonts/Copse-Regular.ttf'),
            Lato: require('./assets/fonts/Lato-Regular.ttf'),
            'Lato-Thin': require('./assets/fonts/Lato-Thin.ttf'),
            'Lato-Light': require('./assets/fonts/Lato-Light.ttf'),
            'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
            'Lato-ExtraBold': require('./assets/fonts/Lato-Black.ttf'),
          }),
        ]);
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <ApolloProvider client={client}>
          <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
            <AppNavigator />
          </NavigationContainer>
        </ApolloProvider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
