"use-strict";

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  getIp();
});

// Fetch ipdata from ipapi's
async function getIpData(ip) {
  const URI = `http://ip-api.com/json/${ip}`;
  let res = await fetch(URI, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  if (!res.ok) {
    throw new Error("cannot fetch data");
  }
  let data = await res.json();

  return data;
}

function loadNav(
  { ip = "unknown", city = "unknown", tz = "unknown", isp = "unknown" },
  get = true
) {
  if (get) {
    let nav = [...document.querySelectorAll("h2")];
    nav[0].innerText = ip;
    nav[1].innerText = city;
    nav[2].innerText = tz;
    nav[3].innerText = isp;
  }
}

// control entry
async function getIp() {
  let inputValue = document.querySelector("#ip-input").value;
  let view = document.querySelector("aside");
  let nav = [...document.querySelectorAll("h2")];
  view.innerHTML = `
    <div id="info">
      Loading MAP 🗺
      <div>
        <div style="width: 25px; height: 25px; margin-top: 5px;" id="loader"></div>
      </div>
    </div>`;
  for (const e of nav) {
    e.innerHTML = `<div id="loader"></div>`;
  }
  let ipData;
  try {
    ipData = await getIpData(inputValue);
    let {
      ip,
      city,
      asn,
      location: loc,
      timezone: tz,
      latitude: lat,
      longitude: log
    } = ipData;
    loadNav({ ip, city, tz, asn });
  } catch (err) {
    view.innerHTML = '<div style="color:red">Failed!!<div>';
    for (const e of nav) {
      e.innerHTML = `<div style="color:red">Failed!!<div>`;
    }
    loadNav({}, false);
  }

  console.log(ipData);
}
