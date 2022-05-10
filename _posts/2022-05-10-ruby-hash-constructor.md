---
layout: post
category: ruby
title: 'ruby Hash 클래스의 재미있는 사실!'
subtitle: 'Hash constructor'
banner: "/assets/images/common/ruby-logo.png"

---
> Hashes have a default value that is returned
> when accessing keys that do not exist in the hash. If no default is set
> nil is used. You can set the default value by sending it as an argument
> to Hash.new:
>
> grades = Hash.new(0)
>
> Or by using the #default= method:
>
>  grades = {"Timmy Doe" => 8}
>  grades.default = 0
>
> Accessing a value in a Hash requires using its key:
>
> puts grades["Jane Doe"] # => 0

루비의 `Hash` 클래스를 선언하는 여러 방법 중 하나는 아래와 같이 `new`를 사용하는 것이다.


```ruby
grades = Hash.new
``` 

다른 언어에서의 `Hash` 처럼 주어진 키에 해당하는 객체가 없을 경우 `null`, `nil`(ruby에서 nil은 아무것도 아님을 뜻하는 **객체**이다.)을 반환한다.

하지만 이를 바꿀 수도 있다. 예를 들어 주어진 키에 해당하는 객체가 없을 때 `nil`이 아닌 `0`을 반환하도록 하기 위해서 다음과 같이 `Hash`를 선언하면 된다.

```ruby
grades = Hash.new(0)
``` 


```bash
2.7.6 :001 > grades = Hash.new(0)
 => {}
2.7.6 :002 > puts grades['hello']
0
```