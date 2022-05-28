---
layout: post
category: vue
title: 'Vue 개발 모드'
subtitle: ''
banner: "/assets/images/common/vue-logo.jpeg"

---
### Vue 개발 모드로 실행하기

vue 프로젝트에 `package.json` 파일을 열어보면 아래와 같은 스크립트를 볼 수 있다.

```json
...
"scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
...
```

즉 `npm run serve`라고 터미널에 입력하면 `vue-cli-service serve` 이 실행되는 것이다.

<br>

애플리케이션을 개발하다보면 다양한 버전으로 실행이 필요하게 된다. 실제 운영과 다르게 개발 환경에서 접근해야 하는 DB가 다르다거나 디버깅을 위한 다양한 메시지가 필요하다 거나...

<br>

그렇다면 환경을 다르게 해서 실행할 수 있을까?

Vue는 기본적으로 `test`, `development`, `production` 3가지 모드가 있다.

`vue-cli-service --mode development`로 실행하게 되면 개발 환경으로 애플리케이션을 실행할 수 있다.

따라서 나는 `vue-cli-service --mode development`를 `npm run start` 명령어로 사용하기 위해 `package.json` 파일에 아래와 같이 추가했다.

```json
...
"scripts": {
    "start": "vue-cli-service serve --mode development",
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
...
```

(개발, 운영에서는 다른 포트를 사용해서 실행하고 싶다면 위 방법으로 포트도 설정해줄 수 있다.)

이렇게 다른 모드로 애플리케이션을 실행하게 되면 사용할 수 있는 환경 변수를 아래와 같은 파일을 통해 구분할 수 있다.

* `.env.local` : 모든 모드에서 언제나 로딩된다.
* `.env.[mode].local` : 특정 모드에서만 로딩된다.

<br>

또한 `.local` 파일을 사용하면 노출되면 안되는 key들을 저장해 사용할 수 도 있다. 나는 kakao Map api 를 사용하기 위해서 JavaScript Service Key를 따로 저장해야 했다. 하지만 api key를 노출 시키는 것은 보안에 위험하므로 아래와 같은 방법을 사용했다. 

`.env.development.local` 파일을 vue 프로젝트의 위치 (`package.json`, `vue.config.js`, ... 파일이 있는)에 만들고 아래와 같이 입력했다.

```
# .env.development.local
VUE_APP_KAKAO_MAP_SERVICE_KEY="어쩌고 저쩌고 API KEY ~~@!#!@#"
```

이렇게 저장하고 실제로 사용하는 방법은 `process.env.VUE_APP_KAKAO_MAP_SERVICE_KEY`로 사용할 수 있다. `process.env`를 출력해 보면 아래와 같은 결과를 얻을 수 있다.

```JS
console.log(process.env);
```

<br>

```bash
BASE_URL: "/"
NODE_ENV: "development"
VUE_APP_KAKAO_MAP_SERVICE_KEY: "어쩌고 저쩌고 API KEY ~~@!#!@#"
```