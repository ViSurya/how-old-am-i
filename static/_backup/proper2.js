// Get the current domain
const currentDomain = window.location.hostname;

// List of allowed domains
const allowedDomains = ['127.0.0.1', 'localhost', 'how-old-am-i.online'];

// Check if the current domain is allowed
const isAllowed = allowedDomains.some(domain => currentDomain === domain || currentDomain.endsWith(`.${domain}`));

// If the current domain is not allowed, redirect to https://easycalculator.net/
if (!isAllowed) {
  window.location.href = 'https://easycalculator.net/';
}



// Retrieve the birth time and current time from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const urlHashParams = new URLSearchParams(window.location.hash.substring(1));
const url = '/'

let birthTime;
let currentTime;

let birthYear = null;
let birthMonth = null;
let birthDay = null;
let birthHour = null;
let birthMinute = null;

if (urlParams.has("birthdate")) {
  // Extract birthdate from URL query parameters
  const birthdateParam = urlParams.get("birthdate");
  const birthdateParts = birthdateParam.split('T');

  // Parse the date part
  const datePart = birthdateParts[0];
  const dateParts = datePart.split('-');
  birthYear = parseInt(dateParts[0]);
  birthMonth = parseInt(dateParts[1]) - 1; // Month is 0-indexed
  birthDay = parseInt(dateParts[2]);

  // If time part is not provided, default to 00:00
  birthHour = 0;
  birthMinute = 0;

  // If time part is provided, parse it
  if (birthdateParts.length === 2) {
    const timePart = birthdateParts[1];
    const timeParts = timePart.split(':');
    birthHour = parseInt(timeParts[0]);
    birthMinute = parseInt(timeParts[1]);
  }

  birthTime = new Date(birthYear, birthMonth, birthDay, birthHour, birthMinute);
}

if (urlHashParams.has("birthdate")) {
  // Extract birthdate from URL hash parameters
  const birthdateParam = urlHashParams.get("birthdate");
  const birthdateParts = birthdateParam.split('T');

  // Parse the date part
  const datePart = birthdateParts[0];
  const dateParts = datePart.split('-');
  birthYear = parseInt(dateParts[0]);
  birthMonth = parseInt(dateParts[1]) - 1; // Month is 0-indexed
  birthDay = parseInt(dateParts[2]);

  // If time part is not provided, default to 00:00
  birthHour = 0;
  birthMinute = 0;

  // If time part is provided, parse it
  if (birthdateParts.length === 2) {
    const timePart = birthdateParts[1];
    const timeParts = timePart.split(':');
    birthHour = parseInt(timeParts[0]);
    birthMinute = parseInt(timeParts[1]);
  }

  birthTime = new Date(birthYear, birthMonth, birthDay, birthHour, birthMinute);
}

if (urlHashParams.has("currentdate")) {
  // Extract currentdate from URL hash parameters
  const currentdateParam = urlHashParams.get("currentdate");
  const currentDateTime = new Date(currentdateParam);

  // Check if currentDateTime is valid
  if (!isNaN(currentDateTime.getTime())) {
    currentTime = currentDateTime;
  }
} else {
  // If currentdate is not provided in URL, use the current time
  currentTime = new Date();
}

// If birthTime is still undefined, set it to the current time
// if (!birthTime) {
//     birthTime = new Date('2007-04-10T07:30');
// }

console.log("Birth Time:", birthTime);
console.log("Current Time:", currentTime);

// Return parsed values
console.log("Birth Year:", birthYear);
console.log("Birth Month:", birthMonth);
console.log("Birth Day:", birthDay);
console.log("Birth Hour:", birthHour);
console.log("Birth Minute:", birthMinute);



// Function to format date for input fields
function formatDateForInput(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

// after getting currunt Time from Function set vlaue in input

// An object of weekdays with their values that match with weekDay variable so we can easily add the weekday as a string text
const weekDaysObject = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

// An object of months object and vlaue index start with 1 becuase i added +1 in return
const monthsObject = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};


// add html elements for functions
const HTMLDefaultPage = `
<article class="card">
    <h1>How old am I? - Age Calculator</h1>
    <p>This tool helps you calculate your age in a detailed and comprehensive manner. Simply enter your date of
        birth, and you'll get a breakdown of your age, including years, months, days, and even your age in
        seconds, minutes, hours, and on different planets.</p>
    <p> You'll also discover interesting facts about your age, like the total number of heartbeats, blinks,
        breaths, and more. Plus, you can explore notable events that happened on your birthday and famous people
        who share your birth date.</p>
    <hr>
</article>
<article class="card">
    <div class="grid">
        <!-- input for entering Date of Birth -->
        <div>
            <label for="birthDateInput">Enter Date of Birth (MM/DD/YYYY)</label>
            <input class="dateInput" id="birthDateInput" type="datetime-local" name="datetime-local"
                aria-label="birthDate" />
        </div>
        <!-- input for entering next Date from Date of Birth -->
        <div>
            <label for="curruntDateInput">Date since DOB (MM/DD/YYYY)</label>
            <input class="dateInput" id="curruntDateInput" type="datetime-local" name="datetime-local"
                aria-label="curruntDate" />
        </div>
    </div>
    <!-- Button that hidden bu default and when change in input will become wisible -->
    <div id="mainInputButtons">
        <div class="grid">
            <button class="MainButton" id="calculateButton" role="button">Calculate</button>
            <button class="MainButton outline" id="resetButton" role="button">Reset</button>
        </div>
    </div>
</article>

<!-- Years -->
<article class="card">
    <h2>Choose Your Birth Year</h2>
    <div id="YearsForDefaultPage">
    </div>
</article>
<article class="card">
    <div>
        <h2>How old am I - Age Calculator</h2>
        <hr>
        <p>This <strong>How old am I - Age Calculator</strong> is a comprehensive tool that allows you to calculate your age
            in great detail. By simply entering your date of birth, you'll get a wealth of information about
            your age, including:</p>
        <ul>
            <li>Your current age in years, months, and days</li>
            <li>The number of days, hours, minutes, and seconds you've been alive</li>
            <li>Your age in different calendar systems (Gregorian, Buddhist, Chinese, etc.)</li>
            <li>Your age on various planets in the solar system</li>
            <li>Fascinating facts about your lifetime, such as the number of heartbeats, breaths, skin cell
                regenerations, and more</li>
            <li>Famous Persons Born on your birthdate and also famous events that happened on your birthday</li>

        </ul>
    </div>

    <h2>How to Use the Calculator</h2>
    <hr>
    <p>Using the Full Age Calculator is easy:</p>
    <ol>
        <li>Enter your date of birth (MM/DD/YYYY) in the "Enter Date of Birth" field.</li>
        <li>For the current date (MM/DD/YYYY), the "Date since DOB" field is automatically set to the current
            date when the page loads. If you want to update the current date, simply click the refresh button.
        </li>
        <li>Click the "Calculate" button to view your detailed age information.</li>
    </ol>


    <p>The calculator will instantly display your age in years, months, and days, as well as a live age counter
        that updates every second. You'll also see your next birthday countdown, your age in different
        calendars, and a wealth of fascinating facts about your lifetime.</p>
</article>`


