var SPREADSHEET = SpreadsheetApp.openById("1YOwC97AsXpEW6qcYsBbGwm3VFdLsyiTGvnv1Iw7_MCE");
var SHEET_NAME = "Sheet1";

/**
* Main entry point:
* <ul>
* <li>Create data array from spreadsheet
* <li>Display dashboard
* </ul>
* @param {e} environment variables such as url arguments
* @return {HtmlOutput} dashboard 
 */
function doGet(e) {

  var template = HtmlService.createTemplateFromFile('dashboard');  
  
  var masterPivotSheet = SPREADSHEET.getSheetByName(SHEET_NAME);
  var dataRange = masterPivotSheet.getDataRange();
  var dataArr = dataRange.getValues();

  template.initObj = {}; // array must be passed inside an object
  template.initObj.dataArr = dataArr; 
  return template.evaluate();

}

