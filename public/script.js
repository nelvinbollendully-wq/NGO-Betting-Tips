const API = "/api/football";

async function apiFetch(endpoint) {
  const res = await fetch(`${API}?endpoint=${endpoint}`);
  const data = await res.json();
  return data.response || [];
}

/* LOAD LEAGUES */
async function loadLeagues() {
  const leaguesEl = document.getElementById("leagues");
  leaguesEl.innerHTML = "Loading leagues...";

  try {
    const leagues = await apiFetch("/leagues");

    leaguesEl.innerHTML = "";
    leagues.slice(0, 20).forEach(l => {
      const li = document.createElement("li");
      li.textContent = `${l.league.name} (${l.country.name})`;
      li.onclick = () => loadFixtures(l.league.id);
      leaguesEl.appendChild(li);
    });

  } catch {
    leaguesEl.innerHTML = "Failed to load leagues";
  }
}

/* LOAD FIXTURES */
async function loadFixtures(leagueId) {
  const fixturesEl = document.getElementById("fixtures");
  fixturesEl.innerHTML = "Loading fixtures...";

  try {
    const fixtures = await apiFetch(
      `/fixtures?league=${leagueId}&season=2024&next=10`
    );

    fixturesEl.innerHTML = "";
    fixtures.forEach(f => {
      const div = document.createElement("div");
      div.className = "fixture-card";
      div.innerHTML = `
        <h3>${f.teams.home.name} vs ${f.teams.away.name}</h3>
        <p>${new Date(f.fixture.date).toLocaleString()}</p>
        <strong>Tip: Over 1.5 Goals</strong>
      `;
      fixturesEl.appendChild(div);
    });

  } catch {
    fixturesEl.innerHTML = "Failed to load fixtures";
  }
}

loadLeagues();