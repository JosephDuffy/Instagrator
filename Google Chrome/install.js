// Saves options to localStorage.
var storage = chrome.storage.sync;

function loadOptions() {
    storage.get(null, function(reponse) {
        var options = reponse;
        console.log(options);
        if (typeof options.searchSite == 'undefined') {
            storage.set({'searchSite': 'http://statigr.am/tag/'});
        }
        if (typeof options.target == 'undefined') {
            storage.set({'target': '_blank'});
        }
        if (typeof options.searchSite == 'undefined') {
            storage.set({'sendData': true});
        }
    });
}

document.addEventListener('DOMContentLoaded', loadOptions);