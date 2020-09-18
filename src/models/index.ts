import home from './home';
import category from "./category";
import categorySetting from './categorySetting';
import {DvaLoadingState} from 'dva-loading-ts';

const models = [home, category, categorySetting];

export type RootState = {
    home: typeof home.state;
    category: typeof category.state;
    categorySetting: typeof categorySetting.state;
    loading: DvaLoadingState;
} & {
    [key: string]: typeof category.state;
};

export default models;
