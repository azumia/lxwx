var expect = require('chai').expect
var multiply = require('../src/test')
var Lxwx = require('../dist/bundle')


describe('User', function () {
  it('1 乘 100应该等于 100', function () {
    expect(multiply(1)).to.be.equal(100);
  })
})

describe('new Lxwx()', function () {
  it('实例化Lxwx对象，没有任何值', function () {
    global.wx = {}
    var lxwx = new Lxwx()
    expect(lxwx).to.be.an.instanceof(Lxwx)
  })
  it('实例化Lxwx对象，有部分值', function () {
    global.wx = {}
    var lxwx = new Lxwx({
      onBefore: function() {
        console.log('a')
      }
    })
    expect(lxwx).to.be.an.instanceof(Lxwx)
  })
  it('实例化Lxwx对象，有部分值2', function () {
    global.wx = {}
    var lxwx = new Lxwx({
      onBeforex: function() {
        console.log('a')
      }
    })
    expect(lxwx).to.be.an.instanceof(Lxwx)
  })
  it('实例化Lxwx对象，有部分值3', function () {
    global.wx = {}
    var lxwx = new Lxwx({
      onBefore() {
        console.log('a')
      }
    })
    expect(lxwx).to.be.an.instanceof(Lxwx)
  })
  it('实例化Lxwx对象，有全部值', function () {
    global.wx = {}
    var lxwx = new Lxwx({
      onBefore: function() {
        console.log('a')
      },
      onAfter: function() {
        console.log('b')
      },
      onFail: function() {
        console.log('c')
      }
    })
    expect(lxwx).to.be.an.instanceof(Lxwx)
  })
})