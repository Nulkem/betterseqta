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

var stringToHTML = function (str) {
  var parser = new DOMParser();
  var doc = parser.parseFromString(str, "text/html");
  return doc.body;
};

function loading() {
  // loadinghtml = stringToHTML(
  //   `<div class="bkloading" id="loading" style="background-color: #1a1a1a;width: 100%;overflow: hidden;opacity: 1;transition: 0.5s;height: 100%;top: 0;position: absolute;left: 0;z-index: 10000;">
  //   <svg width="300" height="160" id="clackers" style="display: block;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);"><svg><path id="arc-left-up" fill="none" d="M 90 90 A 90 90 0 0 1 0 0"/></svg><svg><path id="arc-right-up" fill="none" d="M 100 90 A 90 90 0 0 0 190 0"/></svg><text x="150" y="50" fill="#ffffff" font-size="18"text-anchor="middle">B E T T E R S E Q T A</text><circle style="fill: #333333;" cx="15" cy="15" r="15"><animateMotion dur="1.5s" repeatCount="indefinite"calcMode="linear"keyPoints="0.0;0.19;0.36;0.51;0.64;0.75;0.84;0.91;0.96;0.99;1.0;0.99;0.96;0.91;0.84;0.75;0.64;0.51;0.36;0.19;0.0;0.0;0.05;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0"keyTimes="0.0;0.025;0.05;0.075;0.1;0.125;0.15;0.175;0.2;0.225;0.25;0.275;0.3;0.325;0.35;0.375;0.4;0.425;0.45;0.475;0.5;0.525;0.55;0.575;0.6;0.625;0.65;0.675;0.7;0.725;0.75;0.775;0.8;0.825;0.85;0.875;0.9;0.925;0.95;0.975;1.0"><mpath xlink:href="#arc-left-up"/></animateMotion></circle><circle style="fill: #242424;" cx="135" cy="105" r="15" /><circle style="fill: #161616;" cx="165" cy="105" r="15" /><circle style="fill: #313131;" cx="95" cy="15" r="15"><animateMotion dur="1.5s" repeatCount="indefinite"calcMode="linear"keyPoints="0.0;0.0;0.05;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0.0;0.19;0.36;0.51;0.64;0.75;0.84;0.91;0.96;0.99;1.0;0.99;0.96;0.91;0.84;0.75;0.64;0.51;0.36;0.19;0.0"keyTimes="0.0;0.025;0.05;0.075;0.1;0.125;0.15;0.175;0.2;0.225;0.25;0.275;0.3;0.325;0.35;0.375;0.4;0.425;0.45;0.475;0.5;0.525;0.55;0.575;0.6;0.625;0.65;0.675;0.7;0.725;0.75;0.775;0.8;0.825;0.85;0.875;0.9;0.925;0.95;0.975;1.0"><mpath xlink:href="#arc-right-up"/></animateMotion></circle></svg>
  //   <div style="position: absolute;bottom: 0;right: 0;padding: 10px;color: #4f4f4f;text-anchor: middle;font-size: 20px;">v1.21</div><div style="padding: 20px;background-color: #0d0d0d;width: 30%;border-radius: 60px;position: absolute;color: white;bottom: -100px;left: 50%;transform: translate(-50%, -50%);transition: 1s;" id="reloadnotification">This page is taking unusually long to load. Try refreshing the page.<div style="padding: 10px;position: absolute;right: 0;top: 0;background-color: #c61851;border-radius: 60px;width: 80px;text-align: center;margin: 10px;cursor: pointer;" onclick="window.location.reload(true)">Refresh</div></div></div>`
  // );
  loadinghtml = stringToHTML(
    `<div class="bkloading" id="loading" style="background-color: #1a1a1a;width: 100%;overflow: hidden;opacity: 1;transition: 0.5s;height: 100%;top: 0;position: absolute;left: 0;z-index: 10000;">
    <style>
      .svg {
        transform-origin: center;
        position: absolute;
        top: 50%;
        left: 50%;
      }
      .logo {
        transform: translate(-50%, -50%);
      }
      .big-circle {
        margin: -88px;
        animation-timing-function: ease;
        animation: spin 3s linear infinite;
        -moz-animation: spin 3s linear infinite;
      }
      .small-circle {
        margin: -66px;
        animation-timing-function: ease;
        animation: spin 3s linear infinite;
        -moz-animation: spin 3s linear infinite;
      }
      .outer-circle {
        margin: -108px;
        animation-direction: alternate-reverse;
        animation: spinback 1s linear infinite;
        -moz-animation: spinback 1s linear infinite;
      }
      @-moz-keyframes spin {
        100% {
          -moz-transform: rotate(360deg);
        }
      }
      @-webkit-keyframes spin {
        100% {
          -webkit-transform: rotate(360deg);
        }
      }
      @keyframes spin {
        100% {
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
        }
      }
      @keyframes spinback {
        100% {
          -webkit-transform: rotate(-360deg);
          transform: rotate(-360deg);
        }
      }
      </style>
    <svg height="95" width="95" viewBox="0 0 1000 1000" class="logo svg"><path xmlns="http://www.w3.org/2000/svg" style="fill:#f4f4f4; stroke:none;" d="M485 160.424C466.612 162.839 448.261 163.397 430 167.424C370.97 180.444 316.817 208.621 272 249.17C180.829 331.658 144.321 463.702 173.895 582C187.074 634.717 213.759 683.743 250.17 724C303.025 782.439 376.804 820.986 455 830.715C504.557 836.881 555.177 833.858 605 836.039C653.299 838.154 701.642 838.83 750 840.015C761.664 840.3 773.276 841 785 841C792.805 841 800.142 841.446 807 837.031C832.4 820.678 821.338 783.463 792 781.093C762.533 778.714 732.561 779.71 703 778.985C651.373 777.721 599.593 776.299 548 774.039C502.516 772.048 457.637 773.89 414 757.947C374.488 743.511 337.93 721.851 308.039 691.961C274.963 658.884 250.263 616.978 237.427 572C212.559 484.853 233.051 386.02 292.285 317C319.059 285.804 351.502 259.524 389 242.309C427.176 224.782 470.92 215.197 513 217.039C597.266 220.729 678.256 263.323 727.706 332C747.792 359.896 762.864 390.787 771.849 424C791.253 495.73 780.038 574.582 741.189 638C732.575 652.062 722.86 665.724 711.831 678C704.771 685.858 694.459 693.728 689.417 703C687.014 707.419 686.994 712.111 687 717C687.024 737.064 703.04 754.277 724 747.402C731.475 744.95 736.589 739.411 742 734C752.306 723.695 761.875 712.666 770.625 701C809.484 649.187 830.965 588.113 837.17 524C853.18 358.554 733.564 199.718 571 167.2C543.693 161.738 512.857 156.767 485 160.424z"/></svg>
    <svg height="135" width="135" viewBox="0 0 1000 1000" class="small-circle svg"><path xmlns="http://www.w3.org/2000/svg" style="fill:#ededed; stroke:none;" d="M456 954L455.999 938C455.986 936.008 456.301 933.282 454.972 931.603C453.594 929.862 450.977 930.062 448.999 929.835C443.991 929.258 438.987 928.463 434 927.728C414.788 924.898 395.564 920.733 377 915.025C300.826 891.602 231.835 849.314 178.17 790C106.263 710.526 63.7248 603.522 65.0039 496C65.7806 430.71 81.6532 365.691 110.259 307C130.156 266.177 157.727 228.746 189.039 196C222.33 161.185 262.986 132.26 306 110.753C345.737 90.8846 389.756 75.6209 434 70L434 48C417.656 48.1353 400.764 53.1855 385 57.1265C338.501 68.7513 294.622 88.2739 254 113.576C215.656 137.46 181.298 167.82 151.87 202C33.2034 339.827 7.62905 544.971 91.2585 707C112.853 748.839 140.699 787.699 174 821C210.688 857.688 253.047 888.542 300 910.781C332.493 926.171 365.923 937.713 401 945.65C418.745 949.666 437.768 953.624 456 954z"/></svg>
    <svg height="180" width="180" viewBox="0 0 1000 1000" class="big-circle svg"><path xmlns="http://www.w3.org/2000/svg" style="fill:#ededed; stroke:none;" d="M454 952L454 887C441.324 886.456 428.346 883.444 416 880.65C389.799 874.722 364.497 866.349 340 855.306C205.92 794.861 116.45 660.408 110.039 514C108.593 480.976 112.302 447.246 119.424 415C144.931 299.518 226.1 198.275 333 147.781C389.157 121.255 450.99 108.496 513 110.015C612.241 112.446 711.495 157.399 779.961 229C839.544 291.312 879.215 372.892 887.831 459C893.323 513.894 887.624 569.466 870.329 622C836.537 724.647 758.42 810.937 660 855.306C635.503 866.349 610.201 874.722 584 880.65C571.383 883.505 557.974 886.732 545 887L545 952C562.916 951.63 581.566 947.595 599 943.65C637.149 935.018 673.043 921.725 708 904.247C753.184 881.655 792.42 850.594 828 815C859.416 783.572 885.414 745.666 905.247 706C933.723 649.048 949.566 588.445 953.911 525C963.014 392.066 906.622 254.399 808 165.17C769.47 130.31 725.8 101.975 678 81.5787C629.733 60.9833 575.64 47.3041 523 46.0146C469.032 44.6927 415.748 49.9443 364 66.0255C223.375 109.726 109.726 223.376 66.0255 364C14.4181 530.066 63.7205 715.347 191 833.911C229.196 869.491 274.051 897.962 322 918.421C362.806 935.833 409.371 950.084 454 952z"/></svg>
    <svg height="220" width="220" viewBox="0 0 1000 1000" class="outer-circle svg"><path xmlns="http://www.w3.org/2000/svg" style="fill:#ededed; stroke:none;" d="M456 954L456 946C438.715 945.258 420.843 941.462 404 937.65C369.403 929.822 335.739 918.116 304 902.247C255.981 878.237 211.768 846.374 175.09 807C62.5744 686.214 23.1598 509.033 78.6921 353C96.4653 303.062 122.84 256.974 156.424 216C207.709 153.43 278.099 103.658 355 78C372.453 72.1767 389.992 67.0399 408 63.2107C413.31 62.0816 418.647 60.9853 424 60.0811C426.508 59.6575 430.352 59.6852 432.397 57.9869C434.897 55.9098 434 50.8766 434 48C417.656 48.1353 400.764 53.1855 385 57.1265C338.517 68.7473 294.608 88.2827 254 113.576C215.673 137.45 181.285 167.835 151.87 202C33.9725 338.933 8.37009 541.243 89.2485 703C110.949 746.4 139.693 786.693 174 821C210.688 857.688 253.047 888.542 300 910.781C332.484 926.167 365.934 937.716 401 945.65C418.745 949.666 437.768 953.624 456 954z"/></svg>
    <div style="position: absolute;bottom: 0;right: 0;padding: 10px;color: #4f4f4f;text-anchor: middle;font-size: 20px;">v1.21</div></div>`
  );
  var html = document.getElementsByTagName("html")[0];
  html.append(loadinghtml.firstChild);
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function SetDisplayNone(ElementName) {
  return `li[data-key=${ElementName}]{display:none !important;}`;
}

function ApplyCSSToHiddenMenuItems() {
  var stylesheetInnerText = "";
  chrome.storage.local.get(null, function (result) {
    for (let i = 0; i < Object.keys(result.menuitems).length; i++) {
      if (!Object.values(result.menuitems)[i]) {
        stylesheetInnerText += SetDisplayNone(Object.keys(result.menuitems)[i]);
        console.log(
          `[BetterSEQTA] Hiding ${Object.keys(result.menuitems)[i]} menu item`
        );
      }
    }
    MenuItemStyle = document.createElement("style");
    MenuItemStyle.innerText = stylesheetInnerText;
    document.head.appendChild(MenuItemStyle);
  });
}

async function finishLoad() {
  var container = document.getElementById("container");
  container.style.bottom = "0px";
  var loadingbk = document.getElementById("loading");
  loadingbk.style.opacity = "0";
  await delay(501);
  loadingbk.remove();
}

function SetDefaultValues() {
  chrome.storage.local.set({
    onoff: true,
    notificationcollector: false,
  });

  var menuItems = {
    welcome: false,
    portals: false,
    dashboard: false,
    forums: false,
    settings: false,
  };
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
}

function CreateBackground() {
  // Creating and inserting 3 divs containing the background applied to the pages
  var bklocation = document.getElementById("container");
  var menu = document.getElementById("menu");
  var bk = document.createElement("div");
  bk.classList.add("bg");

  bklocation.insertBefore(bk, menu);

  var bk2 = document.createElement("div");
  bk2.classList.add("bg");
  bk2.classList.add("bg2");
  bklocation.insertBefore(bk2, menu);

  var bk3 = document.createElement("div");
  bk3.classList.add("bg");
  bk3.classList.add("bg3");
  bklocation.insertBefore(bk3, menu);
}

function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}
var LoadingDone = false;

