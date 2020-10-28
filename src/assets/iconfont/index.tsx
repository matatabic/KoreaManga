/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import IconShoucang from './IconShoucang';
import IconChacha from './IconChacha';
import IconTime1 from './IconTime1';
import IconCha from './IconCha';
import IconXing from './IconXing';
import IconShangbian from './IconShangbian';
import IconXiabian from './IconXiabian';
import IconJubao from './IconJubao';
import IconGengxin from './IconGengxin';
import IconPaihang from './IconPaihang';
import IconPaihangbang from './IconPaihangbang';
import IconWeibiaoti from './IconWeibiaoti';
import IconUpdate from './IconUpdate';
import IconVip from './IconVip';
import IconShizhong from './IconShizhong';
import IconGengxin1 from './IconGengxin1';
import IconDingdan from './IconDingdan';
import IconMine from './IconMine';
import IconShujiashugui from './IconShujiashugui';
import IconCategory from './IconCategory';
import IconCopy from './IconCopy';
import IconDirectionDownCircle from './IconDirectionDownCircle';
import IconDirectionRight from './IconDirectionRight';
import IconDirectionUp from './IconDirectionUp';
import IconDiscount from './IconDiscount';
import IconDirectionLeft from './IconDirectionLeft';
import IconDownload from './IconDownload';
import IconElectronics from './IconElectronics';
import IconElipsis from './IconElipsis';
import IconExport from './IconExport';
import IconExplain from './IconExplain';
import IconEdit from './IconEdit';
import IconEyeClose from './IconEyeClose';
import IconError from './IconError';
import IconFavorite from './IconFavorite';
import IconFabulous from './IconFabulous';
import IconFile from './IconFile';
import IconGood from './IconGood';
import IconHide from './IconHide';
import IconHome from './IconHome';
import IconHistory from './IconHistory';
import IconFileOpen from './IconFileOpen';
import IconForward from './IconForward';
import IconFullscreenShrink from './IconFullscreenShrink';
import IconLayers from './IconLayers';
import IconLock from './IconLock';
import IconFullscreenExpand from './IconFullscreenExpand';
import IconMap from './IconMap';
import IconMenu from './IconMenu';
import IconLoading from './IconLoading';
import IconMinusCircle from './IconMinusCircle';
import IconModular from './IconModular';
import IconNotification from './IconNotification';
import IconMore from './IconMore';
import IconOperation from './IconOperation';
import IconMobilePhone from './IconMobilePhone';
import IconNavigation from './IconNavigation';
import IconPdf from './IconPdf';
import IconPrompt from './IconPrompt';
import IconMove from './IconMove';
import IconRefresh from './IconRefresh';
import IconPicture from './IconPicture';
import IconPin from './IconPin';
import IconSave from './IconSave';
import IconSearch from './IconSearch';
import IconShare from './IconShare';
import IconScanning from './IconScanning';
import IconSelect from './IconSelect';
import IconStop from './IconStop';
import IconSuccess from './IconSuccess';
import IconSmile from './IconSmile';
import IconSwitch from './IconSwitch';
import IconSetting from './IconSetting';
import IconTask from './IconTask';
import IconTime from './IconTime';
import IconToggleLeft from './IconToggleLeft';
import IconTelephone from './IconTelephone';
import IconTop from './IconTop';
import IconUnlock from './IconUnlock';
import IconWarning from './IconWarning';
import IconZoomIn from './IconZoomIn';
import IconZoomOut from './IconZoomOut';
import IconAddBold from './IconAddBold';
import IconArrowLeftBold from './IconArrowLeftBold';
import IconArrowUpBold from './IconArrowUpBold';
import IconCloseBold from './IconCloseBold';
import IconArrowDownBold from './IconArrowDownBold';
import IconMinusBold from './IconMinusBold';
import IconArrowRightBold from './IconArrowRightBold';
import IconSelectBold from './IconSelectBold';
import IconSorting from './IconSorting';
import IconAdd from './IconAdd';
import IconAddCircle from './IconAddCircle';
import IconArrowUpCircle from './IconArrowUpCircle';
import IconArrowRightCircle from './IconArrowRightCircle';
import IconArrowDown from './IconArrowDown';
import IconAshbin from './IconAshbin';
import IconArrowRight from './IconArrowRight';
import IconBrowse from './IconBrowse';
import IconBottom from './IconBottom';
import IconBack from './IconBack';
import IconBad from './IconBad';
import IconArrowLeftCircle from './IconArrowLeftCircle';
import IconArrowDoubleRight from './IconArrowDoubleRight';
import IconCapsLock from './IconCapsLock';
import IconCamera from './IconCamera';
import IconCode from './IconCode';
import IconClose from './IconClose';
import IconCheckItem from './IconCheckItem';
import IconCalendar from './IconCalendar';
import IconComment from './IconComment';
import IconComplete from './IconComplete';
import IconChartPie from './IconChartPie';
import IconDelete from './IconDelete';
import IconDirectionDown from './IconDirectionDown';

