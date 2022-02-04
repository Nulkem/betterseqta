// Copyright (C) 2022 Nulkem

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

const onoffselection = document.querySelector("#onoff");
const notificationcollector = document.querySelector("#notification");
const lessonalert = document.querySelector("#lessonalert");
const sidemenusection = document.querySelector("#sidemenusection");
const shortcutsection = document.querySelector("#shortcutsection");
const mainpage = document.querySelector("#mainpage");
const colorpicker = document.querySelector("#colorpicker");

const menupage = document.querySelector("#menupage");
const menuback = document.querySelector("#menuback");

const shortcutpage = document.querySelector("#shortcutpage");
const shortcutback = document.querySelector("#shortcutback");

var applybuttons = document.getElementsByClassName("apply-changes");
var menubuttons = document.getElementsByClassName("menuitem");
var shortcutbuttons = document.getElementsByClassName("shortcutitem");

const github = document.getElementById("github");

function openGithub() {
  chrome.tabs.create({ url: "https://github.com/Nulkem/better-seqta" });
}

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
    FindSEQTATab();
  });
}

function storeNotificationSettings() {
  chrome.storage.local.set(
    { notificationcollector: notificationcollector.checked });
  chrome.storage.local.set({ lessonalert: lessonalert.checked });
}


function StoreAllSettings() {
  chrome.storage.local.get(["menuitems"], function (result) {
    var menuItems = result.menuitems;
    console.log(result.menuitems);
    for (var i = 0; i < menubuttons.length; i++) {
      var id = menubuttons[i].id;

      menuItems[id].toggle = menubuttons[i].checked;
      console.log(menuItems[id]);
    }
    chrome.storage.local.set({ menuitems: menuItems });
  });

  chrome.storage.local.get(["shortcuts"], function (result) {
    var shortcuts = Object.values(result)[0];
    console.log(shortcuts);
    for (var i = 0; i < shortcutbuttons.length; i++) {
      shortcuts[i].enabled = shortcutbuttons[i].checked;
    }
    chrome.storage.local.set({ shortcuts: shortcuts });
  });

  FindSEQTATab();
}
/*
Update the options UI with the settings values retrieved from storage,
or the default settings if the stored settings are empty.
*/
function updateUI(restoredSettings) {
  if (typeof restoredSettings.onoff == 'undefined') {
    chrome.runtime.sendMessage({ type: "setDefaultStorage" });

    chrome.storage.local.get(null, function (result) {
      updateUI(result);
    });
  } else {
    onoffselection.checked = restoredSettings.onoff;
    notificationcollector.checked = restoredSettings.notificationcollector;
    lessonalert.checked = restoredSettings.lessonalert;
    chrome.storage.local.get(["menuitems"], function (result) {
      var menuItems = Object.values(result)[0];
      for (var i = 0; i < menubuttons.length; i++) {
        var id = menubuttons[i].id;
        menubuttons[i].checked = menuItems[id].toggle;

        if (menuItems[id].seqtaenabled == false) {
          document.getElementById(id).parentNode.parentNode.style.display = 'none';
        }
      }
    });

    chrome.storage.local.get(["shortcuts"], function (result) {
      var shortcuts = Object.values(result)[0];
      console.log(shortcuts);
      for (var i = 0; i < shortcutbuttons.length; i++) {
        shortcutbuttons[i].checked = shortcuts[i].enabled;
      }
      chrome.storage.local.set({ shortcuts: shortcuts });
    });
  }
}

function onError(e) {
  console.error(e);
}
/*
On opening the options page, fetch stored settings and update the UI with them.
*/
chrome.storage.local.get(null, function (result) {
  document.getElementsByClassName('clr-field')[0].style.color = result.selectedColor;
  colorpicker.value = result.selectedColor;
  console.log(result);
  updateUI(result);
});

/*
On blur, save the currently selected settings.
*/
document.addEventListener("DOMContentLoaded", function () {
  github.addEventListener("click", openGithub);

  sidemenusection.addEventListener("click", openMenuPage);
  menuback.addEventListener("click", backFromMenu);

  shortcutsection.addEventListener("click", openShortcutPage);
  shortcutback.addEventListener("click", backFromShortcut);

  for (var i = 0; i < applybuttons.length; i++) {
    applybuttons[i].addEventListener(
      "click",
      StoreAllSettings.bind(applybuttons[i], i)
    );
  }
});

onoffselection.addEventListener("change", storeSettings);
notificationcollector.addEventListener(
  "change",
  storeNotificationSettings
);
lessonalert.addEventListener("change", storeNotificationSettings)



colorpicker.addEventListener("input", function () {
  var colorPreview = document.querySelector('#clr-color-preview')
  if (colorPreview.style.color) {
    var hex = colorPreview.style.color.split("(")[1].split(")")[0];
    hex = hex.split(",");
    var b = hex.map(function (x) {             //For each array element
      x = parseInt(x).toString(16);      //Convert to a base16 string
      return (x.length == 1) ? "0" + x : x;  //Add zero if we get only one character
    })
    b = "#" + b.join("");

    chrome.storage.local.set({ selectedColor: b })
  }


})