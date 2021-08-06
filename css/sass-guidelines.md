# 读 sass-guidelines 的一些记录

## 建议在入口文件中通过@charset 指令使用 UFT-8 的编码格式

```
@charset 'utf-8';
```

## 在 Sass 中字符串始终要被引号包裹

```scss
// good
$direction: "left";

// bad
$direction: left;
```

## 作为 css 的值

关于字体的引用无需用引号括起来

```scss
// good
$font-type: sans-serif;

// bad
$font-type: "sans-serif";
```

## 包含引号的字符串

避免使用转义字符,用双引号包裹更好

```scss
// good
@warn 'You can\'t do that.';

// bad
@warn "You can't do that.";
```

## URLS

最好也用引号包裹起来

```scss
// good
.foo {
  background-image: url("/images/kittens.jpg");
}

// bad
.foo {
  background-image: url(/images/kittens.jpg);
}
```

## 零值

当数字小于 1,应该在小数点前写出零,但是小数点后不要出现 0

```scss
// good
.foo {
  padding: 2em;
  opacity: 0.5;
}

// bad
.foo {
  padding: 2em;
  opacity: 0.5;
}
```

## 单位

定义单位长度为 0 后面不需要加单位

```scss
// good
$length: 0;

// bad
$length: 0em;
```

## 计算

高级运算始终应该包裹在括号中,这么做是为了提高可读性

```scss
// good
.foo {
  width: (100% / 3);
}

// bad
.foo {
  width: 100% / 3;
}
```

## 颜色格式

选择表示方法 HSL > RGB > 十六进制

HSL(H,S,L)中

- H(hue)色调, 取值返回(0-360), 120 表示绿色, 240 表示蓝色, 0 或者 360 表示红色.
- S(saturation)饱和度, 取值(0%-100%).
- L(lightness)亮度, 取值(0%-100%)

RGB(R,G,B), 三个参数的取值为 0-255, 百分比取值为 0%-100%, 其中红色为 RGB(255,0,0), 绿色 RGB(0,255,0), 蓝色 RGB(0,0,255)

```scss
// good
.foo {
  color: hsl(0, 100%, 50%);
}

// Also good
.foo {
  color: rgb(255, 0, 0);
}
```

## 颜色和变量

当一个颜色被多次调用时,最好用一个变量来保存它

```scss
$sass-pink: hsl(330, 50%, 60%);
```

## 变亮变暗颜色

lighten 和 darken 函数使通过增加或者减小 HSL 颜色的亮度来实现调节颜色的,但是它们没有预期的效果,可以通过使用 mix 函数混合白色或者黑色来实现变亮变暗是一个不错的方法

```scss
/// Slightly lighten a color
/// @access public
/// @param {Color} $color - color to tint
/// @param {Number} $percentage - percentage of `$color` in returned color
/// @return {Color}
@function tint($color, $percentage) {
  @return mix(white, $color, $percentage);
}

/// Slightly darken a color
/// @access public
/// @param {Color} $color - color to shade
/// @param {Number} $percentage - percentage of `$color` in returned color
/// @return {Color}
@function shade($color, $percentage) {
  @return mix(black, $color, $percentage);
}
```

## 列表

列表就是 Sass 的数组, 是个一维数组, 可以用逗号跟空格符来分隔, 索引是从 1 开始的, 一般单行显示可读性比较高

```scss
// good
$font-stack: ("Helvetica", "Arial", sans-serif);

// bad
$font-stack: "Helvetica" "Arial" sans-serif;
```

## Maps

map 数据结构, 冒号之后添加空格, 每一个键值对单独一行

```scss
// good
$breakpoints: (
  "small": 767px,
  "medium": 992px,
  "large": 1200px,
);

// bad
$breakpoints: (
  small: 767px,
  medium: 992px,
  large: 1200px,
);
```

## 选择器嵌套

嵌套最大的问题是使代码难以阅读,建议嵌套不要超过三层

