---
title: My Ultimate Hexo Theme Creation Tutorial
layout: post
date: 2017-11-08 01:13:31
author: emmanuel
featured_image:
categories: [hexo]
tags: [hexo, custom themes, blog creation]
---
This post is mostly going to be written for myself and my friends so that if in the future I should forget how to Hexo or find the need to refer someone to use the Hexo platform, they can get into it without the difficulties I encountered. I will mostly cover theme creation with Hexo and what I've learned. I will try to make it as comprehensive as possible since most Hexo documentation and tutorials seems to be a bit too light. 

If you're just interested in getting to blogging as quickly as possible and don't mind using one of the available themes, I'd recommend taking a look at the Hexo quickstart guide by Christopher Martin (See Resources section at the bottom of this post) and the awesome Hexo theme [Tranquilpeak](https://github.com/LouisBarranqueiro/hexo-theme-tranquilpeak) by [@LouisBarranqueiro](https://github.com/LouisBarranqueiro).

This post will also be continuously updated as I learn more.


Why Hexo:
---------
1. Generates static blogs. Perfect
2. It's built on NodeJS
3. It's fast
4. It works with deployment to Github Pages, Heroku etc
5. It has a huge community of users, plugins and resources

Of course you're also free to check out [Jekyll](https://jekyllrb.com/) and [Hugo](https://gohugo.io/) static site and blog generators that use Ruby and Go respectively but I safely assume you're here for the Javascript and we all know everything should be written in good old Javascript. 


Resources I tapped into:
------------------------

Feel free to refer to any of these in case you don't understand something in my post. The aim of my tutorial is to organize all the information I got from these resources and my own experience with Hexo into one comprehensive tutorial.

