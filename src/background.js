function ReloadSEQTAPages() {
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

chrome.runtime.onMessage.addListener(function (request, sender) {
  if (request.type == "reloadTabs") {
    ReloadSEQTAPages();
  }
  else if (request.type == "githubTab") {
    chrome.tabs.create({ url: "https://github.com/Nulkem/betterseqta" });
  }
  else if (request.type == "setDefaultStorage") {
    console.log('setting default values')
    SetStorageValue(DefaultValues);
  }

});

const DefaultValues = {
  onoff: true,
  lessonalert: false,
  notificationcollector: true,
  menuitems: {
    welcome: { toggle: false, seqtaenabled: false },
    portals: { toggle: false, seqtaenabled: false },
    dashboard: { toggle: false, seqtaenabled: false },
    forums: { toggle: false, seqtaenabled: false },
    goals: { toggle: false, seqtaenabled: false },
    documents: { toggle: false, seqtaenabled: false },
    settings: { toggle: false, seqtaenabled: false },
  },
  selectedColor: '#161616',
  shortcuts: [
    {
      name: "YouTube",
      enabled: true
    },
    {
      name: "Outlook",
      enabled: true
    },
    {
      name: "Office",
      enabled: true
    },
    {
      name: "Spotify",
      enabled: true
    },
    {
      name: "Google",
      enabled: false
    },
    {
      name: "DuckDuckGo",
      enabled: false
    },
    {
      name: "Cool Math Games",
      enabled: false
    },
    {
      name: "SACE",
      enabled: false
    },
    {
      name: "Google Scholar",
      enabled: false
    },
    {
      name: "Gmail",
      enabled: false
    }
  ]
}

function SetStorageValue(object) {
  for (var i in object) {
    chrome.storage.local.set({ [i]: object[i] })
  }

}

function UpdateCurrentValues(details) {
  console.log(details)

  chrome.storage.local.get(null, function (items) {
    var CurrentValues = items;

    const NewValue = Object.assign({}, DefaultValues, CurrentValues)

    function CheckInnerElement(element) {
      for (let i in element) {
        if (typeof element[i] === 'object') {
          if (typeof DefaultValues[i].length == 'undefined') {
            NewValue[i] = Object.assign({}, DefaultValues[i], CurrentValues[i])
          }
          else { // If the object is an array, turn it back after
            length = DefaultValues[i].length;
            NewValue[i] = Object.assign({}, DefaultValues[i], CurrentValues[i])
            NewArray = [];
            for (let j = 0; j < length; j++) {
              NewArray.push(NewValue[i][j]);

            }
            NewValue[i] = NewArray;

          }

        }
      }
    }

    CheckInnerElement(DefaultValues);

    SetStorageValue(NewValue);
  })
}

chrome.runtime.onInstalled.addListener(UpdateCurrentValues)


