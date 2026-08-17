document.addEventListener("DOMContentLoaded", () => {

    console.log("⚽ Alpha-Foot V7 démarré");

    // Vérification des données
    if (typeof alphaMatches === "undefined") {
        console.error("Alpha-Foot : matches.js n'est pas chargé.");
        return;
    }

    // ==============================
    // RECHERCHE DU MATCH
    // ==============================

    function findMatch(button) {

        const card = button.closest(".match-card");

        if (!card) return null;

        const text = card.innerText.toLowerCase();

        return alphaMatches.find(match => {

            return (
                text.includes(match.home.toLowerCase()) &&
                text.includes(match.away.toLowerCase())
            );

        });
    }


    // ==============================
    // CRÉATION DE L'ANALYSE
    // ==============================

    function showAnalysis(match) {

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

                <button class="alpha-close">×</button>

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
                            <strong>
                                ${match.homeWin}%
                            </strong>
                            <span>
                                ${match.home}
                            </span>
                        </div>

                        <div>
                            <strong>
                                ${match.draw}%
                            </strong>
                            <span>
                                Nul
                            </span>
                        </div>

                        <div>
                            <strong>
                                ${match.awayWin}%
                            </strong>
                            <span>
                                ${match.away}
                            </span>
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
                        <strong>
                            ${match.halftime}
                        </strong>
                    </div>

                    <div>
                        <small>🏁 Fin du match</small>
                        <strong>
                            ${match.fulltime}
                        </strong>
                    </div>

                    <div>
                        <small>⚽ Buts</small>
                        <strong>
                            ${match.goals}
                        </strong>
                    </div>

                    <div>
                        <small>🔥 Confiance</small>
                        <strong>
                            ${match.confidence}
                        </strong>
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


        // ==============================
        // FERMETURE
        // ==============================

        panel
            .querySelector(".alpha-close")
            .addEventListener("click", () => {

                panel.remove();

            });


        panel
            .querySelector(".alpha-overlay")
            .addEventListener("click", event => {

                if (
                    event.target.classList.contains(
                        "alpha-overlay"
                    )
                ) {

                    panel.remove();

                }

            });

    }


    // ==============================
    // BOUTONS
    // ==============================

    document
        .querySelectorAll(".analysis-btn")
        .forEach(button => {

            button.addEventListener("click", () => {

                const match = findMatch(button);

                if (match) {

                    showAnalysis(match);

                } else {

                    alert(
                        "⚠️ Analyse indisponible pour ce match."
                    );

                }

            });

        });


    console.log(
        "✅ Alpha-Foot utilise maintenant matches.js"
    );

});

    
