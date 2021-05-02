## react-native ios 打包报错 Multiple commands produce

请参考 <https://www.jianshu.com/p/39d1ea030716?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation>

## ios 14 图片图标不显示

- 要么升级 react-native 到 0.63+
- 要么修改所依赖的库中该文件`node_modules/react-native/Libraries/Image/RCTUIImageViewAnimated.m`，修改请参考 <https://github.com/facebook/react-native/commit/123423c2a9258c9af25ca9bffe1f10c42a176bf3#diff-4cb374ac84cbae493f1b0aba42abb676641833d77dcdd921a648098e510e3053>
