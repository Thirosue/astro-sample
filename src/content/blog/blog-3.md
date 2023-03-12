---
title: "Amplify Stadio - UI Library を試してみる"
author: "Thirosue"
date: "2022-02-23"
description: "ちょっと遅れましたが、2021年のre:Inventで発表されたAmplify Studioの新機能(UI Library)を触ってみました。
公式の以下の記事プラスでAppSyncとの連携まで試してみたので、メモしておきます。"
---

ちょっと遅れましたが、2021 年の re:Invent で発表された Amplify Studio の新機能(`UI Library`)を触ってみました。
公式の以下の記事プラスで AppSync との連携まで試してみたので、メモしておきます。

[AWS Amplify Studio – 最小限のプログラミングで Figma からフルスタックの React アプリを実現](https://aws.amazon.com/jp/blogs/news/aws-amplify-studio-figma-to-fullstack-react-app-with-minimal-programming/)

https://aws.amazon.com/jp/blogs/news/aws-amplify-studio-figma-to-fullstack-react-app-with-minimal-programming/

## 最終的に作成するページ

![](https://storage.googleapis.com/zenn-user-upload/b5dd1db52d2b-20220213.png)

## 事前準備

- `Amplify Hosting` -> `Amplify Studio`起動 までは以下の記事などを参考に完了していること

https://zenn.dev/ufoo68/books/dd47602c20ec472d11de/viewer/setup-amplify

https://zenn.dev/ufoo68/books/dd47602c20ec472d11de/viewer/develop-amplifystudio#amplify-studio%E3%82%92%E8%B5%B7%E5%8B%95%E3%81%97%E3%82%88%E3%81%86

- Figma のアカウントを作成済みであること

- React アプリ（`npx create-react-app　sample-app`）でアプリを作成済であること

## 手順

1. データモデル作成、サンプルデータ登録
2. サンプルコンポーネント取り込み
3. コンポーネントプロパティ設定
4. サンプルデータを取得するコーディング

## データモデル作成、サンプルデータ登録

### データモデル生成

`Amplify Studio`を起動したら、`Set up` -> `Data`から添付の通りの定義のモデルを生成します。

![](https://storage.googleapis.com/zenn-user-upload/cb8a5cafbe61-20220213.png)

![](https://storage.googleapis.com/zenn-user-upload/1705f4de7f4f-20220213.png)

### サンプルデータ生成

つぎに、`Mangage` -> `Content`から以下のテストデータを投入します。

![](https://storage.googleapis.com/zenn-user-upload/13c2a884141e-20220213.png)

| Name             | Description              | Star | Price | ImageUri                                                                            |
| :--------------- | :----------------------- | ---: | ----: | :---------------------------------------------------------------------------------- |
| コーヒー         | コクのある苦味がうりです |    4 |   500 | https://raw.githubusercontent.com/Thirosue/hosting-image/main/img/drink/coffee.jpeg |
| ホットティー     | 風味豊かな紅茶です       |    5 |   700 | https://raw.githubusercontent.com/Thirosue/hosting-image/main/img/drink/tea.jpeg    |
| オレンジジュース | 濃縮還元 100%です        |    3 |   600 | https://raw.githubusercontent.com/Thirosue/hosting-image/main/img/drink/orange.jpeg |

![](https://storage.googleapis.com/zenn-user-upload/7b18df0e02d9-20220213.png)

テストデータ投入後の状態

![](https://storage.googleapis.com/zenn-user-upload/bfaee16d1f5d-20220213.png)

## サンプルコンポーネント取り込み

AWS より`AWS Amplify UI Kit`が提供されているので、Figma のアカウントにコンポーネントを複製する。

https://www.figma.com/community/file/1047600760128127424

![](https://storage.googleapis.com/zenn-user-upload/9d50428d60ec-20220213.png)

取り込んだコンポーネントから右クリック -> `Copy/Paste as` -> `Copy link`で共有ファイルのリンクを取得する。

`Design` -> `UI Libray`に上記で取得したリンクを貼り付ける。

![](https://storage.googleapis.com/zenn-user-upload/5f0723128a27-20220213.png)

![](https://storage.googleapis.com/zenn-user-upload/7727cb840463-20220213.png)

`Acccept all`で全て取り込む。

![](https://storage.googleapis.com/zenn-user-upload/6a69a00dd755-20220213.png)

正常終了するとコンポーネントが 28 個取り込まれる。

![](https://storage.googleapis.com/zenn-user-upload/71fec3390b2b-20220213.png)

## コンポーネントプロパティ修正

今回のサンプルでは、以下コンポーネントを利用するため、コンポーネントプロパティを修正し、カスタマイズできるようにする。

- NavBar
- HeroLayout4
- CardC
- MarketingFooter

### NavBar, HeroLayout4, MarketingFooter

レスポンシブデザインに対応するため、width を変更できるようにする。

- `Configure` -> `Add Prop`

![](https://storage.googleapis.com/zenn-user-upload/f5fae69959a4-20220213.png)

![](https://storage.googleapis.com/zenn-user-upload/7703dfc2c631-20220213.png)

Name を`width`、Type を`String`で追加する

![](https://storage.googleapis.com/zenn-user-upload/ec0cff770621-20220213.png)

`Element tree` -> `NaviBar`（最上位のツリー）にフォーカスを当てる

![](https://storage.googleapis.com/zenn-user-upload/752fb12d9be7-20220213.png)

Prop に`width`を選択し、上記で作成したプロパティの`width`を選択する。

![](https://storage.googleapis.com/zenn-user-upload/ffb3168458d1-20220213.png)

同様に、`HeroLayout4`コンポーネント、 `MarketingFooter`コンポーネントも width をカスタマイズできるようプロパティを追加する。

### CardC

CardC については、プロパティを以下の 2 つ追加する。

> データモデルを作成している場合、Type として作成したデータモデルを選択できる

- Name: thumbnailHeight / Type: String / Default: 250px
- Name: drink / Type: Drink

![](https://storage.googleapis.com/zenn-user-upload/00aa3b2beba0-20220213.png)

- Image の height に `thumbnailHeight`　を設定

- Image の src に `drink.ImageUri`　を設定

> 作成したモデルのプロパティを設定可能

![](https://storage.googleapis.com/zenn-user-upload/de595cbbdf98-20220213.png)

- Main Text の　名前 Label 　に `Drink.Name`

![](https://storage.googleapis.com/zenn-user-upload/aec19bd540b2-20220213.png)

- Main Text の　説明 Label 　に `Drink.Discription`

![](https://storage.googleapis.com/zenn-user-upload/fca2560f1e90-20220213.png)

- Rating の　`value` 　に `Drink.Star`

![](https://storage.googleapis.com/zenn-user-upload/a394c1271587-20220213.png)

- Main Text の 料金 Label 　に `Drink.Discription`　+ "円" を連結

> Concatenate で固定値を連結してラベルを生成可能

![](https://storage.googleapis.com/zenn-user-upload/63cb8d6a6efa-20220213.png)

設定完了後、`amplify pull`でローカルにコンポーネントを同期する。

## サンプルデータを取得するコーディング

### amplify setup

`Get compornent code` -> `Initial project setup` の通り、index.js を編集する。

![](https://storage.googleapis.com/zenn-user-upload/9528acd055d7-20220213.png)

- 修正差分

https://github.com/Thirosue/amplify-ui-library-sample/commit/8efe170e0094faf20dd5e970a269500ace885000#diff-bfe9874d239014961b1ae4e89875a6155667db834a410aaaa2ebe3cf89820556

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Amplify from 'aws-amplify';　#　<---追加
import "@aws-amplify/ui-react/styles.css";　#　<---追加
import {AmplifyProvider} from "@aws-amplify/ui-react";　#　<---追加
import awsconfig from './aws-exports';　#　<---追加
Amplify.configure(awsconfig);　#　<---追加

ReactDOM.render(
  <React.StrictMode>
    <AmplifyProvider>　#　<---追加
      <App />
    </AmplifyProvider>　#　<---追加
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

### Tailwind 　 CSS

ブログ記事では、コレクション機能でリスト表示を実現していましたが、CSS 　ユーテリティでも同様のことが実現できるため、本サンプルでは、Tailwind を CDN から利用します。

- 修正差分

https://github.com/Thirosue/amplify-ui-library-sample/commit/f7fffb4a8661628e301aaf438b1ffd1d26ddd1e8#diff-c2cc24bc9001b11b6add48a4cd8f893d5d6c6e4d1bd254158bd14ab997f552cd

```index.html
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->
    <script src="https://cdn.tailwindcss.com"></script> <!-- 追加 -->
    <title>React App</title>
```

### 作成したコンポーネントを利用する

`App.js`を編集し、`UI-Library`から連携されたコンポーネントを利用してみる。

- 修正差分

https://github.com/Thirosue/amplify-ui-library-sample/commit/0db3fe6b6dfda223391d0a96419548bcf3605501#diff-3d74dddefb6e35fbffe3c76ec0712d5c416352d9449e2fcc8210a9dee57dff67

```javascript
import { NavBar, HeroLayout4, CardC, MarketingFooter } from "./ui-components";

function App() {
  return (
    <>
      <NavBar width={"100%"} />
      <HeroLayout4 width={"100%"} />
      <div className="mt-16" />
      Contents
      <div className="mb-16" />
      <MarketingFooter width={"100%"} />
    </>
  );
}

export default App;
```

Figma どおり表示されている

![](https://storage.googleapis.com/zenn-user-upload/9f5bc794f2c3-20220213.png)

### データ取得

フックを追加し、データを取得する。

- 修正差分

https://github.com/Thirosue/amplify-ui-library-sample/commit/89e788ab1482d2e93dc9abc34f86fdda6b99e522#diff-3d74dddefb6e35fbffe3c76ec0712d5c416352d9449e2fcc8210a9dee57dff67

```javascript
import { useEffect, useState } from "react";
import { DataStore, Predicates } from "aws-amplify";
import { Drink } from "./models";
import { NavBar, HeroLayout4, CardC, MarketingFooter } from "./ui-components";

function App() {
  const [drinks, setDrinks] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const drinks = await DataStore.query(Drink, Predicates.ALL, {
        page: 0,
        limit: 10,
      });
      console.log(drinks);
      setDrinks(drinks);
    }
    fetchData();
  }, [Drink]);

  return (
    <>
      <NavBar width={"100%"} />
      <HeroLayout4 width={"100%"} />
      <div className="grid m-32 grid-cols-3 gap-20">
        {drinks.map((drink, i) => (
          <CardC key={i} drink={drink} thumbnailHeight={"250px"} />
        ))}
      </div>
      <MarketingFooter width={"100%"} />
    </>
  );
}

export default App;
```

### 所管

- UI/UX 検証型開発（デザイン変更が多めの案件）でデザインチームが作成したモックを開発チームがプロダクト反映するプロセスの辛みが軽減される未来があるかも
- `UI-Kit`（ex: [Base UI-Kit by Tatiana](https://www.figma.com/community/file/1073152252390368270)）は、プロジェクト資源とは別管理し、必要なものを育てていく
- プロジェクトで利用するコンポーネントは、上記、`UI-Kit`からクローンした部品で生成し、基本使い捨てるが良さそう
- 機能性重視の管理者向けの管理画面は、`Tailwind　CSS`、`MUI`などを素直に利用する方が生産性は高くなりそう

## 参考記事

https://aws.amazon.com/jp/blogs/news/aws-amplify-studio-figma-to-fullstack-react-app-with-minimal-programming/

https://zenn.dev/ufoo68/books/dd47602c20ec472d11de/viewer/develop-react

https://dev.classmethod.jp/articles/aws-amplify-studio-public-preview/
