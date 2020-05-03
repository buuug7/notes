# [string functions](http://php.net/manual/en/ref.strings.php)

## [addcslashes](http://php.net/manual/zh/function.addcslashes.php)

`addcslashes` 以 C 语言风格使用反斜线转义字符串中的字符.

当选择对字符 0，a，b，f，n，r，t 和 v 进行转义时需要小心，它们将被转换成 \0，\a，\b，\f，\n，\r，\t 和 \v。在 PHP 中，只有 \0（NULL），\r（回车符），\n（换行符）和 \t（制表符）是预定义的转义序列， 而在 C 语言中，上述的所有转换后的字符都是预定义的转义序列。

```php
addcslashes('buuug7','a..z'); //  "\b\u\u\u\g7"
addcslashes('buuug7','u'); // "b\u\u\ug7"
addcslashes('buuug7 \n','\n'); //  "buuug7 \\\n"
```

## [addslashes](http://php.net/manual/en/function.addslashes.php)

`addslashes` 使用反斜线引用字符串,这些字符是单引号（'）、双引号（"）、反斜线（\）与 NUL（NULL 字符）

```php
addslashes("does't it?"); // does\'t it?
addslashes(null); // ""
```

## [bin2hex](http://php.net/manual/zh/function.bin2hex.php)

`bin2hex` 函数把包含数据的二进制字符串转换为十六进制值

## [chop](http://php.net/manual/zh/function.chop.php)

`chop` 是`rtrim()`的别名

## [chr](http://php.net/manual/zh/function.chr.php)

`chr` 返回相对应于 ascii 所指定的单个字符。

```php
chr(97); // a
```

## [chunk_split](http://php.net/manual/zh/function.chunk-split.php)

`chunk_split`将字符串分割成小块

```php
chunk_split('twice',1,"-"); // "t-w-i-c-e-"
```

## [convert_cyr_string](http://php.net/manual/zh/function.convert-cyr-string.php)

`convert_cyr_string`将字符由一种 Cyrillic 字符转换成另一种

## [convert_uudecode](http://php.net/manual/zh/function.convert-uudecode.php)

`convert_uudecode` 解码一个 uuencode 编码的字符串

## [convert_uuencode](http://php.net/manual/zh/function.convert-uuencode.php)

`convert_uuencode` 使用 uuencode 编码一个字符串

## [count_chars](http://php.net/manual/zh/function.count-chars.php)

`count_chars` 返回字符串所用字符的信息

## [crc32](http://php.net/manual/zh/function.crc32.php)

`crc32` 计算一个字符串的 crc32 多项式,生成 32 位循环冗余校验码多项式。这通常用于检查传输的数据是否完整。

```php
crc32('buuug7'); // 1494663735
```

## [crypt](http://php.net/manual/zh/function.crypt.php)

`crypt` 单向字符串散列,由于 crypt() 使用的是单向算法，因此不存在 decrypt 函数。

```php
crypt('buuug7','123'); // "126iBk2yUJsJs"
```

## [explode](http://php.net/manual/zh/function.explode.php)

`explode` 使用一个字符串分割另一个字符串

```php
explode('-', 'twice-bug-report'); // ['twice','bug','report']
explode('-', 'twice-bug-report',2); // ['twice','bug-report']

```

## [fprintf](http://php.net/manual/zh/function.fprintf.php)

`fprintf` 将格式化后的字符串写入到流

```php
if(!($fp = fopen('data.txt', 'w'))){
  return false;
}

$len = fprintf($fp, '%d-%s', 99, 'twice'); // 8

```

## [get_html_translation_table](http://php.net/manual/zh/function.get-html-translation-table.php)

`get_html_translation_table` 返回使用 htmlspecialchars() 和 htmlentities() 后的转换表

## [hebrev](http://php.net/manual/zh/function.hebrev.php)

`hebrev` 将逻辑顺序希伯来文（logical-Hebrew）转换为视觉顺序希伯来文（visual-Hebrew）

