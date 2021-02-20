function Lxwx({ onBefore = '', onAfter = '', onError = '' } = {}) {
  let result = {}
  const map = new Map([
    [onBefore, 'onLxBefore'],
    [onAfter, 'onLxAfter'],
    [onError, 'onLxError']
  ])
  for (let key of map.keys()) {
    if (Object.prototype.toString.call(key) === '[object Function]') {
      result[map.get(key)] = key
    } else {
      result[map.get(key)] = () => { }
    }
  }
  const obj = Object.assign({}, result, wx)
  const lxwx = new Proxy(obj, {
    get: function (target, prop) {
      let _fun = target[prop]
      if (!['onLxBefore', 'onLxAfter', 'onLxError'].includes(prop)
        && Object.prototype.toString.call(target[prop]) === '[object Function]') {
        _fun = function (args) {
          const _arguments = arguments
          obj.onLxBefore(`wx.${prop}`, _arguments)
          const argsProxy = new Proxy(args, {
            get: function (target2, prop2) {
              if (prop2 === 'fail') {
                obj.onLxError(`wx.${prop}`, args)
              }
              return target2[prop2]
            }
          })
          new Promise((resolve, reject) => {
            try {
              target[prop](argsProxy)
              resolve()
            } catch (error) {
              // obj.onLxError(`wx.${prop}`, error)
              reject()
            }
          }).then(() => {
            obj.onLxAfter(`wx.${prop}`, _arguments)
          })
        }
      }
      return _fun
    }
  })
  return lxwx
}
export default Lxwx;