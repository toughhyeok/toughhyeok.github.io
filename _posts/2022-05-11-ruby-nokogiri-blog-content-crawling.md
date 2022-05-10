---
layout: post
category: ruby
title: 'ruby nokogiri blog content crawler'
subtitle: ''
banner: "/assets/images/common/ruby-logo.png"

---
아래 `test_blog_html_parser.rb` 는 `nokogiri` 모듈을 이용해 만들어 본 blog-content-crawler 이다..


실행 방법은 `ruby test_blog_html_parser.rb "https://toughhyeok.github.io/2022-05-10/ruby-hash-constructor"`로 해보면 실행한 폴더에 `tmp.html` 파일이 생성된 걸 볼 수 있다.


너무 허접하다..

```ruby
# test_blog_html_parser.rb
require 'nokogiri'
require 'open-uri'

def get_page(url)
    Nokogiri::HTML(open(url))
end

def get_content(page)
    post = page.css(".post").inner_html
    post_info = page.css(".post-info").to_html
    post.slice! post_info
    return post
end

PAGE_URL_LIST = ARGV;
PAGE_URL_LIST.each do |url|
    page = get_page(url)
    content = get_content(page)

    html_file = File.new("./tmp.html", "w")
    html_file.write content
    html_file.close()
end
```

