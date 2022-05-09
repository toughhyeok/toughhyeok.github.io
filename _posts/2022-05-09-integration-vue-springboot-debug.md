---
layout: post
category: vue.js
title: 'vue.js와 springboot 연동하기'
subtitle: 'build & debug'
banner: "/assets/images/common/vue-logo.jpeg"

---

### Project Tree

```bash
project_share_blog/src
├── main
│   ├── java
│   ├── resources
│   └── view → Client module with Vue code
└── test
    ├── java
    └── resources
```

### Vue 실행 방법

`./src/main/view/README.md` 참조

```bash
cd ./src/main/view && npm install
```

View 모듈은 `npm`으로 관리됩니다.
`./src/main/view/package.json`에 모듈 목록 및 버전을 확인할 수 있습니다.


```bash
npm run build
```

위 명령어는 `./src/main/view/src` 아래 생성된 `.vue`, `.css`, `.js` 그리고 이미지 파일들을 빌드해서 결과물을 `./src/main/resources/static` 디렉토리 아래에 저장합니다. 이 때 `.vue` 파일들은 모두 `.js` 파일로 변환됩니다.

```bash
npm run serve
```

위 명령어는 개발 중일 때에만 사용합니다. `.vue` 파일들은 build 과정을 거쳐 `.js` 파일로 변환되어야 합니다. 개발 중에는 위 명령어를 통해서 실시간으로 vue 코드를 debug 할 수 있습니다. 현재 local 환경에서는 Tomcat은 8080 포트를 사용합니다. vue 또한 8080 포트를 기본으로 사용하므로 현재는 **4000** 포트를 사용하도록 되어 있습니다. VS Editor를 이용해 debug할 경우 반드시 `launch.json`를 반드시 수정해야합니다. (`package.json` 파일안에 `script`에서 포트를 변경할 수 있습니다. 포트 변경은 local 환경에 맞게 변경해도 상관 없습니다.)

```json
// .vscode/launch.json
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "pwa-chrome",
            "request": "launch",
            "name": "Launch Chrome against localhost",
            "url": "http://localhost:4000", // 8080 -> 4000
            "webRoot": "${workspaceFolder}"
        }
    ]
}
```

무중단 배포를 위해서는 `build.gradle` 안에 script를 작성해서 `npm run build`를 실행시키도록 작성하면 됩니다. 순서는 `npm run build` 다음에 Springboot가 실행되어야 합니다.

### 🚨  개발 도중 CORS 문제 발생 시 `vue.config.js` 파일 `devServer` 수정 필요

```javascript
// vue.config.js
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // npm run build 타겟 디렉토리
  outputDir: '../resources/static',

  // npm run serve 개발 진행시에 포트가 다르기때문에 프록시 설정
  devServer: {
    proxy: 'http://localhost:8080'
  }
})
```