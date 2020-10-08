import React from "react";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import { App } from "./app";
import { DndMultiViewProps } from "./types";
import * as reducers from "./reducers";

const rootReducer = combineReducers(reducers);
export const rootStore = createStore(rootReducer);

const DndMultiView = (props: DndMultiViewProps) => {
  return (
    <Provider store={rootStore}>
      <App {...props} />
    </Provider>
  );
};

export default DndMultiView;
