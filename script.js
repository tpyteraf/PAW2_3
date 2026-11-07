(function () {
  const json = document.getElementById("json");
  const cw1 = document.getElementById("cw1");
  const cw2 = document.getElementById("cw2");
  const cw3 = document.getElementById("cw3");
  const answer = document.getElementById("answer");

  const loading = document.getElementById("loading-popup");

  const showLoading = () => loading.classList.remove("hidden");
  const hideLoading = () => loading.classList.add("hidden");

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  cw1.addEventListener("click", function () {
    showLoading();

    fetch("https://6aef2ea7b9925b27ce16b7b3.mockapi.io/paw/users")
      .then((response) => response.json())
      .then((el) => delay(1500).then(() => el))
      .then((array) => {
        const rows = array
          .map(
            (el) => `
              <div class="user" style="background: linear-gradient(135deg, ${el.color} 0%, ${el.color2} 100%">
                <img src=${el.avatar}>
                <p>${el.name}</p>
              </div>
            `,
          )
          .join("");

        answer.innerHTML = rows;
        hideLoading();
      })
      .catch((error) => {
        answer.innerHTML = "Wystąpił błąd podczas pobierania danych.";
        console.error(error);
      });
  });

  cw2.addEventListener("click", function () {
    const userId = document.getElementById("cw2_select").value;
    showLoading();

    fetch(`https://6aef2ea7b9925b27ce16b7b3.mockapi.io/paw/users/${userId}`)
      .then((response) => response.json())
      .then((el) => {
        console.log(el);
        answer.innerHTML = `
          <div class="user" style="background: linear-gradient(135deg, ${el.color} 0%, ${el.color2} 100%">
                <img src=${el.avatar}>
                <p>${el.name}</p>
              </div>
        `;
        hideLoading();
      })
      .catch((error) => {
        answer.innerHTML = "Wystąpił błąd podczas pobierania danych.";
        console.error(error);
      });
  });

  cw3.addEventListener("click", function () {
    answer.textContent = "Processing...";
    fetch("https://6aef2ea7b9925b27ce16b7b3.mockapi.io/paw/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: "Gromosław Grzmot",
        avatar:
          "https://instagram.fktw4-1.fna.fbcdn.net/v/t51.82787-19/660196128_17940204747173706_7322786351475630368_n.jpg?_nc_cat=101&_nc_map=urlgen_bucketless&ig_cache_key=GCDLWSdKLydrhbw-ACChyI1jw59lbmNDAQAB0j-ccb7-5&ccb=7-5&_nc_sid=669407&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=xuTcnxe53asQ7kNvwHF5n1_&_nc_oc=AdqtrQZfNtf8ofSzMTQIgTFh6pcvXzfht4jYZI8n-FgpiXnx4uysQgY_nOC8CGRd82w&_nc_zt=24&_nc_ht=instagram.fktw4-1.fna&_nc_gid=i3u5qZaGTGFAJQrx7VG1qQ&_nc_ss=7b6a8&oh=00_AQSppkx0frNFq11XUTOZSWanDCqDfnRjNAcMK9UVUS_w8Q&oe=6AF4F538",
        color: "#0f172a",
        color2: "#fbbf24",
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        answer.textContent = `Dodano Gromosława o ID = ${json.id}`;
        console.log(json);
      })
      .catch((error) => {
        answer.innerHTML = "Wystąpił błąd podczas dodawania użytkownika.";
        console.error(error);
      });
  });

  json.addEventListener("click", () => {
    fetch("db.json")
      .then((response) => response.json())
      .then((data) => {
        let html = "<ul>";

        data.posts.forEach((post) => {
          html += `<li><strong>${post.title}</strong>`;

          const postComments = data.comments.filter(
            (comment) => comment.postId === post.id,
          );

          if (postComments.length > 0) {
            html += "<ul>";
            postComments.forEach((comment) => {
              html += `<li>${comment.body}</li>`;
            });
            html += "</ul>";
          } else {
            html += " - <i>Brak komentarzy</i>";
          }

          html += "</li>";
        });

        html += "</ul>";

        answer.innerHTML = html;
      })
      .catch((error) => {
        answer.innerHTML = "Wystąpił błąd podczas pobierania danych.";
        console.error(error);
      });
  });
})();
