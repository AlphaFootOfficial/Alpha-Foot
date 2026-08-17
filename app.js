console.log("⚽ Alpha-Foot V7 démarré");

// Vérification de matches.js
if (typeof alphaMatches === "undefined") {
    console.error("❌ matches.js n'est pas chargé.");
} else {

    console.log(
        "✅ matches.js chargé :",
        alphaMatches.length,
        "match(s)"
    );

    function normalizeText(text) {
        return String(text)
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();
    }

    function findMatch(button) {

        const card = button.closest(".match-card");

        if (!card) {
            console.error("❌ Match-card introuvable.");
            return null;
        }

        const teams = normalizeText(
            card.dataset.teams || ""
        );

        console.log("🔎 Recherche :", teams);

        return alphaMatches.find(match => {

            const home = normalizeText(match.home);
            const away = normalizeText(match.away);

            return (
                teams.includes(home) &&
                teams.includes(away)
            );

        });
    }

    function showAnalysis(match) {

        if (!match) {
            alert("⚠️ Analyse indisponible.");
            return;
        }

        const oldPanel =
            document.getElementById("alpha-analysis-panel");

        if (oldPanel) {
            oldPanel.remove();
        }

        const panel = document.createElement("div");

        panel.id = "alpha-analysis-panel";

        panel.innerHTML = `
            <div class="alpha-overlay">

                <div class="alpha-modal">

                    <button
                        class="alpha-close"
                        type="button">
                        ×
                    </button>

                    <div class="alpha-header">

                        <div class="alpha-label">
                            ⚡ ANALYSE ALPHA
                        </div>

                        <h2>
                            ${match.home}
                            <span>VS</span>
                            ${match.away}
                        </h2>

                        <div class="alpha-league">
                            ${match.league}
                        </div>

                    </div>

                    <div class="alpha-section">

                        <h3>📊 Probabilités</h3>

                        <div class="probabilities">

                            <div>
                                <strong>${match.homeWin}%</strong>
                                <span>${match.home}</span>
                            </div>

                            <div>
                                <strong>${match.draw}%</strong>
                                <span>Nul</span>
                            </div>

                            <div>
                                <strong>${match.awayWin}%</strong>
                                <span>${match.away}</span>
                            </div>

                        </div>

                    </div>

                    <div class="alpha-score">

                        <small>
                            🎯 SCORE PROBABLE
                        </small>

                        <strong>
                            ${match.score}
                        </strong>

                    </div>

                    <div class="alpha-grid">

                        <div>
                            <small>⏱️ Mi-temps</small>
                            <strong>${match.halftime}</strong>
                        </div>

                        <div>
                            <small>🏁 Fin du match</small>
                            <strong>${match.fulltime}</strong>
                        </div>

                        <div>
                            <small>⚽ Buts</small>
                            <strong>${match.goals}</strong>
                        </div>

                        <div>
                            <small>🔥 Confiance</small>
                            <strong>${match.confidence}</strong>
                        </div>

                    </div>

                    <div class="alpha-section">

                        <h3>⭐ Joueur / secteur clé</h3>

                        <p>
                            ${match.keyPlayer}
                        </p>

                    </div>

                    <div class="alpha-section">

                        <h3>🧠 Analyse Alpha</h3>

                        <p>
                            ${match.analysis}
                        </p>

                    </div>

                    <div class="alpha-risk">

                        <h3>⚠️ Risque</h3>

                        <p>
                            ${match.risk}
                        </p>

                    </div>

                </div>

            </div>
        `;

        document.body.appendChild(panel);

        const closeButton =
            panel.querySelector(".alpha-close");

        closeButton.addEventListener("click", () => {
            panel.remove();
        });

        const overlay =
            panel.querySelector(".alpha-overlay");

        overlay.addEventListener("click", event => {

            if (event.target === overlay) {
                panel.remove();
            }

        });

        console.log("✅ Fenêtre d'analyse affichée.");

    }

    // ==============================
    // BOUTONS
    // ==============================

    const buttons =
        document.querySelectorAll(".analysis-btn");

    console.log(
        "🔘 Boutons trouvés :",
        buttons.length
    );

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            console.log(
                "⚡ Clic sur Analyse Alpha"
            );

            const match = findMatch(button);

            if (match) {

                console.log(
                    "✅ Match trouvé :",
                    match.home,
                    "vs",
                    match.away
                );

                showAnalysis(match);

            } else {

                console.error(
                    "❌ Match non trouvé."
                );

                alert(
                    "⚠️ Analyse indisponible pour ce match."
                );

            }

        });

    });

    console.log("✅ Alpha-Foot V7 prêt.");

}

    
