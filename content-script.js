console.log('Content loaded');
var searchField = false;

window.addEventListener('load', notifyExtension());

function notifyExtension() {
    const searchFields = Array.from(document.querySelectorAll('input[type="search"], input[type="text"][name*="search"], input[type="text"][id*="search"], input[role="search"], input[aria-label="Search"]'));
    if (searchFields.length > 0) {
        searchField = searchFields[0];
        browser.runtime.sendMessage({ "search_field": true });
    } else {
        browser.runtime.sendMessage({ "search_field": false });
    }
}

browser.runtime.onMessage.addListener(searchInSite);

function searchInSite(message) {
    searchField.value = message.selection_text;
    searchField.form.submit();
}

