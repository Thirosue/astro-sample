---
title: "Amplify Flutter の API.post / put（REST）で日本語が文字化け"
author: "Thirosue"
date: "2021-04-16"
description: "Amplify Flutterの一般提供がはじまったので、CognitoやREST APIなど使って、アプリを作成しています。
公式のサンプル通り記載すると、日本語が文字化けるので、対応をメモしておきます。"
---

Amplify Flutter の一般提供がはじまったので、Cognito や REST API など使って、アプリを作成しています。

https://aws.amazon.com/jp/blogs/news/amplify-flutter-is-now-generally-available-build-beautiful-cross-platform-apps/

公式のサンプル通り記載すると、日本語が文字化けるので、対応をメモしておきます。

https://docs.amplify.aws/lib/restapi/getting-started/q/platform/flutter#initialize-amplify-api

https://docs.amplify.aws/lib/restapi/update/q/platform/flutter

- 変更前

公式のサンプル通りに、`Uint8List.fromList`で文字列に変換すると、日本語が文字化けしてしまいます。

```dart
try {
    RestOptions options = RestOptions(
        path: '/todo',
        body: Uint8List.fromList('{\'name\':\'ほげ\'}'.codeUnits) // <------- 変更箇所 Uint8List.fromList で文字列変換すると、日本語が文字化けします。
    );
    RestOperation restOperation = Amplify.API.put(
        restOptions: options
    );
    RestResponse response = await restOperation.response;
    print('PUT call succeeded');
    print(new String.fromCharCodes(response.data));
} on ApiException catch (e) {
    print('PUT call failed: $e');
}
```

- 変更後

リクエストに日本語が含まれている場合は、`Utf8Encoder().convert`で`Uint8List`に変換しましょう。

```dart
import 'dart:convert';

...(中略)...

try {
    final encoder = const Utf8Encoder();  // <------- 追加
    RestOptions options = RestOptions(
        path: '/todo',
        body: encoder.convert(('{\'name\':\'ほげ\'}') // <------- 変更箇所 Utf8Encoder().convert でbyte配列に変更しましょう。
    );
    RestOperation restOperation = Amplify.API.put(
        restOptions: options
    );
    RestResponse response = await restOperation.response;
    print('PUT call succeeded');
    print(new String.fromCharCodes(response.data));
} on ApiException catch (e) {
    print('PUT call failed: $e');
}
```

# 参考

https://qiita.com/takeshi_hirosue/items/ed9ead69e727e0d4fc5e
https://qiita.com/takyam/items/98d6336f1b2fe912fd56
