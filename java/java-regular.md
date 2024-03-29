# 正则表达式

## 规则

#### 常见匹配符号

- `.` 匹配所有字符
- `^regex` 匹配以 regex 开头的字符串
- `regex$` 匹配以 regex 结尾的字符串
- `[abc]` 匹配 a 或者 b 或者 c
- `[abc][vc]` 匹配 a 或者 b 或者 c，后面跟随着 v 或者 c
- `[^abc]` 匹配不是 a 或者 b 或者 c 的字符
- `[0-9a-z]` 匹配 0-9 之间或者 a-z 之间的字符
- `x|y` 匹配 x 或者 y
- `xy` 匹配 x 后面紧跟 y

#### 特殊字符

- `\d` 匹配所有数字，`[0-9]`的简写
- `\D` 匹配非数字，`[^0-9]`的简写
- `\s` 匹配空白字符，`[\t\n\v\r\f]`的简写
- `\S` 匹配非空字符
- `\w` 匹配单词字符，`[a-zA-z_0-9]`的简写
- `\W` 匹配非单词字符，`[^\w]`
- `\b` 匹配单词边界

#### 量词

- `*` 出现 0 次或者多次，`{0,}`的简写
- `+` 出现 1 次或者多次，`{1,}`的简写
- `?` 出现 0 次或者 1 次, `{0,1}`的简写
- `{x}` 出现 x 次
- `{x,y}` 出现次数在 x 跟 y 之间
- `*?` 惰性匹配，匹配最少的，在首次匹配成功后不在去匹配

#### 分组和反向引用

使用圆括号来分组，使用`$`来访问分组，`$1`第一个分组，`$2`第二个分组。。。

`(\\w)(\\s+)[\\.]`, `$1=(\\w)`, `$2=(\\s+)`

#### (?!pattern) 负向先行断言

代表字符串中的一个位置，紧接该位置之后的字符序列不能匹配 pattern，`a(?!b)` 匹配 a 如果 a 后面不跟着 b

#### 指定模式

- `?i` 使大小写不敏感
- `?s` 单行模式，使`.`能够匹配所有字符，包括换行
- `?m` 多行模式，

例如：`"Abc".matches("(?i)abc")` 返回真

#### 转义符

使用`\`来转义

## 在 String 方法中使用正则表达式

- `s.matches("regex")`
- `s.split("regex")`
- `s.replaceFirst("regex", "replacement")`
- `s.replaceAll("regex", "replacement")`

例子

```java
"abc".replaceFirst("[a-z]", "*"); // *bc
"abc".replaceAll("[a-z]", "*"); // ***
```

## Pattern and Matcher

```java
Pattern pattern = Pattern.compile("\\w+");
Matcher matcher = pattern.matcher("twice gift");
while (matcher.find()) {
   System.out.println(matcher.start());
   System.out.println(matcher.end());
   System.out.println(matcher.group());
}

// 输出
// 0
// 5
// twice
// 6
// 10
// gift
```
