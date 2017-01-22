---
title: Scripting NGINX for Overload Protection
subtitle: nginx.conf 2016 presentation on Shopify flash sales
tags:
- nginx
- shopify
---

I spoke at nginx.conf in September about how Shopify uses NGINX for handling flash sale load.
tl;dr you can use Lua or nginScript to cache dynamic content and build a queueing system
directly into your load balancers. We do this in a stateless way so load balancers
don't need to synchronize.
I also touched on our network/inter-DC routing setup and
tools for debugging NGINX in production.

---

<iframe class="youtube" src="https://www.youtube.com/embed/uFm-tp4t2mE" frameborder="0" allowfullscreen></iframe>

---

Related talks:

- [Xavier Denis](https://twitter.com/xldenis) on [Intelligent Load Balancers](https://www.youtube.com/watch?v=WSUEjWgLk30)
- [Scott Francis](https://twitter.com/planetscott) on [Building an HTTP Request Router With NGINX and Lua](https://www.nginx.com/resources/webinars/building-an-http-request-router-with-nginx-and-lua/)
- [Florian Weingarten](https://twitter.com/fw1729) on [Scaling Shopify's Multitenant Architecture Across Multiple Data Centres](https://www.youtube.com/watch?v=F-f0-k46WVk)
- [Simon Eskildsen](https://twitter.com/sirupsen) on [Shopify in Multiple Datacenters](https://www.youtube.com/watch?v=7UyDK2bDjc4)
