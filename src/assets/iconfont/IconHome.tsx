/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { Svg, GProps, Path } from 'react-native-svg';
import { getIconColor } from './helper';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

const IconHome: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M923.733333 394.666667c-85.333333-70.4-206.933333-174.933333-362.666666-309.333334C533.333333 61.866667 490.666667 61.866667 462.933333 85.333333c-155.733333 134.4-277.333333 238.933333-362.666666 309.333334-14.933333 14.933333-25.6 34.133333-25.6 53.333333 0 38.4 32 70.4 70.4 70.4H192v358.4c0 29.866667 23.466667 53.333333 53.333333 53.333333H405.333333c29.866667 0 53.333333-23.466667 53.333334-53.333333v-206.933333h106.666666v206.933333c0 29.866667 23.466667 53.333333 53.333334 53.333333h160c29.866667 0 53.333333-23.466667 53.333333-53.333333V518.4h46.933333c38.4 0 70.4-32 70.4-70.4 0-21.333333-10.666667-40.533333-25.6-53.333333z m-44.8 59.733333h-57.6c-29.866667 0-53.333333 23.466667-53.333333 53.333333v358.4h-138.666667V661.333333c0-29.866667-23.466667-53.333333-53.333333-53.333333h-128c-29.866667 0-53.333333 23.466667-53.333333 53.333333v206.933334H256V507.733333c0-29.866667-23.466667-53.333333-53.333333-53.333333H145.066667c-4.266667 0-6.4-2.133333-6.4-6.4 0-2.133333 2.133333-4.266667 2.133333-6.4 85.333333-70.4 206.933333-174.933333 362.666667-309.333333 4.266667-4.266667 10.666667-4.266667 14.933333 0 155.733333 134.4 277.333333 238.933333 362.666667 309.333333 2.133333 2.133333 2.133333 2.133333 2.133333 4.266667 2.133333 6.4-2.133333 8.533333-4.266667 8.533333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconHome.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconHome) : IconHome;