## [hebrevc](http://php.net/manual/zh/function.hebrevc.php)

hebrevc — 将逻辑顺序希伯来文（logical-Hebrew）转换为视觉顺序希伯来文（visual-Hebrew），并且转换换行符.本函数与 hebrev() 一样，唯一的区别是 本函数会额外将换行符(\n)转换为"<br>\n"。

## [hex2bin](http://php.net/manual/zh/function.hex2bin.php)

`hex2bin` 转换十六进制字符串为二进制字符串

```php
hex2bin('6578616d706c65206865782064617461'); // "example hex data"
```

## [echo](http://php.net/manual/en/function.echo.php)

`echo` 无返回值。

```php
// 输出单个字符串
echo "hello world"; // hello world

// 同时输出多个字符串
echo "hello", "world";

// 在里面使用换行转义符号
echo "This spans \n multiple lines.";
echo "Escaping characters is done \"Like this\".";

// 输出变量，单引号不起作用
$foo = "foobar";
echo "foo is $foo"; // foo is foobar
echo 'foo is $foo'; // foo is $foo

// 输出数组
$arr = ['foo', 'bar', 'baz'];
echo "this is {$arr[0]}"; // this is foo

// here document syntax
$baz = 'baz';
echo <<<END
Lorem ipsum dolor sit amet, {$baz} ,
giat ipsa tempore sunt corporis nostrum quam illum!
END;

```

## [get_html_translation_table](http://php.net/manual/zh/function.get-html-translation-table.php)

`get_html_translation_table`返回使用`htmlspecialchars()`和`htmlentities()`后的转换表

```php
get_html_translation_table(HTML_SPECIALCHARS); // ['"'=>'"','&'=>'&','<'=>'<','>'=>'>']
```

## [htmlentities](http://php.net/manual/zh/function.htmlentities.php)

`htmlentities` 将字符转换为 HTML 转义字符,本函数各方面都和`htmlspecialchars()`一样， 除了`htmlentities()`会转换所有具有 HTML 实体的字符。如果要解码（反向操作），可以使用`html_entity_decode()`。

```php
$str = "A 'quote's is <b>bold</b>";
htmlentities($str); // A 'quote's is &lt;b&gt;bold&lt;/b&gt;
```

## [htmlspecialchars](http://php.net/manual/zh/function.htmlspecialchars.php)

`htmlspecialchars`将特殊字符转换为 HTML 实体,会执行转换下列字符：

- `& => &amp;`
- `" => &quot;`
- `' => &apos;`
- `< => &lt;`
- `> => &gt;`
  而`htmlentities()`会转换所有具有 HTML 实体的字符。

```php
$str = "A 'quote's is <b>bold</b>";
htmlentities($str); // A 'quote's is &lt;b&gt;bold&lt;/b&gt;
```

## [html_entity_decode](http://php.net/manual/zh/function.html-entity-decode.php)

`html_entity_decode`将所有 HTML 实体转换为普通字符，`htmlentities()`的反向操作。

```php
html_entity_decode('A \'quote\'s is &lt;b&gt;bold&lt;/b&gt;'); // A 'quote's is bold
```

## [htmlspecialchars_decode](http://php.net/manual/zh/function.htmlspecialchars-decode.php)

`htmlspecialchars_decode` 将特殊的 HTML 实体转换回普通字符，`htmlspecialchars`的相反操作。

```php
htmlspecialchars_decode('A \'quote\'s is &lt;b&gt;bold&lt;/b&gt;'); // A 'quote's is bold
```

## [implode](http://php.net/manual/zh/function.implode.php)

`implode()`将一个一维数组的值转化为字符串.

```php
implode('-',[1,2,3,4]); // 1-2-3-4
```

## [join](http://php.net/manual/zh/function.join.php)

`implode()`函数的别名。

## [lcfirst](http://php.net/manual/zh/function.lcfirst.php)

`lcfirst`使一个字符串的第一个字符小写