const HTMLFullYearDate = `   <article class="card hover-animation">
<h1><span id="birthDateTitle"></span></h1>
<p id="birthDateDescription"></p>
</article>

<article class="card hover-animation">
<div class="grid">
    <!-- input for entering Date of Birth -->
    <div>
        <label for="birthDateInput">Enter Date of Birth (MM/DD/YYYY)</label>
        <input class="dateInput input-animated" id="birthDateInput" type="datetime-local" name="datetime-local" aria-label="birthDate" />
    </div>
    <!-- input for entering next Date from Date of Birth -->
    <div>
        <label for="curruntDateInput">Date since DOB (MM/DD/YYYY)</label>
        <input class="dateInput input-animated" id="curruntDateInput" type="datetime-local" name="datetime-local" aria-label="curruntDate" />
    </div>
</div>
<!-- Button that hidden by default and when change in input will become visible -->
<div id="mainInputButtons" style="display: none;">
    <div class="grid">
        <button class="MainButton button-animated" id="calculateButton" role="button">Calculate</button>
        <button class="MainButton outline button-animated" id="resetButton" role="button">Reset</button>
    </div>
</div>
</article>

<div class="grid">
<article class="card hover-animation">
    <!-- Live Age -->
    <div class="liveAgeCounter">
        <span class="counter">Live Age Counter</span>
        <hr>
        <strong id="liveAgeCounter"><span aria-busy="true"></span></strong>
    </div>
</article>

<article class="card hover-animation">
    <!-- Next BirthDay CountDown -->
    <div class="nextBirthDayCountDown">
        <span class="counter">Next Birthday Countdown</span>
        <hr>
        <strong id="nextBirthDayCountDown"><span aria-busy="true"></span></strong>
    </div>
</article>
</div>

<article>
<table class="striped">
    <thead>
        <tr>
            <th colspan="2">
                <h2>Calculation Result</h2>
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th>Date of Birth</th>
            <td><span id="tableBirthDate"><span aria-busy="true"></span></span></td>
        </tr>
        <tr>
            <th>Age from DOB</th>
            <td><span id="ageFromDate"><span aria-busy="true"></span></span></td>
        </tr>
        <tr>
            <th>Age</th>
            <td><span id="age"><span aria-busy="true"></span></span></td>
        </tr>
        <tr>
            <th>Birth day of the week</th>
            <td><span id="birthWeekDay"><span aria-busy="true"></span></span></td>
        </tr>
        <!-- <tr>
            <th colspan="2"><h3>Age in Various Formats</h3></th>
        </tr> -->
        <tr>
            <th>Next Birth Day</th>
            <td><span id="nextBirthDay"><span aria-busy="true"></span></span></td>
        </tr>
        <tr>
            <th>Zodiac Sign</th>
            <td><span id="zodiacSign"><span aria-busy="true"></span></span></td>
        </tr>
        <tr>
            <th>Birth Date in Roman</th>
            <td><span id="birthDateRoman"><span aria-busy="true"></span></span></td>
        </tr>
        <tr>
            <th>Current Date in Roman</th>
            <td><span id="currentDateRoman"><span aria-busy="true"></span></span></td>
        </tr>
        <tr>
            <th>Age in Roman</th>
            <td><span id="ageRoman"><span aria-busy="true"></span></span></td>
        </tr>
        <tr>
            <th>Age in months</th>
            <td><span id="ageMonths"><span aria-busy="true"></span></span></td>
        </tr>
        <tr>
            <th>Age in weeks</th>
            <td><span id="ageWeeks"><span aria-busy="true"></span></span></td>
        </tr>
        <tr>
            <th>Age in days</th>
            <td><span id="ageDays"><span aria-busy="true"></span></span></td>
        </tr>
        <tr>
            <th>Age in hours</th>
            <td><span id="ageHours"><span aria-busy="true"></span></span></td>
        </tr>
        <tr>
            <th>Age in minutes</th>
            <td><span id="ageMinutes"><span aria-busy="true"></span></span></td>
        </tr>
        <tr>
            <th>Age in seconds</th>
            <td><span id="ageSeconds"><span aria-busy="true"></span></span></td>
        </tr>
    </tbody>
</table>
</article>
<article>

<table class="striped facts">
    <thead>
        <tr>
            <th colspan="2">
                <h2>Interesting Facts</h2>
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th>Total Heartbeats</th>
            <td><span id="totalHeartbeats"></span></td>
        </tr>
        <tr>
            <th>Total Heartbeat Energy</th>
            <td><span id="totalHeartbeatEnergy"></span></td>
        </tr>
        <tr>
            <th>Total Blinks</th>
            <td><span id="totalBlinks"></span></td>
        </tr>
        <tr>
            <th>Total Sleep (Hours)</th>
            <td><span id="totalSleepHours"></span></td>
        </tr>
        <tr>
            <th>Total Sleep (Days)</th>
            <td><span id="totalSleepDays"></span></td>
        </tr>
        <tr>
            <th>Total Sleep (Weeks)</th>
            <td><span id="totalSleepWeeks"></span></td>
        </tr>
        <tr>
            <th>Total Breaths</th>
            <td><span id="totalBreaths"></span></td>
        </tr>
        <tr>
            <th>Total Oxygen Consumed</th>
            <td><span id="totalOxygenConsumed"></span></td>
        </tr>
        <tr>
            <th>Total Blood Pumped</th>
            <td><span id="totalBloodPumped"></span></td>
        </tr>
        <tr>
            <th>Total Kidney Filtration</th>
            <td><span id="totalKidneyFiltration"></span></td>
        </tr>
        <tr>
            <th>Total Urea Produced</th>
            <td><span id="totalUreaProduced"></span></td>
        </tr>
        <tr>
            <th>Total Food Consumed</th>
            <td><span id="totalFoodConsumed"></span></td>
        </tr>
        <tr>
            <th>Total Calories Consumed</th>
            <td><span id="totalCaloriesConsumed"></span></td>
        </tr>
        <tr>
            <th>Total Skin Regeneration</th>
            <td><span id="totalSkinRegeneration"></span></td>
        </tr>
        <tr>
            <th>Total Skin Cells Replaced</th>
            <td><span id="totalSkinCellsReplaced"></span></td>
        </tr>
     <!--   <tr>
            <th>Total Body Cell Renewal</th>
            <td><span id="totalBodyCellRenewal"></span></td>
        </tr>
        <tr>
            <th>Total Body Cells Replaced</th>
            <td><span id="totalBodyCellsReplaced"></span></td>
        </tr>
         <tr>
<th>Total Bone Regeneration</th>
<td><span id="totalBoneRegeneration"></span></td>
</tr>
        <tr>
            <th>Total Bone Cells Replaced</th>
            <td><span id="totalBoneCellsReplaced"></span></td>
        </tr> -->
        <tr>
            <th>Total Liver Regeneration</th>
            <td><span id="totalLiverRegeneration"></span></td>
        </tr>
        <tr>
            <th>Total Liver Cells Replaced</th>
            <td><span id="totalLiverCellsReplaced"></span></td>
        </tr>
        <tr>
            <th>Total Intestinal Regeneration</th>
            <td><span id="totalIntestinalRegeneration"></span></td>
        </tr>
        <tr>
            <th>Total Intestinal Cells Replaced</th>
            <td><span id="totalIntestinalCellsReplaced"></span></td>
        </tr>
        <tr>
            <th>Total Distance Traveled</th>
            <td><span id="totalDistanceTraveled"></span></td>
        </tr>
        <tr>
            <th>Total Steps Taken</th>
            <td><span id="totalStepsTaken"></span></td>
        </tr>
        <tr>
            <th>Total Calories Burned</th>
            <td><span id="totalCaloriesBurned"></span></td>
        </tr>
        <tr>
            <th>Total Water Consumed</th>
            <td><span id="totalWaterConsumed"></span></td>
        </tr>
        <tr>
            <th>Total Hair Growth</th>
            <td><span id="totalHairGrowth"></span></td>
        </tr>
        <tr>
            <th>Total Times RBC Replaced</th>
            <td><span id="totalRedBloodCellsReplaced"></span></td>
        </tr>
        <tr>
            <th>Total RBC Produced</th>
            <td><span id="totalRedBloodCellsProduced"></span></td>
        </tr>
        <tr>
            <th>Total Blood Produced</th>
            <td><span id="totalBloodProduced"></span></td>
        </tr>
    </tbody>
</table>
</article>
<article>

<table class="striped">
    <thead>
        <tr>
            <th colspan="2">
                <h2>Your Age in Various Calendar Formats</h2>
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th colspan="2">
                <h3 class="calendar-heading">Gregorian Calendar</h3>
            </th>
        </tr>
        <tr>
            <th>Current Date</th>
            <td><span id="gregory_currentDate"></span></td>
        </tr>
        <tr>
            <th>Current Date (Numerical)</th>
            <td><span id="gregory_currentDateInNumerical"></span></td>
        </tr>
        <tr>
            <th>Birth Date</th>
            <td><span id="gregory_birthDate"></span></td>
        </tr>
        <tr>
            <th>Birth Date (Numerical)</th>
            <td><span id="gregory_birthDateInNumerical"></span></td>
        </tr>
        <tr>
            <th>Age</th>
            <td><span id="gregory_age"></span></td>
        </tr>
        <tr>
            <th>Age (Numerical)</th>
            <td><span id="gregory_ageInNumerical"></span></td>
        </tr>
        <tr>
            <th colspan="2">
                <h3 class="calendar-heading">Buddhist Calendar</h3>
            </th>
        </tr>
        <tr>
            <th>Current Date</th>
            <td><span id="buddhist_currentDate"></span></td>
        </tr>
        <tr>
            <th>Current Date (Numerical)</th>
            <td><span id="buddhist_currentDateInNumerical"></span></td>
        </tr>
        <tr>
            <th>Birth Date</th>
            <td><span id="buddhist_birthDate"></span></td>
        </tr>
        <tr>
            <th>Birth Date (Numerical)</th>
            <td><span id="buddhist_birthDateInNumerical"></span></td>
        </tr>
        <tr>
            <th>Age</th>
            <td><span id="buddhist_age"></span></td>
        </tr>
        <tr>
            <th>Age (Numerical)</th>
            <td><span id="buddhist_ageInNumerical"></span></td>
        </tr>
        <tr>
            <th colspan="2">
                <h3 class="calendar-heading">Chinese Calendar</h3>
            </th>
        </tr>
        <tr>
            <th>Current Date</th>
            <td><span id="chinese_currentDate"></span></td>
        </tr>
        <tr>
            <th>Current Date (Numerical)</th>
            <td><span id="chinese_currentDateInNumerical"></span></td>
        </tr>
        <tr>
            <th>Birth Date</th>
            <td><span id="chinese_birthDate"></span></td>
        </tr>
        <tr>
            <th>Birth Date (Numerical)</th>
            <td><span id="chinese_birthDateInNumerical"></span></td>
        </tr>
        <tr>
            <th>Age</th>
            <td><span id="chinese_age"></span></td>
        </tr>
        <tr>
            <th>Age (Numerical)</th>
            <td><span id="chinese_ageInNumerical"></span></td>
        </tr>
        <tr>
            <th colspan="2">
                <h3 class="calendar-heading">Coptic Calendar</h3>
            </th>
        </tr>
        <tr>
            <th>Current Date</th>
            <td><span id="coptic_currentDate"></span></td>
        </tr>
        <tr>
            <th>Current Date (Numerical)</th>
            <td><span id="coptic_currentDateInNumerical"></span></td>
        </tr>
        <tr>
            <th>Birth Date</th>
            <td><span id="coptic_birthDate"></span></td>
        </tr>
        <tr>
            <th>Birth Date (Numerical)</th>
            <td><span id="coptic_birthDateInNumerical"></span></td>
        </tr>
        <tr>
            <th>Age</th>
            <td><span id="coptic_age"></span></td>
        </tr>
        <tr>
            <th>Age (Numerical)</th>
            <td><span id="coptic_ageInNumerical"></span></td>
        </tr>
        <tr>
            <th colspan="2">
                <h3 class="calendar-heading">Ethiopian Calendar</h3>
            </th>
        </tr>
        <tr>
            <th>Current Date</th>
            <td><span id="ethiopia_currentDate"></span></td>
        </tr>
        <tr>
            <th>Current Date (Numerical)</th>
            <td><span id="ethiopia_currentDateInNumerical"></span></td>
        </tr>
        <tr>
            <th>Birth Date</th>
            <td><span id="ethiopia_birthDate"></span></td>
        </tr>
        <tr>
            <th>Birth Date (Numerical)</th>
            <td><span id="ethiopia_birthDateInNumerical"></span></td>
        </tr>
        <tr>
            <th>Age</th>
            <td><span id="ethiopia_age"></span></td>
        </tr>
        <tr>
            <th>Age (Numerical)</th>
            <td><span id="ethiopia_ageInNumerical"></span></td>
        </tr>
        <tr>
            <th colspan="2">
                <h3 class="calendar-heading">Hebrew Calendar</h3>
            </th>
        </tr>
        <tr>
            <th>Current Date</th>
            <td><span id="hebrew_currentDate"></span></td>
        </tr>
        <tr>
            <th>Current Date (Numerical)</th>
            <td><span id="hebrew_currentDateInNumerical"></span></td>
        </tr>
        <tr>
            <th>Birth Date</th>
            <td><span id="hebrew_birthDate"></span></td>
        </tr>
        <tr>
            <th>Birth Date (Numerical)</th>
            <td><span id="hebrew_birthDateInNumerical"></span></td>
        </tr>
        <tr>
            <th>Age</th>
            <td><span id="hebrew_age"></span></td>
        </tr>
        <tr>
            <th>Age (Numerical)</th>
            <td><span id="hebrew_ageInNumerical"></span></td>
        </tr>
        <tr>
            <th colspan="2">
                <h3 class="calendar-heading">Indian Calendar</h3>
            </th>
        </tr>
        <tr>
            <th>Current Date</th>
            <td><span id="indian_currentDate"></span></td>
        </tr>
        <tr>
            <th>Current Date (Numerical)</th>
            <td><span id="indian_currentDateInNumerical"></span></td>
        </tr>
        <tr>
            <th>Birth Date</th>
            <td><span id="indian_birthDate"></span></td>
        </tr>
        <tr>
            <th>Birth Date (Numerical)</th>
            <td><span id="indian_birthDateInNumerical"></span></td>
        </tr>
        <tr>
            <th>Age</th>
            <td><span id="indian_age"></span></td>
        </tr>
        <tr>
            <th>Age (Numerical)</th>
            <td><span id="indian_ageInNumerical"></span></td>
        </tr>
        <tr>
            <th colspan="2">
                <h3 class="calendar-heading">Islamic Calendar</h3>
            </th>
        </tr>
        <tr>
            <th>Current Date</th>
            <td><span id="islamic_currentDate"></span></td>
        </tr>
        <tr>
            <th>Current Date (Numerical)</th>
            <td><span id="islamic_currentDateInNumerical"></span></td>
        </tr>
        <tr>
            <th>Birth Date</th>
            <td><span id="islamic_birthDate"></span></td>
        </tr>
        <tr>
            <th>Birth Date (Numerical)</th>
            <td><span id="islamic_birthDateInNumerical"></span></td>
        </tr>
        <tr>
            <th>Age</th>
            <td><span id="islamic_age"></span></td>
        </tr>
        <tr>
            <th>Age (Numerical)</th>
            <td><span id="islamic_ageInNumerical"></span></td>
        </tr>
        <tr>
            <th colspan="2">
                <h3 class="calendar-heading">Japanese Calendar</h3>
            </th>
        </tr>
        <tr>
            <th>Current Date</th>
            <td><span id="japanese_currentDate"></span></td>
        </tr>
        <tr>
            <th>Current Date (Numerical)</th>
            <td><span id="japanese_currentDateInNumerical"></span></td>
        </tr>
        <tr>
            <th>Birth Date</th>
            <td><span id="japanese_birthDate"></span></td>
        </tr>
        <tr>
            <th>Birth Date (Numerical)</th>
            <td><span id="japanese_birthDateInNumerical"></span></td>
        </tr>
        <tr>
            <th>Age</th>
            <td><span id="japanese_age"></span></td>
        </tr>
        <tr>
            <th>Age (Numerical)</th>
            <td><span id="japanese_ageInNumerical"></span></td>
        </tr>
        <tr>
            <th colspan="2">
                <h3 class="calendar-heading">Persian Calendar</h3>
            </th>
        </tr>
        <tr>
            <th>Current Date</th>
            <td><span id="persian_currentDate"></span></td>
        </tr>
        <tr>
            <th>Current Date (Numerical)</th>
            <td><span id="persian_currentDateInNumerical"></span></td>
        </tr>
        <tr>
            <th>Birth Date</th>
            <td><span id="persian_birthDate"></span></td>
        </tr>
        <tr>
            <th>Birth Date (Numerical)</th>
            <td><span id="persian_birthDateInNumerical"></span></td>
        </tr>
        <tr>
            <th>Age</th>
            <td><span id="persian_age"></span></td>
        </tr>
        <tr>
            <th>Age (Numerical)</th>
            <td><span id="persian_ageInNumerical"></span></td>
        </tr>
        <tr>
            <th colspan="2">
                <h3 class="calendar-heading">Republic of China (Minguo) Calendar</h3>
            </th>
        </tr>
        <tr>
            <th>Current Date</th>
            <td><span id="roc_currentDate"></span></td>
        </tr>
        <tr>
            <th>Current Date (Numerical)</th>
            <td><span id="roc_currentDateInNumerical"></span></td>
        </tr>
        <tr>
            <th>Birth Date</th>
            <td><span id="roc_birthDate"></span></td>
        </tr>
        <tr>
            <th>Birth Date (Numerical)</th>
            <td><span id="roc_birthDateInNumerical"></span></td>
        </tr>
        <tr>
            <th>Age</th>
            <td><span id="roc_age"></span></td>
        </tr>
        <tr>
            <th>Age (Numerical)</th>
            <td><span id="roc_ageInNumerical"></span></td>
        </tr>
    </tbody>
</table>
</article>
<article>

<div class="planet">
    <div class="grid">
        <article class="planet_data">
            <header><img loading="lazy" src="/static/images/planets/mercury.png" height="350" width="350"
                    alt="mercury Image"></header>
            <h3>Mercury</h3>
            <table class="striped">
                <tr class="mainTR">
                    <th>Age</th>
                    <td><span id="planetsAge_mercury_age"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Months</th>
                    <td><span id="totalAgeOnPlanets_mercury_totalMonths"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Weeks</th>
                    <td><span id="totalAgeOnPlanets_mercury_totalWeeks"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Days</th>
                    <td><span id="totalAgeOnPlanets_mercury_totalDays"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Hours</th>
                    <td><span id="totalAgeOnPlanets_mercury_totalHours"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Minutes</th>
                    <td><span id="totalAgeOnPlanets_mercury_totalMinutes"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Seconds</th>
                    <td><span id="totalAgeOnPlanets_mercury_totalSeconds"></span></td>
                </tr>
            </table>
        </article>

        <article class="planet_data">
            <header><img loading="lazy" src="/static/images/planets/venus.png" height="350" width="350"
                    alt="venus Image"></header>
            <h3>Venus</h3>
            <table class="striped">
                <tr class="mainTR">
                    <th>Age</th>
                    <td><span id="planetsAge_venus_age"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Months</th>
                    <td><span id="totalAgeOnPlanets_venus_totalMonths"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Weeks</th>
                    <td><span id="totalAgeOnPlanets_venus_totalWeeks"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Days</th>
                    <td><span id="totalAgeOnPlanets_venus_totalDays"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Hours</th>
                    <td><span id="totalAgeOnPlanets_venus_totalHours"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Minutes</th>
                    <td><span id="totalAgeOnPlanets_venus_totalMinutes"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Seconds</th>
                    <td><span id="totalAgeOnPlanets_venus_totalSeconds"></span></td>
                </tr>
            </table>
        </article>
    </div>
    <div class="grid">
        <article class="planet_data">
            <header><img loading="lazy" src="/static/images/planets/earth.png" height="350" width="350"
                    alt="earth Image"></header>
            <h3>Earth</h3>
            <table class="striped">
                <tr class="mainTR">
                    <th>Age</th>
                    <td><span id="planetsAge_earth_age"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Months</th>
                    <td><span id="totalAgeOnPlanets_earth_totalMonths"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Weeks</th>
                    <td><span id="totalAgeOnPlanets_earth_totalWeeks"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Days</th>
                    <td><span id="totalAgeOnPlanets_earth_totalDays"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Hours</th>
                    <td><span id="totalAgeOnPlanets_earth_totalHours"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Minutes</th>
                    <td><span id="totalAgeOnPlanets_earth_totalMinutes"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Seconds</th>
                    <td><span id="totalAgeOnPlanets_earth_totalSeconds"></span></td>
                </tr>
            </table>
        </article>

        <article class="planet_data">
            <header><img loading="lazy" src="/static/images/planets/mars.png" height="350" width="350"
                    alt="mars Image"></header>
            <h3>Mars</h3>
            <table class="striped">
                <tr class="mainTR">
                    <th>Age</th>
                    <td><span id="planetsAge_mars_age"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Months</th>
                    <td><span id="totalAgeOnPlanets_mars_totalMonths"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Weeks</th>
                    <td><span id="totalAgeOnPlanets_mars_totalWeeks"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Days</th>
                    <td><span id="totalAgeOnPlanets_mars_totalDays"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Hours</th>
                    <td><span id="totalAgeOnPlanets_mars_totalHours"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Minutes</th>
                    <td><span id="totalAgeOnPlanets_mars_totalMinutes"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Seconds</th>
                    <td><span id="totalAgeOnPlanets_mars_totalSeconds"></span></td>
                </tr>
            </table>
        </article>
    </div>
    <div class="grid">
        <article class="planet_data">
            <header><img loading="lazy" src="/static/images/planets/ceres.png" height="350" width="350"
                    alt="ceres Image"></header>
            <h3>Ceres</h3>
            <table class="striped">
                <tr class="mainTR">
                    <th>Age</th>
                    <td><span id="planetsAge_ceres_age"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Months</th>
                    <td><span id="totalAgeOnPlanets_ceres_totalMonths"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Weeks</th>
                    <td><span id="totalAgeOnPlanets_ceres_totalWeeks"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Days</th>
                    <td><span id="totalAgeOnPlanets_ceres_totalDays"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Hours</th>
                    <td><span id="totalAgeOnPlanets_ceres_totalHours"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Minutes</th>
                    <td><span id="totalAgeOnPlanets_ceres_totalMinutes"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Seconds</th>
                    <td><span id="totalAgeOnPlanets_ceres_totalSeconds"></span></td>
                </tr>
            </table>
        </article>

        <article class="planet_data">
            <header><img loading="lazy" src="/static/images/planets/jupiter.png" height="350" width="350"
                    alt="jupiter Image"></header>
            <h3>Jupiter</h3>
            <table class="striped">
                <tr class="mainTR">
                    <th>Age</th>
                    <td><span id="planetsAge_jupiter_age"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Months</th>
                    <td><span id="totalAgeOnPlanets_jupiter_totalMonths"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Weeks</th>
                    <td><span id="totalAgeOnPlanets_jupiter_totalWeeks"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Days</th>
                    <td><span id="totalAgeOnPlanets_jupiter_totalDays"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Hours</th>
                    <td><span id="totalAgeOnPlanets_jupiter_totalHours"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Minutes</th>
                    <td><span id="totalAgeOnPlanets_jupiter_totalMinutes"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Seconds</th>
                    <td><span id="totalAgeOnPlanets_jupiter_totalSeconds"></span></td>
                </tr>
            </table>
        </article>
    </div>
    <div class="grid">
        <article class="planet_data">
            <header><img loading="lazy" src="/static/images/planets/saturn.png" height="350" width="350"
                    alt="saturn Image"></header>
            <h3>Saturn</h3>
            <table class="striped">
                <tr class="mainTR">
                    <th>Age</th>
                    <td><span id="planetsAge_saturn_age"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Months</th>
                    <td><span id="totalAgeOnPlanets_saturn_totalMonths"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Weeks</th>
                    <td><span id="totalAgeOnPlanets_saturn_totalWeeks"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Days</th>
                    <td><span id="totalAgeOnPlanets_saturn_totalDays"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Hours</th>
                    <td><span id="totalAgeOnPlanets_saturn_totalHours"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Minutes</th>
                    <td><span id="totalAgeOnPlanets_saturn_totalMinutes"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Seconds</th>
                    <td><span id="totalAgeOnPlanets_saturn_totalSeconds"></span></td>
                </tr>
            </table>
        </article>

        <article class="planet_data">
            <header><img loading="lazy" src="/static/images/planets/uranus.png" height="350" width="350"
                    alt="uranus Image"></header>
            <h3>Uranus</h3>
            <table class="striped">
                <tr class="mainTR">
                    <th>Age</th>
                    <td><span id="planetsAge_uranus_age"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Months</th>
                    <td><span id="totalAgeOnPlanets_uranus_totalMonths"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Weeks</th>
                    <td><span id="totalAgeOnPlanets_uranus_totalWeeks"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Days</th>
                    <td><span id="totalAgeOnPlanets_uranus_totalDays"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Hours</th>
                    <td><span id="totalAgeOnPlanets_uranus_totalHours"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Minutes</th>
                    <td><span id="totalAgeOnPlanets_uranus_totalMinutes"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Seconds</th>
                    <td><span id="totalAgeOnPlanets_uranus_totalSeconds"></span></td>
                </tr>
            </table>
        </article>
    </div>
    <div class="grid">
        <article class="planet_data">
            <header><img loading="lazy" src="/static/images/planets/neptune.png" height="350" width="350"
                    alt="neptune Image"></header>
            <h3>Neptune</h3>
            <table class="striped">
                <tr class="mainTR">
                    <th>Age</th>
                    <td><span id="planetsAge_neptune_age"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Months</th>
                    <td><span id="totalAgeOnPlanets_neptune_totalMonths"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Weeks</th>
                    <td><span id="totalAgeOnPlanets_neptune_totalWeeks"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Days</th>
                    <td><span id="totalAgeOnPlanets_neptune_totalDays"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Hours</th>
                    <td><span id="totalAgeOnPlanets_neptune_totalHours"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Minutes</th>
                    <td><span id="totalAgeOnPlanets_neptune_totalMinutes"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Seconds</th>
                    <td><span id="totalAgeOnPlanets_neptune_totalSeconds"></span></td>
                </tr>
            </table>
        </article>

        <article class="planet_data">
            <header><img loading="lazy" src="/static/images/planets/pluto.png" height="350" width="350"
                    alt="pluto Image"></header>
            <h3>Pluto</h3>
            <table class="striped">
                <tr class="mainTR">
                    <th>Age</th>
                    <td><span id="planetsAge_pluto_age"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Months</th>
                    <td><span id="totalAgeOnPlanets_pluto_totalMonths"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Weeks</th>
                    <td><span id="totalAgeOnPlanets_pluto_totalWeeks"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Days</th>
                    <td><span id="totalAgeOnPlanets_pluto_totalDays"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Hours</th>
                    <td><span id="totalAgeOnPlanets_pluto_totalHours"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Minutes</th>
                    <td><span id="totalAgeOnPlanets_pluto_totalMinutes"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Seconds</th>
                    <td><span id="totalAgeOnPlanets_pluto_totalSeconds"></span></td>
                </tr>
            </table>
        </article>
    </div>
    <div class="grid">
        <article class="planet_data">
            <header><img loading="lazy" src="/static/images/planets/haumea.png" height="350" width="350"
                    alt="haumea Image"></header>
            <h3>Haumea</h3>
            <table class="striped">
                <tr class="mainTR">
                    <th>Age</th>
                    <td><span id="planetsAge_haumea_age"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Months</th>
                    <td><span id="totalAgeOnPlanets_haumea_totalMonths"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Weeks</th>
                    <td><span id="totalAgeOnPlanets_haumea_totalWeeks"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Days</th>
                    <td><span id="totalAgeOnPlanets_haumea_totalDays"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Hours</th>
                    <td><span id="totalAgeOnPlanets_haumea_totalHours"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Minutes</th>
                    <td><span id="totalAgeOnPlanets_haumea_totalMinutes"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Seconds</th>
                    <td><span id="totalAgeOnPlanets_haumea_totalSeconds"></span></td>
                </tr>
            </table>
        </article>

        <article class="planet_data">
            <header><img loading="lazy" src="/static/images/planets/makemake.png" height="350" width="350"
                    alt="makemake Image"></header>
            <h3>Makemake</h3>
            <table class="striped">
                <tr class="mainTR">
                    <th>Age</th>
                    <td><span id="planetsAge_makemake_age"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Months</th>
                    <td><span id="totalAgeOnPlanets_makemake_totalMonths"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Weeks</th>
                    <td><span id="totalAgeOnPlanets_makemake_totalWeeks"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Days</th>
                    <td><span id="totalAgeOnPlanets_makemake_totalDays"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Hours</th>
                    <td><span id="totalAgeOnPlanets_makemake_totalHours"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Minutes</th>
                    <td><span id="totalAgeOnPlanets_makemake_totalMinutes"></span></td>
                </tr>
                <tr>
                    <th>Total Age in Seconds</th>
                    <td><span id="totalAgeOnPlanets_makemake_totalSeconds"></span></td>
                </tr>
            </table>
        </article>
    </div>
</article>
<article>
<h2>Famous People Born on <span class="thisDay"></span></h2>
<table id="famousPeopleTable">
    <thead>
        <tr>
            <th>Year</th>
            <th>Name</th>
            <th>Details</th>
        </tr>
    </thead>
    <tbody id="famousPeopleBody">
        <tr>
            <td colspan="3" class="loader-container">
                <span class="loader" aria-busy="true"></span>
            </td>
        </tr>
    </tbody>
</table>
</article>
<article>
<h2>Worldwide Events on <span class="thisDay"></span></h2>
<table id="worldwideEventsTable">
    <thead>
        <tr>
            <th>Year</th>
            <th>Event</th>
            <th>Details</th>
        </tr>
    </thead>
    <tbody id="worldwideEventsBody">
        <tr>
            <td colspan="3" class="loader-container">
                <span class="loader" aria-busy="true"></span>
            </td>
        </tr>
    </tbody>
</table>
</article>
<dialog id="happyBirthDayDialog">
<article>
  <header >
    <button aria-label="Close" id="closeIcon" rel="prev"></button>
    <p>
      <strong>🎉 Congratulations! Today is Your Birthday!</strong>
    </p>
  </header>
  <p>
    We want to wish you a fantastic birthday filled with joy, laughter, and unforgettable moments. May this special day bring you everything you've been wishing for and more.
  </p>
  <p>
    Happy Birthday!
  </p>
  <footer>
    <button id="close">
      Close
    </button>
  </footer>
</article>
</dialog>`

