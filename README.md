# lxwx
基于小程序api的hook封装

#### 这是一个基于小程序api的hook封装，有onBefore, onAfter, onFail钩子，可以在项目初始化的时候做个性化处理，监控小程序api调用的整过过程

#### 初始化参数
hook对象 | 说明
---|---
onBefore | api执行前钩子
onAfter | api执行后钩子
onFail | api执行失败钩子


#### 如何使用
``` javascript
import Lxwx from "./vendor/bundle";
const lxwx = new Lxwx({
  onBefore: function (target, ctx, args) {
    console.log('------this is onBefore-----', target, ctx, args)
  },
  onAfter: function (target, ctx, args) {
    console.log('------this is onAfter-----', target, ctx, args)
  },
  onError: function (target, ctx, args) {
    console.log('------this is onError-----', target, ctx, args)
  }
})

// 测试 WX API 调用失败是否会上报   
lxwx.getStorage({
  success(res) {
    console.log(res);
  },
  fail(error) {
    console.log("API 调用失败: ", error);
  },
});
```
