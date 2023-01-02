function create_links(event) {
  event.preventDefault()

  const project_id = "252"
  const url = "https://git.mop.equinix.com.br/api/v4/"
  let content = document.getElementById("content").value
  const regex = /[A-Z]{3,4}-\d{3}/gm;
  let matches

  while ((matches = regex.exec(content)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (matches.index === regex.lastIndex) {
      regex.lastIndex++
    }

    matches.forEach((issue_code) => {
      // Get issue URL on GitLab API
      let query = new URLSearchParams()
      query.append("search", issue_code)
      const mounted_url = `${url}/projects/${project_id}/issues?${query.toString()}`

      fetch(mounted_url, {
        method: "GET",
        headers: {"PRIVATE-TOKEN": "token"},  // TODO: change here
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          // Change issue code by markdown link pattern
          const issue_url = data[0]["web_url"]
          content = content.replace(issue_code, `[${issue_code}](${issue_url})`)
          document.getElementById("content").value = content
        }
      })
    })
  }
}

// Events listeners
document.getElementById("create").addEventListener("click", create_links)
