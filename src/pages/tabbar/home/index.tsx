import React, { useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import { Navbar, Loading, List, Swiper, Image } from '@taroify/core'
import {
  useReady,
  useDidShow,
  useDidHide,
  usePullDownRefresh,
  usePageScroll
} from '@tarojs/taro'

import MCard from '@/components/MCard';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import './index.scss'

function BasicList() {
  const [hasMore, setHasMore] = useState(true)
  const [list, setList] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [scrollTop, setScrollTop] = useState(0)

  usePageScroll(({ scrollTop: aScrollTop }) => setScrollTop(aScrollTop))

  return (
    <List
      loading={loading}
      hasMore={hasMore}
      scrollTop={scrollTop}
      onLoad={() => {
        setLoading(true)
        setTimeout(() => {
          for (let i = 0; i < 10; i++) {
            const text = list.length + 1
            list.push(text < 10 ? '0' + text : String(text))
          }
          setList([...list])
          setHasMore(list.length < 40)
          setLoading(false)
        }, 1000)
      }}
    >
      {
        list.map((item) => (
          <MCard key={item}>
            <View className='m-rela'>
              <Image
                style={{ width: '100px', height: '100px' }}
                src='https://img.yzcdn.cn/vant/cat.jpeg'
              />
              <Text className='m-abs-top-left'>{item}</Text>
            </View>
          </MCard>
        ))
      }
      <List.Placeholder>
        {loading && <Loading>加载中...</Loading>}
        {!hasMore && '没有更多了'}
      </List.Placeholder>
    </List>
  )
}


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
      <Navbar title='标题' fixed placeholder>
        <Navbar.NavRight>按钮</Navbar.NavRight>
      </Navbar>
      <MCard>
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
      </MCard>

      <BasicList></BasicList>
    </View>
  )
}

export default Index