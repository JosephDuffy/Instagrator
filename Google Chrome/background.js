// Load Google Analytics
var _gaq = _gaq || [];
/*
Development: UA-37681270-1
Release: UA-37681270-2
*/
_gaq.push(['_setAccount', 'UA-37681270-1']);
_gaq.push(['_trackPageview']);

(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.get == "options") {
    	if (!localStorage['searchSite']) {
			localStorage['searchSite'] = 'http://statigr.am/tag/';
		}
		if (!localStorage['target']) {
			localStorage['target'] = '_blank';
		}
		if (!localStorage['sendData']) {
			localStorage['sendData'] = false;
		}
        sendResponse({searchSite: localStorage['searchSite'], target: localStorage['target']});
  	} else if (request.push == "analyticsEvent") {
  		if (localStorage['sendData'] == 'true') {
            _gaq.push(['_trackEvent', request.event, request.text]);
        }
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
		searchPage();
	}
});

function searchPage() {
	chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.sendMessage(tab.id, 'searchPage');
	});
}