// add html element for function handle full Month Year Date
const HTMLFullMonthYearDate = `<div class="month-year-padding">
<article class="center_article center_article-border">
<hgroup>
    <h1><span id="updateHeading"></span></h1>
    <p><span id="updateDescription"></span></p>
</hgroup>
</article>

<article class="center_article center_article-border" id="monthList">
<button class="month outline" data-month="January">January</button>
<button class="month outline" data-month="February">February</button>
<button class="month outline" data-month="March">March</button>
<button class="month outline" data-month="April">April</button>
<button class="month outline" data-month="May">May</button>
<button class="month outline" data-month="June">June</button>
<button class="month outline" data-month="July">July</button>
<button class="month outline" data-month="August">August</button>
<button class="month outline" data-month="September">September</button>
<button class="month outline" data-month="October">October</button>
<button class="month outline" data-month="November">November</button>
<button class="month outline" data-month="December">December</button>
</article>

<table class="striped handleFullYear" id="January">
<thead>
    <tr>
        <th colspan="2">
            <h2 id="JanuaryHeading"></h2>
        </th>
    </tr>
</thead>
<tbody id="JanuaryTableBody">
    <!-- Data will be populated here -->
</tbody>
</table>

<table class="striped handleFullYear" id="February">
<thead>
    <tr>
        <th colspan="2">
            <h2 id="FebruaryHeading"></h2>
        </th>
    </tr>
</thead>
<tbody id="FebruaryTableBody">
    <!-- Data will be populated here -->
</tbody>
</table>

<table class="striped handleFullYear" id="March">
<thead>
    <tr>
        <th colspan="2">
            <h2 id="MarchHeading"></h2>
        </th>
    </tr>
</thead>
<tbody id="MarchTableBody">
    <!-- Data will be populated here -->
</tbody>
</table>

<table class="striped handleFullYear" id="April">
<thead>
    <tr>
        <th colspan="2">
            <h2 id="AprilHeading"></h2>
        </th>
    </tr>
</thead>
<tbody id="AprilTableBody">
    <!-- Data will be populated here -->
</tbody>
</table>

<table class="striped handleFullYear" id="May">
<thead>
    <tr>
        <th colspan="2">
            <h2 id="MayHeading"></h2>
        </th>
    </tr>
</thead>
<tbody id="MayTableBody">
    <!-- Data will be populated here -->
</tbody>
</table>

<table class="striped handleFullYear" id="June">
<thead>
    <tr>
        <th colspan="2">
            <h2 id="JuneHeading"></h2>
        </th>
    </tr>
</thead>
<tbody id="JuneTableBody">
    <!-- Data will be populated here -->
</tbody>
</table>

<table class="striped handleFullYear" id="July">
<thead>
    <tr>
        <th colspan="2">
            <h2 id="JulyHeading"></h2>
        </th>
    </tr>
</thead>
<tbody id="JulyTableBody">
    <!-- Data will be populated here -->
</tbody>
</table>

<table class="striped handleFullYear" id="August">
<thead>
    <tr>
        <th colspan="2">
            <h2 id="AugustHeading"></h2>
        </th>
    </tr>
</thead>
<tbody id="AugustTableBody">
    <!-- Data will be populated here -->
</tbody>
</table>

<table class="striped handleFullYear" id="September">
<thead>
    <tr>
        <th colspan="2">
            <h2 id="SeptemberHeading"></h2>
        </th>
    </tr>
</thead>
<tbody id="SeptemberTableBody">
    <!-- Data will be populated here -->
</tbody>
</table>

<table class="striped handleFullYear" id="October">
<thead>
    <tr>
        <th colspan="2">
            <h2 id="OctoberHeading"></h2>
        </th>
    </tr>
</thead>
<tbody id="OctoberTableBody">
    <!-- Data will be populated here -->
</tbody>
</table>

<table class="striped handleFullYear" id="November">
<thead>
    <tr>
        <th colspan="2">
            <h2 id="NovemberHeading"></h2>
        </th>
    </tr>
</thead>
<tbody id="NovemberTableBody">
    <!-- Data will be populated here -->
</tbody>
</table>

<table class="striped handleFullYear" id="December">
<thead>
    <tr>
        <th colspan="2">
            <h2 id="DecemberHeading"></h2>
        </th>
    </tr>
</thead>
<tbody id="DecemberTableBody">
    <!-- Data will be populated here -->
</tbody>
</table>

<article class="center_article center_article-border">
<spann id="faqTitle">
    <h2>FAQs</h2>
</spann>
<div id="questions">
    <!-- ADD FAQ DROPDOWN HERE -->
</div>
</article>
</div>`