async function CheckForiFrames() {
  // Checks for iframes
  var iframes = document.getElementsByTagName("iframe");

  // For each iframe on page, wait for the document to load, and apply white text
  if (iframes.length > 0) {
    for (i = 0; i < iframes.length; i++) {
      while (
        iframes[i].contentDocument.documentElement.lastChild.classList[0] !=
        "userHTML"
      ) {
        await delay(50);
      }
      iframes[i].contentDocument.documentElement.lastChild.style.color =
        "#dadada";
    }
  }
}

function tryLoad() {
  waitForElm(".day-container").then((elm) => {
    LoadingDone = true;
    finishLoad();
  });

  waitForElm(".code").then((elm) => {
    AddBetterSEQTAElements();
    var weblink = window.location.href.split("/")[2];
    window.location.replace("https://" + weblink + "/#?page=/home");
    LoadInit();
  });

  // Waits for page to call on load, run scripts
  document.addEventListener(
    "load",
    function () {
      CheckForiFrames();
    },
    true
  );
}

function RunFunctionOnTrue(storedSetting) {
  // If value for off and on is not defined
  if (typeof storedSetting.onoff == "undefined") {
    // Set the value to true, and rerun the function
    SetDefaultValues();
    chrome.storage.local.get(null, function (items) {
      RunFunctionOnTrue(items);
    });
  }
  // If the option is 'on', open BetterSEQTA
  if (storedSetting.onoff) {
    console.log("[BetterSEQTA] Enabled");
    // Injecting CSS File to the webpage to overwrite SEQTA's default CSS
    var cssFile = chrome.runtime.getURL("inject/injected.css");
    var fileref = document.createElement("link");
    fileref.setAttribute("rel", "stylesheet");
    fileref.setAttribute("type", "text/css");
    fileref.setAttribute("href", cssFile);
    document.head.appendChild(fileref);

    ApplyCSSToHiddenMenuItems();

    loading();
    tryLoad();
    window.addEventListener("load", function () {
      tryLoad();
    });
  }
}
var NonSEQTAPage = false;
var IsSEQTAPage = false;
document.addEventListener(
  "load",
  function () {
    if (document.childNodes[1].textContent.includes("SEQTA") && !IsSEQTAPage) {
      IsSEQTAPage = true;
      console.log("[BetterSEQTA] Verified SEQTA Page");
      chrome.storage.local.get(null, function (items) {
        RunFunctionOnTrue(items);
      });
    }
    if (
      !document.childNodes[1].textContent.includes("SEQTA") &&
      !NonSEQTAPage
    ) {
      document.head.insertAdjacentHTML(
        "beforeend",
        `<style>html{background-color:unset !important}</style>`
      );
      NonSEQTAPage = true;
    }
  },
  true
);

