# atomicss

## 引言

> 所有的前端技术似乎都有一些共通的弱点和发展历程 : 草创时潦草的设计, 快速发展时百花齐放的解决方案, 目眩神离的新特性, 可怜巴巴的浏览器支持率. 

## 我们拥有的 css

### css的缺陷

- 没有作用域/模块概念,  所有的东西都是全局的, 可能影响到整个页面的 (css3 nesting class)
- 没有常量 (css3 var)
- 没有复用机制, 不能自定义函数
- 选择器造成的隐式依赖, 不敢删除 css
- 缺乏和 js 的交互能力
...
- 茫茫多的解决方案

### 现有的 css 解决方案

#### 基于原生 css 的解决方案

##### OOCSS

OO 就代表了 [oocss] 特点, **面向对象**的 css. 因此, oocss 更加注重重用.

**示例**:

```css
.size {width: 25%;}
.bgBlue {background:blue}
.g-bd2{margin:0 0 10px;}
```


**原则**:

- 独立的结构和样式
- 独立的容器和内容

这个用过 [bootstrap] 的应该都有所体验, bootstrap 中, grid 布局(容器)和组件(内容)独立, 样式(主题, 颜色)和结构(大小)独立.

**特征**: 

- 强调重用
- 选择器简洁
- 可扩展类
- 强调风格与内容分离
- 强调内容与容器分离

**缺点**:

- 大量使用演示类
- 需要在模板中应用演示类
- 样式(CSS)和结构(HTML)藕合太紧
- 如果设计变动，需要更改CSS和HTML
- 创建了数千行CSS，但有可能这些CSS永远不会被使用。比如Twitter Bootstrap

> 其他参考: 
> [w3cplus oocss]

##### SMACSS

SMACSS 将 css 划分为五种类别: 

- Base: 基本规则, 包括重置样式表之类,
- Layout: 布局划分, 比如划分为 main, header, footer
- Module: 模块, 相当于组件, modal. navbar...
- State: 状态样式, 比如 disable, active, 可以使用 !important 覆盖
- Theme: 主题样式集

有点类似 oocss, 只不过划分更加具体

>其他参考:
>[探索 SMACSS：可扩展的模块化 CSS 框架] 

##### BEM

>目前最常用的, (实际上 OOCSS, SMACSS, BEM 等都是可以混用的, 一般就算使用了 OOCSS 什么的也会在具体组件里面用 BEM)

BEM 是 block, element 和 modifier 的首字母, 一般写为 `block__element--modifier`, 或者 `block__element_modifier`, 

**写法**:

```html
<div class="el-row">
//                         block-element--modifier
  <button class="el-button el-button--primary">主要按钮</button>
  <button class="el-button el-button--success">成功按钮</button>
  <div class="el-row__wrap>
    <p class="el-row__wrap--bar"></p> 
  </div> 
</div>
```

```scss
.el{
  &-button{
    width: 100%;
    &--primary{
      color: blue;
    }
    &--success{
      color: green;
    }
  }
  &-row{
    font-size: 20px;
    &__wrap{
      color: red;
      &--bar{
        background-color: #ccc;
      }
    }
  }
}
```

##### ITCSS

ITCSS 将 css 划分为几层:

- Settings –与预处理器一起使用，并包含字体，颜色定义等。
- Tools–全局使用的mixin和功能。重要的是不要在前2层中输出任何CSS。
- Generic  –重置或规范化样式，框大小定义等。这是生成实际CSS的第一层。
- Elements  –HTML元素（例如H1，A等）的样式。这些带有浏览器的默认样式，因此我们可以在此处重新定义它们
- Objects  –定义未装饰设计模式的基于类的选择器，例如OOCSS已知的媒体对象
- Components –特定的UI组件。这是我们大部分工作的地方，我们的UI组件通常由对象和组件组成(可以使用!important)
- Utilities –工具程序类能够覆盖三角形中之前发生的样式


