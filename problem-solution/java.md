## java 常用命令

## String数组 转 int数组

```
int[] numbers = Arrays.stream(line.split(",")).mapToInt(Integer::parseInt).toArray(); 
```

### 编译一个文件夹下所有的类

```
# With Bash 4, you can just enable globstar
shopt -s globstar

#and then do
javac **/*.java
```

### java

```
# 运行时指定classpath的类
java -classpath ./out/some/path Hello

# 开启断言 -ea
java -ea Hello
```

### javac

```
# 编译特定目录下的java
javac ./src/Hello.java

# 指定classpath
javac -classpath ./src ./src/Hello.java

# 指定输出目录
javac -classpath ./src -d ./dist ./src/Hello.java
```

### jar

```
# 打包当前src目录的所有文件，输出文件的名字为out.jar
jar cvf out.jar src/

# 打包可执行的jar
# 打包当前src目录的所有文件并指定程序入口为com.App
# 输出文件的名字为out.jar
jar cvfe out.jar com.App src

# 指定清单文件 MANIFEST
# 打包当前src目录的所有文件并指定程序入口为com.App
# 并指定MANIFEST.MF,输出文件的名字为out.jar
jar cvfm out.jar src/MANIFEST.MF src
```