```php
lcfirst('HELLO'); // hELLO
```

## [levenshtein](http://php.net/manual/zh/function.levenshtein.php)

`levenshtein` 计算两个字符串之间的编辑距离

## [localeconv](http://php.net/manual/zh/function.localeconv.php)

`localeconv` 返回数字格式的信息

## [ltrim](http://php.net/manual/zh/function.ltrim.php)

`ltrim` 删除字符串开头的空白字符（或其他字符）,如果不使用第二个参数， ltrim() 仅删除以下字符：

- " " (ASCII 32 (0x20))，普通空白字符。
- "\t" (ASCII 9 (0x09))， 制表符.
- "\n" (ASCII 10 (0x0A))，换行符。
- "\r" (ASCII 13 (0x0D))，回车符。
- "\0" (ASCII 0 (0x00))， NUL 空字节符。
- "\x0B" (ASCII 11 (0x0B))，垂直制表符。

```php
ltrim("  buuug7"); // "buuug7"
ltrim('buuug7','bu') // "g7"
ltrim('abcdefqqqqq','a..f'); // "qqqqq"
```

## [md5_file](http://php.net/manual/zh/function.md5-file.php)

`md5_file`计算指定文件的 MD5 散列值

```php
md5_file('./a.txt'); // "0bee89b07a248e27c83fc3d5951213c1"
```

## [md5](http://php.net/manual/zh/function.md5.php)

`md5`计算字符串的 MD5 散列值,返回以 32 字符十六进制数字形式返回散列值

```php
md5('buuug7'); // "edcdaef6f5ddd12cafb80044ade6c019"
```

## [metaphone](http://php.net/manual/zh/function.metaphone.php)

## [money_format](http://php.net/manual/zh/function.money-format.php)

`money_format`将数字格式化成货币字符串.  
具有 strfmon 的系统才有 money_format() 函数。 例如 Windows 不具备，所以 Windows 系统上 money_format() 未定义。

## [nl_langinfo](http://php.net/manual/zh/function.nl-langinfo.php)

Note: 此函数未在 Windows 平台下实现。

## [nl2br](http://php.net/manual/zh/function.nl2br.php)

`nl2br`在字符串所有新行之前插入 HTML 换行标记.

## [number_format](http://php.net/manual/zh/function.number-format.php)

`number_format`以千位分隔符方式格式化一个数字

## [ord](http://php.net/manual/zh/function.ord.php)

返回字符的 ASCII 码值

## [parse_str](http://php.net/manual/zh/function.parse-str.php)

将字符串解析成多个变量

```php
parse_str('name=buuug7&age=22&sex=boy',$rs);
var_dump($rs); // array(3) { ["name"]=> string(6) "buuug7" ["age"]=> string(2) "22" ["sex"]=> string(3) "boy" }
```

## [print](http://php.net/manual/en/function.print.php)

`print` 和 `echo` 的区别是只能只接受单个参数，并且永远返回 1.

```php
// 输出字符串
print 'hello world';

// 输出多行字符串
print 'this is multiple \n lines. multiple line.';

// 可以使用变量,不过在单引号中不起作用
$foo = 'foobar';
print "foo is {$foo}";

// 使用数组
$bar = ['baz','bar'];
print "bar is {$bar[1]}";

// here document syntax
$baz = 'baz';
print <<<END
Lorem ipsum dolor sit amet, {$baz} ,
giat ipsa tempore sunt corporis nostrum quam illum!
END;

```

## [printf](http://php.net/manual/en/function.printf.php)

输出格式化字符串,返回输出字符串的长度。

```php
printf('we will get %.2f money', 22);
```

## [quoted_printable_decode](http://php.net/manual/zh/function.quoted-printable-decode.php)

## [quoted_printable_encode](http://php.net/manual/zh/function.quoted-printable-encode.php)

## [quotemeta](http://php.net/manual/zh/function.quotemeta.php)