function AddBetterSEQTAElements() {
  var code = document.getElementsByClassName("code")[0];
  // Replaces students code with the version of BetterSEQTA
  if (code != null) {
    if (!code.innerHTML.includes("BetterSEQTA")) {
      CreateBackground();
      code.innerHTML = "BetterSEQTA v1.21";
      // Creates Home menu button and appends it as the first child of the list
      var NewButtonStr = `<li class="item" data-key="home" id="homebutton" data-path="/home"><label><svg width="24" height="24" viewBox="0 0 400 400"><g style="fill: currentcolor;"><g><path d="M191.540 1.929 C 188.821 2.547,184.505 4.211,181.949 5.627 C 176.214 8.805,3.477 152.579,1.452 155.859 C -3.707 164.219,2.514 174.994,12.500 174.994 C 18.353 174.994,11.310 180.532,107.805 100.061 C 199.964 23.206,197.279 25.249,203.300 27.393 C 205.436 28.154,229.584 47.783,278.205 88.281 L 349.957 148.047 349.960 254.688 C 349.963 362.177,349.874 365.669,347.041 369.471 C 343.191 374.635,343.559 374.585,307.617 374.844 L 275.000 375.079 275.000 302.844 C 275.000 217.447,275.473 221.245,263.433 209.983 C 252.763 200.003,252.746 200.000,200.000 200.000 C 147.254 200.000,147.237 200.003,136.567 209.983 C 124.527 221.245,125.000 217.447,125.000 302.844 L 125.000 375.079 92.383 374.844 C 56.441 374.585,56.809 374.635,52.959 369.471 C 50.171 365.729,50.037 361.891,50.016 284.766 C 49.995 209.763,49.963 208.151,48.442 205.657 C 43.742 197.949,31.258 197.949,26.558 205.657 C 24.188 209.545,24.115 366.549,26.480 374.148 C 30.063 385.661,39.956 395.389,51.509 398.761 C 57.984 400.651,342.016 400.651,348.491 398.761 C 360.044 395.389,369.937 385.661,373.520 374.148 C 374.940 369.585,375.000 365.342,375.000 269.366 L 375.000 169.341 376.758 170.626 C 382.018 174.472,383.303 174.994,387.500 174.994 C 395.341 174.994,399.994 170.341,399.994 162.500 C 399.994 155.980,399.648 155.628,364.197 126.172 L 331.290 98.828 331.267 75.391 C 331.239 46.356,330.210 43.756,318.750 43.756 C 308.785 43.756,306.759 47.089,306.250 64.320 L 305.859 77.545 264.453 43.002 C 212.011 -0.748,209.516 -2.153,191.540 1.929 M242.887 226.953 C 250.178 231.247,249.960 228.796,249.981 306.836 L 250.000 375.000 199.980 375.000 L 149.960 375.000 150.175 304.883 C 150.415 226.874,150.053 232.041,155.565 227.933 C 159.111 225.290,161.987 225.123,201.563 225.258 C 238.701 225.385,240.340 225.453,242.887 226.953 M180.657 289.058 C 169.777 295.692,174.683 312.494,187.500 312.494 C 195.341 312.494,199.994 307.841,199.994 300.000 C 199.994 292.159,195.341 287.506,187.500 287.506 C 184.587 287.506,182.383 288.006,180.657 289.058 "></path></g></g></svg>Home</label></li>`;
      var NewButton = stringToHTML(NewButtonStr);
      var menu = document.getElementById("menu");
      var List = menu.firstChild;
      List.insertBefore(NewButton.firstChild, List.firstChild);

      // Creates the home container when the menu button is pressed
      var homebutton = document.getElementById("homebutton");
      homebutton.addEventListener("click", function () {
        SendHomePage();
      });

      // Creates settings and dashboard buttons next to alerts
      var SettingsButton = stringToHTML(
        `<div class="addedButton" style="right: 70px;" id="AddedSettings""><svg width="24" height="24" viewBox="0 0 24 24"><g style="fill: currentcolor;"><g><path d="M23.182,6.923c-.29,0-3.662,2.122-4.142,2.4l-2.8-1.555V4.511l4.257-2.456a.518.518,0,0,0,.233-.408.479.479,0,0,0-.233-.407,6.511,6.511,0,1,0-3.327,12.107,6.582,6.582,0,0,0,6.148-4.374,5.228,5.228,0,0,0,.333-1.542A.461.461,0,0,0,23.182,6.923Z"></path><path d="M9.73,10.418,7.376,12.883c-.01.01-.021.016-.03.025L1.158,19.1a2.682,2.682,0,1,0,3.793,3.793l4.583-4.582,0,0,4.1-4.005-.037-.037A9.094,9.094,0,0,1,9.73,10.418ZM3.053,21.888A.894.894,0,1,1,3.946,21,.893.893,0,0,1,3.053,21.888Z"></path></g></g></svg></div>`
      );
      var DashboardButton = stringToHTML(
        `<div class="addedButton" style="right: 120px;" id="AddedDashboard"><svg width="24" height="24" viewBox="0 0 24 24"><g style="fill: currentcolor;"><g><path d="M15.81,6.446a.749.749,0,0,0-1,.367L12.64,11.527A3.261,3.261,0,0,0,12,11.463a3.214,3.214,0,1,0,2,.7l2.178-4.72A.751.751,0,0,0,15.81,6.446ZM12,16.371a1.7,1.7,0,1,1,1.7-1.7A1.7,1.7,0,0,1,12,16.371Z"></path><path d="M23.965,13.71A12.04,12.04,0,0,0,12.831,2.7c-.278-.018-.554-.028-.828-.028A12,12,0,0,0,1.376,20.245a.817.817,0,0,0,.725.427h19.8a.815.815,0,0,0,.725-.427A11.964,11.964,0,0,0,23.965,13.71Zm-2.476,5.462H2.516a10.368,10.368,0,0,1-1.013-4.5A10.512,10.512,0,0,1,12,4.172c.241,0,.486.009.728.025a10.5,10.5,0,0,1,8.758,14.975Z"></path><path d="M19.625,14.328a1.364,1.364,0,1,0,1.364,1.364A1.364,1.364,0,0,0,19.625,14.328Z"></path><circle cx="4.381" cy="15.692" r="1.364"></circle><path d="M6.146,8.369A1.364,1.364,0,1,0,7.51,9.733,1.364,1.364,0,0,0,6.146,8.369Z"></path><path d="M19.224,9.733A1.364,1.364,0,1,0,17.86,11.1,1.364,1.364,0,0,0,19.224,9.733Z"></path><path d="M12,8.369a1.364,1.364,0,1,0-1.364-1.364A1.364,1.364,0,0,0,12,8.369Z"></path></g></g></svg></div>`
      );
      var ContentDiv = document.getElementById("content");
      ContentDiv.append(SettingsButton.firstChild);
      ContentDiv.append(DashboardButton.firstChild);

      var AddedSettings = document.getElementById("AddedSettings");
      var AddedDashboard = document.getElementById("AddedDashboard");
      AddedSettings.addEventListener("click", function () {
        ChangeCurrentPage("settings");
        browser.pageAction.openPopup();
      });
      AddedDashboard.addEventListener("click", function () {
        ChangeCurrentPage("dashboard");
      });
    }
  }
}