const HTMLMonthDate = `<div class="month-year-padding">
<article class="center_article center_article-border">
<hgroup>
    <h1><span id="updateHeading"></span></h1>
    <p><span id="updateDescription"></span></p>
</hgroup>
</article>

<div class="center_article" id="monthTable">
<!-- Populate Full Month Table Here -->
<table class="striped handleFullMonthYear" id="Month">
<thead>
<tr>
<th colspan="2">
    <h2 id="MonthHeading"></h2>
</th>
</tr>
</thead>
<tbody id="MonthTableBody">
<!-- Data will be populated here -->
</tbody>
</table>
</div>
<article class="center_article center_article-border">
<spann id="faqTitle">
    <h2>FAQs</h2>
</spann>
<div id="questions">
    <!-- ADD FAQ DROPDOWN HERE -->
</div>
</article>
</div>`

function getTimeDetails(birthTime, currentTime) {
  const birthDate = new Date(birthTime);
  const currentDate = new Date(currentTime);

  // Calculate age in years
  let ageCalculatedYears = currentDate.getFullYear() - birthDate.getFullYear();
  let ageCalculatedMonths = currentDate.getMonth() - birthDate.getMonth();
  let ageCalculatedDays = currentDate.getDate() - birthDate.getDate();

  let ageCalculatedHours = currentDate.getHours() - birthDate.getHours();
  let ageCalculatedMinutes = currentDate.getMinutes() - birthDate.getMinutes();
  let ageCalculatedSeconds = currentDate.getSeconds() - birthDate.getSeconds();

  // Adjust for negative values
  if (ageCalculatedSeconds < 0) {
    ageCalculatedMinutes--;
    ageCalculatedSeconds += 60;
  }

  if (ageCalculatedMinutes < 0) {
    ageCalculatedHours--;
    ageCalculatedMinutes += 60;
  }

  if (ageCalculatedHours < 0) {
    ageCalculatedDays--;
    ageCalculatedHours += 24;
  }

  if (ageCalculatedDays < 0) {
    ageCalculatedMonths--;
    const daysInBirthMonth = new Date(
      birthDate.getFullYear(),
      birthDate.getMonth() + 1,
      0
    ).getDate();
    ageCalculatedDays += daysInBirthMonth;
  }

  if (ageCalculatedMonths < 0) {
    ageCalculatedYears--;
    ageCalculatedMonths += 12;
  }

  // Calculate total time intervals
  const totalMonths = ageCalculatedYears * 12 + ageCalculatedMonths;
  const totalDays = Math.floor((currentDate - birthDate) / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  // calculate remining day after calculating weeks using % operator with   const remainingWeeksDays 
  const remainingWeeksDays = totalDays % 7;
  // Calculate total hours, minutes, and seconds
  const totalHours = Math.floor((currentDate - birthDate) / (1000 * 60 * 60));
  const totalMinutes = Math.floor((currentDate - birthDate) / (1000 * 60));
  const totalSeconds = Math.floor((currentDate - birthDate) / 1000);

  // Return all details in an object
  return {
    birthDate: {
      years: birthDate.getFullYear(),
      months: birthDate.getMonth() + 1,
      days: birthDate.getDate(),
      hours: birthDate.getHours(),
      minutes: birthDate.getMinutes(),
      seconds: birthDate.getSeconds(),
      weekDay: weekDaysObject[birthDate.getDay()],
    },
    currentDate: {
      years: currentDate.getFullYear(),
      months: currentDate.getMonth() + 1,
      days: currentDate.getDate(),
      hours: currentDate.getHours(),
      minutes: currentDate.getMinutes(),
      seconds: currentDate.getSeconds(),
      weekDay: weekDaysObject[currentDate.getDay()],
    },
    ageCalculatedValues: {
      years: ageCalculatedYears,
      months: ageCalculatedMonths,
      days: ageCalculatedDays,
      hours: ageCalculatedHours,
      minutes: ageCalculatedMinutes,
      seconds: ageCalculatedSeconds,
      weekDayofBirth: weekDaysObject[birthDate.getDay()],
    },
    totalTimeInterval: {
      months: totalMonths,
      days: totalDays,
      weeks: `${totalWeeks} Weeks, ${remainingWeeksDays} Days`,
      hours: totalHours,
      minutes: totalMinutes,
      seconds: totalSeconds,
    },
  };
}


function calculateNextBirthdayRemaining(birthTime) {
  const currentTime = Date.now();
  const birthDate = new Date(birthTime);
  const currentDate = new Date(currentTime);

  // Calculate next birthday
  const nextBirthday = new Date(
    currentDate.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );
  if (currentDate > nextBirthday) {
    nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
  }

  // Calculate remaining time until next birthday
  const remainingTimeMillis = nextBirthday - currentDate;
  if (remainingTimeMillis < 0) {
    throw new Error("Invalid birth date provided");
  }

  // Calculate remaining days, months, hours, minutes, and seconds
  const remainingTime = new Date(remainingTimeMillis);
  const months = remainingTime.getUTCMonth();
  const days = remainingTime.getUTCDate() - 1;
  const hours = remainingTime.getUTCHours();
  const minutes = remainingTime.getUTCMinutes();
  const seconds = remainingTime.getUTCSeconds();

  // Get the week day of the next birthday
  const weekDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][nextBirthday.getDay()];

  return {
    weekDay: weekDay,
    months: months,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
}

const zodiacSigns = {
  Aries: {
    start: { month: 3, day: 21 },
    end: { month: 4, day: 19 },
    emoji: "\u2648", // ♈
  },
  Taurus: {
    start: { month: 4, day: 20 },
    end: { month: 5, day: 20 },
    emoji: "\u2649", // ♉
  },
  Gemini: {
    start: { month: 5, day: 21 },
    end: { month: 6, day: 20 },
    emoji: "\u264A", // ♊
  },
  Cancer: {
    start: { month: 6, day: 21 },
    end: { month: 7, day: 22 },
    emoji: "\u264B", // ♋
  },
  Leo: {
    start: { month: 7, day: 23 },
    end: { month: 8, day: 22 },
    emoji: "\u264C", // ♌
  },
  Virgo: {
    start: { month: 8, day: 23 },
    end: { month: 9, day: 22 },
    emoji: "\u264D", // ♍
  },
  Libra: {
    start: { month: 9, day: 23 },
    end: { month: 10, day: 22 },
    emoji: "\u264E", // ♎
  },
  Scorpio: {
    start: { month: 10, day: 23 },
    end: { month: 11, day: 21 },
    emoji: "\u264F", // ♏
  },
  Sagittarius: {
    start: { month: 11, day: 22 },
    end: { month: 12, day: 21 },
    emoji: "\u2650", // ♐
  },
  Capricorn: {
    start: { month: 12, day: 22 },
    end: { month: 1, day: 19 },
    emoji: "\u2651", // ♑
  },
  Aquarius: {
    start: { month: 1, day: 20 },
    end: { month: 2, day: 18 },
    emoji: "\u2652", // ♒
  },
  Pisces: {
    start: { month: 2, day: 19 },
    end: { month: 3, day: 20 },
    emoji: "\u2653", // ♓
  },
};
function getZodiacSign(birthDate) {
  const date = new Date(birthDate);
  const month = date.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month index
  const day = date.getDate();

  for (const sign in zodiacSigns) {
    const startMonth = zodiacSigns[sign].start.month;
    const startDay = zodiacSigns[sign].start.day;
    const endMonth = zodiacSigns[sign].end.month;
    const endDay = zodiacSigns[sign].end.day;

    if (
      (month === startMonth && day >= startDay) ||
      (month === endMonth && day <= endDay)
    ) {
      return { sign: sign, emoji: zodiacSigns[sign].emoji };
    }
  }

  return { sign: "Invalid date", emoji: "" };
}

// create function to convert age years,months,days to roman numerals and return the result in an object
// create function to convert age years,months,days to roman numerals and return the result in an object
function convertToRoman(years, months, days) {
  const romanNumerals = {
    1: "I",
    4: "IV",
    5: "V",
    9: "IX",
    10: "X",
    40: "XL",
    50: "L",
    90: "XC",
    100: "C",
    400: "CD",
    500: "D",
    900: "CM",
    1000: "M",
  };

  function toRoman(num) {
    let result = "";
    const keys = Object.keys(romanNumerals).reverse();

    for (let i = 0; i < keys.length; i++) {
      const key = parseInt(keys[i]);
      const value = romanNumerals[key];
      while (num >= key) {
        result += value;
        num -= key;
      }
    }

    return result;
  }

  let romanYears = toRoman(years);
  let romanMonths = toRoman(months);
  let romanDays = toRoman(days);

  // add if statement to check if roman numerals are empty so return 0 in place of emply
  if (romanYears === "") {
    romanYears = "0";
  }
  if (romanMonths === "") {
    romanMonths = "0";
  }
  if (romanDays === "") {
    romanDays = "0";
  }

  return {
    years: `${romanYears} Years`,
    months: `${romanMonths} Months`,
    days: `${romanDays} Days`,
  };
}

// Orbital periods of planets relative to Earth's year (in Earth years)
const orbitalPeriods = {
  mercury: 0.2408467,
  venus: 0.61519726,
  earth: 1,
  mars: 1.8808158,
  ceres: 4.6, // Orbital period of Ceres in Earth years
  jupiter: 11.862615,
  saturn: 29.447498,
  uranus: 84.016846,
  neptune: 164.79132,
  pluto: 247.92065, // Orbital period of Pluto in Earth years
  haumea: 283.28, // Orbital period of Haumea in Earth years
  makemake: 309.88, // Orbital period of Makemake in Earth years
  // eris: 557 // Orbital period of Eris in Earth years
};

const planetsImages = {
  "mercury": "https://nineplanets.org/wp-content/uploads/2019/09/mercury.png",
  "venus": "https://nineplanets.org/wp-content/uploads/2019/09/venus.png",
  "earth": "https://nineplanets.org/wp-content/uploads/2019/09/earth.png",
  "mars": "https://nineplanets.org/wp-content/uploads/2019/09/mars.png",
  "ceres": "https://nineplanets.org/wp-content/uploads/2019/09/ceres.png",
  "jupiter": "https://nineplanets.org/wp-content/uploads/2019/09/jupiter.png",
  "saturn": "https://nineplanets.org/wp-content/uploads/2019/09/saturn.png",
  "uranus": "https://nineplanets.org/wp-content/uploads/2019/09/uranus.png",
  "neptune": "https://nineplanets.org/wp-content/uploads/2019/09/neptune.png",
  "pluto": "https://nineplanets.org/wp-content/uploads/2019/09/pluto-1.png",
  "haumea": "https://nineplanets.org/wp-content/uploads/2019/09/haumea.png",
  "makemake": "https://nineplanets.org/wp-content/uploads/2019/09/makemake.png",
};

function calculateAgeOnPlanets(
  earthAgeYears,
  earthAgeMonths,
  earthAgeDays,
  earthAgeHours,
  earthAgeMinutes,
  earthAgeSeconds
) {
  const planetsAge = {};
  const totalAgeOnPlanets = {};
  const planetImages = {};

  const earthAgeInDays =
    earthAgeYears * 365 +
    earthAgeMonths * 30 +
    earthAgeDays +
    earthAgeHours / 24 +
    earthAgeMinutes / 1440 +
    earthAgeSeconds / 86400;

  for (const planet in orbitalPeriods) {
    const planetYearInDays = 365 * orbitalPeriods[planet];
    const planetAgeInDays = earthAgeInDays * (1 / orbitalPeriods[planet]);

    const years = Math.floor(planetAgeInDays / 365);
    const remainingDays = planetAgeInDays - years * 365;
    const months = Math.floor(remainingDays / 30);
    const days = Math.floor(remainingDays - months * 30);
    const hours = Math.floor((remainingDays - (days + months * 30)) * 24);
    const minutes = Math.floor(
      ((remainingDays - (days + months * 30)) * 24 - hours) * 60
    );
    const seconds = Math.floor(
      (((remainingDays - (days + months * 30)) * 24 - hours) * 60 - minutes) *
      60
    );

    planetsAge[planet] = {
      years: years,
      months: months,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };

    totalAgeOnPlanets[planet] = {
      totalYears: years,
      totalMonths: months + years * 12,
      totalWeeks:
        Math.floor(planetAgeInDays / 7) +
        (planetAgeInDays % 7 > 0 ? 1 : 0),
      totalDays: Math.floor(planetAgeInDays),
      totalHours: Math.floor(planetAgeInDays * 24),
      totalMinutes: Math.floor(planetAgeInDays * 24 * 60),
      totalSeconds: Math.floor(planetAgeInDays * 24 * 60 * 60),
    };

    planetImages[planet] = planetsImages[planet];
  }

  return {
    planetsAge,
    totalAgeOnPlanets,
    planetImages,
  };
}




// initealizing the values of earthAgeYears, earthAgeMonths, earthAgeDays, earthAgeHours, earthAgeMinutes, earthAgeSeconds from the result of getTimeDetails function.
// const earthAgeYears = result.ageCalculatedValues.years;
// const earthAgeMonths = result.ageCalculatedValues.months;
// const earthAgeDays = result.ageCalculatedValues.days;
// const earthAgeHours = result.ageCalculatedValues.hours;
// const earthAgeMinutes = result.ageCalculatedValues.minutes;
// const earthAgeSeconds = result.ageCalculatedValues.seconds;

function calculateInterestingFacts(birthDate, currentDate) {
  // Calculate age in years, months, days, hours, minutes, seconds
  const ageDetails = getTimeDetails(birthDate, currentDate);

  // Calculate heartbeats
  const heartbeatsPerMinute = 72; // Average resting heart rate in bpm
  const totalHeartbeats =
    ageDetails.totalTimeInterval.seconds * heartbeatsPerMinute;
  const heartbeatEnergy = 1.3; // Average energy per heartbeat (in joules)
  const totalHeartbeatEnergy = (totalHeartbeats * heartbeatEnergy) / 1000000000; // in gigajoules

  // Calculate blinks
  const blinksPerMinute = 15; // Average blinks per minute
  const totalBlinks = ageDetails.totalTimeInterval.seconds * blinksPerMinute;

  // Calculate sleep
  const sleepHoursPerDay = 8; // Average sleep hours per day
  const totalSleepHours = ageDetails.totalTimeInterval.days * sleepHoursPerDay;
  const totalSleepDays = totalSleepHours / 24;
  const totalSleepWeeks =
    Math.floor(totalSleepDays / 7) + (totalSleepDays % 7 > 0 ? 1 : 0);

  // Calculate breaths
  const breathsPerMinute = 14; // Average breaths per minute
  const totalBreaths = ageDetails.totalTimeInterval.seconds * breathsPerMinute;
  const oxygenConsumptionPerBreath = 0.5; // Average oxygen consumption per breath (in liters)
  const totalOxygenConsumed = totalBreaths * oxygenConsumptionPerBreath;

  // Calculate blood pumped
  const bloodPumpedPerHeartbeat = 0.07; // Average blood pumped per heartbeat (in liters)
  const totalBloodPumped =
    (totalHeartbeats * bloodPumpedPerHeartbeat) / 1000000; // in cubic meters

  // Calculate kidney filtration
  const kidneyFiltrationPerMinute = 125; // Average kidney filtration rate (in milliliters per minute)
  const totalKidneyFiltration =
    (ageDetails.totalTimeInterval.minutes * kidneyFiltrationPerMinute) /
    1000000; // in cubic meters
  const ureaProductionRate = 20; // Average urea production rate (in grams per day)
  const totalUreaProduced =
    ageDetails.totalTimeInterval.days * ureaProductionRate;

  // Calculate food consumption
  const averageFoodConsumptionPerDay = 2.5; // Average food consumption per day (in kilograms)
  const totalFoodConsumed =
    ageDetails.totalTimeInterval.days * averageFoodConsumptionPerDay;
  const averageCaloriesPerKg = 2000; // Average calorie content of food (in calories per kilogram)
  const totalCaloriesConsumed = totalFoodConsumed * averageCaloriesPerKg;

  // Calculate skin cell turnover
  const skinCellLifespan = 28; // Average skin cell lifespan (in days)
  const totalSkinCellTurnover = Math.floor(
    ageDetails.totalTimeInterval.days / skinCellLifespan
  );
  const skinCellsPerSquareMeter = 2000000; // Approximate number of skin cells per square meter
  const totalSkinCellsReplaced =
    totalSkinCellTurnover * skinCellsPerSquareMeter;

  // // Calculate body cell turnover
  // const bodyCompositionHalflife = 7; // Average body composition half-life (in years)
  // const totalBodyCellTurnover = Math.floor(
  //   ageDetails.ageCalculatedValues.years / bodyCompositionHalflife
  // );
  // const bodyCompositionCellCount = 37.2 * 10 ** 12; // Estimated total body cells
  // const totalBodyCellsReplaced =
  //   totalBodyCellTurnover * bodyCompositionCellCount;

  // Calculate distance traveled
  const averageWalkingSpeedPerDay = 5.205; // Average walking speed (in kilometers per day)
  const totalDistanceTraveled =
    ageDetails.totalTimeInterval.days * averageWalkingSpeedPerDay;
  const averageStepsPerDay = 7500; // Average steps taken per day
  const totalStepsTaken =
    ageDetails.totalTimeInterval.days * averageStepsPerDay;

  // Calculate calories burned
  const averageCaloriesPerDay = 2000; // Average calories burned per day
  const totalCaloriesBurned =
    ageDetails.totalTimeInterval.days * averageCaloriesPerDay;

  // Calculate water consumed
  const averageWaterConsumptionPerDay = 2.5; // Average water consumption per day (in liters)
  const totalWaterConsumed =
    ageDetails.totalTimeInterval.days * averageWaterConsumptionPerDay;

  // Calculate hair growth
  const averageHairGrowthPerMonth = 1.25; // Average hair growth per month (in centimeters)
  const totalHairGrowth =
    ageDetails.totalTimeInterval.months * averageHairGrowthPerMonth;

  // Calculate red blood cell turnover
  const redBloodCellLifespan = 120; // Average red blood cell lifespan (in days)
  const redBloodCellProductionPerDay = 2.4 * 10 ** 9; // 2.4 billion red blood cells produced per second
  const totalRedBloodCellsReplaced = Math.floor(
    ageDetails.totalTimeInterval.days / redBloodCellLifespan
  );
  const totalRedBloodCellsProduced =
    redBloodCellProductionPerDay * ageDetails.totalTimeInterval.seconds;
  const totalBloodProduced = totalRedBloodCellsProduced / (35 * 10 ** 12); // 35 trillion red blood cells per liter of blood

  // Calculate bone cell turnover
  const boneCellLifespan = 10; // Average bone cell lifespan (in years)
  const totalBoneCellTurnover = Math.floor(
    ageDetails.ageCalculatedValues.years / boneCellLifespan
  );
  const boneCellsPerSkeleton = 206 * 206 * 5000; // Estimated total bone cells (206 bones, 206 cells per bone, 5000 cells per cubic millimeter)
  const totalBoneCellsReplaced = totalBoneCellTurnover * boneCellsPerSkeleton;

  // Calculate liver cell turnover
  const liverCellLifespan = 300; // Average liver cell lifespan (in days)
  const totalLiverCellTurnover = Math.floor(
    ageDetails.totalTimeInterval.days / liverCellLifespan
  );
  const liverCellsPerOrgan = 100 * 10 ** 9; // Estimated total liver cells (100 billion)
  const totalLiverCellsReplaced = totalLiverCellTurnover * liverCellsPerOrgan;

  // Calculate intestinal cell turnover
  const intestinalCellLifespan = 3; // Average intestinal cell lifespan (in days)
  const totalIntestinalCellTurnover = Math.floor(
    ageDetails.totalTimeInterval.days / intestinalCellLifespan
  );
  const intestinalCellsPerOrgan = 100 * 10 ** 9; // Estimated total intestinal cells (100 billion)
  const totalIntestinalCellsReplaced =
    totalIntestinalCellTurnover * intestinalCellsPerOrgan;

  // Facts and details with explanations
  // Facts and details
  const facts = {
    totalHeartbeats: `${totalHeartbeats.toLocaleString()} Times`,
    totalHeartbeatEnergy: `${totalHeartbeatEnergy.toFixed(2)} gigajoules`,
    totalBlinks: `${totalBlinks.toLocaleString()} Times`,
    totalSleepHours: `${totalSleepHours.toLocaleString()} Hours`,
    totalSleepDays: `${totalSleepDays.toLocaleString()} Days`,
    totalSleepWeeks: `${totalSleepWeeks.toLocaleString()} Weeks`,
    totalBreaths: `${totalBreaths.toLocaleString()} Times`,
    totalOxygenConsumed: `${totalOxygenConsumed.toFixed(2)} liters`,
    totalBloodPumped: `${totalBloodPumped.toFixed(2)} cubic liters`,
    totalKidneyFiltration: `${totalKidneyFiltration.toFixed(2)} cubic liters`,
    totalUreaProduced: `${totalUreaProduced.toFixed(2)} grams`,
    totalFoodConsumed: `${totalFoodConsumed.toFixed(2)} kg`,
    totalCaloriesConsumed: `${totalCaloriesConsumed.toFixed(2)} calories`,
    totalSkinRegeneration: `${totalSkinCellTurnover} times`,
    totalSkinCellsReplaced: `${totalSkinCellsReplaced.toLocaleString()} Cells`,
    // totalBodyCellRenewal: `${totalBodyCellTurnover} times`,
    // totalBodyCellsReplaced: `${totalBodyCellsReplaced.toLocaleString()} Cells`,
    // totalBoneRegeneration: `${totalBoneCellTurnover} times`,
    // totalBoneCellsReplaced: `${totalBoneCellsReplaced.toLocaleString()} Cells`,
    totalLiverRegeneration: `${totalLiverCellTurnover} times`,
    totalLiverCellsReplaced: `${totalLiverCellsReplaced.toLocaleString()} Cells`,
    totalIntestinalRegeneration: `${totalIntestinalCellTurnover} times`,
    totalIntestinalCellsReplaced: `${totalIntestinalCellsReplaced.toLocaleString()} Cells`,
    totalDistanceTraveled: `${totalDistanceTraveled.toLocaleString()} km`,
    totalStepsTaken: `${totalStepsTaken.toLocaleString()} Steps`,
    totalCaloriesBurned: `${totalCaloriesBurned.toLocaleString()} calories`,
    totalWaterConsumed: `${totalWaterConsumed.toLocaleString()} liters`,
    totalHairGrowth: `${totalHairGrowth.toFixed(2)} cm`,
    totalRedBloodCellsReplaced: `${totalRedBloodCellsReplaced.toLocaleString()} times`,
    totalRedBloodCellsProduced: `${totalRedBloodCellsProduced.toLocaleString()} RBC`,
    totalBloodProduced: `${totalBloodProduced.toFixed(2)} liters`,
  };

  return facts;
}

function getCalendarDates(birthDate, currentDate, age) {
  const calendars = {
    gregory: "gregory",
    buddhist: "buddhist",
    chinese: "chinese",
    coptic: "coptic",
    ethiopia: "ethiopia",
    hebrew: "hebrew",
    indian: "indian",
    islamic: "islamic",
    // "islamic-umalqura": "islamic-umalqura",
    japanese: "japanese",
    persian: "persian",
    roc: "roc",
  };

  const calendarDates = {};

  for (const calendar in calendars) {
    const formatter = new Intl.DateTimeFormat(
      "en-US-u-ca-" + calendars[calendar],
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );

    const birthDateFormatted = formatter.format(
      new Date(birthDate.year, birthDate.month - 1, birthDate.day)
    );
    const currentDateFormatted = formatter.format(
      new Date(currentDate.year, currentDate.month - 1, currentDate.day)
    );

    const numericFormatter = new Intl.DateTimeFormat(
      "en-US-u-ca-" + calendars[calendar],
      {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }
    );

    const birthDateNumericFormatted = numericFormatter.format(
      new Date(birthDate.year, birthDate.month - 1, birthDate.day)
    );
    const currentDateNumericFormatted = numericFormatter.format(
      new Date(currentDate.year, currentDate.month - 1, currentDate.day)
    );

    const ageFormatted = formatter.format(
      new Date(
        currentDate.year - age.years,
        currentDate.month - age.months - 1,
        currentDate.day - age.days
      )
    );

    const ageNumericFormatted = numericFormatter.format(
      new Date(
        currentDate.year - age.years,
        currentDate.month - age.months - 1,
        currentDate.day - age.days
      )
    );

    calendarDates[calendar] = {
      birthDate: birthDateFormatted,
      birthDateInNumerical: birthDateNumericFormatted,
      currentDate: currentDateFormatted,
      currentDateInNumerical: currentDateNumericFormatted,
      age: ageFormatted,
      ageInNumerical: ageNumericFormatted,
    };
  }

  return calendarDates;
}

async function fetchDataOnThisDay(birthDate) {
  try {
    // Fetch famous people born on the same day using Wikimedia API
    const fetchBirthResponse = await fetch(
      `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/births/${birthDate.month}/${birthDate.day}`
    );
    const birthData = await fetchBirthResponse.json();

    // Fetch events on the same day using Wikimedia API
    const fetchEventsResponse = await fetch(
      `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/events/${birthDate.month}/${birthDate.day}`
    );
    const eventsData = await fetchEventsResponse.json();

    return {
      famousPeople: birthData,
      worldwideEvents: eventsData, // Rename localEvents to worldwideEvents
    };
  } catch (error) {
    console.error("Error fetching on this day data:", error);
    throw error;
  }
}


// Function to populate tables with fetched data
async function populateTables(birthDate) {
  try {
    const loaderSpans = document.querySelectorAll('.loader');
    loaderSpans.forEach(span => span.style.display = 'block'); // Show loader

    const data = await fetchDataOnThisDay(birthDate);

    populateTable(data.famousPeople.births, 'famousPeopleBody', 'famousPeopleTable');
    populateTable(data.worldwideEvents.events, 'worldwideEventsBody', 'worldwideEventsTable');

    // Hide loader after data is fetched
    loaderSpans.forEach(span => span.style.display = 'none');
  } catch (error) {
    console.error("Error populating tables:", error);
  }
}

// Function to populate a table body with data
function populateTable(data, tbodyId, tableId) {
  const tbody = document.getElementById(tbodyId);
  tbody.innerHTML = ''; // Clear existing content

  data.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
          <td>${item.year}</td>
          <td>${item.text}</td>
          <td>
              ${item.pages && item.pages.length > 0 ?
        `<a href="https://en.wikipedia.org/wiki/${item.pages[0].title}" target="_blank" rel="nofollow noopener noreferrer" class="details-link">
                      Details
                  </a>` :
        ''
      }
          </td>
      `;
    tbody.appendChild(row);
  });

  const table = document.getElementById(tableId);
  table.style.display = 'block'; // Show the table
}



function populatePlanetData(planetData) {
  // Loop through each planet
  for (const planet in planetData.planetsAge) {
    const planetAge = planetData.planetsAge[planet];
    const totalAge = planetData.totalAgeOnPlanets[planet];

    // Find the article elements
    const planetArticles = document.querySelectorAll('.planet_data');

    // Loop through each article to find the one corresponding to the current planet
    planetArticles.forEach(article => {
      const h3 = article.querySelector('h3');
      if (h3 && h3.textContent.trim().toLowerCase() === planet.toLowerCase()) {
        // Populate age data
        article.querySelector(`#planetsAge_${planet}_age`).textContent = `${planetAge.years} Years, ${planetAge.months} Months, ${planetAge.days} Days, ${planetAge.hours}h : ${planetAge.minutes}m : ${planetAge.seconds}s`;

        // Populate total age data
        // article.querySelector(`#totalAgeOnPlanets_${planet}_totalYears`).textContent = `${totalAge.totalYears} Years`;
        article.querySelector(`#totalAgeOnPlanets_${planet}_totalMonths`).textContent = `${totalAge.totalMonths} Months`;
        article.querySelector(`#totalAgeOnPlanets_${planet}_totalWeeks`).textContent = `${totalAge.totalWeeks} Weeks`;
        article.querySelector(`#totalAgeOnPlanets_${planet}_totalDays`).textContent = `${totalAge.totalDays} Days`;
        article.querySelector(`#totalAgeOnPlanets_${planet}_totalHours`).textContent = `${totalAge.totalHours} Hours`;
        article.querySelector(`#totalAgeOnPlanets_${planet}_totalMinutes`).textContent = `${totalAge.totalMinutes} Minutes`;
        article.querySelector(`#totalAgeOnPlanets_${planet}_totalSeconds`).textContent = `${totalAge.totalSeconds} Seconds`;
      }
    });
  }
}

