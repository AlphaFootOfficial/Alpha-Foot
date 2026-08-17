document.addEventListener("DOMContentLoaded", () => {

    console.log("⚽ Alpha-Foot V8 démarré");

    if (typeof alphaMatches === "undefined") {
        console.error("❌ matches.js n'est pas chargé.");
        return;
    }

    console.log(
        "✅ matches.js chargé :",
        alphaMatches.length,
        "match(s)"
    );


    // ==============================
    // NORMALISATION
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

        if (!card) return null;

        const teams =
            normalizeText(
                card.dataset.teams || ""
            );

        return alphaMatches.find(match => {

            return (
                teams.includes(
                    normalizeText(match.home)
                ) &&
                teams.includes(
                    normalizeText(match.away)
                )
            );

        });

    }


    // ==============================
    // CRÉATION DE LA FENÊTRE
    // ==============================

    function showAnalysis(match) {

        const oldPanel =
            document.getElementById(
                "alpha-analysis-panel"
            );

        if (oldPanel) {
            oldPanel.remove();
        }


        const panel =
            document.createElement("div");

        panel.id =
            "alpha-analysis-panel";


        panel.innerHTML = `

        <div class="alpha-overlay">

            <div class="alpha-modal">

                <button
                    class="alpha-close"
                    type="button">
                    ×
                </button>


                <!-- HEADER -->

                <div class="alpha-header">

                    <div class="alpha-label">
                        ⚡ ANALYSE ALPHA V8
                    </div>

                    <h2>
                        ${match.home}
                        <span>VS</span>
                        ${match.away}
                    </h2>

                    <div class="alpha-league">
                        ${match.league} · ${match.time}
                    </div>

                </div>


                <!-- PROBABILITÉS -->

                <div class="alpha-section">

                    <h3>
                        📊 Probabilités Alpha
                    </h3>

                    <div class="probabilities">

                        <div>
                            <strong>
                                ${match.probabilities.home}%
                            </strong>

                            <span>
                                ${match.home}
                            </span>
                        </div>

                        <div>
                            <strong>
                                ${match.probabilities.draw}%
                            </strong>

                            <span>
                                Nul
                            </span>
                        </div>

                        <div>
                            <strong>
                                ${match.probabilities.away}%
                            </strong>

                            <span>
                                ${match.away}
                            </span>
                        </div>

                    </div>

                </div>


                <!-- SCORE -->

                <div class="alpha-score">

                    <small>
                        🎯 SCORE PRINCIPAL
                    </small>

                    <strong>
                        ${match.score.principal}
                    </strong>

                </div>


                <!-- SCORES ALTERNATIFS -->

                <div class="alpha-section">

                    <h3>
                        🎯 Scénarios alternatifs
                    </h3>

                    <div class="alpha-grid">

                        <div>
                            <small>
                                Alternative 1
                            </small>

                            <strong>
                                ${match.score.alternatif1}
                            </strong>
                        </div>

                        <div>
                            <small>
                                Alternative 2
                            </small>

                            <strong>
                                ${match.score.alternatif2}
                            </strong>
                        </div>

                    </div>

                </div>


                <!-- RÉSULTAT -->

                <div class="alpha-section">

                    <h3>
                        🏁 Projection du résultat
                    </h3>

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

                    </div>

                </div>


                <!-- MARCHÉS -->

                <div class="alpha-section">

                    <h3>
                        ⚽ Marchés
                    </h3>

                    <div class="alpha-grid">

                        <div>
                            <small>
                                BTTS
                            </small>

                            <strong>
                                ${match.markets.btts}
                            </strong>
                        </div>

                        <div>
                            <small>
                                Over 1.5
                            </small>

                            <strong>
                                ${match.markets.over15}
                            </strong>
                        </div>

                        <div>
                            <small>
                                Over 2.5
                            </small>

                            <strong>
                                ${match.markets.over25}
                            </strong>
                        </div>

                        <div>
                            <small>
                                Over 3.5
                            </small>

                            <strong>
                                ${match.markets.over35}
                            </strong>
                        </div>

                    </div>

                </div>


                <!-- BUTS -->

                <div class="alpha-score">

                    <small>
                        ⚽ PROJECTION BUTS
                    </small>

                    <strong
                        style="
                        font-size:22px;
                        margin-top:10px;
                        ">
                        ${match.goals}
                    </strong>

                </div>


                <!-- CONFIANCE -->

                <div class="alpha-section">

                    <h3>
                        🔥 Confiance Alpha
                    </h3>

                    <div class="alpha-confidence">

                        <div class="confidence-number">
                            ${match.confidence}/10
                        </div>

                        <div class="confidence-bar">

                            <div
                                class="confidence-fill"
                                style="
                                width:${match.confidence * 10}%;
                                ">
                            </div>

                        </div>

                    </div>

                </div>


                <!-- SECTEUR CLÉ -->

                <div class="alpha-section">

                    <h3>
                        ⭐ Secteur clé
                    </h3>

                    <p>
                        ${match.keyPlayer}
                    </p>

                </div>


                <!-- ANALYSE -->

                <div class="alpha-section">

                    <h3>
                        🧠 Analyse Alpha
                    </h3>

                    <p>
                        ${match.analysis}
                    </p>

                </div>


                <!-- SCÉNARIO -->

                <div class="alpha-section">

                    <h3>
                        🎬 Scénario du match
                    </h3>

                    <p>
                        ${match.scenario}
                    </p>

                </div>


                <!-- RISQUE -->

                <div class="alpha-risk">

                    <h3>
                        ⚠️ Facteur de risque
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
            panel.querySelector(
                ".alpha-close"
            );

        closeButton.addEventListener(
            "click",
            () => {
                panel.remove();
            }
        );


        const overlay =
            panel.querySelector(
                ".alpha-overlay"
            );

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


        console.log(
            "✅ Analyse V8 affichée :",
            match.home,
            "vs",
            match.away
        );

    }


    // ==============================
    // BOUTONS
    // ==============================

    const buttons =
        document.querySelectorAll(
            ".analysis-btn"
        );

    console.log(
        "🔘 Boutons trouvés :",
        buttons.length
    );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const match =
                    findMatch(button);

                if (match) {

                    showAnalysis(match);

                } else {

                    alert(
                        "⚠️ Analyse indisponible."
                    );

                }

            }
        );

    });


    console.log(
        "✅ Alpha-Foot V8 prêt."
    );

});
