export default defineAppConfig({
  pages: ["pages/tabbar/home", "pages/tabbar/mine", "pages/tabbar/test"],
  window: {
    backgroundTextStyle: "light",
    backgroundColor: "#ededed",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black"
  },
  tabBar: {
    custom: true,
    color: "#191919",
    selectedColor: "#57BE6A",
    backgroundColor: "#F5F5F5",
    list: [
      {
        pagePath: "pages/tabbar/home",
        iconPath: "static/images/tabbar/tab_unsel_home.png",
        selectedIconPath: "static/images/tabbar/tab_sel_home.png",
        text: "首页"
      },
      {
        pagePath: "pages/tabbar/test",
        iconPath: "static/images/tabbar/tab_unsel_home.png",
        selectedIconPath: "static/images/tabbar/tab_sel_home.png",
        text: "测试"
      },
      {
        pagePath: "pages/tabbar/mine",
        iconPath: "static/images/tabbar/tab_unsel_mine.png",
        selectedIconPath: "static/images/tabbar/tab_sel_mine.png",
        text: "我的"
      }
    ]
  },
  usingComponents: {}
});
