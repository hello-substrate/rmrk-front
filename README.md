# rmrk-front

## @路径别名配置

[@路径别名配置](https://taro-docs.jd.com/taro/docs/config-detail#alias)

1. `config/index.js` 新增

```
const path = require("path");
alias: {
  "@": path.resolve(__dirname, "..", "src"),
},
```

2. `tsconfig.json`

```
"compilerOptions": {
  "paths": {"@/*": ["./src/*"]}
}
```

## ui 库

https://taroify.gitee.io/taroify.com/quickstart/
https://antm-js.gitee.io/vantui/#/button

## 工具

https://github.com/rmrk-team/rmrk-tools

## 必备知识文档

https://github.com/rmrk-team/rmrk-spec/blob/master/standards/rmrk2.0.0/entities/base.md

## 参考

https://github.com/rmrk-team/rmrk2-examples
