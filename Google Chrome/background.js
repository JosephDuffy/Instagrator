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

chrome.webNavigation.onCompleted.addListener(function(details) {
	if (details.url.indexOf('facebook.com') > -1) {
		/*console.log('Facebook URL: ' + details.url);
		console.log('Facebook tabId: ' + details.tabId);*/
		// URL is Facebook. Show the page action icon
		chrome.pageAction.show(details.tabId);
		// Replace hashtags on the current page
		searchPage();
	}
});

chrome.runtime.onInstalled.addListener(function(details) {
	// Something has updated
	console.log(details);
	if (details.reason == 'install') {
		// Extension was installed
		console.log('Installed');
		chrome.tabs.create({url: chrome.extension.getURL('install.html')});
	} else if (details.reason == 'update') {
		// Extension was updated
		console.log('Updated: ' + details.previousVersion);
	}
});

function searchPage() {
	chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.sendMessage(tab.id, 'searchPage');
	});
}