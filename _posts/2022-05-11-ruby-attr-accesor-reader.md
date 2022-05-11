---
layout: post
category: ruby
title: 'ruby Class 속성 접근자'
subtitle: 'attr_reader attr_accessor'
banner: "/assets/images/common/ruby-logo.png"

---

`ruby`에 `class`의 `getter`, `setter`를 만드는 방법은 여러가지가 있다.

### Getter

```ruby
class BookInStock
    def initialize(isbn, price)
        @isbn = isbn
        @price = price
    end
    def isbn
        @isbn
    end
    def price
        @price
    end
end
```
위에 `isbn`, `price` 메소드는 `@isbn`, `@price`를 `return`한다. (`getter` 역할)


이를 더 간단하게 `attr_reader`로 표현할 수 있다.


```ruby
class BookInStock
    attr_reader :isbn, :price
    def initialize(isbn, price)
        @isbn = isbn
        @price = price
    end
end
```

### Setter

```ruby
class BookInStock
    attr_reader :isbn, :price
    def initialize(isbn, price)
        @isbn = isbn
        @price = price
    end
    def price(new_price)
        @price = new_price
    end
end
```
`attr_reader`로 `isbn`, `price` 인스턴스 변수에 접근할 수 있게 되었다. 또한 `price` 메소드에 값을 전달하면 `@price`의 값을 변경할 수 있는 `Setter`도 있다는 것을 확인할 수 있다.

이 `Setter`도 `attr_accessor`를 이용해서 간단하게 표현할 수 있다.

```ruby
class BookInStock
    attr_reader :isbn
    attr_accessor :price
    def initialize(isbn, price)
        @isbn = isbn
        @price = Float(price)
    end
end
```

여기서 `isbn`은 `getter`만 `price`는 `Getter`, `Setter`를 둘 다 가지고 있다.