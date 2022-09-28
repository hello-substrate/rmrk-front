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
