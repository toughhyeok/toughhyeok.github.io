---
layout: post
category: ruby
title: 'ruby에서 깊은 복사, 얕은 복사'
subtitle: 'deep copy'
banner: "/assets/images/common/ruby-logo.png"

---
`Ruby`에서 깊은 복사 (deep copy)를 하는 방법은 매우 간단하다.

```ruby
person1 = "Tim"
person2 = person1.dup
person1[0] = "J"
puts "person1 is #{person1}"
puts "person2 is #{person2}"
```

<br>

```bash
person1 is Jim
person2 is Tim
```

<br>

객체의 수정을 막는 방법은 `freeze` 메소드를 사용하면 된다.

```ruby
person1 = "Tim"
person2 = person1
person1.freeze      # 객체 수정을 막는다.
person2[0] = "J"
```

<br>

```bash
1: from (irb):8:in `<main>'
(irb):8:in `[]=': can't modify frozen String: "Tim" (FrozenError)
```

