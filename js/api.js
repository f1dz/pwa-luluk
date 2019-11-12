var base_url = "https://api.football-data.org/v2/competitions/2001/standings";

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}
// Blok kode untuk melakukan request data json
function getArticles() {
  fetch(base_url, {
    'headers': {
      'X-Auth-Token': '7314a808927e4c4d83b101ee6e3f8b45'
    }
  })
    .then(status)
    .then(json)
    .then(function (data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      console.log(data);
      // Menyusun komponen card artikel secara dinamis
      var articlesHTML = "";
      data.standings.forEach(function (standing) {

        var detail = ''
        standing.table.forEach(result => {
          detail += `<tr>
            <td class='center'>${result.position}</td>
            <td>${result.team.name}</td>
            <td class='center'>${result.playedGames}</td>
            <td class='center'>${result.won}</td>
            <td class='center'>${result.draw}</td>
            <td class='center'>${result.lost}</td>
            <td class='center'>${result.points}</td>
          </tr>`
        });

        articlesHTML += `
            <div class="col s12 m12" >
              <div class="card">
                <div class="card-content">
                  <span class="card-title truncate">${standing.group} - ${standing.type}</span>
                  <table class="responsive-table highlight">
                    <thead>
                      <tr>
                        <th class='center'>Position</th>
                        <th>Team</th>
                        <th class='center'>Played</th>
                        <th class='center'>Won</th>
                        <th class='center'>Draw</th>
                        <th class='center'>Lost</th>
                        <th class='center'>Points</th>
                      </tr>
                    </thead>
                    <tbody>` + detail + `</tbody>
                  </table>
                </div>
              </div>
            </div>
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("standings").innerHTML = articlesHTML;
    })
    .catch(error);
}