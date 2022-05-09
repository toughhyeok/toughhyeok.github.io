---
layout: post
category: gradle
title: 'gradle로 npm install & npm run build 자동화'
subtitle: 'view automatic deployment'
banner: "/assets/images/common/gradle-logo.png"

---

### Gradle build 전에 `npm run build` 먼저 실행되도록 하기

#### plugins
```gradle
plugins {
	id 'org.springframework.boot' version '2.6.7'
	id 'io.spring.dependency-management' version '1.0.11.RELEASE'
	id 'com.github.node-gradle.node' version '3.2.1'
	id 'java'
}
```

`gradle`이 `node`를 사용할 수 있게 plugin 추가

참고 : [gradle-node](https://github.com/node-gradle/gradle-node-plugin)


#### node
```gradle
node {
	// node.js version
	version = '17.3.1'
	download = true // true가 아닐 경우 global로 설치된 node.js가 있어야 한다.
	nodeProjectDir = file("./src/main/view")
}
```
`node` 버전 설정, download 유무 설정, view 디렉토리 설정 (여기서 view 디렉토리는 front-end 디렉토리를 의미합니다. `"src/main/view"`)

#### task
```gradle
task setUp(type: NpmTask) {
	description = "Install Node.js packages"
	args = ['install']
}

task buildView(type: NpmTask, dependsOn: setUp){
	description = "Build Vue.js"
	args = ['run', 'build']
}
```
`buildView`는 `setUp`이 실행되고 나서 실행됩니다.

`type`이 `NpmTask`인 `task`는 `npm`으로 시작하고 뒤에 `args`들이 따라옵니다.

`setUp`은 `npm install`과 같은 기능을 합니다. `package.json`에 작성된 모듈을 `src/main/view/node_modules`에 설치합니다.

`buildView`는 `npm run build`와 같은 기능을 합니다. `.vue`, `.css`, `.js` 그리고 이미지 파일들을 `src/main/resources/static`에 `.html`, `.js`, `.css` 그리고 이미지 파일로 변환하여 저장합니다. `src/main/resources/static`은 SpringBoot가 `index.html`을 찾는 장소 중 하나입니다.


#### processResources

```gradle
processResources.dependsOn 'buildView'
```

`buildView`를 실행할 때 `setUp`이 먼저 실행되야 하므로 최종적으로 동작 순서는 다음과 같습니다.

`setUp` --> `buildView`

#### build.gradle 전체 코드

```gradle
// build.gradle
plugins {
	id 'org.springframework.boot' version '2.6.7'
	id 'io.spring.dependency-management' version '1.0.11.RELEASE'
	id 'com.github.node-gradle.node' version '3.2.1'
	id 'java'
}

group = 'com.example'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = 1.8

repositories {
	mavenCentral()
}

node {
	// node.js version
	version = '17.3.1'
	download = true // true가 아닐 경우 global로 설치된 node.js가 있어야 한다.
	nodeProjectDir = file("./src/main/view")
}

task setUp(type: NpmTask) {
	description = "Install Node.js packages"
	args = ['install']
}

task buildView(type: NpmTask, dependsOn: setUp){
	description = "Build Vue.js"
	args = ['run', 'build']
}

dependencies {
	implementation 'org.springframework.boot:spring-boot-starter-web'
	testImplementation 'org.springframework.boot:spring-boot-starter-test'
	implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
	implementation 'com.h2database:h2'
	implementation 'org.projectlombok:lombok'
	annotationProcessor 'org.projectlombok:lombok'
}

tasks.named('test') {
	useJUnitPlatform()
}

processResources.dependsOn 'buildView'
```