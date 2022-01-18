chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.type == "reloadTabs"){
        chrome.tabs.query({}, function (tabs) {
            for (let tab of tabs) {
              if (tab.url.includes("https://learn") && tab.url.includes(".edu.au/")) {
                if (tab.title.includes("SEQTA Learn")) {
                    chrome.tabs.reload(tab.id);
                }
              }
            }
          });
    }
    if (request.type == "githubTab") {
        chrome.tabs.create({ url: "https://github.com/Nulkem/better-seqta" });
    }

});

