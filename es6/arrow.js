let fn =()=>{
    console.log(this);
}
fn();

var module = {
    x: 42,
    getX: function() {
      return this.x;
    }
  }
  
//   var unboundGetX = module.getX;
//   console.log(unboundGetX())
console.log(module.getX())