function GetTimeString() {
  // Gets the current time and creates a string for the home page
  const current = new Date();
  let hour = current.getHours();
  if (hour >= 12 && hour < 16) {
    var TimeText = "Good Afternoon, ";
  } else if (hour >= 16 && hour <= 23) {
    var TimeText = "Good Evening, ";
  } else if (hour >= 0 && hour <= 11) {
    var TimeText = "Good Morning, ";
  }
  return TimeText;
}
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function ChangeCurrentPage(newpage) {
  var weblink = window.location.href.split("/")[2];
  window.location.replace("https://" + weblink + "/#?page=/" + newpage);
}

function CheckCurrentLesson(lesson, num) {
  var startTime = lesson.from;
  var endTime = lesson.until;
  // Gets current time
  currentDate = new Date();

  // Takes start time of current lesson and makes it into a Date function for comparison
  startDate = new Date(currentDate.getTime());
  startDate.setHours(startTime.split(":")[0]);
  startDate.setMinutes(startTime.split(":")[1]);
  startDate.setSeconds("00");

  // Takes end time of current lesson and makes it into a Date function for comparison
  endDate = new Date(currentDate.getTime());
  endDate.setHours(endTime.split(":")[0]);
  endDate.setMinutes(endTime.split(":")[1]);
  endDate.setSeconds("00");

  // Gets the difference between the start time and current time
  var difference = startDate.getTime() - currentDate.getTime();
  // Converts the difference into minutes
  var minutes = Math.floor(difference / 1000 / 60);

  // If 5 minutes before the start of another lesson:
  if (minutes == 5) {
    // Checks if notifications are supported
    if (!window.Notification) {
      console.log("Browser does not support notifications.");
    } else {
      // check if permission is already granted
      if (Notification.permission === "granted") {
        // show notification here
        var notify = new Notification("Next Lesson in 5 Minutes:", {
          body:
            "Subject: " +
            lesson.description +
            " \nRoom: " +
            lesson.room +
            " \nTeacher: " +
            lesson.staff,
        });
      } else {
        // request permission from user
        Notification.requestPermission()
          .then(function (p) {
            if (p === "granted") {
              // show notification here
              var notify = new Notification("Hi there!", {
                body:
                  "Subject: " +
                  lesson.description +
                  " \nRoom: " +
                  lesson.room +
                  " \nTeacher: " +
                  lesson.staff,
              });
            } else {
              console.log("User blocked notifications.");
            }
          })
          .catch(function (err) {
            console.error(err);
          });
      }
    }
  }
  // Checks if current time is between the start time and end time of current tested lesson
  valid = startDate < currentDate && endDate > currentDate;

  if (valid) {
    // Apply the activelesson class to increase the box-shadow of current lesson
    var elementA = document.getElementById("lesson" + num);
    elementA.classList.add("activelesson");
  } else {
    // Removes the activelesson class to ensure only the active lesson have the class
    var elementA = document.getElementById("lesson" + num);
    if (elementA != null) {
      elementA.classList.remove("activelesson");
    }
  }
}

