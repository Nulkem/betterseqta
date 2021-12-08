const onoffselection = document.querySelector("#onoff");

function FindSEQTATab() {
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
/*
Store the currently selected settings using chrome.storage.local.
*/
function storeSettings() {
  chrome.storage.local.set({ onoff: onoffselection.checked }, function () {
    console.log("set the value");
    FindSEQTATab();
  });
}
/*
Update the options UI with the settings values retrieved from storage,
or the default settings if the stored settings are empty.
*/
function updateUI(restoredSettings) {
  console.log(restoredSettings.onoff);
  onoffselection.checked = restoredSettings.onoff;
  if (restoredSettings.onoff == null) {
    onoffselection.checked = true;
  }
}

function onError(e) {
  console.error(e);
}
/*
On opening the options page, fetch stored settings and update the UI with them.
*/
chrome.storage.local.get(["onoff"], function (result) {
  updateUI(result);
});
// const gettingStoredSettings = browser.storage.local.get();
// gettingStoredSettings.then(updateUI, onError);

/*
On blur, save the currently selected settings.
*/
onoffselection.addEventListener("change", storeSettings);
