---
layout: post
category: ruby
title: 'ruby 가상 속성'
subtitle: ''
banner: "/assets/images/common/ruby-logo.png"

---

이전 [ruby Class 속성 접근자](http://toughhyeok.github.io/2022-05-11/ruby-attr-accesor-reader)에서 `attr_reader`, `attr_accessor`에 대해 알아보았다.

하지만 속성에 접근하는 메서드가 단지 객체의 인스턴스 변수를 읽거나 대입하는 간단한 메서드일 필요는 없다. **가상 속성값을 인스턴스 변수에 매핑**하는 방법을 알아보자.

```ruby
class BookInStock
    attr_reader :isbn
    attr_accessor :price
    def initialize(isbn, price)
        @isbn = isbn
        @price = Float(price)
    end
    def price_in_cents
        Integer(price*100 + 0.5)
    end
    def price_in_cents=(cents)
        @price = cents / 100.0
    end
end
```

위와 같이 `price_in_cents`, `price_in_cents=` 메소드를 추가해 보자

```ruby
book = BookInStock.new('isbn1', 33.9)
puts "Price = #{book.price}"
puts "Price in cents = #{book.price_in_cents}"

book.price_in_cents = 1234
puts "Price = #{book.price}"
puts "Price in cents = #{book.price_in_cents}"
```

```bash
=> Price = 33.9
=> Price in cents = 3390
=> Price = 12.34
=> Price in cents = 1234
```


속성 메서드를 사용해서 가상 인스턴스 변수를 생성한다. 객체 밖에서는 `price_in_cents`는 다른 속성과 마찬가지로 그저 객체의 속성으로 보인다. 하지만 내부적으로는 이 속성에 대응하는 인스턴스 변수는 존재하지 않는다. 

**이를 통해 인스턴스 변수와 계산된 값의 차이점을 숨겨서, 클래스 구현에서 나머지 세상을 보호할 수 있는 방법을 제공할 수 있다.**