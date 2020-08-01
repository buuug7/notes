# 读 sass-guidelines 的一些记录

## 语法格式

### 字符串

##### 建议在入口文件中通过@charset 指令使用 UFT-8 的编码格式

```
@charset 'utf-8';
```

##### 在 Sass 中字符串始终要被单引号包裹

```scss
// Yep
$direction: "left";

// Nope
$direction: left;
```

##### 作为 css 的值

关于字体的引用无需用引号括起来

```scss
// Yep
$font-type: sans-serif;

// Nope
$font-type: "sans-serif";
```

##### 包含引号的字符串

避免使用转义字符,用双引号包裹更好

```scss
// Okay
@warn 'You can\'t do that.';

// Okay
@warn "You can't do that.";
```

#### URLS

最好也用引号包裹起来

```scss
// Yep
.foo {
  background-image: url("/images/kittens.jpg");
}

// Nope
.foo {
  background-image: url(/images/kittens.jpg);
}
```

### 数字

##### 零值

当数字小于 1,应该在小数点前写出零,但是小数点后不要出现 0

```scss
// Yep
.foo {
  padding: 2em;
  opacity: 0.5;
}

// Nope
.foo {
  padding: 2em;
  opacity: 0.5;
}
```

##### 单位

定义单位长度为 0 后面不需要加单位

```scss
// Yep
$length: 0;

// Nope
$length: 0em;
```

##### 计算

高级运算始终应该包裹在括号中,这么做是为了提高可读性

```scss
// Yep
.foo {
  width: (100% / 3);
}

// Nope
.foo {
  width: 100% / 3;
}
```

### 颜色

##### 颜色格式

选择表示方法 HSL > RGB > 十六进制

HSL(H,S,L)中

- H(hue)色调, 取值返回(0-360), 120 表示绿色, 240 表示蓝色, 0 或者 360 表示红色.
- S(saturation)饱和度, 取值(0%-100%).
- L(lightness)亮度, 取值(0%-100%)

RGB(R,G,B), 三个参数的取值为 0-255, 百分比取值为 0%-100%, 其中红色为 RGB(255,0,0), 绿色 RGB(0,255,0), 蓝色 RGB(0,0,255)

```scss
// Yep
.foo {
  color: hsl(0, 100%, 50%);
}

// Also yep
.foo {
  color: rgb(255, 0, 0);
}
```

##### 颜色和变量

当一个颜色被多次调用时,最好用一个变量来保存它

```scss
$sass-pink: hsl(330, 50%, 60%);
```

##### 变亮变暗颜色

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

### 列表

列表就是 Sass 的数组, 是个一维数组, 可以用逗号跟空格符来分隔, 索引是从 1 开始的, 一般单行显示可读性比较高

```scss
// Yep
$font-stack: ("Helvetica", "Arial", sans-serif);

// Nope
$font-stack: "Helvetica" "Arial" sans-serif;
```

### Maps

map 数据结构, 冒号之后添加空格, 每一个键值对单独一行

```scss
// Yep
$breakpoints: (
  "small": 767px,
  "medium": 992px,
  "large": 1200px,
);

// Nope
$breakpoints: (
  small: 767px,
  medium: 992px,
  large: 1200px,
);
```

### 声明顺序

以字母顺序表来声明或者以类型来声明（position, display, colors, font, miscellaneous…,具体看个人爱好

### 选择器嵌套

嵌套最大的问题是使代码难以阅读,建议嵌套不要超过三层

#### 伪类推荐使用嵌套

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

## 命名约定

设计到命名的地方有变量, 函数, 混合宏

### 常量

常量建议用大写书写

```scss
// Yep
$CSS_POSITIONS: (top, right, bottom, left, center);

// Nope
$css-positions: (top, right, bottom, left, center);
```

### 命名空间

为了避免跟其他人的代码冲突,使用命名空间来包裹你的所有变量,函数,混合宏和占位符,例如是用"su-"

```scss
$su-configuration: (…);

@function su-rainbow($unicorn) {
  // …
}
```

## 注释

代码写完应该立即注释

### 标示注释

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

### 文档

每一个旨在代码库中复用的变量、函数、混合宏和占位符，都应该使用 SassDoc 记录下来作为全部 API 的一部分。

```scss
/// Vertical rhythm baseline used all over the code base.
/// @type Length
$vertical-rhythm-baseline: 1.5rem;
```

一个完整的例子

```scss
/// Mixin helping defining both `width` and `height` simultaneously.
///
/// @author Hugo Giraudel
///
/// @access public
///
/// @param {Length} $width - Element’s `width`
/// @param {Length} $height [$width] - Element’s `height`
///
/// @example scss - Usage
///   .foo {
///     @include size(10em);
///   }
///
///   .bar {
///     @include size(100%, 10em);
///   }
///
/// @example css - CSS output
///   .foo {
///     width: 10em;
///     height: 10em;
///   }
///
///   .bar {
///     width: 100%;
///     height: 10em;
///   }
@mixin size($width, $height: $width) {
  width: $width;
  height: $height;
}
```

## 结构

