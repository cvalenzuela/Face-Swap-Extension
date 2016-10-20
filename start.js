/* Script that loads the app when clicked */

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(null, {file: "js/sketch.js"});
});
