# stylint-html-reporter
HTML reporter for [Stylint](https://github.com/rossPatton/stylint) 

## Install

To install for local project:

```
npm install stylint-html-reporter --save
```

## Usage

### CLI

You need to set `reporter` to `stylint-html-reporter`

```shell
stylint --reporter stylint-html-reporter path/to/filename.styl
```

### Non CLI

You need to set `reporter` to `stylint-html-reporter` in config object.

```json
{
  "reporter": "stylint-html-reporter",
  "reporterOptions": {
    "reportPath": "../reporters/stylint-report.html"
  }
}
```

`reportPath` is path where report is saved, default value is `./stylint-html-report.html`