// Call the function with the provided planet data object


// Call All Functions and Show Result in object






// Main function
function handleFullYearDate(birthTime, currentTime) {
  const cleanUrl = new URL(window.location.href).origin + new URL(window.location.href).pathname;
  // Populet HTML using Div id "root"
  document.getElementById('root').innerHTML = HTMLFullYearDate;

  // Set the value of the birthDate input field
  const birthDateInput = document.getElementById("birthDateInput");
  birthDateInput.value = formatDateForInput(birthTime);

  // Set the value of the currentDate input field
  const currentDateInput = document.getElementById("curruntDateInput");
  currentDateInput.value = formatDateForInput(new Date(currentTime));




  const nextBirthdayRemaining = calculateNextBirthdayRemaining(birthTime);
  // console.log(nextBirthdayRemaining);

  const result = getTimeDetails(birthTime, currentTime);
  // console.log(result);

  const zodiacSign = getZodiacSign(birthTime);
  // console.log("Zodiac Sign:", zodiacSign);

  // call the convertToRoman function to covnert birthDate in roman Noumbers
  const birthDateToRomanNumerals = convertToRoman(
    result.birthDate.years,
    result.birthDate.months,
    result.birthDate.days
  );
  // console.log(birthDateToRomanNumerals);

  // call function that convert current Date in roman Noumbers
  const currentDateToRomanNumerals = convertToRoman(
    result.currentDate.years,
    result.currentDate.months,
    result.currentDate.days
  );

  // console.log("Birth Date:", birthDateToRomanNumerals);

  // call the convertToRoman function to convert age in roman Noumbers
  const ageInRomanNumerals = convertToRoman(
    result.ageCalculatedValues.years,
    result.ageCalculatedValues.months,
    result.ageCalculatedValues.days
  );
  // console.log("Age in Roman Numerals:", ageInRomanNumerals);

  // while calling function adding actual value from result object not other constant
  const ageInDifferentPlanets = calculateAgeOnPlanets(
    result.ageCalculatedValues.years,
    result.ageCalculatedValues.months,
    result.ageCalculatedValues.days,
    result.ageCalculatedValues.hours,
    result.ageCalculatedValues.minutes,
    result.ageCalculatedValues.seconds
  );

  // console.log("Age on Different Planets:", ageInDifferentPlanets);

  const interestingFacts = calculateInterestingFacts(birthTime, currentTime);
  // console.log(interestingFacts);

  // Example usage
  const birthDateForCalendarDates = {
    year: result.birthDate.years,
    month: result.birthDate.months,
    day: result.birthDate.days,
  };

  const currentDateForCalendarDates = {
    year: result.currentDate.years,
    month: result.currentDate.months,
    day: result.currentDate.days,
  };

  const ageForCalendarDates = {
    years: result.ageCalculatedValues.years,
    months: result.ageCalculatedValues.months,
    days: result.ageCalculatedValues.days,
  };

  const calendarDates = getCalendarDates(
    birthDateForCalendarDates,
    currentDateForCalendarDates,
    ageForCalendarDates
  );
  // console.log(calendarDates);

  // Call the fetchDataOnThisDay function
  const birthDataPromise = fetchDataOnThisDay(birthDateForCalendarDates);
  console.log(birthDataPromise);

  //
  //
  // HTML Dom Manupulation Code
  //
  //

  // after dom content loaded use query selector all to select elements with class "dateInput" and add event listner if any change in them just add display block in .calculateButton class

  // Main SEO Templates
  const titleTemplate = `How old am I if I was born on ${monthsObject[result.birthDate.months]} ${result.birthDate.days}, ${result.birthDate.years}?`;
  const descriptionTemplate = `You were      born on ${result.birthDate.weekDay}, ${monthsObject[result.birthDate.months]
    } ${result.birthDate.days}, ${result.birthDate.years}, so you are currently ${result.ageCalculatedValues.years
    } years, ${result.ageCalculatedValues.months} months, and ${result.ageCalculatedValues.days
    } days old. Your next birthday is in ${nextBirthdayRemaining.months
    } months and ${nextBirthdayRemaining.days} days.`;

  // update seo
  document.title = titleTemplate;
  document
    .querySelector('meta[name="description"]')
    .setAttribute("content", descriptionTemplate);

  // create code to get id name "birthDateTitle" from document and populate with BirthDate in Month dd, yyyy format
  document.getElementById("birthDateTitle").innerHTML = titleTemplate;

  // create code to get id name  "birthDateDescription" from Document and populate with answer for question  <h1>How old am I if i was born in <span id="birthDateTitle"></span></h1>
  document.getElementById("birthDateDescription").innerHTML = descriptionTemplate;

  // adding birthMonth and BirthDate in thisDay id <span class="thisDay"></span> and use this template `${monthsObject[result.birthDate.months]} ${birthDay}` and for all class use queryselector all
  document.querySelectorAll(".thisDay").forEach((element) => {
    element.innerHTML = `${monthsObject[result.birthDate.months]} ${result.birthDate.days}`;
  });




  // now updating main table reuslt table

  document.getElementById("tableBirthDate").textContent = `${monthsObject[result.birthDate.months]
    } ${result.birthDate.days}, ${result.birthDate.years}, ${result.ageCalculatedValues.weekDayofBirth
    }`;
  document.getElementById("ageFromDate").textContent = `${monthsObject[result.currentDate.months]
    } ${result.currentDate.days}, ${result.currentDate.years}, ${result.currentDate.weekDay
    }`;
  document.getElementById(
    "age"
  ).textContent = `${result.ageCalculatedValues.years} Years, ${result.ageCalculatedValues.months} Months, ${result.ageCalculatedValues.days} Days`;
  document.getElementById("birthWeekDay").textContent =
    result.ageCalculatedValues.weekDayofBirth;
  document.getElementById(
    "nextBirthDay"
  ).textContent = `${nextBirthdayRemaining.months} Months, ${nextBirthdayRemaining.days} Days`;
  document.getElementById(
    "zodiacSign"
  ).textContent = `${zodiacSign.sign} ${zodiacSign.emoji}`;
  document.getElementById(
    "ageMonths"
  ).textContent = `${result.totalTimeInterval.months} Months, ${result.ageCalculatedValues.days} Days`;
  document.getElementById(
    "ageWeeks"
  ).textContent = `${result.totalTimeInterval.weeks}`;
  document.getElementById(
    "ageDays"
  ).textContent = `${result.totalTimeInterval.days} Days`;
  document.getElementById(
    "ageHours"
  ).textContent = `${result.totalTimeInterval.hours} Hours`;
  document.getElementById(
    "ageMinutes"
  ).textContent = `${result.totalTimeInterval.minutes} Minutes`;
  document.getElementById(
    "ageSeconds"
  ).textContent = `${result.totalTimeInterval.seconds} Seconds`;

  // Populate ids birthDateRoman, currentDateRoman, ageRoman to add inner text age in roman document
  document.getElementById(
    "birthDateRoman"
  ).textContent = `${birthDateToRomanNumerals.years}, ${birthDateToRomanNumerals.months}, ${birthDateToRomanNumerals.days}`;
  document.getElementById(
    "currentDateRoman"
  ).textContent = `${currentDateToRomanNumerals.years}, ${currentDateToRomanNumerals.months}, ${currentDateToRomanNumerals.days}`;
  document.getElementById(
    "ageRoman"
  ).textContent = `${ageInRomanNumerals.years}, ${ageInRomanNumerals.months}, ${ageInRomanNumerals.days}`;

  // Populate interesting facts in the table
  for (const [key, value] of Object.entries(interestingFacts)) {
    document.getElementById(key).textContent = value;
  }

  // Loop through calendarDates object and update corresponding HTML elements
  for (const [calendar, dates] of Object.entries(calendarDates)) {
    for (const [key, value] of Object.entries(dates)) {
      const elementId = `${calendar}_${key}`;
      const element = document.getElementById(elementId);
      if (element) {
        element.textContent = value;
      }
    }
  }

  // Function to update age counter every second
  function updateAgeCounter() {
    const liveAgeCounterElement = document.getElementById("liveAgeCounter");
    if (liveAgeCounterElement) {
      setInterval(() => {
        result.ageCalculatedValues.seconds++;
        if (result.ageCalculatedValues.seconds >= 60) {
          result.ageCalculatedValues.seconds = 0;
          result.ageCalculatedValues.minutes++;
          if (result.ageCalculatedValues.minutes >= 60) {
            result.ageCalculatedValues.minutes = 0;
            result.ageCalculatedValues.hours++;
            if (result.ageCalculatedValues.hours >= 24) {
              result.ageCalculatedValues.hours = 0;
              result.ageCalculatedValues.days++;
              // Adjust months and years if necessary
              if (result.ageCalculatedValues.days >= 30) {
                result.ageCalculatedValues.days = 0;
                result.ageCalculatedValues.months++;
                if (result.ageCalculatedValues.months >= 12) {
                  result.ageCalculatedValues.months = 0;
                  result.ageCalculatedValues.years++;
                }
              }
            }
          }
        }
        // Format time values with leading zeros if necessary
        const hoursFormatted =
          result.ageCalculatedValues.hours < 10
            ? `0${result.ageCalculatedValues.hours}`
            : result.ageCalculatedValues.hours;
        const minutesFormatted =
          result.ageCalculatedValues.minutes < 10
            ? `0${result.ageCalculatedValues.minutes}`
            : result.ageCalculatedValues.minutes;
        const secondsFormatted =
          result.ageCalculatedValues.seconds < 10
            ? `0${result.ageCalculatedValues.seconds}`
            : result.ageCalculatedValues.seconds;
        liveAgeCounterElement.innerHTML = `${result.ageCalculatedValues.years} Years, ${result.ageCalculatedValues.months} Months, ${result.ageCalculatedValues.days} Days , ${hoursFormatted}h : ${minutesFormatted}m : <span class="red">${secondsFormatted}s</span>`;
        ;
      }, 1000);
    }
  }

  // Function to update next birthday countdown every second
  function updateNextBirthdayCountdown() {
    const nextBirthDayCountDownElement = document.getElementById(
      "nextBirthDayCountDown"
    );
    if (nextBirthDayCountDownElement) {
      setInterval(() => {
        nextBirthdayRemaining.seconds--;
        if (nextBirthdayRemaining.seconds < 0) {
          nextBirthdayRemaining.seconds = 59;
          nextBirthdayRemaining.minutes--;
          if (nextBirthdayRemaining.minutes < 0) {
            nextBirthdayRemaining.minutes = 59;
            nextBirthdayRemaining.hours--;
            if (nextBirthdayRemaining.hours < 0) {
              nextBirthdayRemaining.hours = 23;
              nextBirthdayRemaining.days--;
              // Adjust months if necessary
              if (nextBirthdayRemaining.days < 0) {
                nextBirthdayRemaining.days = 30; // Assuming a month has 30 days
                nextBirthdayRemaining.months--;
                if (nextBirthdayRemaining.months < 0) {
                  nextBirthdayRemaining.months = 11; // Assuming a year has 12 months
                }
              }
            }
          }
        }
        // Format time values with leading zeros if necessary
        const hoursFormatted =
          nextBirthdayRemaining.hours < 10
            ? `0${nextBirthdayRemaining.hours}`
            : nextBirthdayRemaining.hours;
        const minutesFormatted =
          nextBirthdayRemaining.minutes < 10
            ? `0${nextBirthdayRemaining.minutes}`
            : nextBirthdayRemaining.minutes;
        const secondsFormatted =
          nextBirthdayRemaining.seconds < 10
            ? `0${nextBirthdayRemaining.seconds}`
            : nextBirthdayRemaining.seconds;
        nextBirthDayCountDownElement.innerHTML = `${nextBirthdayRemaining.months} Months, ${nextBirthdayRemaining.days} Days, ${hoursFormatted}h : ${minutesFormatted}m : <span class="red">${secondsFormatted}s</span>`;
      }, 1000);
    }
  }


  updateAgeCounter();
  updateNextBirthdayCountdown();

  // Call the function to populate tables
  populateTables(birthDateForCalendarDates);

  //
  populatePlanetData(ageInDifferentPlanets)


// Function to handle input change
function handleInputChange() {
    const mainInputButtons = document.getElementById("mainInputButtons");
    mainInputButtons.style.display = "block"; // Show the buttons when there's a change in input
}

 // Function to handle the Calculate button click
 function handleCalculateButtonClick() {
  const birthDateInput = document.getElementById("birthDateInput").value;
  const currentDateInput = document.getElementById("curruntDateInput").value;

  // Construct the URL with birthdate and currentdate parameters
  const params = new URLSearchParams({ birthdate: birthDateInput, currentdate: currentDateInput });
  const url = `${cleanUrl}#${params.toString()}`;

  // Set the URL in the address bar
  window.history.pushState({}, '', url);

  // Force page reload
  window.location.reload();
}

// Function to handle the Reset button click
function handleResetButtonClick() {
  // Reload the page without any parameters
  window.location.href = cleanUrl;
}

// Function to handle the Reset button click
function handleResetButtonClick() {
    // Reload the page without any parameters
    window.location.href = window.location.pathname;
}

// Add event listeners to the input fields and buttons
document.getElementById("birthDateInput").addEventListener("change", handleInputChange);
document.getElementById("curruntDateInput").addEventListener("change", handleInputChange);
document.getElementById("calculateButton").addEventListener("click", handleCalculateButtonClick);
document.getElementById("resetButton").addEventListener("click", handleResetButtonClick);

// Check if today is the user's birthday
const isBirthday =
result.birthDate.months === result.currentDate.months &&
result.birthDate.days === result.currentDate.days;

// Get the birthday dialog element
const birthdayDialog = document.getElementById('happyBirthDayDialog');

// If today is the user's birthday, show the dialog
if (isBirthday) {
birthdayDialog.showModal();
}

// Add event listener to the close button
const closeButton = birthdayDialog.querySelector('#close');
closeButton.addEventListener('click', () => {
birthdayDialog.close();
});
const closeIcon = birthdayDialog.querySelector('#closeIcon');
closeIcon.addEventListener('click', () => {
birthdayDialog.close();
});

}

