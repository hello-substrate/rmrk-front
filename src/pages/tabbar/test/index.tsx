import React, { useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import { Button } from '@taroify/core'
import {
  useReady,
  useDidShow,
  useDidHide,
  usePullDownRefresh,
  usePageScroll
} from '@tarojs/taro'

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import './index.scss'


function Index() {
  // const count = useAppSelector(selectCount);
  // const status = useAppSelector(selectStatus);
  // const dispatch = useAppDispatch();

  const [incrementAmount, setIncrementAmount] = useState('2');
  const incrementValue = Number(incrementAmount) || 0;

  return (
    <View className='index'>
      <Button color='primary'>创建收藏</Button>
    </View>
  )
}

export default Index