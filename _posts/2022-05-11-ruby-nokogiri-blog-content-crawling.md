---
layout: post
category: ruby
title: 'ruby nokogiri blog content crawler'
subtitle: ''
banner: "/assets/images/common/ruby-logo.png"

---
아래 `test_blog_html_parser.rb` 는 `nokogiri` 모듈을 이용해 만들어 본 tstory용 blog-content-crawler 이다..


실행 방법은 `ruby test_blog_html_parser.rb "https://hotamul.tistory.com/113"`로 해보면 실행한 폴더에 `113.html` 파일이 생성된 걸 볼 수 있다.


너무 허접하다..

```ruby
# test_blog_html_parser.rb
require 'nokogiri'
require 'open-uri'

def get_page(url)
    return Nokogiri::HTML(open(url), nil, Encoding::UTF_8.to_s)
end

def get_content(page)
    content_html = page.css(".article-view").inner_html
    extra_html = []
    extra_html.push(page.css(".container_postbtn").to_html)
    extra_html.push(page.css(".another_category").to_html)
    extra_html.each {|extra| content_html.slice! extra}
    return content_html
end

def write(file_path, str)
    html_file = File.new(file_path, "w")
    html_file.write str
    html_file.close
    puts "#{file_path} was saved successfully."
end

def get_valid_file_path(file_path)\
    return file_path.gsub(/[\x00\/\\:\*\?\%"<>\|]/, '')
end

PAGE_URL_LIST = ARGV;
PAGE_URL_LIST.each do |url|
    page = get_page(url)
    content = get_content(page)
    file_path = get_valid_file_path(url.split('/')[-1])
    write("./#{file_path}.html", content)
end
```