function CheckCurrentLessonAll(lessons) {
  // Checks each lesson and sets an interval to run every 60 seconds to continue updating
  setInterval(
    function () {
      for (i = 0; i < 5; i++) {
        CheckCurrentLesson(lessons[i], i + 1);
      }
    }.bind(lessons),
    60000
  );
}

function SendHomePage() {
  setTimeout(function () {
    // Sends the html data for the home page
    console.log("[BetterSEQTA] Started Loading Home Page");
    document.title = "Home ― SEQTA Learn";
    var element = document.querySelector("[data-key=home]");

    // Apply the active class to indicate clicked on home button
    element.classList.add("active");

    // Remove all current elements in the main div to add new elements
    var main = document.getElementById("main");
    main.innerHTML = "";

    // Gets the current time string e.g. (Good Morning)
    var timeString = GetTimeString();

    // Gets the student name from pre-existing element on page
    var UsersName = document.getElementsByClassName("name")[0];
    // Gets the students first name
    var FirstName = UsersName.innerHTML.replace(/ .*/, "");

    // Creates the root of the home page added to the main div
    var htmlStr =
      `<div class="home-root"><div class="home-container" id="home-container"><h1>` +
      timeString +
      FirstName +
      `!</h1></div></div>`;

    var html = stringToHTML(htmlStr);
    // Appends the html file to main div
    // Note : firstChild of html is done due to needing to grab the body from the stringToHTML function
    main.append(html.firstChild);

    // Gets the current date
    const date = new Date();
    // Formats the current date used send a request for timetable and notices later
    var TodayFormatted =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

    // Replaces actual date with a selected date. Used for testing.
    // TodayFormatted = "2020-08-31";

    // Creates the container div for the timetable portion of the home page
    var TimetableStr = `<div class="timetable-container"><h2>Today's Lessons:</h2><div class="day-container" id="day-container"></div></div>`;
    var Timetable = stringToHTML(TimetableStr);
    // Appends the timetable container into the home container
    document.getElementById("home-container").append(Timetable.firstChild);

    // Creates the shortcut container into the home container
    var ShortcutStr = `<div class="shortcut-container"><h2>Shortcuts:</h2><div class="shortcuts" id="shortcuts"></div></div>`;
    var Shortcut = stringToHTML(ShortcutStr);
    // Appends the shortcut container into the home container
    document.getElementById("home-container").append(Shortcut.firstChild);

    function CheckUnmarkedAttendance(lessonattendance) {
      if (lessonattendance === undefined) {
        var lesson = " ";
      } else {
        var lesson = lessonattendance.label;
      }
      return lesson;
    }

    function MakeLessonDiv(lesson) {
      var lessondiv = stringToHTML(
        `<div class="day" id=` +
          JSON.stringify(lesson) +
          ` style="` +
          lesson.colour +
          `"><h2>` +
          lesson.description +
          `</h2><h3>` +
          lesson.staff +
          `</h3><h3>` +
          lesson.room +
          `</h3><h4>` +
          lesson.from +
          " - " +
          lesson.until +
          `</h4><h5>` +
          lesson.attendance +
          `</h5></div>`
      );
      return lessondiv;
    }

    function createNewShortcut(link, icon, title) {
      // Creates the stucture and element information for each seperate shortcut
      var shortcut = document.createElement("a");
      shortcut.setAttribute("href", link);
      shortcut.setAttribute("target", "_blank");
      var shortcutdiv = document.createElement("div");
      shortcutdiv.classList.add("shortcut");
      var image = document.createElement("div");
      image.setAttribute("style", "background-image: url(" + icon + ");");
      image.classList.add("shortcuticondiv");
      var text = document.createElement("p");
      text.textContent = title;
      shortcutdiv.append(image);
      shortcutdiv.append(text);
      shortcut.append(shortcutdiv);

      document.getElementById("shortcuts").append(shortcut);
    }
    // Adds the shortcuts to the shortcut container
    chrome.storage.local.get(["shortcuts"], function (result) {
      var shortcuts = Object.values(result)[0];
      for (let i = 0; i < shortcuts.length; i++) {
        if (shortcuts[i].enabled) {
          createNewShortcut(
            shortcuts[i].link,
            shortcuts[i].icon,
            shortcuts[i].name
          );
        }
      }
    });
    // Creates the notices container into the home container
    var NoticesStr = `<div class="notices-container"><h2>Notices:</h2><div class="notice-container" id="notice-container"></div></div>`;
    var Notices = stringToHTML(NoticesStr);
    // Appends the shortcut container into the home container
    document.getElementById("home-container").append(Notices.firstChild);
    var weblink = window.location.href.split("/")[2];

    // Creates a HTTP Post Request to the SEQTA page for the students timetable
    var xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      "https://" + weblink + "/seqta/student/load/timetable?",
      true
    );
    // Sets the response type to json
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");

    xhr.onreadystatechange = function () {
      // Once the response is ready
      if (xhr.readyState === 4) {
        var serverResponse = JSON.parse(xhr.response);
        lessonArray = [];
        // If items in response:
        if (serverResponse.payload.items.length > 0) {
          // console.log(serverResponse.payload.items.length);
          for (let i = 1; i < serverResponse.payload.items.length; i++) {
            lessonArray.push(serverResponse.payload.items[i]);
          }
          // If items in the response, set each corresponding value into divs
          // console.log(lessonArray);
          for (let i = 0; i < lessonArray.length; i++) {
            lessonArray[i].colour = document.querySelector(
              "[data-colour='timetable.subject.colour." +
                lessonArray[i].code +
                "']"
            ).style.cssText;
            // Removes seconds from the start and end times
            lessonArray[i].from = lessonArray[i].from.substring(0, 5);
            lessonArray[i].until = lessonArray[i].until.substring(0, 5);
            // Checks if attendance is unmarked, and sets the string to " ".
            lessonArray[i].attendance = CheckUnmarkedAttendance(
              lessonArray[i].attendance
            );
          }
          // If on home page, apply each lesson to HTML with information in each div

          for (let i = 0; i < lessonArray.length; i++) {
            var div = MakeLessonDiv(lessonArray[i]);
            // Append each of the lessons into the day-container
            document.getElementById("day-container").append(div.firstChild);
          }

          for (i = 0; i < lessonArray.length; i++) {
            CheckCurrentLesson(lessonArray[i], i + 1);
          }
          // For each lesson, check the start and end times
          CheckCurrentLessonAll(lessonArray);
        } else {
          var dummyDay = document.createElement("div");
          dummyDay.classList.add("day");
          document.getElementById("day-container").append(dummyDay);
        }
      }
    };
    xhr.send(
      JSON.stringify({
        // Information sent to SEQTA page as a request with the dates and student number
        from: TodayFormatted,
        until: TodayFormatted,
        // Funny number
        student: 69,
      })
    );

    // Sends similar HTTP Post Request for the notices
    var xhr2 = new XMLHttpRequest();
    xhr2.open(
      "POST",
      "https://" + weblink + "/seqta/student/load/notices?",
      true
    );
    xhr2.setRequestHeader("Content-Type", "application/json; charset=utf-8");

    xhr2.onreadystatechange = function () {
      if (xhr2.readyState === 4) {
        var NoticesPayload = JSON.parse(xhr2.response);
        var NoticeContainer = document.getElementById("notice-container");
        if (NoticesPayload.payload.length == 0) {
          // If no notices: display no notices
          var dummyNotice = document.createElement("div");
          dummyNotice.textContent = "No notices for today.";
          dummyNotice.classList.add("dummynotice");

          NoticeContainer.append(dummyNotice);
        } else {
          // For each element in the response json:
          for (let i = 0; i < NoticesPayload.payload.length; i++) {
            // Create a div, and place information from json response
            var NewNotice = document.createElement("div");
            NewNotice.classList.add("notice");
            var title = stringToHTML(
              `<h3>` + NoticesPayload.payload[i].title + `</h3>`
            );
            NewNotice.append(title.firstChild);

            if (NoticesPayload.payload[i].label_title != undefined) {
              var label = stringToHTML(
                `<h5>` + NoticesPayload.payload[i].label_title + `</h5>`
              );
              NewNotice.append(label.firstChild);
            }

            var staff = stringToHTML(
              `<h6>` + NoticesPayload.payload[i].staff + `</h6>`
            );
            NewNotice.append(staff.firstChild);
            // Converts the string into HTML
            var content = stringToHTML(NoticesPayload.payload[i].contents);
            for (let i = 0; i < content.childNodes.length; i++) {
              NewNotice.append(content.childNodes[i]);
            }
            // Gets the colour for the top section of each notice
            var colour = NoticesPayload.payload[i].colour;
            var colourbar = document.createElement("div");
            colourbar.classList.add("colourbar");
            colourbar.style.background = colour;
            // Appends the colour bar to the new notice
            NewNotice.append(colourbar);
            // Appends the new notice into the notice container
            NoticeContainer.append(NewNotice);
          }
        }
      }
    };
    // Data sent as the POST request
    xhr2.send(JSON.stringify({ date: TodayFormatted }));

    // Sends similar HTTP Post Request for the notices
    chrome.storage.local.get(null, function (result) {
      if (result.notificationcollector) {
        var xhr3 = new XMLHttpRequest();
        xhr3.open(
          "POST",
          "https://" + weblink + "/seqta/student/heartbeat?",
          true
        );
        xhr3.setRequestHeader(
          "Content-Type",
          "application/json; charset=utf-8"
        );
        xhr3.onreadystatechange = function () {
          if (xhr3.readyState === 4) {
            var Notifications = JSON.parse(xhr3.response);
            var alertdiv = document.getElementsByClassName(
              "notifications__bubble___1EkSQ"
            )[0];
            alertdiv.textContent = Notifications.payload.notifications.length;
          }
        };
        xhr3.send(
          JSON.stringify({
            timestamp: "1970-01-01 00:00:00.0",
            hash: "#?page=/home",
          })
        );
      }
    });
  }, 1);
}

function EnabledDisabledToBool(input) {
  if (input == "enabled") {
    return true;
  }
  if (input == "disabled") {
    return false;
  }
}

function LoadInit() {
  console.log("[BetterSEQTA] Started Init");
  chrome.storage.local.get(null, function (result) {
    if (result.onoff) {
      SendHomePage();
    }
  });
}
