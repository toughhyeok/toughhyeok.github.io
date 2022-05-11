---
layout: post
category: ruby
title: '재미있는 ruby 클래스'
subtitle: ''
banner: "/assets/images/common/ruby-logo.png"

---
### Class
    class Greeter
      def initialize(name = "World")
        @name = name
      end
      def say_hi
        puts "Hi #{@name}!"
      end
      def say_bye
        puts "Bye #{@name}, come back soon."
      end
    end

여기서 `@name`은 인스턴스 변수를 뜻하고 모든 메서드에서 접근 가능하다.  
하지만 이런식으로 접근은 불가하다.

    g = Greeter.new("junhyeok".capitalize)
    g.name = "Andy"

그럼 접근 가능한지 확인하는 방법은? 이 클래스가 가지고 있는 메소드를 확인하는 방법은?

바로 `respond_to?("메소드 이름")`으로 확인 가능하다. return 값은 `true`, `false`이다.

    Greeter.respond_to?("say_hi")
    => true

    irb(main):027:0> Greeter.instance_methods
    => [:say_hi, :say_bye, :instance_variable_defined?, :remove_instance_variable, :instance_of?, :kind_of?, :is_a?, :tap, :instance_variable_get, :instance_variable_set, :instance_variables, :singleton_method, :method, :public_send, :define_singleton_method, :public_method, :extend, :to_enum, :enum_for, :<=>, :===, :=~, :!~, :eql?, :respond_to?, :freeze, :inspect, :object_id, :send, :to_s, :display, :nil?, :hash, :class, :singleton_class, :clone, :dup, :itself, :yield_self, :then, :taint, :tainted?, :untaint, :untrust, :untrusted?, :trust, :frozen?, :methods, :singleton_methods, :protected_methods, :private_methods, :public_methods, :equal?, :!, :__id__, :==, :instance_exec, :!=, :instance_eval, :__send__]
    irb(main):028:0> Greeter.instance_methods(false)
    => [:say_hi, :say_bye]

이런식으로 class에 어떤 메소드가 있는지도 확인할 수 있다. 먼가 Python에서 많이 보던 `__`도 볼 수 있다.  
먼가 직접 만든 `initialize`, `say_hi`, `say_bye` 이외에도 많은 걸 보면 class 자체 적으로 받는 것 같다.  
부모 class 메소드를 보고 싶지 않으면 `instance_methods(false)` 하면 된다.

### Class를 변경할 수 있다고?

    irb(main):044:0> class Greeter
    irb(main):045:1>   attr_accessor :name
    irb(main):046:1> end
    => nil

진짜 기똥차다...

    irb(main):047:0> g = Greeter.new("Andy")
    => #<Greeter:0x3c9b0 @name="Andy">
    irb(main):048:0> g.respond_to?("name")
    => true
    irb(main):049:0> g.respond_to?("name=")
    => true
    irb(main):050:0> g.say_hi
    Hi Andy!
    => nil
    irb(main):051:0> g.name="Betty"
    => "Betty"
    irb(main):052:0> g
    => #<Greeter:0x3c9b0 @name="Betty">
    irb(main):053:0> g.name
    => "Betty"
    irb(main):054:0> g.say_hi
    Hi Betty!
    => nil

갑자기 `name`에 접근 가능하다.. **`private` 변수가 `public`변수가 된 것이다!!**  
**그렇다기 보다는 메소드 두 개가 생성된 것이다.**

`attr_accessor`은 두 개의 메서드를 새로 정의해준다. `name`은 인스턴스 변수의 값에 접근하기 위한 것이고 `name=`은 객체변수의 값을 변경하기 위한 것이다.

IRB에서 빠져나오기 위해서는 “quit” 또는 “exit”이라고 입력하거나 Control-D를 누르면 된다.

이번에는 IRB Ruby 인터랙티브 해석기를 사용하는 대신에 파일에 코드를 작성해보자. (이 예제가 참 재밌당 ㅎㅎ)

참고 : [Ruby in Twenty Minutes](https://www.ruby-lang.org/en/documentation/quickstart/)

*참고로 이 글은 **[hotamul 블로그 - [Ruby] Ruby의 신기한 Class](https://hotamul.tistory.com/113)**을 **[tstory 블로그 크롤링](https://toughhyeok.github.io/2022-05-11/ruby-nokogiri-blog-content-crawling)** 방법으로 `html` 파일을 긁어와 만든 게시물이다.*