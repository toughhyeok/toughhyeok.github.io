---
layout: post
category: ruby
title: 'ruby docs ri'
subtitle: 'ruby docs'
banner: "/assets/images/common/ruby-logo.png"

---

### 끝내주는 Ruby Interactive (RI)
많은 루비 개발자들에게는 알려지지 않았지만, 루비는 언어의 API와 사용 가능한 모든 라이브러리를 참조할 수 있는 훌륭한 CUI(Composite User Interface)를 가지고 있다.

### 설치 방법
```bash
rvm docs generate
```

#### Example
클래스에 대한 문서를 찾고 싶다면 `ri ClassName`을 실행한다.

```bash
ri GC
------------------------------------------------------------------------

The GC module provides an interface to Ruby's mark and sweep garbage
collection mechanism.

Some of the underlying methods are also available via the ObjectSpace
module.

You may obtain information about the operation of the GC through
GC::Profiler.
------------------------------------------------------------------------
= Constants:

INTERNAL_CONSTANTS:
  internal constants


OPTS:
  GC build options
```

특정 메서드에 대한 정보를 얻고자 한다면 메서드 이름을 인자로 넘겨준다.
```bash
ri GC::enable
= GC::enable

(from ruby site)
------------------------------------------------------------------------
  GC.enable    -> true or false

------------------------------------------------------------------------

Enables garbage collection, returning true if garbage collection was
previously disabled.

  GC.disable   #=> false
  GC.enable    #=> true
  GC.enable    #=> false
```

입력한 메서드 이름이 다수의 클래스나 모듈에 있다면 `ri`는 모든 결과를 리스트로 제공한다.

```bash
ri assoc
= .assoc

(from ruby site)
=== Implementation from Array
------------------------------------------------------------------------
  ary.assoc(obj)   -> element_ary  or  nil

------------------------------------------------------------------------

Searches through an array whose elements are also arrays comparing obj
with the first element of each contained array using obj.==.

Returns the first contained array that matches (that is, the first
associated array), or nil if no match is found.

See also Array#rassoc

  s1 = [ "colors", "red", "blue", "green" ]
  s2 = [ "letters", "a", "b", "c" ]
  s3 = "foo"
  a  = [ s1, s2, s3 ]
  a.assoc("letters")  #=> [ "letters", "a", "b", "c" ]
  a.assoc("foo")      #=> nil
```

#### `ri` 도움말
`ri --help`

끝내준다~~


### ri 사용법 관련 참고 사이트
[samuelmullen](https://samuelmullen.com/2012/01/up-and-running-with-ruby-interactive-ri/)
