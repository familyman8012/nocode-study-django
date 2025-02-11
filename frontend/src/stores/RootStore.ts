import { makeAutoObservable } from 'mobx';
import React from 'react';

export class RootStore {
  constructor() {
    makeAutoObservable(this);
  }
}

export const rootStore = new RootStore();

// React 컴포넌트에서 사용하기 위한 context
export const StoreContext = React.createContext(rootStore);
