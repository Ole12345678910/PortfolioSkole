document.addEventListener("DOMContentLoaded", function () {
  const username = "Ole12345678910"; // Replace with your GitHub username

  // Fetch and display profile data
  const profileUrl = `https://api.github.com/users/${username}`;

  fetch(profileUrl)
    .then((response) => response.json())
    .then((data) => {
      const profileDiv = document.getElementById("profile");
      profileDiv.innerHTML = `
                <img src="${data.avatar_url}" alt="Avatar">
                <h2>${data.name || "No name provided"}</h2>
                <p class="link-text"><a href="${
                  data.html_url
                }" target="_blank">View GitHub Profile</a></p>
            `;
    })
    .catch((error) => console.error("Error fetching profile data:", error));

  // Fetch and display README content
  const readmeUrl = `https://api.github.com/repos/${username}/${username}/readme`;

  fetch(readmeUrl, {
    headers: {
      Accept: "application/vnd.github.v3.raw",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.text();
    })
    .then((markdown) => {
      const readmeDiv = document.getElementById("readme");
      readmeDiv.innerHTML = marked.parse(markdown);
    })
    .catch((error) => {
      console.error("Error fetching README:", error);
      const readmeDiv = document.getElementById("readme");
      readmeDiv.innerHTML = `<p>Failed to load README file.</p>`;
    });
});
