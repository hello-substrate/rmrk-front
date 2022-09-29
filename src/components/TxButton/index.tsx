import React, { useEffect } from 'react'
import { Button, Flex } from '@taroify/core'
import {
  useReady,
  useDidShow,
  useDidHide,
  usePullDownRefresh
} from '@tarojs/taro'

const TxButton = () => {
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
    <Button color='primary'>主要按钮</Button>
  )
}
const TxButtonGroup = () => {
  return (
    <Flex justify='space-around'>
      <Flex.Item span={6}><Button color='primary'>主要按钮</Button></Flex.Item>
      <Flex.Item span={6}><Button color='primary'>主要按钮</Button></Flex.Item>
      <Flex.Item span={6}><Button color='primary'>主要按钮</Button></Flex.Item>
    </Flex>
  )
}

export { TxButton, TxButtonGroup }

