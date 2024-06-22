const submitBtn = document.getElementById("submitBtn");
document.getElementById("playerName");
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  fetch("/coc/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      playerTag: document
        .getElementById("playerTag")
        .value.trim()
        .toUpperCase(),
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      document.getElementById("playerTag").hidden = true;
      document.getElementById("submitBtn").hidden = true;
      document.getElementById("playerName").hidden = false;
      document.getElementById("playerName").value = data.name;
      document.getElementById("playerLevel").hidden = false;
      document.getElementById("playerLevel").value = data.expLevel;
      console.log(data.name);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
