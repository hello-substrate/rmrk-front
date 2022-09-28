import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/store";
import { Keyring } from "@polkadot/ui-keyring";
import jsonrpc from "@polkadot/types/interfaces/jsonrpc";

import config from "../../config";

const parsedQuery: any = new URLSearchParams(window.location.search);
const connectedSocket = parsedQuery.rpc || PROVIDER_SOCKET;
console.log(`Connected socket: ${connectedSocket}`);
const ModuleID = "substrate";
export interface SubstrateState {
  api: any;
  apiError: any;
  apiState: any;
  currentAccount: any;
  keyring: Keyring;
  keyringState: any;
  jsonrpc: {};
  socket: string | string[];
}

const initialState: SubstrateState = {
  socket: connectedSocket,
  jsonrpc: { ...jsonrpc, ...config.RPC },
  keyring: null,
  keyringState: null,
  api: null,
  apiError: null,
  apiState: null,
  currentAccount: null
};

export const substrateSlice = createSlice({
  name: ModuleID,
  initialState: initialState,
  reducers: {
    connect_init: state => {
      state.apiState = "connect_init";
    },
    connect: (state, action) => {
      state.api = action.payload;
      state.apiState = action.type;
    },
    connect_success: state => {
      state.apiState = "READY";
    },
    connect_error: (state, action) => {
      state.apiError = action.payload;
      state.apiState = action.type;
    },
    load_keyring: state => {
      state.keyringState = "LOADING";
    },
    set_keyring: (state, action) => {
      state.keyring = action.payload;
      state.keyringState = "READY";
    },
    keyring_error: state => {
      state.keyring = null;
      state.keyringState = "ERROR";
    },
    set_current_account: (state, action) => {
      state.currentAccount = action.payload;
    }
  }
});

export const {
  connect_init,
  connect,
  connect_success,
  connect_error,
  load_keyring,
  set_keyring,
  keyring_error,
  set_current_account
} = substrateSlice.actions;

export const selectSubstrate = (state: RootState) => state.substrate;

export default substrateSlice.reducer;
