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

const IconSaleordertempSend: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M153.11238095 739.81561905c5.20126984-8.84215873 5.72139683-20.28495238 0.52012699-29.12711111-32.768-59.29447619-49.93219048-126.39085714-49.93219048-194.00736508 0-227.81561905 191.92685714-413.50095238 428.06450794-413.50095238 163.84 0 315.71707937 92.06247619 386.4543492 235.09739682 4.68114286 9.36228571 14.04342857 15.60380952 24.96609524 16.12393651h1.56038095c9.8824127 0 19.24469841-5.20126984 24.44596826-13.52330159 5.72139683-8.84215873 6.24152381-19.7648254 1.56038095-29.12711111C889.61219048 148.95136508 717.45015873 43.88571429 531.24469841 43.88571429c-268.38552381 0-486.31873016 211.69168254-486.31873016 472.27530158 0 77.49892063 19.7648254 154.47771429 57.21396826 222.09422223 5.20126984 9.36228571 14.56355556 15.08368254 24.96609524 15.08368253h0.52012698c10.40253968 0.52012698 19.7648254-5.20126984 25.48622222-13.52330158z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M636.83047619 518.24152381c16.12393651 0 29.12711111-13.0031746 29.12711111-29.6472381s-13.0031746-29.6472381-29.12711111-29.64723809h-88.94171429l109.22666667-113.90780952c5.20126984-5.72139683 8.32203175-13.0031746 8.32203175-20.80507937s-3.1207619-15.08368254-8.84215873-20.28495238l-1.56038096-1.56038095c-5.20126984-4.16101587-11.44279365-6.76165079-18.72457142-6.7616508-7.80190476 0-15.60380952 3.1207619-20.80507937 8.84215873L531.24469841 392.37079365 447.50425397 304.98946032c-5.20126984-4.68114286-12.48304762-7.80190476-19.7648254-7.80190476s-14.56355556 3.1207619-20.28495238 8.32203174c-10.92266667 10.92266667-11.96292063 28.08685714-1.56038095 40.56990476l109.22666666 113.38768254H426.17904762c-10.40253968 0-19.7648254 5.72139683-25.48622222 14.56355556-5.20126984 9.36228571-5.20126984 20.28495238 0 29.12711111 5.20126984 9.36228571 14.56355556 14.56355556 25.48622222 14.56355556h75.93853968v50.45231746H426.17904762c-16.12393651 0-29.12711111 13.0031746-29.12711111 29.64723809 0 16.12393651 13.0031746 29.6472381 29.12711111 29.6472381h75.93853968v80.09955555c0 16.12393651 13.0031746 29.6472381 29.12711111 29.6472381 16.12393651 0 29.12711111-13.0031746 29.12711111-29.12711111v-80.09955556h75.4184127c15.08368254-1.04025397 27.04660317-14.04342857 27.04660318-29.64723809s-11.96292063-28.08685714-27.56673016-29.6472381h-75.4184127v-50.45231746H636.83047619z"
        fill={getIconColor(color, 1, '#333333')}
      />
      <Path
        d="M945.78590476 573.89511111H800.67047619c-15.08368254 1.04025397-27.04660317 14.04342857-27.04660317 29.6472381 0 15.08368254 11.96292063 28.08685714 27.56673015 29.64723809h68.65676191l-332.36114286 277.74780953-163.84-171.12177778c-5.72139683-5.72139683-13.0031746-8.84215873-21.32520635-8.84215873-5.72139683 0-11.44279365 1.56038095-16.1239365 5.20126984l-178.92368254 121.70971428c-11.96292063 9.36228571-14.56355556 27.04660317-6.24152381 39.5296508 5.20126984 8.32203175 14.56355556 13.0031746 24.44596825 13.0031746 5.20126984 0 10.40253968-1.56038095 15.08368254-4.16101587l158.11860317-107.66628572 165.92050794 173.20228572c5.72139683 5.72139683 13.0031746 8.84215873 21.32520635 8.84215873 6.76165079 0 13.52330159-2.60063492 18.72457143-6.7616508l362.52850793-303.23403174v58.25422222c1.04025397 15.08368254 14.04342857 27.04660317 29.12711112 27.04660318s28.08685714-11.96292063 29.12711111-27.56673016v-124.31034921c0-17.16419048-13.52330159-30.16736508-29.6472381-30.16736508z"
        fill={getIconColor(color, 2, '#333333')}
      />
    </Svg>
  );
};

IconSaleordertempSend.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconSaleordertempSend) : IconSaleordertempSend;