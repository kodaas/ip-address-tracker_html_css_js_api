async function getIp() {
  let inputValue = document.querySelector("#ip-input").value;
  let ipData = await getIpData(inputValue);

  console.log(ipData);
}

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  getIp();
});

async function getIpData(ip) {
  let res = await fetch("https://jsonplaceholder.typicode.com/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "sec-fetch-mode": null
    }
  });
  if (!res.ok) throw new Error("cannot fetch data");
  let data = await res.json();

  return data;
}