转义元字符集,返回 在下面这些特殊字符前加 反斜线(\) 转义后的字符串。 这些特殊字符包含：`. \ + * ? [ ^ ] ( $ )`

```php
quotemeta("hello (buuug7)."); // "hello \(buuug7\)\."
```

## [rtrim](http://php.net/manual/zh/function.rtrim.php)

删除字符串末端的空白字符（或者其他字符）.不使用第二个参数，rtrim() 仅删除以下字符：

- " " (ASCII 32 (0x20))，普通空白符。
- "\t" (ASCII 9 (0x09))，制表符。
- "\n" (ASCII 10 (0x0A))，换行符。
- "\r" (ASCII 13 (0x0D))，回车符。
- "\0" (ASCII 0 (0x00))，NUL 空字节符。
- "\x0B" (ASCII 11 (0x0B))，垂直制表符。

```php
rtrim("buuug7   "); // "buuug7"
rtrim('buuug789','0..9'); // "buuug"
```

## [setlocale](http://php.net/manual/zh/function.setlocale.php)

设置地区信息.

```php
setlocale(LC_ALL,'zh'); // "zh"
```

## [sha1_file](http://php.net/manual/zh/function.sha1-file.php)

计算文件的 sha1 散列值.

```php
sha1_file('test.php'); // "90bc7e30733d7e057e299a20effdf1188d85f4a0"
```

## [sha1](http://php.net/manual/zh/function.sha1.php)

计算字符串的 sha1 散列值.

```php
sha1('buuug7'); // "db55cfd2f0053d4d0b67f4b0de66bba2990785ed"
```

## [similar_text](http://php.net/manual/zh/function.similar-text.php)

计算两个字符串的相似度

```php
similar_text('buuug7','buuug8',$rs);
echo $rs; // similar_text('buuug7','buuug8',$rs);
```

## [soundex](http://php.net/manual/zh/function.soundex.php)

## [sprintf](http://php.net/manual/zh/function.sprintf.php)

Return a formatted string.

```php
sprintf('we have %d apples in %s',4,'basket'); // "we have 4 apples in basket"
```

## [sscanf](http://php.net/manual/zh/function.sscanf.php)

根据指定格式解析输入的字符

```php
list($num) = sscanf('SN/8859','SN/%d');
echo $num; // 8859

list($year, $month, $day) = sscanf('2018-2-1', '%d-%d-%d');
echo $year; // 2018
echo $month; // 2
echo $day; // 1
```

## [str_getcsv](http://php.net/manual/zh/function.str-getcsv.php)

解析 CSV 字符串为一个数组

```php
// Handy one liner to parse a CSV file into an array
$csv = array_map('str_getcsv', file('data.csv'));
```

## [str_ireplace](http://php.net/manual/zh/function.str-ireplace.php)

str_replace() 的忽略大小写版本

## [str_pad](http://php.net/manual/zh/function.str-pad.php)

使用另一个字符串填充字符串为指定长度

```php
str_pad('buuug7',10,'-',STR_PAD_BOTH); // "--buuug7--"
```

## [str_repeat](http://php.net/manual/zh/function.str-repeat.php)

重复一个字符串

```php
str_repeat('b',5); // "bbbbb"
```

## [str_replace](http://php.net/manual/zh/function.str-replace.php)

子字符串替换

```php

str_replace('u','U','buuug7'); // "bUUUg7"
str_replace(['u',7],'*','buuug7'); // "b***g*"
```

## [str_rot13](http://php.net/manual/zh/function.str-rot13.php)

## [str_shuffle](http://php.net/manual/zh/function.str-shuffle.php)

随机打乱一个字符串

```php
str_shuffle('buuug7'); // "u7guub"
```

## [str_split](http://php.net/manual/zh/function.str-split.php)

将字符串转换为数组

```php
str_split('buuug7'); // ['b','u','u','u','g',7]

str_split('buuug7',3); // ['buuu','ug7']
```

## [str_word_count](http://php.net/manual/zh/function.str-word-count.php)

