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
      createNewShortcut("http://office.com", "office365-icon", "Office");

      createNewShortcut(
        "https://accounts.spotify.com/en/login",
        "spotify-icon",
        "Spotify"
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