// Function to handle when only birth year is provided
// function handleYearDate(year, currentTime) {
//   const months = [
//     { index: 0, name: "January", days: 31 },
//     { index: 1, name: "February", days: 28 },
//     { index: 2, name: "March", days: 31 },
//     { index: 3, name: "April", days: 30 },
//     { index: 4, name: "May", days: 31 },
//     { index: 5, name: "June", days: 30 },
//     { index: 6, name: "July", days: 31 },
//     { index: 7, name: "August", days: 31 },
//     { index: 8, name: "September", days: 30 },
//     { index: 9, name: "October", days: 31 },
//     { index: 10, name: "November", days: 30 },
//     { index: 11, name: "December", days: 31 },
//   ];

//   // Check for leap years and update February days
//   if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
//     months[1].days = 29;
//   }

//   const currentDate = new Date(currentTime);
//   const result = {};

//   for (let i = 0; i < 12; i++) {
//     const monthName = months[i].name;
//     result[monthName] = {};

//     for (let j = 1; j <= months[i].days; j++) {
//       const birthDate = new Date(year, i, j, 0, 0, 0, 0);

//       // Calculate age
//       let ageCalculatedYears = currentDate.getFullYear() - birthDate.getFullYear();
//       let ageCalculatedMonths = currentDate.getMonth() - birthDate.getMonth();
//       let ageCalculatedDays = currentDate.getDate() - birthDate.getDate();
//       let ageCalculatedHours = currentDate.getHours() - birthDate.getHours();
//       let ageCalculatedMinutes = currentDate.getMinutes() - birthDate.getMinutes();
//       let ageCalculatedSeconds = currentDate.getSeconds() - birthDate.getSeconds();