返回字符串中单词的使用情况

```php
str_word_count('i am student',0); // 3
str_word_count('i am student',1); // ['i','am','student']
str_word_count('i am student',3); // [0=>'i',2=>'am',5=>'student']

```

## [strcasecmp](http://php.net/manual/zh/function.strcasecmp.php)

二进制安全比较字符串（不区分大小写）

```php
strcasecmp('Buuug7','buuug7') // 0
strcasecmp('buuug7','buuug8'); // -1

```

## [strchr](http://php.net/manual/zh/function.strchr.php)

是 strstr()函数的别名

## [strcmp](http://php.net/manual/zh/function.strcmp.php)

二进制安全字符串比较,注意该比较区分大小写。

```php
strcmp('Buuug7','buuug7'); // -1
```

## [strcoll](http://php.net/manual/zh/function.strcoll.php)

基于区域设置的字符串比较,strcoll() 使用当前区域设置进行比较。如果当前区域为 C 或 POSIX，该函数等同于 strcmp()。

## [strcspn](http://php.net/manual/zh/function.strcspn.php)

## [strip_tags](http://php.net/manual/zh/function.strip-tags.php)

从字符串中去除 HTML 和 PHP 标记

```php
strip_tags("<div>lorem ipsum    dolor</div>"); // "lorem ipsum dolor"
```

## [stripcslashes](http://php.net/manual/zh/function.stripcslashes.php)

反引用一个使用 addcslashes() 转义的字符串,返回反转义后的字符串。可识别类似 C 语言的 \n，\r，... 八进制以及十六进制的描述。

```php
stripcslashes('\\'); // \
stripcslashes('You\'re welcome.'); // "You're welcome."
```

## [stripos](http://php.net/manual/zh/function.stripos.php)

查找字符串首次出现的位置（不区分大小写）

```php
stripos('buuug7','7'); // 5
stripos('buuug7','g7'); // 4
```

## [stripslashes](http://php.net/manual/zh/function.stripslashes.php)

反引用一个引用字符串

```php
stripslashes('you aren\'t me.'); // you aren't me.
```

## [stristr](http://php.net/manual/zh/function.stristr.php)

strstr() 函数的忽略大小写版本

## [strlen](http://php.net/manual/zh/function.strlen.php)

获取字符串长度

```php
strlen('buuug7'); // 6
```

## [strnatcasecmp](http://php.net/manual/zh/function.strnatcasecmp.php)

使用“自然顺序”算法比较字符串（不区分大小写）

```php
strnatcasecmp(10,2); // 1
```

## [strnatcmp](http://php.net/manual/zh/function.strnatcmp.php)

使用自然排序算法比较字符串

## [strncasecmp](http://php.net/manual/zh/function.strncasecmp.php)

二进制安全比较字符串开头的若干个字符（不区分大小写）

```php
strncasecmp('buuug7','buuug8',6); // -1
```

## [strncmp](http://php.net/manual/zh/function.strncmp.php)

二进制安全比较字符串开头的若干个字符,该函数与 strcmp() 类似，不同之处在于你可以指定两个字符串比较时使用的长度（即最大比较长度）。

```php
strncmp('buuug7','buuug8',5); // 0
```

## [strpbrk](http://php.net/manual/zh/function.strpbrk.php)

在字符串中查找一组字符的任何一个字符

```php
strpbrk('buuug7','u'); // uuug7
```

## [strpos](http://php.net/manual/zh/function.strpos.php)

查找字符串首次出现的位置

```php
strpos('buuug7','u'); // 1
```

## [strrchr](http://php.net/manual/zh/function.strrchr.php)

查找指定字符在字符串中的最后一次出现

```php
strrchr('buuug7','u'); // ug7
```

## [strrev](http://php.net/manual/zh/function.strrev.php)

反转字符串

```php
strrev('buuug7'); // 7guuub
```

## [strripos](http://php.net/manual/zh/function.strripos.php)

计算指定字符串在目标字符串中最后一次出现的位置（不区分大小写）

