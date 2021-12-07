const onoffselection = document.querySelector("#onoff");

/*
Store the currently selected settings using chrome.storage.local.
*/
function storeSettings() {
  browser.storage.local.set({
    onoff: onoffselection.checked,
  });
  browser.tabs.reload();
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
