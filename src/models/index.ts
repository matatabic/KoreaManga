import home from './home';
import category from "./category";
import categorySetting from './categorySetting';
import brief from "./brief";
import mangaView from "./mangaView";
import {DvaLoadingState} from 'dva-loading-ts';


const models = [home, category, categorySetting, brief, mangaView];

export type RootState = {
    home: typeof home.state;
    category: typeof category.state;
    categorySetting: typeof categorySetting.state;
    brief: typeof brief.state;
    mangaView: typeof mangaView.state;
    loading: DvaLoadingState;
} & {
    [key: string]: typeof category.state;
};

export default models;
