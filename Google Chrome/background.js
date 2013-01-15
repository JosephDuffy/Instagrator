chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	if (!localStorage['searchSite']) {
		localStorage['searchSite'] = 'http://statigr.am/tag/';
	}
	if (!localStorage['target']) {
		localStorage['target'] = '_blank';
	}
    if (request.get == "options") {
        sendResponse({searchSite: localStorage['searchSite'], target: localStorage['target']});
  	} else if (request.get == "searchSite") {
  		sendResponse(localStorage['searchSite']);
  	} else {
  		error.log('No settings were requested');
  		sendResponse('Please request at least 1 setting');
  	}
});

chrome.webNavigation.onCompleted.addListener(function(details) {
	if (details.url.indexOf('facebook.com') > -1) {
		// URL is Facebook. Show the page action icon
		chrome.pageAction.show(details.tabId);
		// Replace hashtags on the current page
		replaceHashtags();
	}
});

function replaceHashtags() {
	chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.sendMessage(tab.id, 'replaceHashtags');
	});
}