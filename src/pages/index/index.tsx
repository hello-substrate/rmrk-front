import React, { useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import { Flex, Swiper, Image } from '@taroify/core'
import {
  useReady,
  useDidShow,
  useDidHide,
  usePullDownRefresh
} from '@tarojs/taro'

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import './index.scss'


function Index() {
  // const count = useAppSelector(selectCount);
  // const status = useAppSelector(selectStatus);
  // const dispatch = useAppDispatch();

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
      <Swiper className='image-swiper' lazyRender autoplay={4000}>
        <Swiper.Indicator />
        <Swiper.Item>
          <Image className='image' src='https://img01.yzcdn.cn/vant/apple-1.jpg' />
        </Swiper.Item>
        <Swiper.Item>
          <Image className='image' src='https://img01.yzcdn.cn/vant/apple-2.jpg' />
        </Swiper.Item>
        <Swiper.Item>
          <Image className='image' src='https://img01.yzcdn.cn/vant/apple-3.jpg' />
        </Swiper.Item>
        <Swiper.Item>
          <Image className='image' src='https://img01.yzcdn.cn/vant/apple-4.jpg' />
        </Swiper.Item>
      </Swiper>
    </View>
  )
}

export default Index