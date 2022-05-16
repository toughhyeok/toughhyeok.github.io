---
layout: post
category: python
title: 'python 생성자/소멸자 호출, accessor'
subtitle: ''
banner: "/assets/images/common/python-logo.png"

---
### 1. `Python`에서 생성자/소멸자 호출
`Python`에서는 생성자 및 소멸자가 어떻게 호출 될까?

```python3
class Base:
    def __init__(self, a=None):
        if a:
            print("Base(int)")
        else:
            print("Base()")

    def __del__(self):
        print("~Base()")


class Animal(Base):
    def __init__(self, a=None):
        if a:
            print("Animal(int)")
        else:
            print("Animal()")

    def __del__(self):
        print("~Animal()")


if __name__ == "__main__":
    d1 = Animal()
    d2 = Animal(1)
```
```bash
Animal()
Animal(int)
~Animal()
~Animal()
```

우선 `Python`에서는 **생성자 overriding이 지원되지 않는다.**

대신 `def __init__(self, a=None)`과 같이 전달 인자 값을 `default`로 설정할 수 있다.

그리고 `C++`과 달리 **부모 클래스의 생성자, 소멸자가 호출 되지 않는다.**

- **`Python`에서 생성자는 overriding 되지 않는다.**
- **`Python`에서 파생 클래스(concrete class)의 생성자/소멸자가 호출될 때 부모 클래스의 생성자/소멸자는 호출되지 않는다.**

### 2. `private`, `public`, `protected`
`C++` `class`에서는 기본적으로 모두 `private`이며 `public:`, `protected:`를 명시적으로 선언해 준다.
(`struct`는 기본적으로 모두 `public`, 그리고 `C++`에는 `interface` 키워드가 따로 없어서 `#define struct interface`를 예전에는 사용했었다. 즉 `struct`를 주로 `interface`를 생성할 때 사용 한다.)

<br/>

`Python`에서는 따로 `private`, `public`, `protected` 키워드가 없지만 다음과 같은 방법으로 표현할 수 있다.

```python3
class Person:
    count = 0       # public 멤버 변수
    
    def __init__(self, name, age, count=None):
        self.name = name  # public 인스턴스 변수
        self.age = age    # public 인스턴스 변수
        self.count += 1
```

즉 `public` 멤버 변수는 인스턴스 또는 클래스로 직접 접근이 모두 가능하다.
(인스턴스 변수는 인스턴스로만 접근이 가능함)

<br/>

```python3
class Person:
    __count = 0       # public 멤버 변수
    
    def __init__(self, name, age, count=None):
        self.__name = name  # public 인스턴스 변수
        self.__age = age    # public 인스턴스 변수
        Person.self.__count += 1
```
위 처럼 언더바 `_`  두 개를 붙여 사용하면 `private`로 선언한 것과 같은 효과가 있습니다.

그리고 `protected`는 '_'를 변수명 또는 함수명 앞에 한 개 붙여주면 됩니다.

<br/>

`C++`에서
`protected` 생성자의 의미는 **"자신의 객체는 생성할 수 없지만 (추상적인 존재) 파생 클래스의 객체(구체적인 존재)는 생성할 수 있도록 한다"** 입니다.

하지만 `Python`에서는 생성자/소멸자가 같이 호출되지 않지만 생성되지 않는 객체 일 경우 생성자/소멸자를 `protected`로 선언해줄 필요가 있습니다.

<br/>

부모 클래스가 구현되어야 할지 아닐지는 아래 예시를 생각해보면 됩니다.
> 현실 세계를 생각해보자.
> 
> "동물"이란 것이 존재하는가?
> 
> "강아지", "말", "호랑이",... 는 존재하는가?