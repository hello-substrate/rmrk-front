
import React, { useEffect } from 'react'
// Taro 额外添加的 hooks 要从 '@tarojs/taro' 中引入
import { useDidShow, useDidHide } from '@tarojs/taro'
import { Provider } from 'react-redux'
import { Substrate } from './components'
import { store } from './store'

import './app.scss'

function App (props) {
  // 可以使用所有的 React Hooks
  useEffect(() => {})

  // 对应 onShow
  useDidShow(() => {})

  // 对应 onHide
  useDidHide(() => {})

  return (
    // 在入口组件不会渲染任何内容，但我们可以在这里做类似于状态管理的事情
    <Provider store={store}>
      <Substrate></Substrate>
      {/* props.children 是将要被渲染的页面 */}
      {props.children}
    </Provider>
  )
}

export default App