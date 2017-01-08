---
title: Show and hide different height tableView cells in iOS (swift)
date: 2015-08-07T22:51:19+00:00
author: bumbu
layout: post
permalink: /show-and-hide-different-height-tableview-cells-in-ios-swift/
categories: development
---
If you have a tableView with predefined cells (rows) of different height and you want to dynamically hide some of them.

<img class="aligncenter size-medium wp-image-743" src="http://bumbu.me/wp-content/uploads/2015/08/iOS-tableView-different-heights-cells-241x300.png" alt="iOS tableView different heights cells" width="241" height="300" />

In my case I want to hide <em>Quantity</em> row when type is set as <em>Second</em>. It could be done by setting this cell height to 0. Like this:
<pre class="prettyprint lang-swift"><code>override func tableView(tableView: UITableView, heightForRowAtIndexPath indexPath: NSIndexPath) -&gt; CGFloat {
  if type.selectedSegmentIndex == 1 &amp;&amp; indexPath.row == 3 {
    return 0.0
  }

  return 72.0
}</code></pre>
But the problem here is that <code>heightForRowAtIndexPath</code> will be called for all the rows and it seems that there is no simple way to update the height to only one cell. You'll have to update all cells. Which in our case is not a problem because we know all our cells beforehand. So we can update our code to:
<pre class="prettyprint lang-swift"><code>override func tableView(tableView: UITableView, heightForRowAtIndexPath indexPath: NSIndexPath) -&gt; CGFloat {
  if indexPath.row == 0 {
    return 150.0
  }

  if type.selectedSegmentIndex == 1 &amp;&amp; indexPath.row == 3 {
    return 0.0
  }

  return 72.0
}</code></pre>
As you can see there are almost no changes from previous code. We only updated the height of first cell (index 0) that is higher then others. But if we just click on type control then nothing changes. In order to fix that we have to tell the renderer that we want to update how cells look like. A solution is to call <code>tableView.reloadData()</code> whenever <em>Type</em>'s value changes (take care as it is not an optimal solution):
<pre class="prettyprint lang-swift"><code>@IBAction func changeType(sender: UISegmentedControl) {
  self.tableView.reloadData()
}</code></pre>
But this may result in cells overlap like this
<img class="aligncenter size-medium wp-image-746" src="http://bumbu.me/wp-content/uploads/2015/08/iOS-tableView-different-heights-cells-overlap-243x300.png" alt="iOS tableView different heights cells overlap" width="243" height="300" />

In order to fix that we can additionally hide the cell when <em>Type</em> value changes:
<pre class="prettyprint lang-swift"><code>@IBAction func changeType(sender: UISegmentedControl) {
  var cell3Index = NSIndexPath.init(forRow: 3, inSection: 0)
  var quantityCell = self.tableView.cellForRowAtIndexPath(cell3Index)

  if sender.selectedSegmentIndex == 1 {
    quantityCell?.hidden = true
  } else {
    quantityCell?.hidden = false
  }

  self.tableView.reloadData()
}</code></pre>
That's it. Now our tableView looks as intended.

<img class="aligncenter size-medium wp-image-748" src="http://bumbu.me/wp-content/uploads/2015/08/iOS-tableView-different-heights-cells-hidden-243x300.png" alt="iOS tableView different heights cells hidden" width="243" height="300" />
