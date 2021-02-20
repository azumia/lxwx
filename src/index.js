class Lxwx {
  constructor({ onBefore = '', onAfter = '', onError = '' } = {}) {
    const map = new Map([
      [onBefore, 'onLxBefore'],
      [onAfter, 'onLxAfter'],
      [onError, 'onLxError']
    ])
    for (let key of map.keys()) {
      if (Object.prototype.toString.call(key) === '[object Function]') {
        this[map.get(key)] = key
      } else {
        this[map.get(key)] = () => { }
      }
    }
    this.handle()
  }

  handle() {
    const _target = this
    Object.keys(wx).forEach(prop => {
      if (Object.prototype.toString.call(wx[prop]) === '[object Function]') {
        const _fun = wx[prop];
        _target[prop] = function () {
          const _arguments = arguments
          _target.onLxBefore(`wx.${prop}`, _arguments)
          if (_arguments && Object.prototype.toString.call((_arguments[0] || {}).fail) === '[object Function]') {
            arguments[0].fail = _target.failProxy((_arguments[0] || {}).fail, prop)
          }
          new Promise((resolve, reject) => {
            try {
              _fun(arguments[0])
              resolve()
            } catch (error) {
              _target.onLxError(`wx.${prop}`, error)
              reject()
            }
          }).then(() => {
            _target.onLxAfter(`wx.${prop}`, _arguments)
          })
          
        }
      } else {
        this[prop] = wx[prop]
      }
    })
  }

  failProxy(fun, prop) {
    const _target = this
    const handler = {
      apply: function (target, ctx, args) {
        _target.onLxError(`wx.${prop}`, args)
        return Reflect.apply(...arguments)
      }
    }
    return new Proxy(fun, handler)
  }
}

export default Lxwx;