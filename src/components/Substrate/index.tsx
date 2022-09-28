import React, { useEffect } from 'react'
import { View } from '@tarojs/components'
import { ApiPromise, WsProvider } from '@polkadot/api'
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp'
import { keyring } from '@polkadot/ui-keyring'

import {
  useReady,
  useDidShow,
  useDidHide,
  usePullDownRefresh
} from '@tarojs/taro'
import { selectSubstrate, connect_init, SubstrateState, connect, connect_success, connect_error, load_keyring, set_keyring, keyring_error, set_current_account } from '../../reducers/substrate';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import config from '../../../config'

const connect_substrate = (state: SubstrateState, dispatch) => {
  const { apiState, socket, jsonrpc } = state;
  // We only want this function to be performed once
  if (apiState) return
  dispatch(connect_init());
  const provider = new WsProvider(socket)
  const _api = new ApiPromise({ provider, rpc: jsonrpc })
  // Set listeners for disconnection and reconnection event.
  _api.on('connected', () => {
    dispatch(connect(_api))
    // `ready` event is not emitted upon reconnection and is checked explicitly here.
    _api.isReady.then(__api => dispatch(connect_success()))
  })
  _api.on('ready', () => dispatch(connect_success()))
  _api.on('error', err => dispatch(connect_error(err)))
}

///
// Loading accounts from dev and polkadot-js extension
let loadAccts = false;
const loadAccounts = (state: SubstrateState, dispatch) => {
  const asyncLoadAccounts = async () => {
    dispatch(load_keyring())
    try {
      await web3Enable(config.APP_NAME)
      let allAccounts = await web3Accounts()
      allAccounts = allAccounts.map(({ address, meta }) => ({
        address,
        meta: { ...meta, name: `${meta.name} (${meta.source})` },
      }))
      keyring.loadAll(
        { isDevelopment: DEVELOPMENT_KEYRING },
        allAccounts
      )
      dispatch(set_keyring(keyring))
    } catch (e) {
      console.error(e)
      dispatch(keyring_error())
    }
  }
  const { keyringState } = state
  // If `keyringState` is not null `asyncLoadAccounts` is running.
  if (keyringState) return
  // If `loadAccts` is true, the `asyncLoadAccounts` has been run once.
  if (loadAccts) return dispatch(dispatch(set_keyring(keyring)))

  // This is the heavy duty work
  loadAccts = true
  asyncLoadAccounts()
}


const substrate = function Index() {
  const substrateState = useAppSelector(selectSubstrate);
  const dispatch = useAppDispatch();
  connect_substrate(substrateState, dispatch);
  loadAccounts(substrateState, dispatch);

  function setCurrentAccount(acct) {
    dispatch(set_current_account(acct))
  }
  // 可以使用所有的 React Hooks
  useEffect(() => { })

  // 对应 onReady
  useReady(() => { })

  // 对应 onShow
  useDidShow(() => { })

  // 对应 onHide
  useDidHide(() => { })

  // Taro 对所有小程序页面生命周期都实现了对应的自定义 React Hooks 进行支持
  // 详情可查阅：【Hooks】
  usePullDownRefresh(() => { })

  return (
    <View />
  )
}

export default substrate