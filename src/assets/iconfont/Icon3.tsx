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

const Icon3: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 750.509317c-19.080745 0-31.801242-12.720497-31.801242-31.801242L480.198758 432.496894c0-19.080745 12.720497-31.801242 31.801242-31.801242s31.801242 12.720497 31.801242 31.801242l0 286.21118C537.440994 737.78882 524.720497 750.509317 512 750.509317z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M651.925466 534.26087 365.714286 534.26087c-19.080745 0-31.801242-12.720497-31.801242-31.801242 0-19.080745 12.720497-31.801242 31.801242-31.801242l286.21118 0c19.080745 0 31.801242 12.720497 31.801242 31.801242C683.726708 521.540373 671.006211 534.26087 651.925466 534.26087z"
        fill={getIconColor(color, 1, '#333333')}
      />
      <Path
        d="M651.925466 648.745342 365.714286 648.745342c-19.080745 0-31.801242-12.720497-31.801242-31.801242 0-19.080745 12.720497-31.801242 31.801242-31.801242l286.21118 0c19.080745 0 31.801242 12.720497 31.801242 31.801242C683.726708 636.024845 671.006211 648.745342 651.925466 648.745342z"
        fill={getIconColor(color, 2, '#333333')}
      />
      <Path
        d="M512 464.298137c-6.360248 0-19.080745 0-25.440994-6.360248L352.993789 324.372671c-12.720497-12.720497-12.720497-31.801242 0-44.521739 12.720497-12.720497 31.801242-12.720497 44.521739 0l133.565217 133.565217c12.720497 12.720497 12.720497 31.801242 0 44.521739C524.720497 464.298137 518.360248 464.298137 512 464.298137z"
        fill={getIconColor(color, 3, '#333333')}
      />
      <Path
        d="M512 464.298137c-6.360248 0-19.080745 0-25.440994-6.360248-12.720497-12.720497-12.720497-31.801242 0-44.521739l133.565217-133.565217c12.720497-12.720497 31.801242-12.720497 44.521739 0 12.720497 12.720497 12.720497 31.801242 0 44.521739L531.080745 457.937888C524.720497 464.298137 518.360248 464.298137 512 464.298137z"
        fill={getIconColor(color, 4, '#333333')}
      />
      <Path
        d="M512 1017.639752c-279.850932 0-508.819876-228.968944-508.819876-508.819876s228.968944-508.819876 508.819876-508.819876 508.819876 228.968944 508.819876 508.819876c0 25.440994 0 50.881988-6.360248 82.68323 0 19.080745-19.080745 31.801242-38.161491 25.440994-19.080745 0-31.801242-19.080745-25.440994-38.161491 6.360248-25.440994 6.360248-44.521739 6.360248-69.962733 0-248.049689-197.167702-445.217391-445.217391-445.217391S66.782609 267.130435 66.782609 515.180124s197.167702 445.217391 445.217391 445.217391c25.440994 0 57.242236 0 82.68323-6.360248 19.080745-6.360248 31.801242 6.360248 38.161491 25.440994 6.360248 19.080745-6.360248 31.801242-25.440994 38.161491C575.602484 1017.639752 543.801242 1017.639752 512 1017.639752z"
        fill={getIconColor(color, 5, '#333333')}
      />
      <Path
        d="M989.018634 864.993789l-318.012422 0c-19.080745 0-31.801242-12.720497-31.801242-31.801242s12.720497-31.801242 31.801242-31.801242l318.012422 0c19.080745 0 31.801242 12.720497 31.801242 31.801242S1001.73913 864.993789 989.018634 864.993789z"
        fill={getIconColor(color, 6, '#333333')}
      />
      <Path
        d="M830.012422 1024c-19.080745 0-31.801242-12.720497-31.801242-31.801242l0-318.012422c0-19.080745 12.720497-31.801242 31.801242-31.801242s31.801242 12.720497 31.801242 31.801242l0 318.012422C861.813665 1004.919255 842.732919 1024 830.012422 1024z"
        fill={getIconColor(color, 7, '#333333')}
      />
    </Svg>
  );
};

Icon3.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(Icon3) : Icon3;