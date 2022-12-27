function send_data(event) {
  event.preventDefault()

  const url = "https://webhook.site/d900ab98-677d-4a11-9834-77127483258d"
  const data = { content: document.getElementById("content").value }

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    mode: "no-cors",
  })
    .then((response) => {
      console.log(response)
    })
}

// Events listeners
document.getElementById("create").addEventListener("click", send_data)
