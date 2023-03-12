---
title: "mockito : type 'Null' is not a subtype of type エラーにハマった件"
author: "Thirosue"
date: "2022-05-15"
description: "Flutterでアプリを作成している際に、mockito : type 'Null' is not a subtype of type エラーにハマった件です。
Flutterでmockitoを利用した、単体テストで数時間ハマったのでメモしておきます。"
---

Flutter で mockito を利用した、単体テストで数時間ハマったのでメモしておきます。
​

## 発生した issue

​
mock クラスが Null を許容しているため、mock 化したクラスと型の整合性がなく、エラーとなる。

> Null Safety 対応（=Null 許容しない）するには、特別な対応が必要となる。
> ​

- 対象のコード
  ​

```dart
      when(mock.auth(email: 'test@test.com', password: 'password'))
          .thenAnswer((_) => Future.value(response));
```

​

- エラーメッセージ
  ​

```
  type 'Null' is not a subtype of type 'Future<ApiResponse>'
  package:flutter_with_getx/data/repository/auth_repository.dart 9:23  MockAuthRepository.auth
  test/ui/login/login_controller_test.dart 21:17                       main.<fn>.<fn>
  test/ui/login/login_controller_test.dart 19:50                       main.<fn>.<fn>
```

​

- stackoverflow
  ​
  stackoverflow に同件が起票されていました。
  ​
  https://stackoverflow.com/questions/67371802/dart-type-null-is-not-a-subtype-of-type-futurestring-in-mockito
  ​

## 対処 1

​
公式の`READ_ME.md`に書いてますね。
こちらの手順 1 で対応しました。
​
https://github.com/dart-lang/mockito/blob/master/NULL_SAFETY_README.md
​

### 対応手順

​

1. @GenerateMocks を用い、モック対象の class を指定する
1. build_runner を開発の依存関係（`build_runner`）に追加する
1. モッククラスを自動生成し、生成されたクラスを利用する
   ​

#### 1. @GenerateMocks を用い、モック対象の class を指定する

​
@GenerateMocks をインポートして、モック対象の class を指定する。
​

```dart
@GenerateMocks([モック化するクラス])
void main() {}
```

​

- AuthRepository をモック化する場合
  ​

```dart
@GenerateMocks([AuthRepository])
void main() {}
```

​

#### 2. build_runner を開発の依存関係（`dev_dependencies`）に追加する

​

```yaml:pubspec.yaml
dev_dependencies:
  flutter_test:
    sdk: flutter
  mockito: ^5.1.0
​
  # The "flutter_lints" package below contains a set of recommended lints to
  # encourage good coding practices. The lint set provided by the package is
  # activated in the `analysis_options.yaml` file located at the root of your
  # package. See that file for information about deactivating specific lint
  # rules and activating additional ones.
  flutter_lints: ^1.0.0
  json_serializable: ^6.1.5
  build_runner: ^2.1.8 ## <---　追加
```

​

#### 3. モッククラスを自動生成し、生成されたクラスを利用する

​
モッククラスを以下コマンドで自動生成します。
​

```bash
##　delete-conflicting-outputsで以前の出力を上書き
flutter pub run build_runner build --delete-conflicting-outputs
```

​
テストクラスと同じ階層にモッククラスが自動生成されるため、本クラスをインポートして、モックとして用います。
​

- テストクラス`login_controller_test.dart`でモックを利用する場合、
  ​
  テストクラスと同じ階層にモッククラスが生成される。
  ​

```bash
$ ll
total 16
-rw-r--r--  1 takeshi.hirosue  staff  2007  5 15 13:59 login_controller_test.dart　## <--- テストクラス
-rw-r--r--  1 takeshi.hirosue  staff  1694  5 15 13:59 login_controller_test.mocks.dart ## <--- 自動生成されたモッククラス
```

​

- テストクラス
  ​
  テストクラスで生成されたクラスをインポートしてモックとして用いる。
  ​

```dart
import 'login_controller_test.mocks.dart'; ## <---作成されたモックをimport
​
@GenerateMocks([AuthRepository])　## <---モック対象のクラス
void main() async {
  final mock = MockAuthRepository(); ## <---自動生成クラスは、Mockのプレフィックスが付与される
```

​

## 対処 2

​
Null Safety を考慮せずにテスト実行する。
`build_runner`のインストールも不要になりますし、テスト実行なので、こちらの方法でも良いかもしれません。
​

```bash
flutter test --no-sound-null-safety
```