**Hexo Official docs:** 
link: [docs](https://hexo.io/docs/)
The Hexo documentation is pretty lean. Everything you need is listed but it lacks clarity on how eveything works together. This is especially noticable if you're trying to create your own theme. 

**Christopher Martin's quick start guide on Hexo blogging:**
If you're only interested in getting up and running with Hexo and want to make use of one of the available themes, this is the tutorial to head to:
link: [Getting Started With Hexo Blog](https://www.cgmartin.com/2016/01/03/getting-started-with-hexo-blog/)

**Jonathan Klughertz blog on Hexo theme creation:**
If, like me, you want to create your own Hexo theme, this one is good reading.
link: [Create an Hexo Theme Part-1](http://www.codeblocq.com/2016/03/Create-an-Hexo-Theme-Part-1-Index/)

**Conner Leech blog post on Hexo theme creation:**
Another great read on Hexo theme creation.
link: [Create a custom blog theme with hexo js](https://m.dotdev.co/create-a-custom-blog-theme-with-hexo-js-b24c82eb9271)

**Steven Seator blog post on Hexo theme creation:**
link: [Creating a custom hexo theme](https://st0ven.github.io/2016/03/01/Creating-a-custom-hexo-theme/)

**Youtube playlist on Hexo by Giraffe Academy:**
A great youtube playlist that covers many beginner to intermediate Hexo topics.
link: [playlist](https://www.youtube.com/watch?v=Kt7u5kr_P5o&list=PLLAZ4kZ9dFpOMJR6D25ishrSedvsguVSm)

**Curated list of useful Hexo resources by @NoahDragon,  a Hexo founder:**
link: [awesome hexo](https://github.com/hexojs/awesome-hexo)

**Deploying Hexo to Github Pages:**
link: [deploying hexo to gituhb](https://zirho.github.io/2016/06/04/hexo/)

Getting started:
----------------

A great place to start would be the official installation instructions from the official Hexo site, [hexo.io](https://hexo.io/). From your command line, get into a directory on your computer where you would like to place your project and run the following code:
```shell
npm install hexo-cli -g
hexo init blog
cd blog
npm install
hexo server
```
If you now visit `localhost:4000` in your browser, you should see you brand new blog. It uses the default but not very good-looking theme that Hexo ships with, Landscape. 
If you're a person who doesn't mind its low aesthetic appeal you can continue using it but I'd highly recommend you switch or create your own.

From your favorite Text Editor/IDE (Atom, Sublime, VSCode and my personal recommendation: JetBrains Webstorm), open up the 'blog' directory you just installed Hexo in. 

The folder will have the following structure:
```shell
├─node_modules                         
├─scaffolds                  
├─source                     
│  └─_posts                  
└─themes                     
    └─landscape  
_config.yml
package.json
yarn.lock
.gitignore
```

If you've used NodeJS and NPM before, you'll know what `package.json` and the `node_modules` folder are. 

To those new to this, `package.json` is   a file that keeps track of all the modules your project depends on. These modules are then install in the `node_modules` folder when one runs `npm install`. 

`_config.yml` is a file that contains all your configurations for Hexo. More on this later.
`scaffolds` is  a folder that keeps templates for your Hexo post types. `source` is where all your posts (md files) and images are kept.
`themes` is where whichever theme you're using is kept. We will spend most of our time in this folder when creating our custom theme. 

The configuration file (_config.yml):
-------------------------------------
Open up the `_config.yml` file. I'll break it down just a few sections.
```yaml
# Site
title: Hexo
subtitle: A Totally Unique Hexo Blog 
description: This blog is really very unique
author: John Doe
language: en
timezone: 
```
One thing to take care of when editing a yaml file like this is to make sure you have a space after the attribute. For example `title: Hexo` is `title:` space `Hexo`. Otherwise you'll get build errors when generating your site.
```yaml
# URL
url: http://yoursite.com
root: /
permalink: :year/:month/:day/:title/
permalink_defaults:
```
If you're working on localhost, make sure you change the url variable to `url: http://localhost:4000/`. When you deploy to server make sure you change it back to the url of your domain.

```yaml
# Writing
new_post_name: :title.md # File name of new posts
default_layout: post
titlecase: false # Transform title into titlecase
external_link: true # Open external links in new tab
filename_case: 0
render_drafts: false
post_asset_folder: false
relative_link: false
future: true
highlight:
  enable: true
  line_number: true
  auto_detect: false
  tab_replace:

# Extensions
theme: landscape
```

If your blog is one where you'll upload many images per post, it would be helpful to turn the `post_asset_folder` to `true`. This will create a folder for each of your posts where you can store images and other assets related to that post. This will make your assets per post more manageable.

You can use the theme variable to set the theme you would like to use.
 
Get a breakdown of the rest of the configuration file variables and what they do here: [Hexo Configuration](https://hexo.io/docs/configuration.html) 

Writing your first post:
------------------------
From your command line, and from inside the blog directory, type the following and hit enter:
```shell
hexo new post my-amazing-new-post
```
A new markdown file called `my-amazing-new-post.md`will be created in your source > _posts directory.
If you enabled the `posts_assets_folder` then you also get a folder with the title of your post in the same directory.

**Front Matter:**

From the docs: 

> Front-matter is a block of YAML or JSON at the beginning of the file
> that is used to configure settings for your writings. Front-matter is
> terminated by three dashes when written in YAML or three semicolons
> when written in JSON.

It looks like this:
```[yaml]
---
title: My amazing new post
layout: post
date: 2017-11-05 10:48:33
author:
categories: [hexo]
tags: [hexo, blog creation, amazing]
---
```
Every post needs front matter. It represents the meta data of your post. You have to be careful when writing it though. You should have a space between the front matter and its value. 
More info here: [Docs on Hexo Front Matter](https://hexo.io/docs/front-matter.html)

**Post Content:**

The rest of the post can then be written in markdown. 
There are many resources online that can help you write markdown with ease. My personal favorite is [SlackEdit](slackedit.io) because of the features and save to cloud functionality. When I'm ready to put it on my blog it's a simple matter of copying and pasting the markdown into my post.

Hexo also provides ways to insert specific types of content into your posts by way of [Tag Plugins](https://hexo.io/docs/tag-plugins.html). Take a look!

 Theming:
------------------------

Now to what this whole blog post is about. Creating your own Hexo theme!

[to be continued soon]


