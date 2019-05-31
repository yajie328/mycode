"use strict";

var _class, _descriptor, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

// @flag('哺乳类')
var Animal = (_class = (_temp =
/*#__PURE__*/
function () {
  function Animal(name) {
    _classCallCheck(this, Animal);

    _initializerDefineProperty(this, "pi", _descriptor, this);

    this.name = name;
    this.eat = '吃肉';
  }

  _createClass(Animal, [{
    key: "say",
    // 实例上的属性，并不是原型上的属性
    value: function say(a, b, c) {
      // 类的原型上的方法
      console.log(1, 2, 3);
    } // static flag = 123

  }]);

  return Animal;
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "pi", [readonly], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '3.14';
  }
}), _applyDecoratedDescriptor(_class.prototype, "say", [before], Object.getOwnPropertyDescriptor(_class.prototype, "say"), _class.prototype)), _class); // 1) 类的静态属性
// function flag(value){
//     return function(constructor){
//         constructor.type =  value;
//     }
// }
// 2) 实例上属性

function readonly(target, property, descriptor) {
  // setTimeout(()=>{
  //     console.log(target == Animal.prototype); //true
  // })
  descriptor.writable = false;
} // 3）


function before(target, property, descriptor) {
  var oldValue = descriptor.value;

  descriptor.value = function () {
    console.log('before');
  };

  oldValue.call.apply(oldValue, [target].concat(Array.prototype.slice.call(arguments)));
}

var animal = new Animal(); // animal.pi = 3.15

animal.say(1, 2, 3); // npm init y
// npm install @babel/cli -dev
// npm install @babel/core
// npm install @babel/plugin-proposal-class-properties -d
// npm install --save--dev @babel/preset-env 
// npx babel es_babel.js -o es5.js -w
