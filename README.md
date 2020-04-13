# {{ name }}

> {{ description }}

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

## VS Code 代码格式化更美观, 编辑 setting.json 添加一下属性
```
{
    "vetur.format.options.tabSize": 2,
    "vetur.format.options.useTabs": false,
    "vetur.format.defaultFormatter.html": "js-beautify-html",
    "vetur.format.defaultFormatterOptions": {
        "js-beautify-html": {
            "wrap_attributes": "auto",
            "wrap_attributes_mode": "auto",
            "wrap-line-length": 180,
            "wrapped_attributes_per_line": "multiple",
            "wrapped_attributes_indent": "auto",
            "wrapped_attributes_end": "auto"
        }
    }
}
```