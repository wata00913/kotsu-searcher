# kotsu-searcher

CLIで交通情報の検索ができます。
交通情報の取得には、[駅すぱあとWebサービス(フリープラン)](https://ekiworld.net/service/sier/webservice/free_provision.html?utm_source=ekiworld&utm_medium=website&utm_campaign=ews_ekiworld_product_intro)を利用しています。

## インストール方法
npmでインストールします。
```sh
$ npm -i g kotsu-searcher
```

こちらの[リンク](https://ekiworld.net/free_provision/index.php?utm_source=ekiworld&utm_medium=website&utm_campaign=ews_ekiworld_product_free_header)から駅すぱあとWebサービス(フリープラン)のAPIアクセスキーを申請します。</br>

環境変数の設定をします。
```sh
EKISPERT_ACCESS_KEY=アクセスキー
```

## 使い方
```sh
kotsu-searcher <command> [<options>]
```

### timetableコマンド
駅の時刻表を検索します。時刻表の一覧表示では入力による絞り込みが可能です。

![timetable-demo](https://user-images.githubusercontent.com/85052152/204701786-5778547a-dcd5-45d4-b175-63c362ef75b3.gif)

| オプション   | データの型 | 説明                                                                                    |
|--------------|------------|-----------------------------------------------------------------------------------------|
| --hour       | Number     | 表示する時間帯を指定します。                                                            |
| --from       | String     | 表示する範囲の開始時刻を指定します。</br> 時刻の形式はhh:mm<sup>[1](#note1)</sup>です。 |
| --to         | String     | 表示する範囲の最終時刻を指定します。</br> 時刻の形式はhh:mm<sup>[1](#note1)</sup>です。 |
| --daydiagram | String     | 曜日ダイヤを指定します。</br> 平日:`weekday`、土曜:`saturday` 日・祝日: `holiday`</br> デフォルト値は`weekday`です。       |

<small id="note1"> `hh`は00〜24、`mm`は00〜59の値をとります。

## promptのキーバインド
CLIのpromptに[enquirer](https://github.com/enquirer/enquirer)を利用してます。promptで利用できるキーバインドの詳細は、enquirerの[Key Bindings](https://github.com/enquirer/enquirer#-key-bindings)を参照してください。
