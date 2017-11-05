---
title: Short script to restart explorer.exe process
layout: post
date: 2017-10-31 21:33:22
author:
featured_image: explorer-reset.png
categories: [quick code]
tags: [code,snippet,windows]
---

I find myself trying to restart the desktop explorer.exe process on win 8.1 a lot. I’m not sure why my explorer.exe gets weird problems from time to time (especially when I switch from single display to dual display). Needless to say its extremely annoying and tedious to do manually. I used to go to Task manager> Details > explorer.exe > End Task > File > Run New Task > explorer.exe to restart it.
Luckily, I recently found a script online by Scotch that can easily be run as a BAT file and will do this quickly and painlessly:

```$xslt
@echo off   
color 0B   
echo JumpStart! v0.1 by Scotch   
echo.   
echo Your desktop is being restored, Please wait. . .   
ping -n 5 127.0.0.1 > NUL 2>&1   
echo Killing process Explorer.exe. . .   
taskkill /f /im explorer.exe   
cls   
echo Success!   
echo.   
echo Your desktop is now loading. . .   
ping -n 5 127.0.0.1 > NUL 2>&1   
echo.   
ping -n 5 127.0.0.1 > NUL 2>&1   
start explorer.exe   
exit
```
Create a new text document, copy the code and save it as jumpstart.bat. Run the file when your explorer process crashes to retart it painlessly.