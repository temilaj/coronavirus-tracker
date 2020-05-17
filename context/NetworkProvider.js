import React, { useState } from 'react';
import NetInfo from '@react-native-community/netinfo';

export const NetworkContext = React.createContext({ isConnected: true, isInternetReachable: true });

export class NetworkProvider extends React.PureComponent {
  state = {
    isConnected: true,
    isInternetReachable: true,
  };
  unsubscribe;
  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener((state) => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      console.log('Is isInternetReachable?', state.isInternetReachable);
      const { isConnected, isInternetReachable } = state;
      this.setState({ isConnected, isInternetReachable });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleConnectivityChange = (isConnected) => this.setState({ isConnected });

  render() {
    return <NetworkContext.Provider value={this.state}>{this.props.children}</NetworkContext.Provider>;
  }
}
