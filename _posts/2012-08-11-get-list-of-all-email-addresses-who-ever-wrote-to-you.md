---
title: Get list of all email addresses who ever wrote to you
date: 2012-08-11T20:17:28+00:00
author: bumbu
layout: post
permalink: /get-list-of-all-email-addresses-who-ever-wrote-to-you/
categories: blog
---
<a href="http://bumbu.me/wp-content/uploads/2012/08/emailer.png"><img class="alignleft size-medium wp-image-185" title="emailer" src="http://bumbu.me/wp-content/uploads/2012/08/emailer-300x225.png" alt="" width="300" height="225" /></a>There are lot of people that don't get the idea of BCC (blank carbon copy) and while sending an email to multiple people, expose all email to every reciever. It is a nice leak for those who collect email addresses.

Being interested how many uniqe email addresses I have on my GMail account, I did the following stept to find it out:

<strong>Make a backup to your PC of all your available emails.</strong> This may take a while if you have many emails. I used for this purpose <a href="http://www.broobles.com/imapsize/download.php" target="_blank">IMAPSize</a>. This is a simple desktop client that will download all the emails (from the folders which you'll choose) and save them as .eml files.

<strong>Parse your backupped emails.</strong> For this purpose I created a simple python script:
<pre class="language-python line-numbers"><code># Import the email modules we'll need
from email.parser import Parser
# Import regular expression module
import re
# Import os for file management
import os
# Import time modules
from time import gmtime, strftime
# Import
from operator import itemgetter

# All found emails, with email as key, and number of matches as value
foundemails = {}
SAVE_ORDERED = True
EMAILS_PATH = 'IMAPSize_037\\backup\\gmail'

# Mail search pattern
mailpattern = re.compile(r'[\w\-\.]+@[\w\-\.]+\.+[a-zA-Z]{1,4}')
mailheaders = ['to', 'from', 'cc', 'bcc']

def listFiles(dir):
    subdirlist = []
    for item in os.listdir(dir):
        if os.path.isfile(os.path.join(dir,item)):
            print os.path.abspath(dir) + '\\' + item
            searchForEmails(os.path.abspath(dir) + '\\' + item)
        else:
            subdirlist.append(os.path.join(dir, item))
    for subdir in subdirlist:
        listFiles(subdir)

def searchForEmails(file):
	global foundemails, mailheaders, mailpattern

	headers = Parser().parse(open(file, 'r'))
	for head in mailheaders:
		if headers[head] != None:
			for address in mailpattern.findall(headers[head]):
				if address in foundemails:
					foundemails[address] += 1
				else:
					foundemails[address] = 1

listFiles(EMAILS_PATH)

# Write results in file
f = open('emails_'+strftime("%H-%M-%S", gmtime())+'.txt','w')
if SAVE_ORDERED:
	# sorting by creating a list of sorted tuples
	foundemails_sorted = sorted(foundemails.iteritems(), key=itemgetter(1), reverse=True)
	for key, value in foundemails_sorted:
		f.write(key + "\t" + str(value) + "\n")
else:
	for key in foundemails:
		f.write(key + "\t" + str(foundemails[key]) + "\n")
f.close()</code></pre>
You just have to setup EMAILS_PATH and run this script. It will create a file which will contain all the email addresses and their occurence number, like this:
<pre class="language-none"><code>anygroup@googlegroups.com	17905
myname@gmail.com	13459
othergroup@googlegroups.com	6980
pr-bestch@googlegroups.com	3480
girlfriend@gmail.com	3071
constitution@mail.eu	2563</code></pre>
If you are subscribed to any groups, they also will be listed in here. You can filter such emails if you need it.

Regexp used in here is very primitive, but if you need to find email that follow LDH rule (letters, digits, hyphen) you can use the following regexp (but it is more power consuming)
<code>(\w{1}(?:[\w\-\.]+\w{1})*@(?:(?:(?:\w(?:\-\w)*)+\.)+\w{1,4}))</code>
