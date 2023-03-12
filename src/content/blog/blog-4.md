---
title: "GeneratedPluginRegistrant.m Module not found にハマった件"
author: "Thirosue"
date: "2021-04-30"
description: "Flutterでアプリを作成している際に、GeneratedPluginRegistrant.m Module not found にハマった件です。
数時間ハマったのでメモしておきます。ローカル環境は、Apple Silicon (M1 Pro)です。"
---

数時間ハマったのでメモしておきます。
ローカル環境は、Apple Silicon (M1 Pro)です。

## 発生した issue

以下ライブラリをインストールするもビルド時に以下エラーとなる。

`mobile_scanner is not found`
`qr_code_scanner is not found`

https://github.com/juliansteenbakker/mobile_scanner/issues/74

- qr_code_scanner

https://pub.dev/packages/qr_code_scanner

- mobile_scanner

https://pub.dev/packages/mobile_scanner

## 対処

### 1. Xcode を`Runner.xcworkspace`で開く

以下コメントのとおり、以下コマンドで Xcode を開く。

`open ios/Runner.xcworkspace`

https://github.com/flutter/flutter/issues/43986#issuecomment-573171119

しかし、解決せず...

### 2. ライブラリを再インストールして開く

以下コメントのとおり、ライブラリを clean&install を試みる。

```
cd ./ios/
pod install
flutter clean # cancel by ctrl+c if it hangs up
```

https://github.com/flutter/flutter/issues/43986#issuecomment-583020657

しかし、`pod install`でもエラーが発生。

以下、記事の通り、Intel モジュールとして再インストールし、Xcode を開くとエラーがようやく解決した。。。

```
sudo arch -x86_64 gem install cocoapods
sudo arch -x86_64 gem install ffi
arch -x86_64 pod install
```

https://qiita.com/Capotasto/items/2a9ec4b4fcb2e0c0af9f
