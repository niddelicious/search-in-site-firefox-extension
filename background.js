browser.contextMenus.create({
    id: "search-in-site",
    title: "Search in Site",
    contexts: ["selection"],
});
console.log("Context added");
var searchFieldFound = false;

async function updateContextMenu() {
    if (searchFieldFound) {
        browser.contextMenus.create({
            id: "search-in-site",
            title: "Search in Site",
            contexts: ["selection"],
        });
    } else {
        browser.contextMenus.remove("search-in-site");
    }
}

browser.contextMenus.onClicked.addListener(async function (info, tab) {
    if (info.menuItemId == "search-in-site") {
        browser.tabs.sendMessage(tab.id, { "selection_text": info.selectionText })
    }
});

document.addEventListener("contextmenu", updateContextMenu);

browser.runtime.onMessage.addListener(catchHighlight);

function catchHighlight(message) {
    searchFieldFound = message.search_field;
    updateContextMenu();
}
