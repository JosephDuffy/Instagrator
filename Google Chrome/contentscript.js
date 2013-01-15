// Homepage and profiles
$('.uiUnifiedStory, .timelineUnitContainer').each(function() {
    if (jQuery.parseJSON($(this).attr('data-gt'))) {
        // Has a data-gt attribute
        var json = jQuery.parseJSON($(this).attr('data-gt'))
        if ('appid' in json || 'app_id' in json) {
            // Has an appid
            if (json.appid == "124024574287414" || json.app_id == "124024574287414") {
                // An Intagram post
                var post = $(this).find('.userContent');
                chrome.extension.sendMessage({get: "options"}, function(response) {
                    // Request the searchSite option
                    post.html(function() {
                        // Change the HTML of the post
                        var text = post[0].innerHTML;
                        text = text.replace(/(#\w+)/g, function(string) {
                            // Replace hastags with a link to search for that hashtag
                            string = string.replace('#', '');
                            return "<a href=\"" + response.searchSite + "" + string + "\" target=\"" + response.target + "\">#" + string + "</a>";
                        });
                        return text;
                    });
                });
            }
        }
    }
});

// photo.php
$('.hasCaption').each(function() {
    if (jQuery.parseJSON($(this).attr('data-gt'))) {
        // Has a data-gt attribute
        var json = jQuery.parseJSON($(this).attr('data-gt'))
        if ('appid' in json || 'app_id' in json) {
            // Has an appid
            if (json.appid == "124024574287414" || json.app_id == "124024574287414") {
                // An Intagram post
                var post = $(this).find('.userContent');
                chrome.extension.sendMessage({get: "options"}, function(response) {
                    // Request the searchSite option
                    post.html(function() {
                        // Change the HTML of the post
                        var text = post[0].innerHTML;
                        text = text.replace(/(#\w+)/g, function(string) {
                            // Replace hastags with a link to search for that hashtag
                            string = string.replace('#', '');
                            return "<a href=\"" + response.searchSite + "" + string + "\" target=\"" + response.target + "\">#" + string + "</a>";
                        });
                        return text;
                    });
                });
            }
        }
    }
});