```php
strripos('buuUg7','u'); // 3
```

## [strrpos](http://php.net/manual/zh/function.strrpos.php)

```php
strrpos('buuUg7','u'); // 2
```

## [strspn](http://php.net/manual/zh/function.strspn.php)

计算字符串中全部字符都存在于指定字符集合中的第一段子串的长度。

```php
strspn("42 is the answer to the 128th question.", "1234567890"); // 2
```

## [strstr](http://php.net/manual/zh/function.strstr.php)

查找字符串的首次出现

```php
strstr('youpp@126.com','@'); // @126.com
```

## [strtok](http://php.net/manual/zh/function.strtok.php)

标记分割字符串

```php
$tok = strtok('this is my pen.',' ');
while ($tok !== false){
    echo "$tok <br/>";
    $tok = strtok(' ');
}
// out put:
// this
// is
// my
// pen.
```

## [strtolower](http://php.net/manual/zh/function.strtolower.php)

将字符串转化为小写

```php
strtolower('HELLO WORLD!'); // hello world!
```

## [strtoupper](http://php.net/manual/zh/function.strtoupper.php)

将字符串转化为大写

```php
strtoupper('hello world!'); // HELLO WORLD!
```

## [strtr](http://php.net/manual/zh/function.strtr.php)

```php
strtr('buuug7 is awesome',['is' => 'are','buuug7' => 'buuug8',]); // "buuug8 are awesome"
```

## [substr_compare](http://php.net/manual/zh/function.substr-compare.php)

二进制安全比较字符串（从偏移位置比较指定长度）,substr_compare() 从偏移位置 offset 开始比较 main_str 与 str，比较长度为 length 个字符。

```php
substr_compare('buuug7','uuu',1,3); // 0
```

## [substr_count](http://php.net/manual/zh/function.substr-count.php)

计算字串出现的次数

```php
substr_count('buuug7','u'); // 3
substr_count('buuug7','uu'); // 1
```

## [substr_replace](http://php.net/manual/zh/function.substr-replace.php)

```php
substr_replace('buuug7','@',1,0); // "b@uuug7"
substr_replace('buuug7','@',1,1); // "b@uug7"
substr_replace('buuug7','@',1,2); // "b@ug7"
```

## [substr](http://php.net/manual/zh/function.substr.php)

返回字符串的子串

```php
substr('buuug7',1); // "uuug7"
substr('buuug7',2); // "uug7"
substr('buuug7',1,2); // "uu"
```

## [trim](http://php.net/manual/zh/function.trim.php)

去除字符串首尾处的空白字符（或者其他字符）

```php
trim(' buuug7    '); // "buuug7"
```

## [ucfirst](http://php.net/manual/zh/function.ucfirst.php)

将字符串的首字母转换为大写

```php
ucfirst('buuug7'); // "Buuug7"
```

## [ucwords](http://php.net/manual/zh/function.ucwords.php)

将字符串中每个单词的首字母转换为大写

```php
ucwords('the more you take, the less you have.'); // "The More You Take, The Less You Have."
```

## [vfprintf](http://php.net/manual/zh/function.vfprintf.php)

将格式化字符串写入流

```php
$fp = fopen('test.txt', 'w');
vfprintf($fp, '%04d-%02d-%02d', [2018, 2, 6]);
```

## [vprintf](http://php.net/manual/zh/function.vprintf.php)

输出格式化字符串

```php
vprintf('%04d-%02d-%02d',[2018, 2, 6]); //2018-02-06
```

## [vsprintf](http://php.net/manual/zh/function.vsprintf.php)

返回格式化字符串,作用与 sprintf() 函数类似，但是接收一个数组参数，而不是一系列可变数量的参数。

```php
vsprintf('%04d-%02d-%02d',[2018, 2, 6]); // 2018-02-06
```

## [wordwrap](http://php.net/manual/zh/function.wordwrap.php)

打断字符串为指定数量的字串
