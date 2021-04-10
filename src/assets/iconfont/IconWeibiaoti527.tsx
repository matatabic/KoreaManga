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

const IconWeibiaoti527: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M226.659765 865.475544c-8.516977 0-17.287735-0.243547-26.067702-0.725524l-62.833047-3.443425 52.838416-34.175357c41.237193-26.672476 70.176292-59.597353 83.613326-94.566796l-59.387575 0 0-1.843998c-53.871955-9.686616-94.878904-56.908104-94.878904-113.526613l0-353.631086c0-63.60155 51.743478-115.346051 115.346051-115.346051l546.362622 0c63.60155 0 115.345028 51.743478 115.345028 115.346051l0 353.631086c0 56.619532-41.006949 103.842043-94.878904 113.529683l0 1.817392-20.466124 0.022513-268.141016 0c-19.431561 36.83493-55.606459 69.51319-103.34267 93.02058C357.177354 851.682399 293.721113 865.475544 226.659765 865.475544zM255.75543 691.632193l69.686129 0-4.209882 24.001647c-4.976338 28.371164-17.291828 55.627948-36.605709 81.017198-6.988158 9.18622-14.830777 18.046005-23.49204 26.546609 47.882544-3.778046 92.623537-15.45704 130.951471-34.33397 44.202735-21.767769 76.001975-51.8059 89.539292-84.579327l5.226025-12.652158 294.802236-0.022513c41.031509 0 74.41278-33.382295 74.41278-74.414827l0-353.632109c0-41.032532-33.381271-74.413803-74.41278-74.413803l-546.362622 0c-41.031509 0-74.413803 33.381271-74.413803 74.413803l0 353.631086c0.001023 41.031509 33.382295 74.413803 74.413803 74.413803L255.75543 691.632193z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M383.017882 438.711833c0 37.349653-30.269397 67.61905-67.618027 67.61905-37.341466 0-67.617004-30.269397-67.617004-67.61905 0-37.332257 30.275537-67.609841 67.617004-67.609841C352.748485 371.101993 383.017882 401.379577 383.017882 438.711833L383.017882 438.711833z"
        fill={getIconColor(color, 1, '#333333')}
      />
      <Path
        d="M576.093249 438.711833c0 37.349653-30.27963 67.61905-67.627237 67.61905-37.340443 0-67.617004-30.269397-67.617004-67.61905 0-37.332257 30.277584-67.609841 67.617004-67.609841C545.813618 371.101993 576.093249 401.379577 576.093249 438.711833L576.093249 438.711833z"
        fill={getIconColor(color, 2, '#333333')}
      />
      <Path
        d="M769.158383 438.711833c0 37.349653-30.277584 67.61905-67.618027 67.61905-37.34863 0-67.626213-30.269397-67.626213-67.61905 0-37.332257 30.277584-67.609841 67.626213-67.609841C738.880799 371.101993 769.158383 401.379577 769.158383 438.711833L769.158383 438.711833z"
        fill={getIconColor(color, 3, '#333333')}
      />
    </Svg>
  );
};

IconWeibiaoti527.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconWeibiaoti527) : IconWeibiaoti527;