export type IconNames = 'icon-shoucang' | 'icon-chacha' | 'icon-time1' | 'icon-cha' | 'icon-xing' | 'icon-shangbian' | 'icon-xiabian' | 'icon-jubao' | 'icon-gengxin' | 'icon-paihang' | 'icon-paihangbang' | 'icon-weibiaoti-' | 'icon-update' | 'icon-VIP' | 'icon-shizhong' | 'icon-gengxin1' | 'icon-dingdan' | 'icon-mine' | 'icon-shujiashugui' | 'icon-category' | 'icon-copy' | 'icon-direction-down-circle' | 'icon-direction-right' | 'icon-direction-up' | 'icon-discount' | 'icon-direction-left' | 'icon-download' | 'icon-electronics' | 'icon-elipsis' | 'icon-export' | 'icon-explain' | 'icon-edit' | 'icon-eye-close' | 'icon-error' | 'icon-favorite' | 'icon-fabulous' | 'icon-file' | 'icon-good' | 'icon-hide' | 'icon-home' | 'icon-history' | 'icon-file-open' | 'icon-forward' | 'icon-fullscreen-shrink' | 'icon-layers' | 'icon-lock' | 'icon-fullscreen-expand' | 'icon-map' | 'icon-menu' | 'icon-loading' | 'icon-minus-circle' | 'icon-modular' | 'icon-notification' | 'icon-more' | 'icon-operation' | 'icon-mobile-phone' | 'icon-navigation' | 'icon-pdf' | 'icon-prompt' | 'icon-move' | 'icon-refresh' | 'icon-picture' | 'icon-pin' | 'icon-save' | 'icon-search' | 'icon-share' | 'icon-scanning' | 'icon-select' | 'icon-stop' | 'icon-success' | 'icon-smile' | 'icon-switch' | 'icon-setting' | 'icon-task' | 'icon-time' | 'icon-toggle-left' | 'icon-telephone' | 'icon-top' | 'icon-unlock' | 'icon-warning' | 'icon-zoom-in' | 'icon-zoom-out' | 'icon-add-bold' | 'icon-arrow-left-bold' | 'icon-arrow-up-bold' | 'icon-close-bold' | 'icon-arrow-down-bold' | 'icon-minus-bold' | 'icon-arrow-right-bold' | 'icon-select-bold' | 'icon-sorting' | 'icon-add' | 'icon-add-circle' | 'icon-arrow-up-circle' | 'icon-arrow-right-circle' | 'icon-arrow-down' | 'icon-ashbin' | 'icon-arrow-right' | 'icon-browse' | 'icon-bottom' | 'icon-back' | 'icon-bad' | 'icon-arrow-left-circle' | 'icon-arrow-double-right' | 'icon-caps-lock' | 'icon-camera' | 'icon-code' | 'icon-close' | 'icon-check-item' | 'icon-calendar' | 'icon-comment' | 'icon-complete' | 'icon-chart-pie' | 'icon-delete' | 'icon-direction-down';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

const IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'icon-shoucang':
      return <IconShoucang key="1" {...rest} />;
    case 'icon-chacha':
      return <IconChacha key="2" {...rest} />;
    case 'icon-time1':
      return <IconTime1 key="3" {...rest} />;
    case 'icon-cha':
      return <IconCha key="4" {...rest} />;
    case 'icon-xing':
      return <IconXing key="5" {...rest} />;
    case 'icon-shangbian':
      return <IconShangbian key="6" {...rest} />;
    case 'icon-xiabian':
      return <IconXiabian key="7" {...rest} />;
    case 'icon-jubao':
      return <IconJubao key="8" {...rest} />;
    case 'icon-gengxin':
      return <IconGengxin key="9" {...rest} />;
    case 'icon-paihang':
      return <IconPaihang key="10" {...rest} />;
    case 'icon-paihangbang':
      return <IconPaihangbang key="11" {...rest} />;
    case 'icon-weibiaoti-':
      return <IconWeibiaoti key="12" {...rest} />;
    case 'icon-update':
      return <IconUpdate key="13" {...rest} />;
    case 'icon-VIP':
      return <IconVip key="14" {...rest} />;
    case 'icon-shizhong':
      return <IconShizhong key="15" {...rest} />;
    case 'icon-gengxin1':
      return <IconGengxin1 key="16" {...rest} />;
    case 'icon-dingdan':
      return <IconDingdan key="17" {...rest} />;
    case 'icon-mine':
      return <IconMine key="18" {...rest} />;
    case 'icon-shujiashugui':
      return <IconShujiashugui key="19" {...rest} />;
    case 'icon-category':
      return <IconCategory key="20" {...rest} />;
    case 'icon-copy':
      return <IconCopy key="21" {...rest} />;
    case 'icon-direction-down-circle':
      return <IconDirectionDownCircle key="22" {...rest} />;
    case 'icon-direction-right':
      return <IconDirectionRight key="23" {...rest} />;
    case 'icon-direction-up':
      return <IconDirectionUp key="24" {...rest} />;
    case 'icon-discount':
      return <IconDiscount key="25" {...rest} />;
    case 'icon-direction-left':
      return <IconDirectionLeft key="26" {...rest} />;
    case 'icon-download':
      return <IconDownload key="27" {...rest} />;
    case 'icon-electronics':
      return <IconElectronics key="28" {...rest} />;
    case 'icon-elipsis':
      return <IconElipsis key="29" {...rest} />;
    case 'icon-export':
      return <IconExport key="30" {...rest} />;
    case 'icon-explain':
      return <IconExplain key="31" {...rest} />;
    case 'icon-edit':
      return <IconEdit key="32" {...rest} />;
    case 'icon-eye-close':
      return <IconEyeClose key="33" {...rest} />;
    case 'icon-error':
      return <IconError key="34" {...rest} />;
    case 'icon-favorite':
      return <IconFavorite key="35" {...rest} />;
    case 'icon-fabulous':
      return <IconFabulous key="36" {...rest} />;
    case 'icon-file':
      return <IconFile key="37" {...rest} />;
    case 'icon-good':
      return <IconGood key="38" {...rest} />;
    case 'icon-hide':
      return <IconHide key="39" {...rest} />;
    case 'icon-home':
      return <IconHome key="40" {...rest} />;
    case 'icon-history':
      return <IconHistory key="41" {...rest} />;
    case 'icon-file-open':
      return <IconFileOpen key="42" {...rest} />;
    case 'icon-forward':
      return <IconForward key="43" {...rest} />;
    case 'icon-fullscreen-shrink':
      return <IconFullscreenShrink key="44" {...rest} />;
    case 'icon-layers':
      return <IconLayers key="45" {...rest} />;
    case 'icon-lock':
      return <IconLock key="46" {...rest} />;
    case 'icon-fullscreen-expand':
      return <IconFullscreenExpand key="47" {...rest} />;
    case 'icon-map':
      return <IconMap key="48" {...rest} />;
    case 'icon-menu':
      return <IconMenu key="49" {...rest} />;
    case 'icon-loading':
      return <IconLoading key="50" {...rest} />;
    case 'icon-minus-circle':
      return <IconMinusCircle key="51" {...rest} />;
    case 'icon-modular':
      return <IconModular key="52" {...rest} />;
    case 'icon-notification':
      return <IconNotification key="53" {...rest} />;
    case 'icon-more':
      return <IconMore key="54" {...rest} />;
    case 'icon-operation':
      return <IconOperation key="55" {...rest} />;
    case 'icon-mobile-phone':
      return <IconMobilePhone key="56" {...rest} />;
    case 'icon-navigation':
      return <IconNavigation key="57" {...rest} />;
    case 'icon-pdf':
      return <IconPdf key="58" {...rest} />;
    case 'icon-prompt':
      return <IconPrompt key="59" {...rest} />;
    case 'icon-move':
      return <IconMove key="60" {...rest} />;
    case 'icon-refresh':
      return <IconRefresh key="61" {...rest} />;
    case 'icon-picture':
      return <IconPicture key="62" {...rest} />;
    case 'icon-pin':
      return <IconPin key="63" {...rest} />;
    case 'icon-save':
      return <IconSave key="64" {...rest} />;
    case 'icon-search':
      return <IconSearch key="65" {...rest} />;
    case 'icon-share':
      return <IconShare key="66" {...rest} />;
    case 'icon-scanning':
      return <IconScanning key="67" {...rest} />;
    case 'icon-select':
      return <IconSelect key="68" {...rest} />;
    case 'icon-stop':
      return <IconStop key="69" {...rest} />;
    case 'icon-success':
      return <IconSuccess key="70" {...rest} />;
    case 'icon-smile':
      return <IconSmile key="71" {...rest} />;
    case 'icon-switch':
      return <IconSwitch key="72" {...rest} />;
    case 'icon-setting':
      return <IconSetting key="73" {...rest} />;
    case 'icon-task':
      return <IconTask key="74" {...rest} />;
    case 'icon-time':
      return <IconTime key="75" {...rest} />;
    case 'icon-toggle-left':
      return <IconToggleLeft key="76" {...rest} />;
    case 'icon-telephone':
      return <IconTelephone key="77" {...rest} />;
    case 'icon-top':
      return <IconTop key="78" {...rest} />;
    case 'icon-unlock':
      return <IconUnlock key="79" {...rest} />;
    case 'icon-warning':
      return <IconWarning key="80" {...rest} />;
    case 'icon-zoom-in':
      return <IconZoomIn key="81" {...rest} />;
    case 'icon-zoom-out':
      return <IconZoomOut key="82" {...rest} />;
    case 'icon-add-bold':
      return <IconAddBold key="83" {...rest} />;
    case 'icon-arrow-left-bold':
      return <IconArrowLeftBold key="84" {...rest} />;
    case 'icon-arrow-up-bold':
      return <IconArrowUpBold key="85" {...rest} />;
    case 'icon-close-bold':
      return <IconCloseBold key="86" {...rest} />;
    case 'icon-arrow-down-bold':
      return <IconArrowDownBold key="87" {...rest} />;
    case 'icon-minus-bold':
      return <IconMinusBold key="88" {...rest} />;
    case 'icon-arrow-right-bold':
      return <IconArrowRightBold key="89" {...rest} />;
    case 'icon-select-bold':
      return <IconSelectBold key="90" {...rest} />;
    case 'icon-sorting':
      return <IconSorting key="91" {...rest} />;
    case 'icon-add':
      return <IconAdd key="92" {...rest} />;
    case 'icon-add-circle':
      return <IconAddCircle key="93" {...rest} />;
    case 'icon-arrow-up-circle':
      return <IconArrowUpCircle key="94" {...rest} />;
    case 'icon-arrow-right-circle':
      return <IconArrowRightCircle key="95" {...rest} />;
    case 'icon-arrow-down':
      return <IconArrowDown key="96" {...rest} />;
    case 'icon-ashbin':
      return <IconAshbin key="97" {...rest} />;
    case 'icon-arrow-right':
      return <IconArrowRight key="98" {...rest} />;
    case 'icon-browse':
      return <IconBrowse key="99" {...rest} />;
    case 'icon-bottom':
      return <IconBottom key="100" {...rest} />;
    case 'icon-back':
      return <IconBack key="101" {...rest} />;
    case 'icon-bad':
      return <IconBad key="102" {...rest} />;
    case 'icon-arrow-left-circle':
      return <IconArrowLeftCircle key="103" {...rest} />;
    case 'icon-arrow-double-right':
      return <IconArrowDoubleRight key="104" {...rest} />;
    case 'icon-caps-lock':
      return <IconCapsLock key="105" {...rest} />;
    case 'icon-camera':
      return <IconCamera key="106" {...rest} />;
    case 'icon-code':
      return <IconCode key="107" {...rest} />;
    case 'icon-close':
      return <IconClose key="108" {...rest} />;
    case 'icon-check-item':
      return <IconCheckItem key="109" {...rest} />;
    case 'icon-calendar':
      return <IconCalendar key="110" {...rest} />;
    case 'icon-comment':
      return <IconComment key="111" {...rest} />;
    case 'icon-complete':
      return <IconComplete key="112" {...rest} />;
    case 'icon-chart-pie':
      return <IconChartPie key="113" {...rest} />;
    case 'icon-delete':
      return <IconDelete key="114" {...rest} />;
    case 'icon-direction-down':
      return <IconDirectionDown key="115" {...rest} />;
  }

  return null;
};

export default React.memo ? React.memo(IconFont) : IconFont;
