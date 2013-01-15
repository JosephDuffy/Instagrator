function replaceHashtags() {
    console.log('Sending Content Script a message');
    chrome.runtime.getBackgroundPage().replaceHashtags();
}

document.addEventListener('DOMContentLoaded', function () {
    $('#replaceHashtags').bind('click', replaceHashtags);
});