# react-native

## 生成 APK

默认会生成 aab 文件，如果要要生成 apk

After the ./gradlew bundleRelease command we get a .aab version of our app. To get APK, you should run the app with release version on any device with the below command.

Make sure you have connected an android device
For the production ready app, firstly you have to remove the previous app from the device
Run this command in your-project/:

`react-native run-android --variant=release`

Then APK can be found in android/app/build/outputs/apk/release

或者

Use gradlew bundleRelease to generate an app bundle (.aab file) and gradlew assembleRelease to generate an apk (.apk file).
