var ariaDescribedAt = '';
var longDesc = '';

 /**                                                                             
 * This is called when the extension is first loaded, so that it can be
 * immediately used in all already-open tabs. It's not needed for any
 * new tabs that open after that, the content script will be automatically
 * injected into any new tab.
 */
chrome.windows.getAll({'populate': true}, function(windows) {
  for (var i = 0; i < windows.length; i++) {
    var tabs = windows[i].tabs;
    for (var j = 0; j < tabs.length; j++) {
      chrome.tabs.executeScript(
        tabs[j].id,
        {file: 'lastRightClick.js'});
    }
  }
});

/**
 * Add context menu item when the extension is installed.
 */
chrome.contextMenus.create({
    "title": "More information...",
    "contexts": ["all"],
    "id": "moreInfo",
    "onclick": contextMenuClicked,
    "enabled": false
  });

/**
 * Add listener for messages from content script.
 * Enable/disable the context menu item.
 */
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.enabled) {
      ariaDescribedAt = request.ariaDescribedAt;
      longDesc = request.longDesc;
    }
    chrome.contextMenus.update('moreInfo', {
      "enabled": request.enabled
    });
  });

/**
 * Event handler for when a context menu item is clicked.
 * aria-describedat is given a higher priority.
 * No need to strip the URL of leading/trailing white space
 * because Chrome takes care of this.
 *
 * @param info
 * @param tab
 */
function contextMenuClicked(info, tab) {
  if (ariaDescribedAt !== '') {
    chrome.tabs.create({url: ariaDescribedAt});
  } else if (longDesc !== '') {
    chrome.tabs.create({url: longDesc});
  }
}