//       // Adjust for negative values
//       if (ageCalculatedSeconds < 0) {
//         ageCalculatedMinutes--;
//         ageCalculatedSeconds += 60;
//       }
//       if (ageCalculatedMinutes < 0) {
//         ageCalculatedHours--;
//         ageCalculatedMinutes += 60;
//       }
//       if (ageCalculatedHours < 0) {
//         ageCalculatedDays--;
//         ageCalculatedHours += 24;
//       }
//       if (ageCalculatedDays < 0) {
//         ageCalculatedMonths--;
//         const tempDate = new Date(birthDate);
//         tempDate.setMonth(tempDate.getMonth() + 1);
//         ageCalculatedDays += Math.floor((currentDate - tempDate) / (1000 * 60 * 60 * 24));
//       }
//       if (ageCalculatedMonths < 0) {
//         ageCalculatedYears--;
//         ageCalculatedMonths += 12;
//       }

//         // Calculate total time intervals
//         const totalMonths = ageCalculatedYears * 12 + ageCalculatedMonths;
//         const totalWeeks = Math.floor(totalMonths / 4);
//         const totalDays = Math.floor(totalMonths * 30.34)
//         const totalHours = Math.floor(totalDays * 24)
//         const totalMinutes = Math.floor(totalHours * 60)
//         const totalSeconds = Math.floor(totalMinutes * 60)


//       result[monthName][j] = {
//         // birthdate fromat is Month Name Date Numerical, Year Numerical and Week Day Name
//       birthdate: birthDate.toLocaleDateString('en-US', {
//         weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'}),
//         age: {
//           years: ageCalculatedYears,
//           months: ageCalculatedMonths,
//           days: ageCalculatedDays,
//           hours: ageCalculatedHours,
//           minutes: ageCalculatedMinutes,
//           seconds: ageCalculatedSeconds,
//           totalMonths: totalMonths,
//           totalWeeks: totalWeeks,
//           totalDays: totalDays,
//           totalHours: totalHours,
//           totalMinutes: totalMinutes,
//           totalSeconds: totalSeconds
//         },
//       };
//     }
//   }

//   return result;
// }



function handleYearDate(year, currentTime) {
  // first populating html using root id in document
  document.getElementById("root").innerHTML = HTMLFullMonthYearDate;
  const months = [
    { index: 0, name: "January", days: 31 },
    { index: 1, name: "February", days: 28 },
    { index: 2, name: "March", days: 31 },
    { index: 3, name: "April", days: 30 },
    { index: 4, name: "May", days: 31 },
    { index: 5, name: "June", days: 30 },
    { index: 6, name: "July", days: 31 },
    { index: 7, name: "August", days: 31 },
    { index: 8, name: "September", days: 30 },
    { index: 9, name: "October", days: 31 },
    { index: 10, name: "November", days: 30 },
    { index: 11, name: "December", days: 31 },
  ];

  // Check for leap years and update February days
  if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
    months[1].days = 29;
  }

  const currentDate = new Date(currentTime);
  const result = {};

  for (let i = 0; i < 12; i++) {
    const monthName = months[i].name;
    result[monthName] = {};

    let tableHTML = '';

    for (let j = 1; j <= months[i].days; j++) {
      const birthDate = new Date(year, i, j, 0, 0, 0, 0);
      const formattedBirthdate = `${year}-${(i + 1).toString().padStart(2, '0')}-${j.toString().padStart(2, '0')}`;

      // Calculate age
      let ageCalculatedYears = currentDate.getFullYear() - birthDate.getFullYear();
      let ageCalculatedMonths = currentDate.getMonth() - birthDate.getMonth();
      let ageCalculatedDays = currentDate.getDate() - birthDate.getDate();
      let ageCalculatedHours = currentDate.getHours() - birthDate.getHours();
      let ageCalculatedMinutes = currentDate.getMinutes() - birthDate.getMinutes();
      let ageCalculatedSeconds = currentDate.getSeconds() - birthDate.getSeconds();

      // Adjust for negative values
      if (ageCalculatedSeconds < 0) {
        ageCalculatedMinutes--;
        ageCalculatedSeconds += 60;
      }
      if (ageCalculatedMinutes < 0) {
        ageCalculatedHours--;
        ageCalculatedMinutes += 60;
      }
      if (ageCalculatedHours < 0) {
        ageCalculatedDays--;
        ageCalculatedHours += 24;
      }
      if (ageCalculatedDays < 0) {
        ageCalculatedMonths--;
        const daysInBirthMonth = new Date(
          birthDate.getFullYear(),
          birthDate.getMonth() + 1,
          0
        ).getDate();
        ageCalculatedDays += daysInBirthMonth;
      }
      if (ageCalculatedMonths < 0) {
        ageCalculatedYears--;
        ageCalculatedMonths += 12;
      }

      // Calculate total time intervals
      const totalMonths = ageCalculatedYears * 12 + ageCalculatedMonths;
      const totalDays = Math.floor((currentDate - birthDate) / (1000 * 60 * 60 * 24));
      const totalWeeks = Math.floor(totalDays / 7);
      const totalHours = Math.floor((currentDate - birthDate) / (1000 * 60 * 60));
      const totalMinutes = Math.floor((currentDate - birthDate) / (1000 * 60));
      const totalSeconds = Math.floor((currentDate - birthDate) / 1000);

      const formattedBirthdateDisplay = birthDate.toLocaleDateString('en-US', {
        weekday: 'short',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });

      result[monthName][j] = {
        id: formattedBirthdate,
        birthdate: formattedBirthdateDisplay,
        age: {
          years: ageCalculatedYears,
          months: ageCalculatedMonths,
          days: ageCalculatedDays,
          hours: ageCalculatedHours,
          minutes: ageCalculatedMinutes,
          seconds: ageCalculatedSeconds,
          totalMonths: totalMonths,
          totalWeeks: totalWeeks,
          totalDays: totalDays,
          totalHours: totalHours,
          totalMinutes: totalMinutes,
          totalSeconds: totalSeconds,
        },
      };

      tableHTML += `
        <tr>
          <th><a class="monthTableDataLink" href="${url}?birthdate=${formattedBirthdate}">${formattedBirthdateDisplay}</a></th>
          <td><b>${ageCalculatedYears} Years, ${ageCalculatedMonths} Months, ${ageCalculatedDays} Days</b>
            <br>
            <small>or <b>${totalMonths}</b> months, or <b>${totalWeeks}</b> weeks, or <b>${totalDays}</b> days, or <b>${totalHours}</b> hours, or <b>${totalMinutes}</b> minutes, or <b>${totalSeconds}</b> seconds</small>
          </td>
        </tr>
      `;
    }

    // Populate the table body in the HTML
    const monthTableBody = document.getElementById(`${monthName}TableBody`);
    if (monthTableBody) {
      monthTableBody.innerHTML = tableHTML;
    }

    // populat title
    // Populate the h2 element for table
    const monthHeading = document.getElementById(`${monthName}Heading`);
    if (monthHeading) {
      monthHeading.innerHTML = `<a class="monthTableHeading" href="${url}?birthdate=${year}-${(i + 1).toString().padStart(2, '0')}">How old am I, if I was born in ${monthName}, ${year}?</a>`;
    }

    const title = `How old am I if I was born in ${year}?`;

    document.title = title;

    // custruct description
    const birthDateFirst = new Date(result[Object.keys(result)[0]][1].id);
    const birthDateLast = new Date(result[Object.keys(result).slice(-1)[0]][Object.keys(result[Object.keys(result).slice(-1)[0]]).length].id);

    const currentYear = new Date().getFullYear();
    const firstYearDiff = currentYear - birthDateFirst.getFullYear();
    const lastYearDiff = firstYearDiff - 1;
    descYears = `${lastYearDiff} or ${firstYearDiff} years`;

    const description = `If you were born between January 1, ${year} and December 31, ${year}, so currently you are ${descYears} old.`;

    document.querySelector('meta[name="description"]').setAttribute('content', description);

    document.getElementById('updateHeading').textContent = title;
    document.getElementById('updateDescription').textContent = description;

    // adding scroll functionality in buttons
    document.querySelectorAll('.month').forEach(item => {
      item.addEventListener('click', event => {
        const month = event.target.dataset.month;
        const targetTable = document.getElementById(month);
        if (targetTable) {
          const tablePosition = targetTable.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: tablePosition - 40, // Adjust for space above the table
            behavior: 'smooth'
          });
        }
      });
    });

    // generate FAQS
    const yearDiff = currentYear - year;
    const faqYearDiff = `How many years from current year? ${yearDiff}`;

    const januaryFirstData = result["January"][1];
    const januaryFirstBirthDate = januaryFirstData.birthdate;
    const januaryFirstAge = januaryFirstData.age;
    const januaryFirstTotalYears = januaryFirstAge.years;
    const januaryFirstTotalMonths = januaryFirstAge.totalMonths;
    const januaryFirstTotalWeeks = januaryFirstAge.totalWeeks;
    const januaryFirstTotalDays = januaryFirstAge.totalDays;
    const januaryFirstTotalHours = januaryFirstAge.totalHours;
    const januaryFirstTotalMinutes = januaryFirstAge.totalMinutes;
    const januaryFirstTotalSeconds = januaryFirstAge.totalSeconds;

    const faqData = [
      { id: 1, question: `How many years old are you if you were born in ${year}?`, answer: `If you were born in ${year}, you are currently ${januaryFirstTotalYears} years old.` },
      { id: 2, question: `How many months old are you if you were born in ${year}?`, answer: `If you were born in ${year}, you are currently ${januaryFirstTotalMonths} months old.` },
      { id: 3, question: `How many weeks old are you if you were born in ${year}?`, answer: `If you were born in ${year}, you are currently ${januaryFirstTotalWeeks} weeks old.` },
      { id: 4, question: `How many days old are you if you were born in ${year}?`, answer: `If you were born in ${year}, you are currently ${januaryFirstTotalDays} days old.` },
      { id: 5, question: `How many hours old are you if you were born in ${year}?`, answer: `If you were born in ${year}, you are currently ${januaryFirstTotalHours} hours old.` },
      { id: 6, question: `How many minutes old are you if you were born in ${year}?`, answer: `If you were born in ${year}, you are currently ${januaryFirstTotalMinutes} minutes old.` },
      { id: 7, question: `How many seconds old are you if you were born in ${year}?`, answer: `If you were born in ${year}, you are currently ${januaryFirstTotalSeconds} seconds old.` }
    ];

    let faqDropdownsHTML = '';

    faqData.forEach(faq => {
      faqDropdownsHTML += `
    <details>
      <summary role="button" class="faq-question outline">${faq.question}</summary>
      <span class="faq"><p class="faq-answer">${faq.answer}</p></span>
    </details>
  `;
    });

    document.getElementById('questions').innerHTML = faqDropdownsHTML;
  }

  return result;
}

