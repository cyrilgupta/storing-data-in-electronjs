var currentTab = 0;
let db;

document.addEventListener("DOMContentLoaded", async function (event) {
  showTab(currentTab);

  //loadSessionInfo();
  //loadLocalInfo();
  await openDb();
  await loadIndexedDbInfo();
});

async function openDb() {
  db = await idb.openDB("settings", 1, {
    upgrade(db) {
      db.createObjectStore("settings");
    },
  });
}

async function loadIndexedDbInfo() {
  //await db.clear("settings");
  let fname = await db.get("settings", "fname");
  let city = await db.get("settings", "city");
  let site = await db.get("settings", "site");
  let car = await db.get("settings", "car");
  let song = await db.get("settings", "song");
  let mobile = await db.get("settings", "mobile");

  document.getElementsByName("fname")[0].value = (typeof fname != 'undefined' ? fname : "");
  document.getElementsByName("city")[0].value = (typeof city != 'undefined' ? city : "");
  document.getElementsByName("site")[0].value = (typeof site != 'undefined' ? site : "");
  document.getElementsByName("car")[0].value = (typeof car != 'undefined' ? car : "");
  document.getElementsByName("song")[0].value = (typeof song != 'undefined' ? song : "");
  document.getElementsByName("mobile")[0].value = (typeof mobile != 'undefined' ? mobile : "");
}

function loadLocalInfo() {
  let fname = window.localStorage.getItem("fname");
  let city = window.localStorage.getItem("city");
  let site = window.localStorage.getItem("site");
  let car = window.localStorage.getItem("car");
  let song = window.localStorage.getItem("song");
  let mobile = window.localStorage.getItem("mobile");

  document.getElementsByName("fname")[0].value = fname;
  document.getElementsByName("city")[0].value = city;
  document.getElementsByName("site")[0].value = site;
  document.getElementsByName("car")[0].value = car;
  document.getElementsByName("song")[0].value = song;
  document.getElementsByName("mobile")[0].value = mobile;
}

function loadSessionInfo() {
  let fname = window.sessionStorage.getItem("fname");
  let city = window.sessionStorage.getItem("city");
  let site = window.sessionStorage.getItem("site");
  let car = window.sessionStorage.getItem("car");
  let song = window.sessionStorage.getItem("song");
  let mobile = window.sessionStorage.getItem("mobile");

  document.getElementsByName("fname")[0].value = fname;
  document.getElementsByName("city")[0].value = city;
  document.getElementsByName("site")[0].value = site;
  document.getElementsByName("car")[0].value = car;
  document.getElementsByName("song")[0].value = song;
  document.getElementsByName("mobile")[0].value = mobile;
}

function showTab(n) {
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == x.length - 1) {
    document.getElementById("nextBtn").innerHTML =
      '<i class="fa fa-angle-double-right"></i>';
  } else {
    document.getElementById("nextBtn").innerHTML =
      '<i class="fa fa-angle-double-right"></i>';
  }
  fixStepIndicator(n);
}

function nextPrev(n) {
  saveJsonFile();
  //saveSessionInfo();
  //saveLocalInfo();
 
  saveIndexedDbInfo();

  var x = document.getElementsByClassName("tab");
  if (n == 1 && !validateForm()) return false;
  x[currentTab].style.display = "none";
  currentTab = currentTab + n;
  if (currentTab >= x.length) {
    document.getElementById("nextprevious").style.display = "none";
    document.getElementById("all-steps").style.display = "none";
    document.getElementById("register").style.display = "none";
    document.getElementById("text-message").style.display = "block";
  }
  showTab(currentTab);
}

async function saveIndexedDbInfo(){
  let fname = document.getElementsByName("fname")[0].value;
  let city = document.getElementsByName("city")[0].value;
  let site = document.getElementsByName("site")[0].value;
  let car = document.getElementsByName("car")[0].value;
  let song = document.getElementsByName("song")[0].value;
  let mobile = document.getElementsByName("mobile")[0].value;

  await db.put("settings", fname, "fname");
  await db.put("settings", city, "city");
  await db.put("settings", site, "site");
  await db.put("settings", car, "car");
  await db.put("settings", song, "song");
  await db.put("settings", mobile, "mobile");
}

function saveSessionInfo() {
  let fname = document.getElementsByName("fname")[0].value;
  let city = document.getElementsByName("city")[0].value;
  let site = document.getElementsByName("site")[0].value;
  let car = document.getElementsByName("car")[0].value;
  let song = document.getElementsByName("song")[0].value;
  let mobile = document.getElementsByName("mobile")[0].value;

  window.sessionStorage.setItem("fname", fname);
  window.sessionStorage.setItem("city", city);
  window.sessionStorage.setItem("site", site);
  window.sessionStorage.setItem("car", car);
  window.sessionStorage.setItem("song", song);
  window.sessionStorage.setItem("mobile", mobile);
}

function saveLocalInfo() {
  let fname = document.getElementsByName("fname")[0].value;
  let city = document.getElementsByName("city")[0].value;
  let site = document.getElementsByName("site")[0].value;
  let car = document.getElementsByName("car")[0].value;
  let song = document.getElementsByName("song")[0].value;
  let mobile = document.getElementsByName("mobile")[0].value;

  window.localStorage.setItem("fname", fname);
  window.localStorage.setItem("city", city);
  window.localStorage.setItem("site", site);
  window.localStorage.setItem("car", car);
  window.localStorage.setItem("song", song);
  window.localStorage.setItem("mobile", mobile);
}

function saveJsonFile() {
  let fname = document.getElementsByName("fname")[0].value;
  let city = document.getElementsByName("city")[0].value;
  let site = document.getElementsByName("site")[0].value;
  let car = document.getElementsByName("car")[0].value;
  let song = document.getElementsByName("song")[0].value;
  let mobile = document.getElementsByName("mobile")[0].value;

  console.log(fname);
  console.log(city);
  console.log(site);
  console.log(car);
  console.log(song);
  console.log(mobile);

  window.Bridge.saveData(fname, city, site, car, song, mobile);
}

function validateForm() {
  var x,
    y,
    i,
    valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  for (i = 0; i < y.length; i++) {
    if (y[i].value == "") {
      y[i].className += " invalid";
      valid = false;
    }
  }
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid;
}

function fixStepIndicator(n) {
  var i,
    x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  x[n].className += " active";
}
