if (typeof options === 'undefined') {
    // Load options from local storage
    var storage = chrome.storage.sync;
    storage.get(null, function(reponse) {
        options = reponse;
        chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
            if (request == "searchPage") {
                searchPage();
            }
        });
    });
}

/**
*
*   .uiInifiedStory is for the home page and facebook.com/username/activity/activitynumber
*   .timelineUnitContainer is for users' profiles
*   .hasCaption is for photo.php
*/
function searchPage() {
    $('.uiUnifiedStory, .timelineUnitContainer, .hasCaption').each(function() {
        if (jQuery.parseJSON($(this).attr('data-gt'))) {
            // Has a data-gt attribute
            var datagt = jQuery.parseJSON($(this).attr('data-gt'));
        }
        if (jQuery.parseJSON($(this).attr('data-ft'))) {
            // Used for facebook.com/username/activity/*
            var dataft = jQuery.parseJSON($(this).attr('data-ft'));
        }
        if (typeof datagt !== 'undefined' && typeof dataft !== 'undefined') {
            // Element had both data-gt and data-ft attributes. Merge the arrays
            var json = jQuery.extend(datagt, dataft);
        } else if (typeof datagt !== 'undefined') {
            // Only data-gt attribute exists
            var json = datagt;
        } else if (typeof dataft !== 'undefined') {
            // Only data-ft attribute exists
            var json = dataft;
        }
        if (typeof json !== 'undefined') {
            // Has a data-gt or data0ft attribute
            if ('appid' in json || 'app_id' in json) {
                // Has an appid
                if (json.appid == "124024574287414" || json.app_id == "124024574287414") {
                    // An Intagram post
                    if ($(this)[0].className == 'hasCaption') {
                        // photos.php page
                        var post = $(this).find('span');
                    } else {
                        // Other page
                        var post = $(this).find('.userContent');
                    }
                    post.html(function() {
                        // Change the HTML of the post
                        var text = post[0].innerHTML;
                        return linkify(text);
                    });
                }
            } else if ('creator' in json) {
                if (json.creator == '162454007121996') {
                    // An post created by the Instagram page
                    if ($(this)[0].className == 'hasCaption') {
                        // photos.php page
                        var post = $(this).find('span');
                    } else {
                        // Other page
                        var post = $(this).find('.userContent');
                    }
                    post.html(function() {
                        // Change the HTML of the post
                        var text = post[0].innerHTML;
                        return linkify(text);
                    });
                }
            }
        }
    });
}

function linkify(text) {
    // Replace hastags
    text = text.replace(/(#\w+)/g, function(string) {
        // Replace hastags with a link to search for that hashtag
        chrome.extension.sendMessage({push: "analyticsEvent", event: string, text: 'linkified'});
        string = string.replace('#', '');
        return '<a href="' + options.searchSite + string + '" target="' + options.target + '">#' + string + '</a>';
    });
    // Replace usernames
    text = text.replace(/(@\w+)/g, function(string) {
        // Replace usernames with a link to that users Instagram page
        chrome.extension.sendMessage({push: "analyticsEvent", event: string, text: 'linkified'});
        string = string.replace('@', '');
        return '<a href="http://www.instagram.com/' + string + '" target="' + options.target + '">@' + string + '</a>';
    });
    return text;
}