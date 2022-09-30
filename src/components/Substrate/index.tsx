import React, { useEffect } from 'react'
import { View } from '@tarojs/components'
import { ApiPromise, WsProvider, Keyring } from '@polkadot/api'

import {
  useReady,
  useDidShow,
  useDidHide,
  usePullDownRefresh
} from '@tarojs/taro'
import { selectSubstrate, connect_init, SubstrateState, connect, connect_success, connect_error, load_keyring, set_keyring, keyring_error, set_current_account } from '@/reducers/substrate';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

const connect_substrate = (state: SubstrateState, dispatch) => {
  const { apiState, socket } = state;
  // We only want this function to be performed once
  if (apiState) return

  if (isdebug) {
    console.log(`Connected socket: ${socket}`);
  }

  dispatch(connect_init());
  const provider = new WsProvider(socket)
  const api = new ApiPromise({ provider })
  // Set listeners for disconnection and reconnection event.
  api.on('connected', () => {
    dispatch(connect(api))
    // `ready` event is not emitted upon reconnection and is checked explicitly here.
    api.isReady.then(_api => {
      dispatch(connect_success());
      console.log('Connected successfully', isdebug)
      if (isdebug) {
        console.log(api.genesisHash.toHex());
      }
    })
  })
  api.on('ready', () => dispatch(connect_success()))
  api.on('error', err => dispatch(connect_error(err)))
}


const Index = function Index() {
  const substrateState = useAppSelector(selectSubstrate);
  const dispatch = useAppDispatch();
  connect_substrate(substrateState, dispatch);

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

export default Index