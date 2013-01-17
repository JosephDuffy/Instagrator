// Saves options to localStorage.
var storage = chrome.storage.local;

function createDefault() {
    // Clear all saved options
    storage.clear(function() {
        // Storage has been cleared, save the options!
        storage.set({'searchSite': 'http://statigr.am/tag/', 'target': '_blank', 'sendData': true});
    });
}