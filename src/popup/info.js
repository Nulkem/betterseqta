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
const miscsection = document.querySelector('#miscsection');
const mainpage = document.querySelector("#mainpage");
const colorpicker = document.querySelector("#colorpicker");
const animatedbk = document.querySelector('#animatedbk');


const applybutton = document.querySelector('#applychanges')

const navbuttons = document.getElementsByClassName("navitem");
const menupages = document.getElementsByClassName("menu-page")

const allinputs = document.getElementsByTagName('input');

const menupage = document.querySelector("#menupage");

const shortcutpage = document.querySelector("#shortcutpage");

const miscpage = document.querySelector('#miscpage');

var menubuttons = document.getElementsByClassName("menuitem");
var shortcutbuttons = document.getElementsByClassName("shortcutitem");

const github = document.getElementById("github");

function openGithub() {
  chrome.tabs.create({ url: "https://github.com/Nulkem/better-seqta" });
}


function openPage(page) {
  mainpage.style.left = "-350px";
  page.style.right = '0px';
}

function backToMainMenu(){
  mainpage.style.left = "0px";

  menupage.style.right = "-350px";
  shortcutpage.style.right = "-350px";
  miscpage.style.right = "-350px";
}

function resetActive(){
  for (let i = 0; i < navbuttons.length; i++) {
    navbuttons[i].classList.remove('activenav');
  }
  for (let i = 0; i < menupages.length; i++) {
    menupages[i].classList.add('hiddenmenu');
  }

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
  chrome.storage.local.set({ animatedbk: animatedbk.checked });
}


function StoreAllSettings() {
  chrome.storage.local.get(["menuitems"], function (result) {
    var menuItems = result.menuitems;
    for (var i = 0; i < menubuttons.length; i++) {
      var id = menubuttons[i].id;

      menuItems[id].toggle = menubuttons[i].checked;
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
    animatedbk.checked = restoredSettings.animatedbk;
    chrome.storage.local.get(["menuitems"], function (result) {
      var menuItems = Object.values(result)[0];
      console.log(menubuttons)
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

  sidemenusection.addEventListener("click", () => {resetActive(); sidemenusection.classList.add('activenav'); menupage.classList.remove('hiddenmenu')});

  shortcutsection.addEventListener("click", () => {resetActive(); shortcutsection.classList.add('activenav'); shortcutpage.classList.remove('hiddenmenu')});

  miscsection.addEventListener("click", () => {resetActive(); miscsection.classList.add('activenav'); miscpage.classList.remove('hiddenmenu')})
});

onoffselection.addEventListener("change", storeSettings);
notificationcollector.addEventListener(
  "change",
  storeNotificationSettings
);
lessonalert.addEventListener("change", storeNotificationSettings)

animatedbk.addEventListener("change", storeNotificationSettings)



var unsavedchangesshown = false

for (let i = 0; i < allinputs.length; i++) {
  if (allinputs[i].id != 'colorpicker'){
    allinputs[i].addEventListener("change", () => {applybutton.style.left = "4px"})
  }
}

applybutton.addEventListener('click', () => {StoreAllSettings(); applybutton.style.left = "-150px"})


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