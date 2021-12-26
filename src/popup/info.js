const onoffselection = document.querySelector("#onoff");
const notificationcollector = document.querySelector("#notification");
const sidemenusection = document.querySelector("#sidemenusection");
const shortcutsection = document.querySelector("#shortcutsection");
const mainpage = document.querySelector("#mainpage");

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

function storeNotificationCollectorSetting() {
  chrome.storage.local.set(
    { notificationcollector: notificationcollector.checked },
    function () {}
  );
}

function StoreAllSettings() {
  chrome.storage.local.get(["menuitems"], function (result) {
    var menuItems = result.menuitems;
    console.log(result.menuitems);
    for (var i = 0; i < menubuttons.length; i++) {
      var id = menubuttons[i].id;

      menuItems[id] = menubuttons[i].checked;
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
  if (restoredSettings.onoff == null) {
    var menuItems = {};
    for (var i = 0; i < menubuttons.length; i++) {
      var id = menubuttons[i].id;
      menuItems = Object.assign(menuItems, { [id]: false });
    }

    chrome.storage.local.set({ menuitems: menuItems });
    var shortcutArray = [];
    shortcutArray.push({
      name: "YouTube",
      link: "https://www.youtube.com/",
      icon: "https://www.youtube.com/s/desktop/310f846f/img/favicon_144x144.png",
      enabled: true,
    });
    shortcutArray.push({
      name: "Outlook",
      link: "https://outlook.office365.com/mail/inbox",
      icon: "https://outlook-1.cdn.office.net/assets/mail/pwa/v1/pngs/apple-touch-icon.png",
      enabled: true,
    });
    shortcutArray.push({
      name: "Office",
      link: "http://office.com",
      icon: "https://www.tecon.es/wp-content/uploads/2016/01/logo-OFFICE-365-solo.png",
      enabled: true,
    });
    shortcutArray.push({
      name: "Spotify",
      link: "https://accounts.spotify.com/en/login",
      icon: "https://www.scdn.co/i/_global/touch-icon-144.png",
      enabled: true,
    });
    shortcutArray.push({
      name: "Google",
      link: "https://google.com",
      icon: "https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png",
      enabled: false,
    });
    shortcutArray.push({
      name: "DuckDuckGo",
      link: "https://duckduckgo.com/",
      icon: "https://duckduckgo.com/assets/icons/meta/DDG-iOS-icon_152x152.png",
      enabled: false,
    });
    shortcutArray.push({
      name: "Cool Math Games",
      link: "https://coolmathgames.com/",
      icon: "https://www.coolmathgames.com/pwa/images/icon-512x512.png",
      enabled: false,
    });
    shortcutArray.push({
      name: "SACE",
      link: "https://apps.sace.sa.edu.au/students-online/login.do",
      icon: "https://pbs.twimg.com/profile_images/948035664783622144/iE9ebnfW_400x400.jpg",
      enabled: false,
    });
    chrome.storage.local.set({ shortcuts: shortcutArray });
    chrome.storage.local.set({ onoff: true });
    chrome.storage.local.set({ notificationcollector: false });
    chrome.storage.local.get(null, function (result) {
      updateUI(result);
    });
  } else {
    onoffselection.checked = restoredSettings.onoff;
    notificationcollector.checked = restoredSettings.notificationcollector;
    chrome.storage.local.get(["menuitems"], function (result) {
      var menuItems = Object.values(result)[0];
      for (var i = 0; i < menubuttons.length; i++) {
        var id = menubuttons[i].id;
        menubuttons[i].checked = menuItems[id];
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
  storeNotificationCollectorSetting
);
