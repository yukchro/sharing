# SASS（SCSS)について
Node-sass(lib Sass)がdeprecatedになるのでdart-sass移行を推奨。  
* scssの@importやglobが使えない  
* @importの代わりに@useと@forwardを使う。  
  variablesを読み込んだfunctionsを読み込んだscss内でvariablesを参照したいとき@forwardsを使う
* 数式計算に@use sass:mathが必要になること(なくても動くけど怒られる)  
* @use、@forwardは他のルールより前に宣言する必要がある。  
  そのため@importのようにネストさせることはできない
  ```
  .class {
    @use "./elements"; // エラー
  }
  ```

* @useしたscss内の関数やミックスインなどを使う場合以下のように書く必要がある。
  ```
  @use "./functions" as *; //名前空間を指定することもできる

  @include mixin() {

  }
  ```

## Policy
個人的に心がけていること
* 基本的にはFLOCSSで命名してます。  
* スタイルを指定するすべての要素にクラス名を付けています。  
* パーシャルは細かく  
  1つのBlock、行数が多くなる場合はElement単位で分割する
* メディアクエリーは一括ではなく個々のブロック内で指定  
* ページ数の多い案件では基礎・共通要素の多いcssとページ別のcssに出力して読み込む。  
  LPやページが少ない案件では1個のCSSにまとめる。
## Tips

* :not()セレクタ  
  :not(:last-child)でボーダー引いたりで使えます。
* font-feature-setting: "palt";  
  記号などのカーニングが詰まります。ffsで呼べます。  
  1文字単位のカーニングは現実的に無理なので呪いながら画像にします。
* clip-path  
  要素を様々な図形に切り抜くことができます。  
  transitionやanimationで動かせるので控えめにって神です。
* css-triangle  
  borderを使ったcssの三角形です。  
  10年以上前からある手法ですが、▶リンク みたいなのでは今でも使います。
* linear-gradient     
  線形グラデーションです。   
  repeating-linear-gradientを使うとストライプやドット、グリッドなんかも作れます。  
* aspect-ratio  
  アスペクト比を指定できます。  
  要素の幅(高さ)に対してアスペクト比を保ちながら高さ(幅)が変化するようになります。  
  なおa = (横比/縦比) / 100とすると width * a = height、height / a = widthとなるので、  
  以下のようにすると同じことができます。Youtubeやgoogleマップの埋め込みで使えます。
  ```
  .content {
    position: relative;

    &::before {
      content: "";
      padding-top: 56.25%;
    }
  }
  ```

## function(s)
引数を計算した値がほしい場合

* letter-spacing($val)  
  Photoshopのトラッキング設定の数値 / 1000emで近似できるそうです。  
  微妙に違う気もするので結局その都度変更してます。  


## scss placeholder
任意の名前に%を付けて宣言し@extendで使用する。  
ほぼ同じだけど色だけ違うみたいな要素に使う。  
mixinと違い何回継承してもplaceholderの内容は1つしか出力されない。
```
%example {
  position: absolute;
  width: 24px;
  height: 24px;
  background-size: 24px 24px;
}

.selectorA {
  @extend %example;
  background-image: url("file-a.png");
}

.selectorB {
  @extend %example;
  background-image: url("file-b.png");
}
```

## Media Queries
ここ要検討  
mapを使用して特定のブレイクポイントを細かく設けるパターン。    
```
$breakpoints: (
	s: 'only screen and (min-width:480px)',
	sm: 'only screen and (max-width:640px)',
	md: 'only screen and (max-width:768px)',
	lg: 'only screen and (min-width:960px)',
	xl: 'only screen and (min-width:1280px)',
	xxl: 'only screen and (min-width:1440px)',
);

@mixin mq($breakpoint) {
  @media #{map-get($breakpoints, $breakpoint)} {
    @content;
  }
}
``` 
引数で直接指定するパターン。デフォルト値を設定しておけば関数名だけでも呼び出せる。  
```
@mixin mq($vpw='768', $mode='gte') {
  @if $mode=='gte' {
    @media screen and (min-width: #{$vpw}px) {
      @content;
    }
  @else if $mode == 'lte' {
    @media screen and not (min-width: #{$vpw}px) {
      @content;
    }
  }
}
```

#### メディア特性hover
メディアクエリでhoverが有効なデバイスにのみ:hoverセレクタを適用できます。  
※モバイルで:hoverを設定するとタップが2回必要になることがある。
```
@media (hover: hover) {
  &:hover {
    color: #fff;
  }
}
```

### メディアクエリのピクセルズレ
Windowsは解像度のほかに表示倍率の設定があり、この設定によってブラウザのpxが微妙にズレる。  
そのためブレイクポイントに±1pxで切り替えると境目で適用されなくなります。 ([参考](https://twitter.com/shoko1851/status/1350669489571037184?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1350669489571037184%7Ctwgr%5Edbf2d56348e60bbb1eab1c70f7eeae74b1d65dca%7Ctwcon%5Es1_&ref_url=https%3A%2F%2Fembed.zenn.studio%2Ftweetzenn-embedded__08f5ae24b2c3b))  
not演算子を使って反転させるほうが論理的です。

### レベル4の構文拡張の使用
