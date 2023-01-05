function create_links(event) {
  event.preventDefault()

  // Configuration values
  const project_id = document.getElementById("project-id").value
  const url = document.getElementById("gitlab-url").value
  const gitlab_token = document.getElementById("gitlab-token").value

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
        headers: {"PRIVATE-TOKEN": gitlab_token},
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          // Change issue code by markdown link pattern
          const issue_url = data[0]["web_url"]
          content = content.replace(
            issue_code,
            `[${issue_code}](${issue_url})`
          )
          document.getElementById("content").value = content
        }
      })
    })
  }
}

// Events listeners
document.getElementById("create").addEventListener("click", create_links)

// Tabs behaviour
function openTab(event, tab_name) {
  event.preventDefault()

  // Hide all contents
  const tabcontent = document.getElementsByClassName("tab-content")
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none"
  }

  // Remove the "is-active" class from all tabs
  const tablinks = document.getElementsByClassName("tab-link")
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("is-active")
  }

  // Show selected tab content
  document.getElementById(tab_name).style.display = "block"

  // Add "is-active" class for style purposes
  event.currentTarget.classList.add("is-active")
}
