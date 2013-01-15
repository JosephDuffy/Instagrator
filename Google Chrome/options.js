// Saves options to localStorage.
function saveOptions() {
    var select = document.getElementById("searchSite");
    var searchSite = select.children[select.selectedIndex].value;
    localStorage["searchSite"] = searchSite;

    var select = document.getElementById("target");
    var target = select.children[select.selectedIndex].value;
    localStorage["target"] = target;

    var status = document.getElementById("status");
    status.innerHTML = "Options Saved.";
    setTimeout(function() {
        status.innerHTML = "";
    }, 3000);
}

// Restores select box state to saved value from localStorage.
function restoreOptions() {
    var searchSite = localStorage["searchSite"];
    if (!searchSite) {
        return;
    }
    var select = document.getElementById("searchSite");
    for (var i = 0; i < select.children.length; i++) {
        var child = select.children[i];
        if (child.value == searchSite) {
            child.selected = "true";
            break;
        }
    }

    var target = localStorage["target"];
    if (!target) {
        return;
    }
    var select = document.getElementById("target");
    for (var i = 0; i < select.children.length; i++) {
        var child = select.children[i];
        if (child.value == target) {
            child.selected = "true";
            break;
        }
    }
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('#save').addEventListener('click', saveOptions);