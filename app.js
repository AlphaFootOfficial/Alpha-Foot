document.addEventListener("DOMContentLoaded", () => {

    console.log("⚽ Alpha-Foot V7 démarré");

    // Vérification de matches.js
    if (typeof alphaMatches === "undefined") {

        console.error(
            "❌ Alpha-Foot : matches.js n'est pas chargé."
        );

        return;
    }

    console.log(
        "✅ matches.js chargé :",
        alphaMatches.length,
        "match(s)"
    );


    // ==============================
    // NORMALISATION DU TEXTE
    // ==============================

    function normalizeText(text) {

        return String(text)
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();

    }


    // ==============================
    // RECHERCHE DU MATCH
    // ==============================

    function findMatch(button) {

        const card =
            button.closest(".match-card");

        if (!card) {

            console.error(
                "❌ Impossible de trouver .match-card"
            );

            return null;
        }


        const teams =
            normalizeText(
                card.dataset.teams || ""
            );


        console.log(
            "🔎 Recherche du match :",
            teams
        );


        return alphaMatches.find(match => {

            const home =
                normalizeText(match.home);

            const away =
                normalizeText(match.away);


            return (
                teams.includes(home) &&
                teams.includes(away)
            );

        });

    }


    // ==============================
    // CRÉATION DE L'ANALYSE
    // ==============================

    function showAnalysis(match) {

        if (!match) {

            alert(
                "⚠️ Analyse indisponible pour ce match."
            );

            return;
        }


        // Supprime une ancienne fenêtre
        const oldPanel =
            document.getElementById(
                "alpha-analysis-panel"
            );


        if (oldPanel) {
            oldPanel.remove();
        }


        // Création du panneau
        const panel =
            document.createElement("div");


        panel.id =
            "alpha-analysis-panel";


        panel.innerHTML = `

            <div class="alpha-overlay">

                <div class="alpha-modal">

                    <button
                        class="alpha-close"
                        type="button"
                        aria-label="Fermer">
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

                        <h3>
                            📊 Probabilités
                        </h3>


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

                            <small>
                                ⏱️ Mi-temps
                            </small>

                            <strong>
                                ${match.halftime}
                            </strong>

                        </div>


                        <div>

                            <small>
                                🏁 Fin du match
                            </small>

                            <strong>
                                ${match.fulltime}
                            </strong>

                        </div>


                        <div>

                            <small>
                                ⚽ Buts
                            </small>

                            <strong>
                                ${match.goals}
                            </strong>

                        </div>


                        <div>

                            <small>
                                🔥 Confiance
                            </small>

                            <strong>
                                ${match.confidence}
                            </strong>

                        </div>

                    </div>


                    <div class="alpha-section">

                        <h3>
                            ⭐ Joueur / secteur clé
                        </h3>

                        <p>
                            ${match.keyPlayer}
                        </p>

                    </div>


                    <div class="alpha-section">

                        <h3>
                            🧠 Analyse Alpha
                        </h3>

                        <p>
                            ${match.analysis}
                        </p>

                    </div>


                    <div class="alpha-risk">

                        <h3>
                            ⚠️ Risque
                        </h3>

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

        const closeButton =
            panel.querySelector(".alpha-close");


        if (closeButton) {

            closeButton.addEventListener(
                "click",
                () => {

                    panel.remove();

                }
            );

        }


        // Fermer en cliquant à l'extérieur
        const overlay =
            panel.querySelector(".alpha-overlay");


        if (overlay) {

            overlay.addEventListener(
                "click",
                event => {

                    if (
                        event.target === overlay
                    ) {

                        panel.remove();

                    }

                }
            );

        }

    }


    // ==============================
    // BOUTONS D'ANALYSE
    // ==============================

    const buttons =
        document.querySelectorAll(
            ".analysis-btn"
        );


    console.log(
        "🔘 Boutons d'analyse trouvés :",
        buttons.length
    );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                console.log(
                    "⚡ Bouton Analyse Alpha cliqué"
                );


                const match =
                    findMatch(button);


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
                        "❌ Aucun match correspondant trouvé."
                    );


                    alert(
                        "⚠️ Analyse indisponible pour ce match."
                    );

                }

            }
        );

    });


    console.log(
        "✅ Alpha-Foot V7 prêt."
    );

});

    