CSS 预处理器一个最主要的好处就是可以拆分代码库到几个文件中, 而不会影响性能(@import), 部署的时候都会被编译到一个单一的文件中

### 组件

组件可以是任意的,前提是遵循以下规范:

- 可以做一件事, 只做一件事
- 在整个项目中重用, 具有复用性
- 各自独立

比如搜索框就应该被视为一个组件, 可以在不同位置, 不同页面复用

### 组件的结构

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

### 7-1 模式

- abstracts/
- base/
- components/
- layout/
- pages/
- themes/
- vendors/
- main.css

```
sass/
|
|– abstracts/
|   |– _variables.scss    # Sass Variables
|   |– _functions.scss    # Sass Functions
|   |– _mixins.scss       # Sass Mixins
|   |– _placeholders.scss # Sass Placeholders
|
|– base/
|   |– _reset.scss        # Reset/normalize
|   |– _typography.scss   # Typography rules
|   …                     # Etc.
|
|– components/
|   |– _buttons.scss      # Buttons
|   |– _carousel.scss     # Carousel
|   |– _cover.scss        # Cover
|   |– _dropdown.scss     # Dropdown
|   …                     # Etc.
|
|– layout/
|   |– _navigation.scss   # Navigation
|   |– _grid.scss         # Grid system
|   |– _header.scss       # Header
|   |– _footer.scss       # Footer
|   |– _sidebar.scss      # Sidebar
|   |– _forms.scss        # Forms
|   …                     # Etc.
|
|– pages/
|   |– _home.scss         # Home specific styles
|   |– _contact.scss      # Contact specific styles
|   …                     # Etc.
|
|– themes/
|   |– _theme.scss        # Default theme
|   |– _admin.scss        # Admin theme
|   …                     # Etc.
|
|– vendors/
|   |– _bootstrap.scss    # Bootstrap
|   |– _jquery-ui.scss    # jQuery UI
|   …                     # Etc.
|
`– main.scss              # Main Sass file
```

##### base 文件夹

base/文件夹存放项目中的模板文件,在这里可以找到重置文件,排版规范文件或者一个样式表,命名的时候参考下面的方式

- \_base.scss
- \_reset.scss

##### layout 文件夹

layout/文件夹存放构建网站或者应用程序使用的布局部分,该文件夹存放网站主体(头部,尾部,导航栏,侧边栏..)的样式表

- \_grid.scss
- \_header.scss
- \_footer.scss
- \_sidebar.scss
- \_forms.scss
- \_nav.scss

##### components 文件夹

components/文件夹存放局部组件,包含各种具体模块,基本都是独立的模块,比如一个滑块,加载块

- \_media.scss
- \_carousel.scss
- \_thumbnails.scss

##### pages 文件夹

如果页面有特定样式,最好将该文件存放进 pages/目录并用页面名字.例如,\_home.scss

- \_home.scss
- \_contact.scss

##### themes 文件夹

themes/文件夹存放主题相关的 scss

- \_themes.scss
- \_admin.scss

##### abstracts 文件夹

abstract/文件夹包含了整个项目中使用到 Sass 辅助工具,这里存放着一个全局变量,函数,混合宏和占位符,该文件夹的经验法则是,编译后这里不应该输出任何 css,单纯的只是一些 Sass 辅助工具(该文件夹也为称为 helper/或者 utilities)

- \_variables.scss
- \_mixins.scss
- \_functions.scss
- \_placeholder.scss

##### vendors 文件夹

用来存放所有外部库和框架

- \_normalize.scss
- \_bootstrap.scss
- \_jquery_ui.scss

##### 入口文件

通常写作 main.scss 应该是整个代码库中唯一开头不是下划线命名的 sass 文件,出@important 和注释外,该文件不应该包含其他任何代码,如下面的例子

```
@import 'abstracts/variables';
@import 'abstracts/functions';
@import 'abstracts/mixins';
@import 'abstracts/placeholders';

@import 'vendors/bootstrap';
@import 'vendors/jquery-ui';

@import 'base/reset';
@import 'base/typography';

@import 'layout/navigation';
@import 'layout/grid';
@import 'layout/header';
@import 'layout/footer';
@import 'layout/sidebar';
@import 'layout/forms';

@import 'components/buttons';
@import 'components/carousel';
@import 'components/cover';
@import 'components/dropdown';

@import 'pages/home';
@import 'pages/contact';

@import 'themes/theme';
@import 'themes/admin';
```

## 响应式设计和断点

### 命名断点

媒体查询应该关注屏幕尺寸,不应该用设备名来命名,而应用更普通的方式,例如

```scss
// Yep
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

// Nope
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

### 媒体查询用法

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

## 变量

何种情况才申请变量:

- 该值至少重复出现两次
- 该值至少可能会被更新
- 该值所有的表现与变量有关

##### 作用域

选择器外, 函数外声明的变量为全局变量, 应该位于文件最顶部, 局部变量是在选择器内, 函数内, 混合宏内

```
!default
```

标识符设定的变量是为了将来开发者重写方便而设定的

```scss
$baseline: 1em !default;
```
