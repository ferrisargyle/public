## Dashboards with Google Charts & Sheets: Apps Script & App Engine

There are a couple of simple alternatives for display-only data, both leveraging Google Sheets and [Google Charts](https://developers.google.com/chart/): Google Charts includes the [Table Chart](https://developers.google.com/chart/interactive/docs/gallery/table), a powerful way of visualizing tabular data, including pagination, as well as [Visualization API Query Language](https://developers.google.com/chart/interactive/docs/querylanguage), which supports easily querying Google spreadsheets and other data sources from App Engine or other 3rd party applications.
* One thing to be aware of is that Visualization Query Language is supported only by old Google Spreadsheets today.
 
Apps Script's UI Service natively supports Charts; using Google Charts with the newer HtmlService is a bit more fun.
 
[Here's](https://script.google.com/macros/s/AKfycbwiIg-M9mshNZfpvL5Z0ULF226pf4Fu6V_x_Sb_O1vQzTCHhBHG/exec) a simple example of a chart and table dashboard built with Apps Script HtmlService and Google Charts; it uses jQuery for the tabs: jQuery and other JavaScript libraries are generally well-supported by Apps Script HtmlService now.
 
You can embed the resulting dashboard or table in Sites using the Apps Script or iFrame gadgets.
 
Source code for both Apps Script HtmlService and App Engine versions of this dashboard is in this repository.
