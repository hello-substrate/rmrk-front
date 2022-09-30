import React, { useEffect, useState } from 'react'
import { View, Button, Text } from '@tarojs/components'
import { Flex } from "@taroify/core"
import {
  useReady,
  useDidShow,
  useDidHide,
  usePullDownRefresh
} from '@tarojs/taro'

import { useAppSelector, useAppDispatch } from '@/store/hooks';

import {
  decrement,
  increment,
  incrementAsync,
  selectCount,
  selectStatus,
} from '@/reducers/counter';
import {TxButton,TxButtonGroup} from '@/components/TxButton';

function Index() {
  const count = useAppSelector(selectCount);
  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();

  const [incrementAmount, setIncrementAmount] = useState('2');
  const incrementValue = Number(incrementAmount) || 0;

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
    <View className='index'>
      {/* accountPair={currentAccount}
            setStatus={setStatus}
            attrs={{
              interxType,
              palletRpc,
              callable,
              inputParams,
              paramFields,
            }} */}
      <Flex justify='space-around'>
        <Flex.Item span={6}>span: 6</Flex.Item>
        <Flex.Item span={6}>span: 6</Flex.Item>
        <Flex.Item span={6}>span: 6</Flex.Item>
      </Flex>
      <TxButton></TxButton>
      <TxButtonGroup></TxButtonGroup>
      <Button className='add_btn' onClick={() => dispatch(increment())}>+</Button>
      <View><Text>{count}{incrementAmount}{status}</Text></View>
      <Button className='dec_btn' onClick={() => dispatch(decrement())}> -</Button >
      <Button className='dec_btn' onClick={() => dispatch(incrementAsync(incrementValue))}>async</Button>
      <View><Text>Hello, World</Text></View>
    </View>
  )
}

export default Index