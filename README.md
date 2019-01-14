# element-theme

是基于 element-theme 做的二次开发，添加了在主题的每个元素外面包裹一个 class 来做命名空间的功能；

```javascript
zybet -a '[namespace]' -d "[dist]"
```

> 主题生成器

## Installation

install local or global

```shell
npm i element-theme -D
```

install `theme-chalk`

```shell
npm i element-theme-chalk -D
# or from github
npm i https://github.com/ElementUI/theme-chalk -D
```

## CLI

```shell
# init variables file
et --init [file path]

# watch then build
et --watch [--config variable file path] [--out theme path]

# build
et [--config variable file path] [--out theme path] [--minimize]
或者
zybet -a '[namespace]' -d "[dist]"
```

## Node API

```javascript
var et = require("element-theme");

// watch mode
et.watch({
  config: "variables/path",
  out: "output/path"
});

// build
et.run({
  config: "variables/path",
  out: "output/path",
  minimize: true
});
```

## Options

### config

Variable file path, default `./element-variables.css`.

### out

Theme output path, default `./theme`.

### minimize

Compressed file.

### browsers

set browsers, default `['ie > 9', 'last 2 versions']`.

### watch

watch variable file changes then build.

### components

A lists of components that you want to generate themes for. All by default.

## Config

You can configure some options in `element-theme` by putting it in package.json:

## namespace

命名空间

## dist

存放构建文件的文件名称

```json
{
  "element-theme": {
    "browsers": ["ie > 9", "last 2 versions"],
    "out": "./theme",
    "config": "./element-variables.css",
    "theme": "element-theme-chalk",
    "minimize": false,
    "components": ["button", "input"],
    "namespace": "zyb-global",
    "dist": "custom-theme"
  }
}
```
