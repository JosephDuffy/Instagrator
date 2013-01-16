// Saves options to localStorage.
var storage = chrome.storage.local;
function saveOptions() {
    // Get each of the option
    var select = document.getElementById("searchSite");
    var searchSite = select.children[select.selectedIndex].value;

    var select = document.getElementById("target");
    var target = select.children[select.selectedIndex].value;

    var sendData = document.getElementById('sendData');
    if (sendData.checked) {
        sendData = true;
    } else {
        sendData = false;
    }
    // Clear all saved options
    storage.clear(function() {
        // Storage has been cleared, save the options!
        storage.set({'searchSite': searchSite, 'target': target, 'sendData': sendData}, function() {
            var status = document.getElementById("status");
            status.innerHTML = "Options Saved.";
            setTimeout(function() {
                status.innerHTML = "";
            }, 3000);
        });
    });
}

// Restores select box state to saved value from localStorage.
function restoreOptions() {
    // Get all options stored
    storage.get(null, function(options) {
        var select = document.getElementById("searchSite");
        for (var i = 0; i < select.children.length; i++) {
            var child = select.children[i];
            if (child.value == options.searchSite) {
                child.selected = "true";
                break;
            }
        }

        var select = document.getElementById("target");
        for (var i = 0; i < select.children.length; i++) {
            var child = select.children[i];
            if (child.value == options.target) {
                child.selected = "true";
                break;
            }
        }

        if (options.sendData) {
            $('#sendData').prop('checked', true);
        }
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('#save').addEventListener('click', saveOptions);