function handleYearMonthDate(birthYear, birthMonth, currentTime) {
  document.getElementById('root').innerHTML = HTMLMonthDate;
  const months = [
    { index: 1, name: "January", days: 31 },
    { index: 2, name: "February", days: 28 },
    { index: 3, name: "March", days: 31 },
    { index: 4, name: "April", days: 30 },
    { index: 5, name: "May", days: 31 },
    { index: 6, name: "June", days: 30 },
    { index: 7, name: "July", days: 31 },
    { index: 8, name: "August", days: 31 },
    { index: 9, name: "September", days: 30 },
    { index: 10, name: "October", days: 31 },
    { index: 11, name: "November", days: 30 },
    { index: 12, name: "December", days: 31 }
  ];

  // Check for leap years and update February days
  if (birthYear % 4 === 0 && (birthYear % 100 !== 0 || birthYear % 400 === 0)) {
    months[1].days = 29;
  }

  const result = {};
  const baseUrl = '/';

  const monthIndex = birthMonth - 1;
  const monthName = months[monthIndex].name;
  result[monthName] = {};

  for (let j = 1; j <= months[monthIndex].days; j++) {
    const birthDate = new Date(birthYear, monthIndex, j, 0, 0, 0, 1); // Add 1 millisecond to the birthdate
    const ageData = calculateAge(birthDate);
    const formattedDate = `${birthYear}-${(monthIndex + 1).toString().padStart(2, '0')}-${j.toString().padStart(2, '0')}`;

    const zodiacData = getZodiacSign(birthDate);

    result[monthName][j] = {
      birthdate: `<a  class="monthTableHeading" href="${baseUrl}?birthdate=${formattedDate}">${birthDate.toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })}</a>`,
      birthDateInYYYYMMDD: formattedDate,
      age: ageData,
      zodiac: zodiacData
    };
  }

  // Populate the table body in the HTML
  let tableHTML = '';
  for (const [monthName, monthData] of Object.entries(result)) {
    for (const [day, dayData] of Object.entries(monthData)) {
      tableHTML += `
        <tr>
          <th>${dayData.birthdate}</th>
          <td>
            <b>${dayData.age.years} Years, ${dayData.age.months} Months, ${dayData.age.days} Days</b>
            <br>
            <small>or <b>${dayData.age.totalMonths}</b> months, or <b>${dayData.age.totalWeeks}</b> weeks, or <b>${dayData.age.totalDays}</b> days, or <b>${dayData.age.totalHours}</b> hours, or <b>${dayData.age.totalMinutes}</b> minutes, or <b>${dayData.age.totalSeconds}</b> seconds
            <br>
            <span class="line"></span>
            Zodiac Sign: <strong>${dayData.zodiac.sign} ${dayData.zodiac.emoji} <strong></small>
          </td>
        </tr>
      `;
    }
  }

  const monthTableBody = document.getElementById("MonthTableBody");
  if (monthTableBody) {
    monthTableBody.innerHTML = tableHTML;
  }

  // Update title and description
  const title = `How old am I if I was born in ${monthName}, ${birthYear}?`;
  const firstDateOfMonth = `${birthYear}-${(monthIndex + 1).toString().padStart(2, '0')}-01`;
  const lastDateOfMonth = `${birthYear}-${(monthIndex + 1).toString().padStart(2, '0')}-${months[monthIndex].days}`;
  const birthDateFirst = new Date(firstDateOfMonth);
  const birthDateLast = new Date(lastDateOfMonth);

  const ageDataFirst = result[monthName][1].age;
  const ageDataLast = result[monthName][months[monthIndex].days].age;

  const descriptionFirstYears = `${ageDataFirst.years} and ${ageDataFirst.months}`;
  const descriptionLastYears = `${ageDataLast.years} and ${ageDataLast.months}`;

  const description = `If you were born between ${monthName} 1, ${birthYear} and ${monthName} ${months[monthIndex].days}, ${birthYear}, you are currently ${ageDataFirst.years} years and ${ageDataLast.months} or ${ageDataFirst.months} months old.`;

  document.title = title;
  document.querySelector('meta[name="description"]').setAttribute('content', description);
  document.getElementById('updateHeading').textContent = title;
  document.getElementById('updateDescription').textContent = description;

  // Create the FAQ data
  const faqData = [
    { id: 1, question: `How many years old are you if you were born in ${monthName}, ${birthYear}?`, answer: `If you were born in ${monthName}, ${birthYear}, you are currently ${ageDataFirst.years} years and ${ageDataFirst.months} months old.` },
    { id: 2, question: `How many months old are you if you were born in ${monthName}, ${birthYear}?`, answer: `If you were born in ${monthName}, ${birthYear}, you are currently ${ageDataFirst.totalMonths} months old.` },
    { id: 3, question: `How many weeks old are you if you were born in ${monthName}, ${birthYear}?`, answer: `If you were born in ${monthName}, ${birthYear}, you are currently ${ageDataFirst.totalWeeks} weeks old.` },
    { id: 4, question: `How many days old are you if you were born in ${monthName}, ${birthYear}?`, answer: `If you were born in ${monthName}, ${birthYear}, you are currently ${ageDataFirst.totalDays} days old.` },
    { id: 5, question: `How many hours old are you if you were born in ${monthName}, ${birthYear}?`, answer: `If you were born in ${monthName}, ${birthYear}, you are currently ${ageDataFirst.totalHours} hours old.` },
    { id: 6, question: `How many minutes old are you if you were born in ${monthName}, ${birthYear}?`, answer: `If you were born in ${monthName}, ${birthYear}, you are currently ${ageDataFirst.totalMinutes} minutes old.` },
    { id: 7, question: `How many seconds old are you if you were born in ${monthName}, ${birthYear}?`, answer: `If you were born in ${monthName}, ${birthYear}, you are currently ${ageDataFirst.totalSeconds} seconds old.` }
  ];

  // Generate the HTML for the FAQ dropdowns
  let faqDropdownsHTML = '';
  faqData.forEach(faq => {
    faqDropdownsHTML += `
      <details>
        <summary role="button" class="faq-question outline">${faq.question}</summary>
        <span class="faq"><p class="faq-answer">${faq.answer}</p></span>
      </details>
    `;
  });

  // Append the FAQ dropdowns to the questions article
  document.getElementById('questions').innerHTML = faqDropdownsHTML;
}

function getZodiacSign(birthDate) {
  const date = new Date(birthDate);
  const month = date.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month index
  const day = date.getDate();

  for (const sign in zodiacSigns) {
    const startMonth = zodiacSigns[sign].start.month;
    const startDay = zodiacSigns[sign].start.day;
    const endMonth = zodiacSigns[sign].end.month;
    const endDay = zodiacSigns[sign].end.day;

    if (
      (month === startMonth && day >= startDay) ||
      (month === endMonth && day <= endDay)
    ) {
      return { sign: sign, emoji: zodiacSigns[sign].emoji };
    }
  }

  return { sign: "Invalid date", emoji: "" };
}

function calculateAge(birthDate) {
  const currentDate = new Date();

  let ageCalculatedYears = currentDate.getFullYear() - birthDate.getFullYear();
  let ageCalculatedMonths = currentDate.getMonth() - birthDate.getMonth();
  let ageCalculatedDays = currentDate.getDate() - birthDate.getDate();
  let ageCalculatedHours = currentDate.getHours() - birthDate.getHours();
  let ageCalculatedMinutes = currentDate.getMinutes() - birthDate.getMinutes();
  let ageCalculatedSeconds = currentDate.getSeconds() - birthDate.getSeconds();

  if (ageCalculatedDays < 0) {
    ageCalculatedMonths--;
    ageCalculatedDays += new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  }

  if (ageCalculatedMonths < 0) {
    ageCalculatedYears--;
    ageCalculatedMonths += 12;
  }

  if (ageCalculatedSeconds < 0) {
    ageCalculatedMinutes--;
    ageCalculatedSeconds += 60;
  }
  if (ageCalculatedMinutes < 0) {
    ageCalculatedHours--;
    ageCalculatedMinutes += 60;
  }
  if (ageCalculatedHours < 0) {
    ageCalculatedDays--;
    ageCalculatedHours += 24;
  }

  // Calculate total time intervals
  const totalMonths = ageCalculatedYears * 12 + ageCalculatedMonths;
  const totalWeeks = Math.floor((currentDate - birthDate) / (1000 * 60 * 60 * 24 * 7));
  const totalDays = Math.floor((currentDate - birthDate) / (1000 * 60 * 60 * 24));
  const totalHours = Math.floor((currentDate - birthDate) / (1000 * 60 * 60));
  const totalMinutes = Math.floor((currentDate - birthDate) / (1000 * 60));
  const totalSeconds = Math.floor((currentDate - birthDate) / 1000);

  return {
    years: ageCalculatedYears,
    months: ageCalculatedMonths,
    days: ageCalculatedDays,
    hours: ageCalculatedHours,
    minutes: ageCalculatedMinutes,
    seconds: ageCalculatedSeconds,
    totalMonths: totalMonths,
    totalWeeks: totalWeeks,
    totalDays: totalDays,
    totalHours: totalHours,
    totalMinutes: totalMinutes,
    totalSeconds: totalSeconds
  };
}


// Function to handle when birth year and month are provided
// function handleYearMonthDate(year, month) {
//   console.log("Handling Year Month Date:", year, month);
// }

function handleDefault() {
  // first populet html file in dom using root id to add HTMLDefaultPage var's html
  document.getElementById("root").innerHTML = HTMLDefaultPage;
  console.log("handling default page")
  const currentYear = new Date().getFullYear();
  const yearsContainer = document.getElementById("YearsForDefaultPage");


  const myAge = new Date("2007-04-10T07:30")

  // Set the value of the birthDate input field
const birthDateInput = document.getElementById("birthDateInput");
birthDateInput.value = formatDateForInput(myAge);


  // Set the value of the currentDate input field
const currentDateInput = document.getElementById("curruntDateInput");
currentDateInput.value = formatDateForInput(new Date(currentTime));
// Function to handle input change
function handleInputChange() {
    const mainInputButtons = document.getElementById("mainInputButtons");
    mainInputButtons.style.display = "block"; // Show the buttons when there's a change in input
}

// Function to handle the Calculate button click
function handleCalculateButtonClick() {
    const birthDateInput = document.getElementById("birthDateInput").value;
    const currentDateInput = document.getElementById("curruntDateInput").value;
    
    // Construct the URL with birthdate and currentdate parameters
    const params = new URLSearchParams({ birthdate: birthDateInput, currentdate: currentDateInput });
    const url = `${window.location.pathname}#${params.toString()}`;
    
    // Set the URL in the address bar
    window.location.href = url;

    // Force page reload
    window.location.reload();
}

// Function to handle the Reset button click
function handleResetButtonClick() {
    // Reload the page without any parameters
    window.location.href = window.location.pathname;
}

// Add event listeners to the input fields and buttons
document.getElementById("birthDateInput").addEventListener("change", handleInputChange);
document.getElementById("curruntDateInput").addEventListener("change", handleInputChange);
document.getElementById("calculateButton").addEventListener("click", handleCalculateButtonClick);
document.getElementById("resetButton").addEventListener("click", handleResetButtonClick);


  // Clear existing buttons
  yearsContainer.innerHTML = "";

  // Loop through years from current year - 1 to 1950
  for (let year = currentYear - 1; year >= 1950; year--) {

      // Create a button element
      const button = document.createElement("button");
      button.classList.add("YearsButtons", "outline");
      button.setAttribute("data-year", year);
      button.textContent = year;

      // Create an anchor element with the button as its child
      const link = document.createElement("a");
      link.classList.add("DefaultYearLink");
      link.href = `${url}?birthdate=${year}`;
      link.appendChild(button);

      // Create a div to contain the anchor element
      const div = document.createElement("div");
      div.appendChild(link);

      // Append the div to the years container
      yearsContainer.appendChild(div);
  }
}

// Check conditions and call appropriate functions
if (birthYear !== null && !isNaN(birthYear) && isNaN(birthMonth) && isNaN(birthDay)) {
  handleYearDate(birthYear, currentTime);
  // console.log(handleYearDate(birthYear, currentTime))
} else if (birthYear !== null && !isNaN(birthYear) && birthMonth !== null && !isNaN(birthMonth) && isNaN(birthDay)) {
  handleYearMonthDate(birthYear, birthMonth+1, currentTime);
} else if (birthYear === null && birthMonth === null && birthDay === null) {
  handleDefault();
} else {
  handleFullYearDate(birthTime, currentTime);
}

// show and hide navbar
function toggleMenu() {
  const navbarLinks = document.querySelector('.navbar-links');
  const navbarToggle = document.querySelector('.navbar-toggle');
  navbarLinks.classList.toggle('show');
  navbarToggle.classList.toggle('open');
}

// Function to set the theme based on browser preference
function setThemeFromBrowserPreference() {
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const root = document.documentElement;
  const sunIcon = document.getElementById("sunIcon");
  const moonIcon = document.getElementById("moonIcon");

  if (prefersDarkMode) {
      root.setAttribute("data-theme", "dark");
      moonIcon.style.display = "inline"; // Show moon icon
  } else {
      root.setAttribute("data-theme", "light");
      sunIcon.style.display = "inline"; // Show sun icon
  }
}

// Function to toggle between dark and light mode
function toggleDarkMode() {
  const root = document.documentElement;
  const sunIcon = document.getElementById("sunIcon");
  const moonIcon = document.getElementById("moonIcon");
  
  // Check if dark mode is enabled
  const isDarkMode = root.getAttribute("data-theme") === "dark";
  
  // Toggle dark mode
  if (isDarkMode) {
      root.setAttribute("data-theme", "light");
      sunIcon.style.display = "inline"; // Show sun icon
      moonIcon.style.display = "none"; // Hide moon icon
  } else {
      root.setAttribute("data-theme", "dark");
      sunIcon.style.display = "none"; // Hide sun icon
      moonIcon.style.display = "inline"; // Show moon icon
  }
  
  // Store the user's preference in local storage
  localStorage.setItem("theme", root.getAttribute("data-theme"));
}

// Check if the user has a preference stored in local storage, otherwise set theme based on browser preference
document.addEventListener("DOMContentLoaded", function() {
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme) {
      document.documentElement.setAttribute("data-theme", storedTheme);
  } else {
      setThemeFromBrowserPreference();
  }

  // Show the appropriate icon based on the theme
  const sunIcon = document.getElementById("sunIcon");
  const moonIcon = document.getElementById("moonIcon");
  if (document.documentElement.getAttribute("data-theme") === "dark") {
      moonIcon.style.display = "inline";
  } else {
      sunIcon.style.display = "inline";
  }
});
