import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';

import { COLORS, calcWidth } from '../constants';

export default function TabBarIcon(props) {
  return (
    <Ionicons
      name={props.name}
      size={calcWidth(4.44)}
      style={{ marginBottom: -3 }}
      color={props.focused ? COLORS.navy : COLORS.gray}
    />
  );
}
