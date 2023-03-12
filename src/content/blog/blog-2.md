---
title: "CloudFront（CloudFront Functions）にセキュリティヘッダを追加する"
author: "Thirosue"
date: "2021-07-04"
description: "CloudFrontでセキュリティ対策した際のメモです。
具体的には、セキュリティヘッダ（Strict-Transport-Security, X-Frame-Options, X-XSS-Protection, X-Content-Type-Options, Content-Security-Policy）を追加する作業を実施します。"
---

CloudFront でセキュリティ対策した際のメモです。
具体的には、セキュリティヘッダ（Strict-Transport-Security, X-Frame-Options, X-XSS-Protection, X-Content-Type-Options, Content-Security-Policy）を追加する作業を実施します。
​
CloudFront では、[Amplify](https://qiita.com/takeshi_hirosue/items/c914fe0cc394f8ac7004 "Amplify")、[Lambda@Edge](https://dev.classmethod.jp/articles/cloudfront-lambd-edge-http-security-header/ "Lambda@Edge")でも適応できましたが、Lambda@Edge を利用すると、1 秒あたりのリクエスト上限（秒間 10000 リクエスト）があったり、地理的に最適なエッジで実行してないためパフォーマンスの考慮が必要だったりと、本番環境へ適応するには考慮が必要でした。
​
`CloudFront　Functions`がローンチされたため、この問題への対処のハードルが下がりました。
​
https://aws.amazon.com/jp/blogs/news/introducing-cloudfront-functions-run-your-code-at-the-edge-with-low-latency-at-any-scale/
​

# 前提

​
CloudFront + S3 でのホスティングが完了している状態とします
​

# 方法

​
AWS マネジメントコンソールで「CloudFront」と入力し、CloudFront のページに移動します。
​
左ペインの　「Functions」　をクリックします。
​
![](https://storage.googleapis.com/zenn-user-upload/37fa8327bb1dd485e37eb8b0.jpg)
​
つぎに、「Create Functions」ボタンをクリックします。
​
![](https://storage.googleapis.com/zenn-user-upload/1db8ec6e5343d2aeac84718d.jpg)
​
つぎに、任意の名前を入力します。
ここでは、「add-security-headers」としています。
​
![](https://storage.googleapis.com/zenn-user-upload/43b4a0b28ae1cf1a7ad291b2.png)
​
つぎに関数の内容を編集していきます。
​
AWS にて、サンプルコードを用意してくれているので、そのまま利用します。
必要に応じて、CSP コンテンツセキュリティポリシー (CSP)　の内容など調整してください。
​

```javascript
function handler(event) {
    var response = event.response;
    var headers = response.headers;
​
    // Set HTTP security headers
    // Since JavaScript doesn't allow for hyphens in variable names, we use the dict["key"] notation
    headers['strict-transport-security'] = { value: 'max-age=63072000; includeSubdomains; preload'};
    headers['content-security-policy'] = { value: "default-src 'none'; img-src 'self'; script-src 'self'; style-src 'self'; object-src 'none'"};
    headers['x-content-type-options'] = { value: 'nosniff'};
    headers['x-frame-options'] = {value: 'DENY'};
    headers['x-xss-protection'] = {value: '1; mode=block'};

    // Return the response to viewers
    return response;
}
```

​
https://github.com/aws-samples/amazon-cloudfront-functions/blob/main/add-security-headers/index.js
​
入力後、「Save」して、変更内容を反映します。
​
![](https://storage.googleapis.com/zenn-user-upload/7717016f50f7b7ef225f3c7d.png)
​
作成した関数をテストしていきます。
`CloudFront Functions`は、最大実行時間に厳しい制限（1 ミリ秒未満）があるため、必ずテストを実施し、制限をパスしているか確認しましょう。
​
今回作成した関数は、HTTP の返戻時にヘッダを付与するので、`Event　Type`を「Viewer Response」に変更して、テストを実施しましょう。
ここで表示されている Compute utilization は 100 を最大とした場合の実行時間を数値化した物となり、今回の関数は 26 だったので、制限の範囲内であることを確認できました。
​
![](https://storage.googleapis.com/zenn-user-upload/2cddeb7616324eead499d1e7.jpg)
​
テストが問題なかったため、Publis タブに移動して、公開（「Publish」ボタン押下）しましょう。
​
![](https://storage.googleapis.com/zenn-user-upload/7bf9413f4837702959529713.png)
​
最後は、Associate タブに移動して、CloudFront に適応します。
適応する CloudFront を選択し、`Event　Type`を「Viewer Response」に変更して、適応する behavior を選択して、CloudFront に適応します。
​
![](https://storage.googleapis.com/zenn-user-upload/350cb3bdf0b552fd723a81c1.png)
​
適応後、CloudFront にアクセスして、セキュリティヘッダが追加されていることを確認します。
​
![](https://storage.googleapis.com/zenn-user-upload/a72339e7e23cb5d038a6351b.jpg)
​

# 終わりに

​
AWS 公式から様々なユースケースが紹介されているので、今後活用していくシーンが出てきそうです。
​
https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-example-code.html
​
https://dev.classmethod.jp/articles/cloudfront-functions-usecases
​

# 参考

​

- Amplify でセキュリティヘッダ（Strict-Transport-Security, X-Frame-Options, X-XSS-Protection, X-Content-Type-Options, Content-Security-Policy）を追加する
  https://qiita.com/takeshi_hirosue/items/c914fe0cc394f8ac7004
  ​
- [CloudFront] Lambda@Edge で HTTP セキュリティヘッダーを追加する方法
  https://dev.classmethod.jp/articles/cloudfront-lambd-edge-http-security-header/
  ​
- Lambda@Edge のクォータ
  https://docs.aws.amazon.com/ja_jp/AmazonCloudFront/latest/DeveloperGuide/cloudfront-limits.html#limits-lambda-at-edge
  ​
- Egde ロケーションと Regional Egde ロケーション
  https://aws.amazon.com/jp/cloudfront/features/?whats-new-cloudfront.sort-by=item.additionalFields.postDateTime&whats-new-cloudfront.sort-order=desc#Global_Edge_Network
  ​
- Cloudflare Workers と Lambda@Edge
  https://www.cloudflare.com/ja-jp/learning/serverless/serverless-performance/
