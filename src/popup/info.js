const onoffselection = document.querySelector("#onoff");

async function FindSEQTATab() {
  let tabs = await browser.tabs.query({});
  for (let tab of tabs) {
    if (tab.url.includes("https://learn") && tab.url.includes(".edu.au/")) {
      if (tab.title.includes("SEQTA Learn")) {
        chrome.tabs.reload(tab.id);
      }
    }
  }
}
/*
Store the currently selected settings using chrome.storage.local.
*/
function storeSettings() {
  browser.storage.local.set({
    onoff: onoffselection.checked,
  });
  FindSEQTATab();
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
const gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(updateUI, onError);

/*
On blur, save the currently selected settings.
*/
onoffselection.addEventListener("change", storeSettings);
