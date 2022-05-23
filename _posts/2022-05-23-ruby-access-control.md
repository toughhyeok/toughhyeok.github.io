---
layout: post
category: ruby
title: 'ruby에서 private, protected, public'
subtitle: '접근 제어'
banner: "/assets/images/common/ruby-logo.png"

---

`Ruby`에는 다음 세가지 접근 제어 방법 (보호 단계)가 있다.

* `public` 메서드는 누구나 호출할 수 있다. 아무런 접근 제어를 하지 않는다.
  
  루비에서 메서드는 기본적으로 `public`이다. (단 `initialize`는 예외적으로 항상 `private`이다.)

* `protected` 메서드는 그 객체를 정의한 클래스와 하위 클래스에서만 호출 할 수 있다. 접근이 가계도상으로 제한되는 것이다.

* `private` 메서드는 수신자를 지정해서 호출할 수 없다. 이 메서드의 수신자는 항상 `self`이기 때문이다. 다시 말하면 `private` 메서드는 오직 현재 객체의 문맥 하에서만 호출할 수 있다는 것이다. 즉, 다른 객체의 `private` 메서드에는 접근할 수 없다.

<br>

> *루비와 다른 객체 지향 언어의 중요한 차이점은 접근 제어가 동적으로 결정된다는 것이다. 즉 프로그램이 실행될 때 제한된 메서드를 실체로 호출한 순간에만 접근 위반 예외가 발생한다.*

<br>

```ruby
...
private         # 이제 부터 선언하는 메서드는 모두 'private'이다.
  def method3
    #...
  end
public
  def method4   # 이제 부터 선언하는 모든 메서드는 `public`이 된다.
  end
...
```

<br>

```ruby
...
  def method3
    #...
  end
  def method4
  end

  public        :method4
  private       :method3
...
```