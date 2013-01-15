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
  	}
});