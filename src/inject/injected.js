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
    elementA.classList.remove("activelesson");
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
      TodayFormatted = "2021-12-01";

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

      function createNewShortcut(link, classname, title) {
        // Creates the stucture and element information for each seperate shortcut
        var shortcut = document.createElement("a");
        shortcut.setAttribute("href", link);
        shortcut.setAttribute("target", "_blank");
        var shortcutdiv = document.createElement("div");
        shortcutdiv.classList.add("shortcut");
        var image = document.createElement("div");
        image.classList.add(classname);
        image.classList.add("shortcuticondiv");
        var text = document.createElement("p");
        text.textContent = title;
        shortcutdiv.append(image);
        shortcutdiv.append(text);
        shortcut.append(shortcutdiv);

        document.getElementById("shortcuts").append(shortcut);
      }
      // Adds the shortcuts to the shortcut container
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
          // If no items in response:
          if (serverResponse.payload.items.length == 0) {
            // Set all values to nothing to avoid errors
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
            // If items in the response, set each corresponding value into divs
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

            // Removes seconds from the start and end times
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
          // Checks if attendance is unmarked, and sets the string to " ".
          lesson1.attendance = CheckUnmarkedAttendance(lesson1.attendance);
          lesson2.attendance = CheckUnmarkedAttendance(lesson2.attendance);
          lesson3.attendance = CheckUnmarkedAttendance(lesson3.attendance);
          lesson4.attendance = CheckUnmarkedAttendance(lesson4.attendance);
          lesson5.attendance = CheckUnmarkedAttendance(lesson5.attendance);

          if ((name = "home")) {
            // If on home page, apply each lesson to HTML with information in each div
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
          // Append each of the lessons into the day-container
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
          // For each lesson, check the start and end times
          CheckCurrentLessonAll(lessonArray);
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
    }.bind(name),
    1
  );
}
MainFound = false;

let SettingsFound = false;
async function SetLandingPage() {
  // Checks to see if settings menu button exists
  var element = document.querySelector("[data-key=" + "settings" + "]");
  if (element != null) {
    // If element exists, delete the menu item
    deleteMenuItem("welcome");
    deleteMenuItem("portals");
    deleteMenuItem("dashboard");
    deleteMenuItem("forums");
    deleteMenuItem("settings");
    SettingsFound = true;
    SendPageData("home");
  }
  if (SettingsFound == false) {
    // If the settings button was not found, wait 500ms and try again
    await delay(500);
    SetLandingPage();
  }
}
// Calls the Landing Page Function
SetLandingPage();
