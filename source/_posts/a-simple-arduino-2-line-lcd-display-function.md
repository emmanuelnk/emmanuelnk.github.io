---
title: A simple 1602A I2C 2-Line LCD Arduino Display function
date: 2016-05-13 12:00:00
layout: post
author: 
featured_image: s-l300.jpg
categories: [quick code]
tags: [arduino,code,snippet,lcd]
---

Sometimes, when working with Arduino, I’ve found out that the 2 line LCD display to be really helpful when trying to debug an Arduino board without being connected to your computer via Serial COM port.

If you’re new to using 2 Line LCD displays, always try to get the ones with an I2C driver attached to the board especially since most new Arduinos have I2C addressing. This will save you a lot of digital I/O pins on your board!

The libraries for most I2C driven 2 Line LCD displays can be found on Github (Liquid Crystal Library). Take the one provided by the distributor (e.g. Adafruit). There are helpful Arduino example files in those libraries to help you get started.

I quickly realized that learning to use the Liquid Crystal Display library can be quite challenging and frustrating. I wrote a whole class full of functions to suit my project needs because the basic functions were quite lacking in what I wanted to achieve. However, I found myself using the following simple function most frequently:

How it works:

{% codeblock %}
void lcd2LineDisplay(String UpString, String DownString, int delaytime)
{% endcodeblock %}

Takes three arguments: The String variable or String value of the top string to be displayed, the second string to be displayed and the time interval for which the display should show the string in milliseconds.

``` [c]
void lcd2LineDisplay(String UpString, String DownString, int delaytime) {
        //Create a new LiquidCrystal_I2C object if one hasn't been globally created
    	//LiquidCrystal_I2C lcd(0x27, 16, 2); 
    	//lcd.backlight(); //Turn on backlight everytime the function runs
    	lcd.clear();
    	delay(500);
    	lcd.setCursor(0, 0);//set cursor to first position, top line
    	lcd.print(UpString);//print the string
    	lcd.setCursor(0, 1);//set cursor to first position, second line
    	lcd.print(DownString);//print the string
     
    	if (UpString.length() > 16 || DownString.length() > 16) {
    	//lcd display has a maximum of 16 positions on both lines
    		int chlimit = 20;//initialized. can be any value
                    //if statement checks if string is longer than 16 characters
                    //if true, the scrolling starts to see rest of string , else no scrolling
    		if (UpString.length() >= DownString.length() ? chlimit = UpString.length() : chlimit = DownString.length());
    		int count = 0;
    		delay(1000);//1 second .momentary so your eye can see what was displayed if no scrolling
    		while (count < chlimit - 15) {
    			lcd.scrollDisplayLeft();
    			delay(700);
    			count++;
    		}
    	}
    	delay(delaytime);
            //noBacklight();//turn off backlight if enabled
    } 
```

For example:

```[c]
String name= "Emmanuel";
lcd2LineDisplay("Your name is: ", name, 4000);
//OUTPUT
// Line1: Your name is: 
// Line2: Emmanuel
```

If either or both of the strings have more than 16 characters, then the function will make calculations and auto scroll the screen towards the left to just one character  after the longest string. Also, the 4000 indicates a 4 second delay to view whatever is on the screen.
    