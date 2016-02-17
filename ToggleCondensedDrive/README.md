Miss the old Drive UI? Want to see more of your Google Drive folders and files on your laptop or workstation?

* Create a new bookmark, ideally on the toolbar.

* Paste the javascript into the bookmark URL field.

* Click the bookmark to toggle.

This utility builds on the concepts in the earlier [Maximize Hangouts Screensharing Panel post](http://yabataba.com/#/); it uses the stylesheet as a persistent store to address Drive CSS idiosyncracies. Here's the un-minified code for readability.

#### Notes 

* It's a little fragile since it depends on Drive class names remaining consistent; you can easily change the code if they change.

* If you'd like a different degree of compression, change the variables at the top of the file.