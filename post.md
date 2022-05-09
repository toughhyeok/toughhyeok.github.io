---
layout: post-list 
permalink: /post
banner-title: 'Post'
banner-description: 개발 일기장 ✏️
---

<ul class="catalogue">
{% for page in site.posts %}
    {% include post-list.html %}
{% endfor %}
</ul>