const onoffselection = document.querySelector("#onoff");
const sidemenusection = document.querySelector("#sidemenusection");
const shortcutsection = document.querySelector("#shortcutsection");
const mainpage = document.querySelector("#mainpage");

const menupage = document.querySelector("#menupage");
const menuback = document.querySelector("#menuback");

const shortcutpage = document.querySelector("#shortcutpage");
const shortcutback = document.querySelector("#shortcutback");

function openMenuPage() {
  mainpage.style.left = "-350px";
  menupage.style.right = "0px";
}

function backFromMenu() {
  mainpage.style.left = "0px";
  menupage.style.right = "-350px";
}

function openShortcutPage() {
  mainpage.style.left = "-350px";
  shortcutpage.style.right = "0px";
}

function backFromShortcut() {
  mainpage.style.left = "0px";
  shortcutpage.style.right = "-350px";
}

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

/*
On blur, save the currently selected settings.
*/
document.addEventListener("DOMContentLoaded", function () {
  sidemenusection.addEventListener("click", openMenuPage);
  menuback.addEventListener("click", backFromMenu);

  shortcutsection.addEventListener("click", openShortcutPage);
  shortcutback.addEventListener("click", backFromShortcut);
});

onoffselection.addEventListener("change", storeSettings);