## 伪类推荐使用嵌套

```scss
.foo {
  color: red;

  &:hover {
    color: green;
  }

  &::before {
    content: "pseudo-element";
  }
}
```

## 常量

常量建议用大写书写

```scss
// good
$CSS_POSITIONS: (top, right, bottom, left, center);

// bad
$css-positions: (top, right, bottom, left, center);
```

## 命名空间

为了避免跟其他人的代码冲突,使用命名空间来包裹你的所有变量,函数,混合宏和占位符,例如是用"su-"

```scss
$su-configuration: (…);

@function su-rainbow($unicorn) {
  // …
}
```

## 标示注释

```scss
/**
 * Helper class to truncate and add ellipsis to a string too long for it to fit
 * on a single line.
 * 1. Prevent content from wrapping, forcing it on a single line.
 * 2. Add ellipsis at the end of the line.
 */
.ellipsis {
  white-space: nowrap; /* 1 */
  text-overflow: ellipsis; /* 2 */
  overflow: hidden;
}
```

单行注释

```scss
// Add current module to the list of imported modules.
// `!global` flag is required so it actually updates the global variable.
$imported-modules: append($imported-modules, $module) !global;
```

## 结构

CSS 预处理器一个最主要的好处就是可以拆分代码库到几个文件中, 而不会影响性能(@import), 部署的时候都会被编译到一个单一的文件中

## 组件

组件可以是任意的,前提是遵循以下规范:

- 可以做一件事, 只做一件事
- 在整个项目中重用, 具有复用性
- 各自独立

比如搜索框就应该被视为一个组件, 可以在不同位置, 不同页面复用

## 组件的结构

每个组件都有自己的文件夹(比如:components/\_button.css),每个组件应该包含以下内容:

- 组件本身的样式
- 和组件样式有关的变量,修饰器以及状态
- 如有需要,设置组件的子级样式

一个组件文件内可以存在与该组件密切相关的变量, 占位符, 混合宏(mixin)甚至是函数, 都应该避免对其他组件的引用, 否则将会让项目整体的依赖变得难以维护

```scss
// Button-specific variables
$button-color: $secondary-color;

// … include any button-specific:
// - mixins
// - placeholders
// - functions

/**
 * Buttons
 */
.button {
  @include vertical-rhythm;
  display: block;
  padding: 1rem;
  color: $button-color;
  // … etc.

  /**
   * Inlined buttons on large screens
   */
  @include respond-to("medium") {
    display: inline-block;
  }
}

/**
 * Icons within buttons
 */
.button > svg {
  fill: currentcolor;
  // … etc.
}

/**
 * Inline button
 */
.button--inline {
  display: inline-block;
}
```

## 命名断点

媒体查询应该关注屏幕尺寸,不应该用设备名来命名,而应用更普通的方式,例如

```scss
// good
$breakpoints: (
  "medium": (
    min-width: 800px,
  ),
  "large": (
    min-width: 1000px,
  ),
  "huge": (
    min-width: 1200px,
  ),
);

// bad
$breakpoints: (
  "tablet": (
    min-width: 800px,
  ),
  "computer": (
    min-width: 1000px,
  ),
  "tv": (
    min-width: 1200px,
  ),
);
```

就此来说，任何不与特定设备关联而表达清晰的命名约定，都会因其广泛的通用性获得认可。

## 媒体查询用法

媒体查询紧贴选择器使代码比较清晰, 推荐这种写法

```scss
.foo {
  color: red;

  @include respond-to("medium") {
    color: blue;
  }
}
// 生成代码
.foo {
  color: red;
}

@media (min-width: 800px) {
  .foo {
    color: blue;
  }
}
```

## 作用域

选择器外, 函数外声明的变量为全局变量, 应该位于文件最顶部, 局部变量是在选择器内, 函数内, 混合宏内

```
!default
```

标识符设定的变量是为了将来开发者重写方便而设定的

```scss
$baseline: 1em !default;
```
