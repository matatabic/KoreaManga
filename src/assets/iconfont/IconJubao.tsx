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

const IconJubao: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M901.3 101.4c-5.5-2.4-25.1-8.9-44.1 8-1.4 1.3-3 2.7-5 4.6-67.7 63.9-173 124.4-290.1 50.5-59.7-41.3-118.9-70.3-175.9-86.2-47.8-13.3-94.4-17.6-138.5-12.6-70.7 8-115.9 37.7-132.4 50.6-10.1 7.3-16.7 19.1-16.7 32.6v9.7c-0.1 0.9-0.1 1.8-0.1 2.7v759c0 22.1 17.9 40 40 40s40-17.9 40-40V656.1c46.5-21.1 165.8-52.2 339 66 0.6 0.4 1.3 0.8 1.9 1.2 45.8 27.5 94.9 41.4 146.6 41.4 11.4 0 23-0.7 34.6-2 46.3-5.4 93.3-21.4 139.4-47.6 23-13 41.2-26.1 52.5-34.8 6.7-5.2 11.7-9.4 14.7-12 6.9-5.9 18.3-15.9 18.3-34.3V138.2c0-15.9-9.5-30.5-24.2-36.8zM141.8 109c-1-0.1-2.1-0.1-3.2-0.1h-0.7 0.6c1.1 0 2.2 0.1 3.3 0.1z m-5.5 0c-0.5 0-1.1 0.1-1.6 0.1 0.5 0 1.1-0.1 1.6-0.1z m-2.7 0.2c-0.8 0.1-1.5 0.2-2.2 0.3 0.8-0.1 1.5-0.2 2.2-0.3z m-2.6 0.4c-3.8 0.7-7.4 2-10.7 3.7 3.4-1.7 7-2.9 10.7-3.7z m-10.9 3.8c-0.6 0.3-1.2 0.7-1.8 1 0.6-0.3 1.2-0.7 1.8-1z m725.4 502.1c-16.3 12.7-48.2 35.2-88.9 51-70.7 27.5-136.3 23.8-195-11.2-57.2-38.8-114.6-66.7-170.6-82.7-46.8-13.4-92.9-18.7-137.1-15.7-29.4 2-54.5 7.3-75.3 13.7V170.2c15.6-9 41.9-20.8 78.2-24.9 77.1-8.7 167.2 20.9 260.5 85.5 0.4 0.3 0.9 0.6 1.3 0.9 44.6 28.3 91.4 44 139.1 46.6 39.4 2.2 79.3-4.5 118.6-19.9 26.3-10.3 49.6-23.4 69.2-36.5v393.6z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconJubao.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconJubao) : IconJubao;
