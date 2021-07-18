
/**
 * JavaScript模拟枚举类型
 */
var Color = {};
(function(Color) {
  Color['Red'] = 0;
  Color[0] = 'Red';
  Color['Green'] = 1;
  Color[1] = 'Green';
})(Color);

console.log(Color.Red);
console.log(Color.Green);

// 更加简洁的写法
var Color;
(function(Color) {
  Color[(Color['Red'] = 0)] = 'Red';
  Color[(Color['Green'] = 1)] = 'Green';
})(Color || (Color = {}));
