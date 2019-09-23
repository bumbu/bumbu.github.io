---
title: "Using Google API (gapi) in Chrome Extensions"
date: 2019-09-22 10:00:00 +0000
layout: post
permalink: /gapi-in-chrome-extension
categories: development home portofolio
og_image: $/Google-API-console-enable-sheets.png
og_image_alt: "Chrome Extension with Google API"
og_description: "This guide will help you build your own Chrome Extension and enable Google authentication so that you can use Google APIs to read and write data into services like Google Docs, Drive, GMail..."
comments: true
previewTitle: "Google API in Chrome Extensions"
previewDescription: "Tutorial on how to enable Google API in Chrome extensions"
previewThumbnail: /assets/images/portofolio/google-sheets-api.png
previewType: browser
previewColor: "#21a464"
---

{% capture assets_path %}{{site.assets_path}}{{page.date | date: "%Y/%m"}}{% endcapture %}

Did you ever think **"Website X would be so much better if it would have a button that would do Y"**? I did it so many times. Like adding a download button for images or disabling notifications on LinkedIn.

If you want to add/change something basic, like a single button, there are a bunch of Chrome extensions that allow you to inject custom JavaScript (like [this](https://chrome.google.com/webstore/detail/custom-javascript-for-web/ddbjnfjiigjmcpcpkmhogomapikjbjdk?hl=en){: target="_blank" } or [this one](https://chrome.google.com/webstore/detail/user-javascript-and-css/nbhcbdghjpllgmfilhnhkllmkecfmpld?hl=en){: target="_blank"}).

But if you want to add something more complex, like:

* Cross-tab communication
* Data storage and sync across browsers
* Authentication with Google (or others)

then you'll probably need to build your own extension.

> This guide will help you build your own Chrome Extension and enable Google authentication. It will allow us using Google APIs to read and write data into services like Google Docs, Drive, GMail...

## Why Google

It's exciting to think about having your own data storage and server, but in reality each new component comes with a cost. Will you want to maintain your server 3 years down the line?

The only solutions that survived more than 2 years for my personal projects where based on reliable 3rd parties:

* Google Sheets and Drive
* Github Pages
* Dropbox
* Amazon Lambda

Any other solution that I built, inevitably vanished after a while because of continuous cost of maintenance.

## Why Google API (gapi)

Google has a multitude of consumer facing products that can be used as an initial solution for small/medium projects.

For example - one may use Google Sheets as a database, and get out of the box:

* Simple and intuitive UI to manage the data
* Ability to create forms that populate the data (sharable to public)
* Ability to give read-only access to other people
* API and documentation available in multiple programming languages for reading and writing

## Building your own Chrome extension

Follow it step-by-step to build your own extension that uses Google APIs.

### Get started

Create a directory/folder for your extension. The full, completed extension can be downloaded from [here]({{ assets_path }}/gapi-example.zip){: target="_blank" }.

Create *manifest.json* file:

```json
{
  "name": "Extension with GAPI tutorial",
  "version": "1.0",
  "description": "Uses OAuth to connect to Google's Spreadsheet API",
  "manifest_version": 2,
  "browser_action": {
    "default_title": "GAPI Tutorial"
  },
  "background": {
    "page": "background.html",
    "persistent": false
  }
}
```

Create *background.html* file:

```html
<html>
 <head>
  <title></title>
  <script src="background.js"></script>
 </head>
 <body></body>
</html>
```

Create *background.js* file:

```js
chrome.identity.getAuthToken({interactive: true}, function(token) {
  console.log('got the token', token);
})
```

### Get the extension key

To get the extension key, you'll need to:

1. Package the extension directory into a `.zip` file
1. Upload it to the **[Chrome Developer Dashboard](https://chrome.google.com/webstore/developer/dashboard){: target="_blank"}**:
    * Sign in to dashboard
    * Click **Add new item**
    * Click **Choose file** and select the `.zip` file you created previously and upload it
    * Without filling in additional fields, select *Save Draft and return to dashboard*
1. Find the extension under **Your Listings** and click on more info
1. From the pop-up, copy the public key and add it to the manifest inside the unzipped directory under the `key` field. You'll need to remove the comments and edit it as to get a single-line string

```json
  {
    "name": "Extension with GAPI tutorial",
  ...
    "key": "It_Should_Be_A_Very_Long_Key/0luuvR0cag46Yg9rEqrURP4zuj7K1Ebdc75JgbsE1us9VpxJcKMivPrxmkwCR+QAUlluWhLm/abzuyY4Z7izAsHeK7UnsGbMyfiOumLEd52qfRougpP/7vjWcexpPrur5k2111jMCdKSmXlFaR5dtC5Iozr8cit+X48qF94WUMN0aaMkg0fJGxS74YSk/b4aH0rGI3i9tzphqIH4OqUgi3iMDsBxRKbn40wQcBznioZXKCIA7NN0btn8NFqHqqCgP4iuro3BzlhBgXtHeQFNggGCqEMdUFfXlTuCUeLwIDAQCB"
  }
```
{: data-line="4"}

### Make sure the key is correct

We're going to load the extension and check its ID. If you have to go back few steps, don't forget to reload the extension from **Extensions Management** page.

* Open **Google Chrome browser**
* Open the **Extensions Management** page at [chrome://extensions](chrome://extensions){: target="_blank"}
* Enable developer mode
* Click **Load unpacked**
* Compare the extension ID in **Extensions Management** with the one from **Chrome Developer Dashboard**. They should be the same

![Extension ID in Chrome Developer Dashboard]({{ assets_path }}/Chrome-Developer-Dashboard-extension-id.png){: .lightbox.grid-tile-large }![Extension ID in Chrome Extensions Management page]({{ assets_path }}/Extensions-Management-extension-id.png){: .lightbox.grid-tile-large }

### Create OAuth Client ID

Navigate to the [Google API console](https://console.developers.google.com/apis){: target="_blank"} and create a new project. Once ready, select **Credentials** in the sidebar, click *Create credentials* and choose *OAuth client ID**.

![Getting API credentials in Google API console]({{ assets_path }}/Google-API-console-credentials.png)

On the Create client ID page, select **Chrome App**. Fill out the name of the extension and place the extension ID at the end of the URL in the **Application ID** field.

![Creating OAuth client ID in Google API console]({{ assets_path }}/Google-API-console-client-id.png)

Finish by clicking create. The console will provide an OAuth client ID.

### Register OAuth in Manifest

Include the `"oauth2"` field in the extension manifest. Place the generated OAuth client ID under `"client_id"`. We'll put spreadsheets as `"scopes"`, but you can see full list of scopes [here](https://developers.google.com/identity/protocols/googlescopes#sheetsv4){: target="_blank"}.

```json
{
  "name": "Extension with GAPI tutorial",
  ...
  "oauth2": {
    "client_id": "Replace_With_OAuth_Client_ID.apps.googleusercontent.com",
    "scopes":["https://www.googleapis.com/auth/spreadsheets"]
  }
}
```
{: data-line="4-7"}

### Test if OAuth is working

Register the `identity` permission in the manifest:

```json
{
  "name": "Extension with GAPI tutorial",
  ...
  "permissions": [
    "identity"
  ]
}
```
{: data-line="4-6"}

* Go to **[Extensions Management page](chrome://extensions){: target="_blank"}**
* Reload your extension
* Click on **Inspect views __background.html__**

A Google auth pop-up should show up during first time. Choose your account and after you sign in, you should see your token in the console.

![background.html inspector page showing the token in the console]({{ assets_path }}/Extensions-Management-inspect-background-html.png)

> If you don't see your token, then check that your Client ID and Extension ID are correct.

### Enable the Google Spreadsheets API

Return to the Google API console and select **Library** from the sidebar. Search for "Google Spreadsheet API" and enable it.

![Enabling Google Sheets API in Google API console]({{ assets_path }}/Google-API-console-enable-sheets.png)

Navigate back to credentials. Click **Create credentials** and select **API key** from the dropdown.

![Creating API key in Google API console]({{ assets_path }}/Google-API-console-create-api-key.png)


### Load Google API

Allow loading external scripts by updating the `manifest.json`:

```json
{
  "name": "Extension with GAPI tutorial",
  ...
  "content_security_policy": "script-src 'self' https://apis.google.com/; object-src 'self'"
}
```
{: data-line="4"}

Add Google API script to your `background.html` file:

```html
<html>
 <head>
  <title></title>
  <script src="background.js"></script>
 </head>
 <body></body>
 <script src="https://apis.google.com/js/client.js?onload=onGAPILoad"></script>
</html>
```
{: data-line="7"}

Update `background.js` to initialized `gapi`:

```js
const API_KEY = 'API_KEY_FROM_PREVIOUS_STEP';
const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

function onGAPILoad() {
  gapi.client.init({
    // Don't pass client nor scope as these will init auth2, which we don't want
    apiKey: API_KEY,
    discoveryDocs: DISCOVERY_DOCS,
  }).then(function () {
    console.log('gapi initialized')
  }, function(error) {
    console.log('error', error)
  });
}
```

If you reload the extension and inspect `background.html` you should see `gapi initialized` in the console

![background.html inspector page showing "gapi initialized" message in the console]({{ assets_path }}/Extensions-Management-inspect-2-background-html.png)

### Using Google API

In order to see that it's working, we're going to read the contents of a spreadsheet by updating `background.js` like this:

```js
const API_KEY = 'API_KEY_FROM_PREVIOUS_STEP';
const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';
const SPREADSHEET_TAB_NAME = 'main';

function onGAPILoad() {
  gapi.client.init({
    // Don't pass client nor scope as these will init auth2, which we don't want
    apiKey: API_KEY,
    discoveryDocs: DISCOVERY_DOCS,
  }).then(function () {
    console.log('gapi initialized')
    chrome.identity.getAuthToken({interactive: true}, function(token) {
      gapi.auth.setToken({
        'access_token': token,
      });

      gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: SPREADSHEET_TAB_NAME,
      }).then(function(response) {
        console.log(`Got ${response.result.values.length} rows back`)
      });
    })
  }, function(error) {
    console.log('error', error)
  });
}
```
{: data-line="12-24"}

This should return the number of rows in the spreadtheet:

![background.html inspector page showing the number of loaded rows in the console]({{ assets_path }}/Extensions-Management-inspect-3-background-html.png)

### Adding data to spreadsheet with a click of a button

Let's inject a script on this blog. Add `"content_scripts"` to your manifest.json:

```json
{
  "name": "Extension with GAPI tutorial",
  ...
  "content_scripts": [
    {
      "matches": [
        "https://bumbu.me/*"
      ],
      "js": [
        "inject.js"
      ],
      "run_at": "document_end"
    }
  ]
}
```
{: data-line="4-14"}

And let's create the `inject.js` file:

```js
// Create the button
var button = document.createElement("button");
button.innerHTML = "Save to Google Spreadsheets";

// Append to header
var header = document.querySelector('.post__header');
header.appendChild(button);

// Add event handler
button.addEventListener ("click", function() {
  var data = {
    title: document.querySelector('.post__title').textContent,
    url: window.location.href,
  }
  chrome.runtime.sendMessage(data, function(response) {
    console.log('response', response);
  });
});
```

It will create a button under the page header (don't forget to refresh the extension):

![Adding a custom button under the header on bumbu.me website]({{ assets_path }}/bumbu-me-injected-button.png)

Now we need to process the message and save in the spreadsheet. For this update the `background.js` like this:

```js
const API_KEY = 'API_KEY_FROM_PREVIOUS_STEP';
const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';
const SPREADSHEET_TAB_NAME = 'main';

function onGAPILoad() {
  gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: DISCOVERY_DOCS,
  });
}

// Listen for messages from inject.js
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    // Get the token
    chrome.identity.getAuthToken({interactive: true}, function(token) {
      // Set GAPI auth token
      gapi.auth.setToken({
        'access_token': token,
      });

      const body = {values: [[
        new Date(), // Timestamp
        request.title, // Page title
        request.url, // Page URl
      ]]};

      // Append values to the spreadsheet
      gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: SPREADSHEET_TAB_NAME,
        valueInputOption: 'USER_ENTERED',
        resource: body
      }).then((response) => {
        // On success
        console.log(`${response.result.updates.updatedCells} cells appended.`)
        sendResponse({success: true});
      });
    })

    // Wait for response
    return true;
  }
);
```

> Don't forget to refresh the extension in **Extensions Management** page.

Now when clicking on the button, you should the success output in the console.

![Extension response in the console of the bumbu.me website after clicking on the custom button]({{ assets_path }}/bumbu-me-injected-button-result.png)

And if you open your spreadsheet, you should see the newly added row:

![Google spreadsheets record]({{ assets_path }}/google-spreadsheets-input.png)

## Download full example

You can download the full example from [here]({{ assets_path }}/gapi-example.zip){: target="_blank" }.

## Sources

* [OAuth2: Authenticate Users with Google](https://developer.chrome.com/apps/tut_oauth){: target="_blank"}
* [Google API Client Library for JavaScript](https://github.com/google/google-api-javascript-client){: target="_blank"}
* [Google API scopes](https://developers.google.com/identity/protocols/googlescopes#sheetsv4){: target="_blank"}
* [Google Sheets API](https://developers.google.com/sheets/api/quickstart/js){: target="_blank"}
* [Message Passing](https://developer.chrome.com/extensions/messaging){: target="_blank"}
