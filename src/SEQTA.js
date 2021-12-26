let TimetableReady = false;

var stringToHTML = function (str) {
  var parser = new DOMParser();
  var doc = parser.parseFromString(str, "text/html");
  return doc.body;
};

function loading() {
  loadinghtml = stringToHTML(
    `<div class="bkloading" id="loading" style="background-color: #1a1a1a;width: 100%;overflow: hidden;opacity: 1;transition: 0.5s;height: 100%;top: 0;position: absolute;left: 0;z-index: 10000;"><svg width="300" height="160" id="clackers" style="display: block;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);"><svg><path id="arc-left-up" fill="none" d="M 90 90 A 90 90 0 0 1 0 0"/></svg><svg><path id="arc-right-up" fill="none" d="M 100 90 A 90 90 0 0 0 190 0"/></svg><text x="150" y="50" fill="#ffffff" font-size="18"text-anchor="middle">B E T T E R S E Q T A</text><circle style="fill: #333333;" cx="15" cy="15" r="15"><animateMotion dur="1.5s" repeatCount="indefinite"calcMode="linear"keyPoints="0.0;0.19;0.36;0.51;0.64;0.75;0.84;0.91;0.96;0.99;1.0;0.99;0.96;0.91;0.84;0.75;0.64;0.51;0.36;0.19;0.0;0.0;0.05;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0"keyTimes="0.0;0.025;0.05;0.075;0.1;0.125;0.15;0.175;0.2;0.225;0.25;0.275;0.3;0.325;0.35;0.375;0.4;0.425;0.45;0.475;0.5;0.525;0.55;0.575;0.6;0.625;0.65;0.675;0.7;0.725;0.75;0.775;0.8;0.825;0.85;0.875;0.9;0.925;0.95;0.975;1.0"><mpath xlink:href="#arc-left-up"/></animateMotion></circle><circle style="fill: #242424;" cx="135" cy="105" r="15" /><circle style="fill: #161616;" cx="165" cy="105" r="15" /><circle style="fill: #313131;" cx="95" cy="15" r="15"><animateMotion dur="1.5s" repeatCount="indefinite"calcMode="linear"keyPoints="0.0;0.0;0.05;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0.0;0.19;0.36;0.51;0.64;0.75;0.84;0.91;0.96;0.99;1.0;0.99;0.96;0.91;0.84;0.75;0.64;0.51;0.36;0.19;0.0"keyTimes="0.0;0.025;0.05;0.075;0.1;0.125;0.15;0.175;0.2;0.225;0.25;0.275;0.3;0.325;0.35;0.375;0.4;0.425;0.45;0.475;0.5;0.525;0.55;0.575;0.6;0.625;0.65;0.675;0.7;0.725;0.75;0.775;0.8;0.825;0.85;0.875;0.9;0.925;0.95;0.975;1.0"><mpath xlink:href="#arc-right-up"/></animateMotion></circle></svg><div style="position: absolute;bottom: 0;right: 0;padding: 10px;color: #4f4f4f;text-anchor: middle;font-size: 10px;">v1.2</div><div style="padding: 20px;background-color: #0d0d0d;width: 30%;border-radius: 60px;position: absolute;color: white;bottom: -100px;left: 50%;transform: translate(-50%, -50%);transition: 1s;" id="reloadnotification">This page is taking unusually long to load. Try refreshing the page.<div style="padding: 10px;position: absolute;right: 0;top: 0;background-color: #c61851;border-radius: 60px;width: 80px;text-align: center;margin: 10px;cursor: pointer;" onclick="window.location.reload(true)">Refresh</div></div></div>`
  );
  var html = document.getElementsByTagName("html")[0];
  html.append(loadinghtml.firstChild);
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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

function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      console.log(document.querySelector(selector).parentNode.nodeName);
      if (document.querySelector(selector)) {
        if (document.querySelector(selector).previousElementSibling != null) {
          resolve(document.querySelector(selector));
          observer.disconnect();
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}
var LoadingDone = false;

// Function to display a notification if loading is taking too long
async function CheckifStillLoading() {
  await delay(6000);
  if (!LoadingDone) {
    waitForElm(`[data-key="settings"]`).then((elm) => {
      console.log(elm);
      LoadInit();
    });
    var reloadnotification = document.querySelector("#reloadnotification");
    reloadnotification.style.bottom = "10px";
  }
}

function RunFunctionOnTrue(storedSetting) {
  console.log(storedSetting.onoff);
  // If value for off and on is not defined
  if (storedSetting.onoff == undefined) {
    // Set the value to true, and rerun the function
    SetDefaultValues();
    chrome.storage.local.get(null, function (items) {
      RunFunctionOnTrue(items);
    });
  }
  // If the option is 'on', open BetterSEQTA
  if (storedSetting.onoff) {
    // Injecting CSS File to the webpage to overwrite SEQTA's default CSS
    var cssFile = chrome.runtime.getURL("inject/injected.css");
    var fileref = document.createElement("link");
    fileref.setAttribute("rel", "stylesheet");
    fileref.setAttribute("type", "text/css");
    fileref.setAttribute("href", cssFile);
    document.head.appendChild(fileref);

    loading();
    CheckifStillLoading();
    var weblink = window.location.href.split("/")[2];
    window.location.replace("https://" + weblink + "/#?page=/home");
    window.addEventListener("load", function () {
      var weblink = window.location.href.split("/")[2];
      window.location.replace("https://" + weblink + "/#?page=/home");
      waitForElm(".day-container").then((elm) => {
        LoadingDone = true;
        finishLoad();
      });

      waitForElm(`[data-key="settings"]`).then((elm) => {
        console.log(elm);
        LoadInit();
      });

      MenuItemsDeleted = false;

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

      // Waits for page to call on load, run scripts
      document.addEventListener(
        "load",
        function () {
          async function CheckForiFrames() {
            // Checks for iframes
            var iframes = document.getElementsByTagName("iframe");

            // For each iframe on page, wait for the document to load, and apply white text
            if (iframes.length > 0) {
              for (i = 0; i < iframes.length; i++) {
                while (
                  iframes[i].contentDocument.documentElement.lastChild
                    .classList[0] != "userHTML"
                ) {
                  await delay(50);
                }
                iframes[
                  i
                ].contentDocument.documentElement.lastChild.style.color =
                  "#dadada";
              }
            }
          }

          CheckForiFrames();

          var code = document.getElementsByClassName("code")[0];
          // Replaces students code with the version of BetterSEQTA
          if (code != null) {
            if (!code.innerHTML.includes("BetterSEQTA")) {
              CreateBackground();
              code.innerHTML = "BetterSEQTA v1.2";
              // Creates Home menu button and appends it as the first child of the list
              var NewButtonStr = `<li class="item" data-key="home" id="homebutton" data-path="/home"><label><svg width="24" height="24" viewBox="0 0 400 400"><g style="fill: currentcolor;"><g><path d="M191.540 1.929 C 188.821 2.547,184.505 4.211,181.949 5.627 C 176.214 8.805,3.477 152.579,1.452 155.859 C -3.707 164.219,2.514 174.994,12.500 174.994 C 18.353 174.994,11.310 180.532,107.805 100.061 C 199.964 23.206,197.279 25.249,203.300 27.393 C 205.436 28.154,229.584 47.783,278.205 88.281 L 349.957 148.047 349.960 254.688 C 349.963 362.177,349.874 365.669,347.041 369.471 C 343.191 374.635,343.559 374.585,307.617 374.844 L 275.000 375.079 275.000 302.844 C 275.000 217.447,275.473 221.245,263.433 209.983 C 252.763 200.003,252.746 200.000,200.000 200.000 C 147.254 200.000,147.237 200.003,136.567 209.983 C 124.527 221.245,125.000 217.447,125.000 302.844 L 125.000 375.079 92.383 374.844 C 56.441 374.585,56.809 374.635,52.959 369.471 C 50.171 365.729,50.037 361.891,50.016 284.766 C 49.995 209.763,49.963 208.151,48.442 205.657 C 43.742 197.949,31.258 197.949,26.558 205.657 C 24.188 209.545,24.115 366.549,26.480 374.148 C 30.063 385.661,39.956 395.389,51.509 398.761 C 57.984 400.651,342.016 400.651,348.491 398.761 C 360.044 395.389,369.937 385.661,373.520 374.148 C 374.940 369.585,375.000 365.342,375.000 269.366 L 375.000 169.341 376.758 170.626 C 382.018 174.472,383.303 174.994,387.500 174.994 C 395.341 174.994,399.994 170.341,399.994 162.500 C 399.994 155.980,399.648 155.628,364.197 126.172 L 331.290 98.828 331.267 75.391 C 331.239 46.356,330.210 43.756,318.750 43.756 C 308.785 43.756,306.759 47.089,306.250 64.320 L 305.859 77.545 264.453 43.002 C 212.011 -0.748,209.516 -2.153,191.540 1.929 M242.887 226.953 C 250.178 231.247,249.960 228.796,249.981 306.836 L 250.000 375.000 199.980 375.000 L 149.960 375.000 150.175 304.883 C 150.415 226.874,150.053 232.041,155.565 227.933 C 159.111 225.290,161.987 225.123,201.563 225.258 C 238.701 225.385,240.340 225.453,242.887 226.953 M180.657 289.058 C 169.777 295.692,174.683 312.494,187.500 312.494 C 195.341 312.494,199.994 307.841,199.994 300.000 C 199.994 292.159,195.341 287.506,187.500 287.506 C 184.587 287.506,182.383 288.006,180.657 289.058 "></path></g></g></svg>Home</label></li>`;
              var NewButton = stringToHTML(NewButtonStr);
              var menu = document.getElementById("menu");
              var List = menu.firstChild;
              List.insertBefore(NewButton.firstChild, List.firstChild);

              // Creates the home container when the menu button is pressed
              var homebutton = document.getElementById("homebutton");
              homebutton.addEventListener("click", function () {
                SendPageData("home");
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
              });
              AddedDashboard.addEventListener("click", function () {
                ChangeCurrentPage("dashboard");
              });
            }
          }
        },
        true
      );
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
      console.log("seqta page");
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

async function deleteMenuItem(name) {
  var element = document.querySelector("[data-key=" + name + "]");
  // If the menu item exists; remove it
  if (element != null) {
    element.remove();
    // Delays 200ms and attempts to remove it again for slower loading
    await delay(200);
    element.remove();
  }
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

var stringToHTML = function (str) {
  var parser = new DOMParser();
  var doc = parser.parseFromString(str, "text/html");
  return doc.body;
};

function SendPageData(name) {
  // Sends the html data for the home page
  setTimeout(
    function () {
      document.title = "Home ― SEQTA Learn";
      var element = document.querySelector("[data-key=" + name + "]");
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
            console.log(serverResponse.payload.items.length);
            for (let i = 1; i < serverResponse.payload.items.length; i++) {
              lessonArray.push(serverResponse.payload.items[i]);
            }
            // If items in the response, set each corresponding value into divs
            console.log(lessonArray);
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
            if ((name = "home")) {
              // If on home page, apply each lesson to HTML with information in each div

              for (let i = 0; i < lessonArray.length; i++) {
                var div = MakeLessonDiv(lessonArray[i]);
                // Append each of the lessons into the day-container
                document.getElementById("day-container").append(div.firstChild);
              }
            }

            for (i = 0; i < lessonArray.length; i++) {
              CheckCurrentLesson(lessonArray[i], i + 1);
            }
            // For each lesson, check the start and end times
            CheckCurrentLessonAll(lessonArray);
          } else {
            if ((name = "home")) {
              var dummyDay = document.createElement("div");
              dummyDay.classList.add("day");
              document.getElementById("day-container").append(dummyDay);
            }
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

      var xhr4 = new XMLHttpRequest();
      xhr4.open(
        "GET",
        "https://api.github.com/repos/Nulkem/better-seqta/releases/latest",
        true
      );
      xhr4.onreadystatechange = function () {
        if (xhr4.readyState === 4) {
          // Typical action to be performed when the document is ready:
          var LatestRelease = JSON.parse(xhr4.response);
          var code = document.getElementsByClassName("code")[0].textContent;
          code = code.split(" ")[1];

          if (code == LatestRelease.name) {
            console.log("Up to date.");
          } else {
            console.log(
              "New version available. Release available here: https://github.com/Nulkem/better-seqta/releases/latest"
            );
            var newversion = document.createElement("div");
            newversion.classList.add("newversion");
            var newversiontext = document.createElement("a");
            newversiontext.textContent =
              "New version of BetterSEQTA is available. Click to go to the download page.";
            newversiontext.href =
              "https://github.com/Nulkem/better-seqta/releases/latest";
            newversiontext.target = "_blank";
            newversion.appendChild(newversiontext);
            var newversionbutton = document.createElement("button");
            newversionbutton.type = "button";
            newversionbutton.setAttribute(
              "onclick",
              "return this.parentNode.remove();"
            );
            newversionbutton.textContent = "X";
            newversionbutton.classList.add("versionbutton");
            newversion.appendChild(newversionbutton);
            document.getElementById("main").appendChild(newversion);
          }
        }
      };

      xhr4.send();
    }.bind(name),
    1
  );
}

// async function waitForSettings() {
//   await page.waitForFunction("document.querySelector([data-key=settings])");
//   console.log("settings found");
// }

function LoadInit() {
  chrome.storage.local.get(null, function (result) {
    if (result.onoff) {
      var menuitemsOnPage =
        document.getElementById("menu").firstChild.childNodes;
      console.log(menuitemsOnPage);
      console.log(menuitemsOnPage.length);
      console.log(result);
      console.log(Object.keys(result.menuitems).length);
      for (var i = 0; i < Object.keys(result.menuitems).length; i++) {
        if (Object.values(result.menuitems)[i] == false) {
          deleteMenuItem(Object.keys(result.menuitems)[i]);
        }
        // if (result[menuitemsOnPage[i].getAttribute("data-key")] == false) {
        //   console.log("deleted " + menuitemsOnPage[i].getAttribute("data-key"));

        //   deleteMenuItem(menuitemsOnPage[i].getAttribute("data-key"));
        // }
      }
    }
  });
  SendPageData("home");
}

// let SettingsFound = false;
// async function SetLandingPage() {
//   waitForSettings();
//   // Checks to see if settings menu button exists
//   var element = document.querySelector("[data-key=" + "settings" + "]");
//   if (element != null) {
//     // If element exists, delete the menu item

//     SettingsFound = true;
//     SendPageData("home");
//   }
//   if (SettingsFound == false) {
//     // If the settings button was not found, wait 500ms and try again
//     await delay(500);
//     SetLandingPage();
//   }
// }
// // Calls the Landing Page Function
// SetLandingPage();
