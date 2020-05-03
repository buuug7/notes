# others

## node-sass 中导入 css

1. If your intention is to have the browser make a network request to retrieve this CSS file at page load, then you should update your code from: `@import "file.css";` to: `@import url('file.css');`

2. If your intention is to have the CSS imported and inlined in the same manner as a .sass or .scss file, then you should remove the .css file extension, like so: `@import "file";`
