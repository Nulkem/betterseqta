function GetTimeString() {
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
  if (element != null) {
    element.remove();
    await delay(200);
    element.remove();
  }
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

function CheckCurrentLesson(lesson, num) {
  var startTime = lesson.from;
  var endTime = lesson.until;

  currentDate = new Date();

  // startDatea = new Date(currentDate.getTime());
  // currentDatea = "10:15";
  // startDatea.setHours(currentDatea.split(":")[0]);
  // startDatea.setMinutes(currentDatea.split(":")[1]);

  startDate = new Date(currentDate.getTime());
  startDate.setHours(startTime.split(":")[0]);
  startDate.setMinutes(startTime.split(":")[1]);
  startDate.setSeconds("00");

  endDate = new Date(currentDate.getTime());
  endDate.setHours(endTime.split(":")[0]);
  endDate.setMinutes(endTime.split(":")[1]);
  endDate.setSeconds("00");

  var difference = startDate.getTime() - currentDate.getTime();
  var minutes = Math.floor(difference / 1000 / 60);

  if (minutes == 5) {
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
                body: "How are you doing?",
                icon: "https://bit.ly/2DYqRrh",
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

  valid = startDate < currentDate && endDate > currentDate;

  if (valid) {
    var elementA = document.getElementById("lesson" + num);
    elementA.classList.add("activelesson");
  } else {
    var elementA = document.getElementById("lesson" + num);
    elementA.classList.remove("activelesson");
  }
}

function CheckCurrentLessonAll(lessons) {
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
  setTimeout(
    function () {
      document.title = "Home ― SEQTA Learn";
      var element = document.querySelector("[data-key=" + name + "]");
      element.classList.add("active");

      var main = document.getElementById("main");
      main.innerHTML = "";

      var timeString = GetTimeString();
      var UsersName = document.getElementsByClassName("name")[0];
      var FirstName = UsersName.innerHTML.replace(/ .*/, "");

      var htmlStr =
        `<div class="home-root"><div class="home-container" id="home-container"><h1>` +
        timeString +
        FirstName +
        `!</h1></div></div>`;

      var html = stringToHTML(htmlStr);
      main.append(html.firstChild);

      const date = new Date();
      var TodayFormatted =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      TodayFormatted = "2021-12-01";

      var TimetableStr = `<div class="timetable-container"><h2>Today's Lessons:</h2><div class="day-container" id="day-container"></div></div>`;
      var Timetable = stringToHTML(TimetableStr);
      document.getElementById("home-container").append(Timetable.firstChild);

      var ShortcutStr = `<div class="shortcut-container"><h2>Shortcuts:</h2><div class="shortcuts" id="shortcuts"></div></div>`;
      var Shortcut = stringToHTML(ShortcutStr);
      document.getElementById("home-container").append(Shortcut.firstChild);

      function createNewShortcut(link, classname, title) {
        var shortcut = document.createElement("a");
        shortcut.setAttribute("href", link);
        shortcut.setAttribute("target", "_blank");
        var shortcutdiv = document.createElement("div");
        shortcutdiv.classList.add("shortcut");
        var image = document.createElement("div");
        image.classList.add(classname);
        image.classList.add("shortcuticondiv");
        // image.src = imagesrc;
        var text = document.createElement("p");
        text.textContent = title;
        shortcutdiv.append(image);
        shortcutdiv.append(text);
        shortcut.append(shortcutdiv);

        document.getElementById("shortcuts").append(shortcut);
      }
      createNewShortcut("https://www.youtube.com/", "yt-icon", "YouTube");
      createNewShortcut(
        "https://outlook.office365.com/mail/inbox",
        "outlook-icon",
        "Outlook"
      );
      createNewShortcut(
        "https://cbcsaeduau-my.sharepoint.com",
        "onedrive-icon",
        "OneDrive"
      );

      createNewShortcut(
        "https://www.cbc.sa.edu.au/",
        "cbc-icon",
        "CBC Website"
      );

      var NoticesStr = `<div class="notices-container"><h2>Notices:</h2><div class="notice-container" id="notice-container"></div></div>`;
      var Notices = stringToHTML(NoticesStr);
      document.getElementById("home-container").append(Notices.firstChild);

      var xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        "https://learn.cbc.sa.edu.au/seqta/student/load/timetable?",
        true
      );
      xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          var serverResponse = JSON.parse(xhr.response);
          if (serverResponse.payload.items.length == 0) {
            lesson1colour = "#FFFFFF";
            var lesson1 = {};
            lesson1.description = "";
            lesson1.staff = "";
            lesson1.room = "";
            lesson1.from = "";
            lesson1.until = "";

            lesson2colour = "#FFFFFF";
            var lesson2 = {};
            lesson2.description = "";
            lesson2.staff = "";
            lesson2.room = "";
            lesson2.from = "";
            lesson2.until = "";

            lesson3colour = "#FFFFFF";
            var lesson3 = {};
            lesson3.description = "";
            lesson3.staff = "";
            lesson3.room = "";
            lesson3.from = "";
            lesson3.until = "";

            lesson4colour = "#FFFFFF";
            var lesson4 = {};
            lesson4.description = "";
            lesson4.staff = "";
            lesson4.room = "";
            lesson4.from = "";
            lesson4.until = "";

            lesson5colour = "#FFFFFF";
            var lesson5 = {};
            lesson5.description = "";
            lesson5.staff = "";
            lesson5.room = "";
            lesson5.from = "";
            lesson5.until = "";
          } else {
            var lesson1 = serverResponse.payload.items[1];
            var lesson1colour = document.querySelector(
              "[data-colour='timetable.subject.colour." + lesson1.code + "']"
            ).style.cssText;

            var lesson2 = serverResponse.payload.items[2];
            var lesson2colour = document.querySelector(
              "[data-colour='timetable.subject.colour." + lesson2.code + "']"
            ).style.cssText;

            var lesson3 = serverResponse.payload.items[3];
            var lesson3colour = document.querySelector(
              "[data-colour='timetable.subject.colour." + lesson3.code + "']"
            ).style.cssText;

            var lesson4 = serverResponse.payload.items[4];
            var lesson4colour = document.querySelector(
              "[data-colour='timetable.subject.colour." + lesson4.code + "']"
            ).style.cssText;

            var lesson5 = serverResponse.payload.items[5];
            var lesson5colour = document.querySelector(
              "[data-colour='timetable.subject.colour." + lesson5.code + "']"
            ).style.cssText;

            lesson1.from = lesson1.from.substring(0, 5);
            lesson2.from = lesson2.from.substring(0, 5);
            lesson3.from = lesson3.from.substring(0, 5);
            lesson4.from = lesson4.from.substring(0, 5);
            lesson5.from = lesson5.from.substring(0, 5);
            lesson1.until = lesson1.until.substring(0, 5);
            lesson2.until = lesson2.until.substring(0, 5);
            lesson3.until = lesson3.until.substring(0, 5);
            lesson4.until = lesson4.until.substring(0, 5);
            lesson5.until = lesson5.until.substring(0, 5);
          }
          function CheckUnmarkedAttendance(lessonattendance) {
            if (lessonattendance === undefined) {
              var lesson = " ";
            } else {
              var lesson = lessonattendance.label;
            }
            return lesson;
          }

          lesson1.attendance = CheckUnmarkedAttendance(lesson1.attendance);
          lesson2.attendance = CheckUnmarkedAttendance(lesson2.attendance);
          lesson3.attendance = CheckUnmarkedAttendance(lesson3.attendance);
          lesson4.attendance = CheckUnmarkedAttendance(lesson4.attendance);
          lesson5.attendance = CheckUnmarkedAttendance(lesson5.attendance);

          if ((name = "home")) {
            var lesson1div = stringToHTML(
              `<div class="day" id="lesson1" style="` +
                lesson1colour +
                `"><h2>` +
                lesson1.description +
                `</h2><h3>` +
                lesson1.staff +
                `</h3><h3>` +
                lesson1.room +
                `</h3><h4>` +
                lesson1.from +
                " - " +
                lesson1.until +
                `</h4><h5>` +
                lesson1.attendance +
                `</h5></div>`
            );
            var lesson2div = stringToHTML(
              `<div class="day" id="lesson2" style="` +
                lesson2colour +
                `"><h2>` +
                lesson2.description +
                `</h2><h3>` +
                lesson2.staff +
                `</h3><h3>` +
                lesson2.room +
                `</h3><h4>` +
                lesson2.from +
                " - " +
                lesson2.until +
                `</h4><h5>` +
                lesson2.attendance +
                `</h5></div>`
            );
            var lesson3div = stringToHTML(
              `<div class="day" id="lesson3" style="` +
                lesson3colour +
                `"><h2>` +
                lesson3.description +
                `</h2><h3>` +
                lesson3.staff +
                `</h3><h3>` +
                lesson3.room +
                `</h3><h4>` +
                lesson3.from +
                " - " +
                lesson3.until +
                `</h4><h5>` +
                lesson3.attendance +
                `</h5></div>`
            );
            var lesson4div = stringToHTML(
              `<div class="day" id="lesson4" style="` +
                lesson4colour +
                `"><h2>` +
                lesson4.description +
                `</h2><h3>` +
                lesson4.staff +
                `</h3><h3>` +
                lesson4.room +
                `</h3><h4>` +
                lesson4.from +
                " - " +
                lesson4.until +
                `</h4><h5>` +
                lesson4.attendance +
                `</h5></div>`
            );
            var lesson5div = stringToHTML(
              `<div class="day" id="lesson5" style="` +
                lesson5colour +
                `"><h2>` +
                lesson5.description +
                `</h2><h3>` +
                lesson5.staff +
                `</h3><h3>` +
                lesson5.room +
                `</h3><h4>` +
                lesson5.from +
                " - " +
                lesson5.until +
                `</h4><h5>` +
                lesson5.attendance +
                `</h5></div>`
            );
          }

          document
            .getElementById("day-container")
            .append(lesson1div.firstChild);
          document
            .getElementById("day-container")
            .append(lesson2div.firstChild);
          document
            .getElementById("day-container")
            .append(lesson3div.firstChild);
          document
            .getElementById("day-container")
            .append(lesson4div.firstChild);
          document
            .getElementById("day-container")
            .append(lesson5div.firstChild);

          const lessonArray = [lesson1, lesson2, lesson3, lesson4, lesson5];
          for (i = 0; i < 5; i++) {
            CheckCurrentLesson(lessonArray[i], i + 1);
          }
          CheckCurrentLessonAll(lessonArray);
        }
      };
      xhr.send(
        JSON.stringify({
          from: TodayFormatted,
          until: TodayFormatted,
          student: 69,
        })
      );

      var xhr2 = new XMLHttpRequest();
      xhr2.open(
        "POST",
        "https://learn.cbc.sa.edu.au/seqta/student/load/notices?",
        true
      );
      xhr2.setRequestHeader("Content-Type", "application/json; charset=utf-8");

      xhr2.onreadystatechange = function () {
        if (xhr2.readyState === 4) {
          var NoticesPayload = JSON.parse(xhr2.response);
          var NoticeContainer = document.getElementById("notice-container");
          if (NoticesPayload.payload.length == 0) {
            var dummyNotice = document.createElement("div");
            dummyNotice.textContent = "No notices for today.";
            dummyNotice.classList.add("dummynotice");

            NoticeContainer.append(dummyNotice);
          } else {
            for (let i = 0; i < NoticesPayload.payload.length; i++) {
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

              var content = stringToHTML(NoticesPayload.payload[i].contents);
              var colour = NoticesPayload.payload[i].colour;
              var colourbar = document.createElement("div");
              colourbar.classList.add("colourbar");
              colourbar.style.background = colour;
              NewNotice.append(colourbar);

              for (let i = 0; i < content.childNodes.length; i++) {
                NewNotice.append(content.childNodes[i]);
              }

              NoticeContainer.append(NewNotice);
            }
          }
        }
      };
      xhr2.send(JSON.stringify({ date: TodayFormatted }));
    }.bind(name),
    1
  );
}
MainFound = false;

let SettingsFound = false;
async function SetLandingPage() {
  var element = document.querySelector("[data-key=" + "settings" + "]");
  if (element != null) {
    deleteMenuItem("welcome");
    deleteMenuItem("portals");
    deleteMenuItem("dashboard");
    deleteMenuItem("forums");
    deleteMenuItem("settings");
    SettingsFound = true;
    SendPageData("home");
  }
  if (SettingsFound == false) {
    await delay(500);
    SetLandingPage();
  }
}

SetLandingPage();