![2acdfeae59c83593a5906345514d563f1592145119.jpg](https://cdn.jsdelivr.net/gh/chiicy/images/2acdfeae59c83593a5906345514d563f1592145119.jpg)

#### css module
[css module] 侧重解决 css 作用域和没有嵌套的问题, 通过打包时, 给 className 重新命名来使名称不重复, 这样就不会产生样式冲突.



#### 预处理器阵营

- [less]
- [scss/sass]
- [stylus]
- [myth]

这些预处理器可能预发略有差异, 但是基本都提供了一些基本能力: 

1. 变量 (实现 theme 等功能)
2. 自定义的函数或 mixin (代码复用)
3. nesting class (相当于作用域)
4. import (模块)
5. 一些功能函数 (颜色处理等)
  ...

这些预处理器帮助我们解决了 css 大部分问题, 要说有什么缺点, 那大概还是缺乏和 js 的互动性(不如 css3 var), 仍然需要和上述的`代码风格`解决方案混用以解决工程化, 以及毕竟不是原生

#### postcss

从命名看, [postcss] 像是和预处理相对的**后处理**, 但是实际上 postcss 能做的事情很多, postcss 首先将 css 解析成 AST, 然后用 js 进行操作, 因此能做的事情很多, 什么 autoprefix 啊, cssnext 之类, 已经超过了一般后处理工具的范围.

#### css in js


##### emotion

##### 提取出 css 文件

这个功能在 emotion 9 中已经不推荐使用, 在 emotion 10 中已经废弃. 在 css in js 体系下, static css 带来的收益远远不如带来的局限性.

> [static css babel]

- 无法使用变量

```jsx
// 一般 css in js 和 js 的交互
const Button = styled('button')(
  (props) => 
    ({ backgroundColor: props.success ? '#8BC34A' : '#2395f3';
     padding: '10px';})
  )
<Button success/>

// 只能使用 css 变量
const Button = styled('button')`
  background-color: var(--bg);
  padding: 10px;
`
<Button style={{ '--bg': props.success ? '#8BC34A' : '#2395f3' }}/> 
```

- 无法使用 composition

```jsx
const base = css`
  color: hotpink;
`

render(
  <div
    className={css`
      ${base};
      background-color: #eee;
    `}
  >
    This is hotpink.
  </div>
)
```

- 无法使用 [facepaint]

```jsx
import { css } from 'emotion'
import facepaint from 'facepaint'

const mq = facepaint([
  '@media(min-width: 420px)',
  '@media(min-width: 920px)',
  '@media(min-width: 1120px)'
])

const myClassName = css(mq({
  color: ['red', 'green', 'blue', 'darkorchid'],
}))
```

> [facepaint] 简化了样式断点的配置, 允许我们针对不同断点写多个样式

这之中的关键点在于, 我们无法享受到, 当 css = js 时, js runtime 时期的种种好处.

##### styled-system

[styled system] 在 [styled components] 和 [material ui] 中都有应用, (beast-core)也有使用.

**特点**:

- 将样式分类成 `typography`, `space`, `color` 等, 可以更简单的配置组件的样式定义能力.

- 断点能力, 主题能力



**示例**:

```jsx
import styled from '@emotion/styled'
import { typography, space, color } from 'styled-system'

const Box = styled('div')(
  typography,
  space,
  color
)
<Box
  fontSize={4}
  fontWeight='bold'
  p={3}
  mb={[ 4, 5 ]}
  color='white'
  bg='primary'>
  Hello
</Box>


// example button variants
buttons: {
  primary: {
    color: colors.white,
    backgroundColor: colors.blue,
  },
  secondary: {
    color: colors.white,
    backgroundColor: colors.green,
  },
  danger: {
    color: colors.white,
    backgroundColor: colors.red,
  },
}

// using a button variant
<Button variant='primary' />
```

一样, 因为过多的 js css 交互, 他们也通常无法提取静态文件

但是统样可以在设计 css 时候运用这种思想, 现在很多 css 类库都是这种思想的.

##### 其他 css in js

[github css in js] 

## atomic css

**特点**:

- 单一职责, 一个 class 只做一件事情
- 组合性, responsive
- 不会重复写样式
- css 文件不会增长
- css 文件基本不变, 有利于 cdn 缓存

**示例**:

```css
.Bgc(#0280ae.5){
  background-color: #0280ae.5;
}
.C(#fff){
  color: #fff;
}
.P(20px){
  padding: 20px;
}
```

```html
<div class="Bgc(#0280ae.5) C(#fff) P(20px)">
    Lorem ipsum
</div>
```

这就是初代 atomic css ([acss]) 的样子, api 不太讨喜.

### tailwind css

[tailwind css] 堪称 atomic css plus , 目前最好用的. 如果仔细看上文, 其实会觉得, 这玩意不就是 [oocss] 吗? 好吧, 他的确很像(甚至可以说 atomic css 是做的更少的 oocss)

大家喜闻乐见的 [bootstrap] 就是 [oocss] 的典型应用, 然后他还有一个 `twitter atomic bootstrap` 版本, 但是 [tailwind css] 并不像这些库一样提供很多组件, 他只有一些底层的工具类名, 然后自己组合成需要的组件, 所以它更小更精悍

#### 特性

**响应式**:

```html
<div class="justify-start sm:justify-center md:justify-end lg:justify-between xl:justify-around ...">
  <!-- ... -->
</div>
```

**组件友好**:

```html

<!-- Using utilities: -->
<button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
  Button
</button>

<!-- Extracting component classes: -->
<button class="btn btn-blue">
  Button
</button>

<style>
  .btn {
    @apply font-bold py-2 px-4 rounded;
  }
  .btn-blue {
    @apply bg-blue-500 text-white;
  }
  .btn-blue:hover {
    @apply bg-blue-600;
  }
</style>

```

**自定义能力强**

```js
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      tablet: '768px',
      desktop: '1024px',
    },
    colors: {
      primary: {
        100: '#ebf8ff',
        300: '#90cdf4',
        500: '#4299e1',
        700: '#2b6cb0',
        900: '#2a4365',
      },
      secondary: {
        100: '#fffff0',
        300: '#faf089',
        500: '#ecc94b',
        700: '#b7791f',
        900: '#744210',
      },
    },
    extend: {
      boxShadow: {
        huge: '0 30px 60px -15px rgba(0, 0, 0, .25)'
      }
    }
  }
}
```

**其他优点**:

- 提供了 [tailwindcss intellisense] 的 vs code 插件
- 大家都使用了统一的 css 库, 那么一些样式就可以完全通用, 积淀出模板比如 [tailblocks]


### 其他 atomic css

[github atomic css] 

### css in js + atomic css

#### atomic css 的缺点

- 一次性要加载全量的 css 文件, 即使你的项目从来没有使用过这些样式
- 要提前定义好所有的 css, 如果一开始没有定义好, 那么后面的开发会难以使用 

这就导致我们通常要使用第三方的库, 比如 [tailwind css], 以避免开发过中发现自己一开始定义的 class 表考虑不周.

#### 使用 css in js 可以解决这些问题

一个 [styletron] 的例子:

```jsx
import { styled } from "styletron-react";

export default () => {
  // Create a styled component by passing
  // an element name and a style object
  const Anchor = styled("a", {
    fontSize: "20px",
    color: "red"
  });
  return <Anchor href="/getting-started">Start!</Anchor>;
};
```

output: (css 生成了 atomic 的样子)

```html
<html>
  <head>
    <style>
      .foo {
        font-size: 20px;
      }
      .bar {
        color: red;
      }
    </style>
  </head>
  <body>
    <a href="/getting-started" class="foo bar">Start!</a>
  </body>
</html>
```

这样, 用一个被加一个, 不用再担心加载了没用上的 css,  css 的也可以随时变动, 不会在开发中途发现设计缺陷以后难以修改

**简单实现**:

```js
import * as CSS from 'csstype';

export type CSSProperties = CSS.Properties<string | number>;

export type CSSPseudos = { [K in CSS.Pseudos]?: CSSObject };

export interface CSSObject extends CSSProperties, CSSPseudos {
  [key: string]: CSSObject | string | number | undefined;
}

export type CSSKeyframes = object & { [key: string]: CSSObject };

let _cache: { [key: string]: string } = {};
let _prefix = 'x';
const _rules: string[] = [];

let insert = (rule: string) => _rules.push(rule);

// 对  `msOverflowX` `MozAnimation` `WebkitAlignContent` `OAnimation`这写前缀做处理, 统一成 `-$&`
// 这样如果一个样式被多个前缀写了一遍, 记为同一个
const hyph = (s: string) => s.replace(/[A-Z]|^ms/g, '-$&').toLowerCase();

// 将 media 处理成 `"@media screen and (min-width: 40em)": {...css}` 的字符串
const mx = (rule: string, media: string) =>
  media ? `${media}{${rule}}` : rule;

  // 生成 .x0 {...css}
const rx = (cn: string, prop: string, val: string | number) =>
  `.${cn}{${hyph(prop)}:${val}}`;

// 删除掉 &
const noAnd = (s: string) => s.replace(/&/g, '');

const parse = (obj: CSSObject, child = '', media?: string) =>
  Object.keys(obj)
    .map((key) => {
      const val = obj[key];
      if (val === null) return '';
      if (typeof val === 'object') {
        // 判断是否是 media 选择器
        const m2 = /^@/.test(key) ? key : null;
        const c2 = m2 ? child : child + key;
        return parse(val, c2, m2 || media);
      }
      // atomic css 的特点就是 css 尺寸小, 同一个样式只会插入一次
      // 所以用 cache 将结果缓存起来
      const _key = key + val + child + media;
      if (_cache[_key]) return _cache[_key];
      // 生成唯一的 className
      const className = _prefix + _rules.length.toString(36);
      // 插入到 style 标签
      insert(mx(rx(className + noAnd(child), key, val), media));
      _cache[_key] = className;
      return className;
    })
    .join(' ');

type Atomicss = ((...style: CSSObject[]) => string) & {
  css: () => string;
  reset: () => void;
  prefix: (prefix: string) => void;
};

export const atomicss: Atomicss = (...styles) => {
  return styles
    .map((style) => parse(style))
    .join(' ')
    .trim();
};

atomicss.css = () => _rules.sort().join('');
atomicss.reset = () => {
  _cache = {};
  while (_rules.length) _rules.pop();
};
atomicss.prefix = (prefix) => (_prefix = prefix);

if (typeof document !== 'undefined') {
  const sheet = document.head.appendChild(document.createElement('style'))
    .sheet as CSSStyleSheet;
  insert = (rule) => {
    sheet.insertRule(rule, sheet.cssRules.length);
    return _rules.push(rule);
  };
}

export default atomicss;

```

**导致问题**:

一般用上 css in js 以后, 就不在能导出静态 css 文件了, 这就丧失了一个巨大的优点, cdn 缓存. 当然, 我们仍可以使用一些 [static css babel] 工具导出, 但这前提是我们要自我阉割, 不使用和 js 交互的一些能力.

### 推荐阅读

[如何管理 CSS '内裤'] 

[探索 SMACSS：可扩展的模块化 CSS 框架]

[Tailwind CSS vs Bootstrap: Learn about the differences]

[Enduring CSS: writing style sheets for rapidly changing, long-lived projects]

[React: CSS in JS – NationJS]
(cssnext 作者放弃 cssnext 时的 ppt)

[side-effects-in-css]

[oocss-atomic-css-responsive-web-design-anti-pattern]

[「CSS思维」组件化VS原子化]


[oocss]: https://github.com/stubbornella/oocss/tree/master/oocss "oocss"
[bootstrap]: https://getbootstrap.com/ "bootstrap"
[w3cplus oocss]: https://www.w3cplus.com/css/oocss-concept "w3cplus oocss"
[scss/sass]: https://sass-lang.com/ "scss/sass"
[less]: http://lesscss.org/ "less"
[stylus]: https://learnboost.github.io/stylus/ "stylus"
[myth]: http://myth.io/ "myth"
[postcss]: https://postcss.org/ "postcss"
[github atomic css]: https://github.com/topics/atomic-css?l=css&o=desc&s=stars "github atomic css"
[github css in js]: https://github.com/topics/css-in-js?l=javascript&o=desc&s=stars "github css in js"
[tailwind css]: https://github.com/tailwindcss/tailwindcss "tailwind css"
[探索 SMACSS：可扩展的模块化 CSS 框架]: https://zhuanlan.zhihu.com/p/44851489 "探索 SMACSS：可扩展的模块化 CSS 框架"
[css module]: https://github.com/css-modules/css-modules "css module"
[facepaint]: https://github.com/emotion-js/facepaint "facepaint"
[styled system]: https://styled-system.com/ "styled system"
[static css babel]: https://github.com/emotion-js/emotion/blob/v6.0.2/src/babel.js "static css babel"
[styled components]: https://github.com/styled-components/styled-components/tree/master/packages/styled-components "styled components"
[material ui]: https://material-ui.com/ "material ui"
[tailblocks]: https://mertjf.github.io/tailblocks/ "tailblocks"
[acss]: https://acss.io/ "acss"
[tailwindcss intellisense]: https://tailwindcss.com/docs/intellisense "tailwindcss intellisense"
[styletron]: https://www.styletron.org/ "styletron"

[如何管理 CSS '内裤']: https://juejin.im/post/5ba862d9f265da0ae472868a#heading-6 "如何管理 CSS '内裤'"
[探索 SMACSS：可扩展的模块化 CSS 框架]: https://zhuanlan.zhihu.com/p/44851489 "探索 SMACSS：可扩展的模块化 CSS 框架"
[Tailwind CSS vs Bootstrap: Learn about the differences]: https://themesberg.com/blog/design/tailwind-css-vs-bootstrap "Tailwind CSS vs Bootstrap: Learn about the differences"
[Enduring CSS: writing style sheets for rapidly changing, long-lived projects]: https://benfrain.com/enduring-css-writing-style-sheets-rapidly-changing-long-lived-projects/#l1 "Enduring CSS: writing style sheets for rapidly changing, long-lived projects"
[React: CSS in JS – NationJS]: http://blog.vjeux.com/2014/javascript/react-css-in-js-nationjs.html "React: CSS in JS – NationJS"
[side-effects-in-css]: https://philipwalton.com/articles/side-effects-in-css/ "side-effects-in-css"
[oocss-atomic-css-responsive-web-design-anti-pattern]: https://benfrain.com/oocss-atomic-css-responsive-web-design-anti-pattern/ "oocss-atomic-css-responsive-web-design-anti-pattern"
[「CSS思维」组件化VS原子化]: https://juejin.im/post/5b4063936fb9a04fb016b738 "「CSS思维」组件化VS原子化"
