---
title: "Doing your finances by using a smart spreadsheet"
date: 2017-12-10 10:00:00 +0000
layout: post
permalink: /doing-your-finances-by-using-a-smart-spreadsheet
categories: blog
---

{% capture assets_path %}{{site.assets_path}}{{page.date | date: "%Y/%m"}}{% endcapture %}

Most people nowadays seem to agree that doing your finances is a useful thing.

I've being doing it consistently over the last 7 years.
There are 2 things that helped me to do that:

* Having a discipline around it
* Having a flexible and consistent tool

## Purpose of Doing your Finances

Before you even start doing your finances, it's good to ask yourself why you want to do it.
Few reasons could be:

* Save money towards a goal
* Track money
* Optimize your spendings

When I started tracking my money, I was doing this to understand how much money I actually have.
I had only 2 bank accounts, and I was doing some freelance job.
But because freelance payout wasn't constant, and often delayed, keeping track of that allowed me to better understand how I'm doing.

Today I have over 10 different _buckets_ where money can be (bank accounts, investments, pension, electronic money, debts towards me, pocket money...). It definitely helps me understand how much money I have, and where they reside. Also it helps to understand how much I spend overall.

## Discipline

In order to make it work, checking your finances has to be done at constants intervals.
Because most people get salary and pay rent and bills every month - I recommend doing it monthly.
It may be tempting to do it every 2 or 4 weeks, but looking back - it wouldn't work for me that well.

So every 1st day of every month I'm trying to update the doc.
If I do it on 2nd or 3rd day of the month, then I try to write down values that reflected my accounts for 1st day of the month.

## Advanced Features

It seem that's easy to track how muck money you have.
In my specific case there were few complications.

### Multiple currencies

I had money in few different currencies.
Main ones were USD, RUB and MDL.
Later I had some EUR (mostly for traveling).
After that GBP came into equation.

So the spreadsheet should account for different currencies.

### Currencies fluctuations

The issue with multiple currencies is that every 1-2 years, at least one of the currencies fluctuated a lot.
Because in the end you want to know how much money you have in total, that would mean that that number will get skewed a lot.

For example if say you have 1000 Euro and $1000.
And say that at the beginning of month the exchange rate is 1.5.
That would mean that you have overall $2500.

If next month's exchange rate would drop to 1.4, then you'll have $2400, without you doing anything.
So it would look like you spent $100 more than you actually did.

And if the exchange rate would go up again, then that month would look like you spent $100 less.

### Investment fluctuations

If you invest (say Index Funds, or Bitcoin) then the same will happen as with currencies fluctuations.

## The Template

Now that you know the purpose of the spreadsheet, you can [clone it and try it by yourself](https://goo.gl/rdJRcp) (make sure not to share it accidentally on the internet).

![Budgeting spreadsheet]({{ assets_path }}/budgeting-spreadsheet.png){: .aligncenter style="max-height: 400px;"}

Everything from top to _Extra Outcome_ inclusive is automatically calculated.
Most important things in there are:

* Total amount of money you have
* Total difference - did it go up or down
* Total outcome - how much did you spend this month
* Extra outcome - how much money you spent on random things (everything that didn't fall into recurrent and abnormal outcome)

## Monthly routine

Every month I go through the following process:

* Create one column on the right
* Extend the selection from previous column to the newly created one. That will copy all the formulas and will update them correctly
* Update month
* Update exchange rates
* Write down your _Income_ (salary, found money on the street), _Recurrent outcome_ (bills, rent) and _Abnormal outcome_ (bought a new TV)
* Write down balances of all your accounts

Now you can easily see where your finances are each month.
