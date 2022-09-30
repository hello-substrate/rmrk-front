import React, { useEffect } from 'react'
import {
  useReady,
  useDidShow,
  useDidHide,
  usePullDownRefresh
} from '@tarojs/taro'
import { Block, Slot, View, Text } from '@tarojs/components';

import "./index.scss";

const MCard = (props) => {
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
    <View className='m-shadow-sm m-bg-white br-15 py-20 px-20 m-15'>
      <Block >
        {props.title != '' && <Text>{ props.title }</Text>}
      </Block>
      <Block>
        {props.children}
      </Block>
    </View>
  )
}

export default MCard

