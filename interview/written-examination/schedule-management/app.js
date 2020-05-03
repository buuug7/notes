const STATE_FINISHED = "finished";
const STATE_UNFINISHED = "unfinished";
const STATE_ALL = "all";

let trips = [
  {
    time: "2018/12/25 13:22",
    text: "拜访福耀玻璃",
    status: STATE_FINISHED
  },
  {
    time: "2018/12/25 13:22",
    text: "拜访小米科技",
    status: STATE_FINISHED
  },
  {
    time: "2018/12/25 13:22",
    text: "去工作",
    status: STATE_FINISHED
  },
  {
    time: "2018/12/25 13:22",
    text: "去吃饭",
    status: STATE_UNFINISHED
  }
];

let box = document.querySelector(".box");
let boxAdd = document.querySelector(".box-add");
let boxHeaderAdd = document.querySelector(".box__header-add");
let boxBodyContent = document.querySelector(".box__body ul");
let addTrip = document.querySelector(".add-trip");

// get the siblings of element
// return array
function siblings(elm) {
  let a = [];
  let p = elm.parentNode.children;
  for (let i = 0, pl = p.length; i < pl; i++) {
    if (p[i] !== elm) {
      a.push(p[i]);
    }
  }
  return a;
}

boxHeaderAdd.addEventListener("click", function(e) {
  e.preventDefault();
  box.style.display = "none";
  boxAdd.style.display = "block";
});

function loadAll(filter) {
  let t = trips;
  if (filter) {
    t = trips.filter(function(v) {
      return v.status === filter;
    });
  }

  for (let i = 0; i < t.length; i++) {
    let li = document.createElement("li");
    li.className = "box__body-item";

    let spanTime = document.createElement("span");
    spanTime.className = "box__body-item-time";
    spanTime.textContent = t[i].time;

    li.appendChild(spanTime);

    let spanContent = document.createElement("span");
    spanContent.className = "box__body-item-content";
    spanContent.textContent = t[i].text;
    li.appendChild(spanContent);

    boxBodyContent.appendChild(li);
  }
}

document.querySelector("#back").addEventListener("click", function(e) {
  e.preventDefault();
  boxAdd.style.display = "none";
  box.style.display = "block";
});

function fixMonth(m) {
  m += 1;
  return m < 10 ? "0" + m : m;
}

function fixDay(day) {
  return day < 10 ? "0" + day : day;
}

addTrip.addEventListener("click", function(e) {
  e.preventDefault();
  let textarea = document.querySelector("#new-schedule");
  if (textarea.value === "") {
    alert("not empty");
    return;
  }
  let time = new Date();
  trips.push({
    time: `${time.getFullYear()}/${fixMonth(time.getMonth())}/${fixDay(
      time.getDate()
    )} ${time.getHours()}:${time.getMinutes()}`,
    text: textarea.value,
    status: STATE_UNFINISHED
  });
  boxBodyContent.innerHTML = "";
  let filterAll = document.querySelector(".filter-all");
  filterAll.classList.add("active");
  siblings(filterAll).forEach(function(el) {
    el.classList.remove("active");
  });
  loadAll();
  boxAdd.style.display = "none";
  box.style.display = "block";
  textarea.value = "";
});

let filtersDom = document.querySelectorAll('[class*="filter-"]');

filtersDom.forEach(function(el) {
  console.log(el);
  el.addEventListener("click", function(e) {
    e.preventDefault();
    el.classList.add("active");
    let sibs = siblings(this);
    for (let i = 0; i < sibs.length; i++) {
      sibs[i].classList.remove("active");
    }
    boxBodyContent.innerHTML = "";
    if (el.classList.contains("filter-all")) {
      loadAll();
    } else if (el.classList.contains("filter-finished")) {
      loadAll(STATE_FINISHED);
    } else if (el.classList.contains("filter-unfinished")) {
      loadAll(STATE_UNFINISHED);
    }
  });
});

function init() {
  loadAll();
}

window.onload = function() {
  init();
};
