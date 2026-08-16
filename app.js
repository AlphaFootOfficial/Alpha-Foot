// ==========================================
// ALPHA-FOOT — MOTEUR D'ANALYSE V6
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("⚽ Alpha-Foot V6 démarré");

    // ==============================
    // ANIMATION DES CARTES
    // ==============================

    const cards = document.querySelectorAll(
        ".match-card, .card, section"
    );

    cards.forEach((card, index) => {

        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        card.style.transition =
            "opacity 0.5s ease, transform 0.5s ease";

        setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }, 100 + index * 100);

    });


    // ==============================
    // DONNÉES DES MATCHS
    // ==============================

    const analyses = {

        "Séville-Rayo": {
            league: "LA LIGA",
            home: "Séville",
            away: "Rayo",

            homeWin: 47,
            draw: 29,
            awayWin: 24,

            score: "1 — 0",
            confidence: "7.2 / 10",

            halftime: "1 — 0",
            fulltime: "1 — 0",

            goals: "Moins de 3,5 buts",

            keyPlayer: "Attaque de Séville",

            analysis:
                "Séville possède un léger avantage grâce à sa capacité à contrôler le rythme du match. Rayo peut rester dangereux en transition, mais Alpha privilégie une rencontre relativement fermée.",

            risk:
                "Le principal risque est un but rapide de Rayo qui pourrait modifier complètement le scénario."
        },


        "Chelsea-Arsenal": {
            league: "PREMIER LEAGUE",
            home: "Chelsea",
            away: "Arsenal",

            homeWin: 31,
            draw: 28,
            awayWin: 41,

            score: "1 — 2",
            confidence: "7.5 / 10",

            halftime: "0 — 1",
            fulltime: "1 — 2",

            goals: "Plus de 1,5 buts",

            keyPlayer: "Secteur offensif d'Arsenal",

            analysis:
                "Arsenal présente un profil légèrement supérieur dans cette projection. Chelsea peut poser des problèmes à domicile, mais Alpha donne un avantage aux Gunners dans les moments décisifs.",

            risk:
                "Chelsea à domicile représente le principal facteur d'incertitude."
        },


        "Milan-Inter": {
            league: "SERIE A",
            home: "Milan",
            away: "Inter",

            homeWin: 29,
            draw: 30,
            awayWin: 41,

            score: "1 — 2",
            confidence: "7.1 / 10",

            halftime: "0 — 1",
            fulltime: "1 — 2",

            goals: "Plus de 1,5 buts",

            keyPlayer: "Milieu de terrain de l'Inter",

            analysis:
                "Inter possède un avantage dans cette projection grâce à son équilibre collectif. Milan reste capable de répondre, ce qui rend le match potentiellement disputé.",

            risk:
                "Un match très fermé peut favoriser le scénario du nul."
        }

    };


    // ==============================
    // IDENTIFICATION DU MATCH
    // ==============================

    function findAnalysis(button) {

        const card =
            button.closest(".match-card") ||
            button.closest(".card") ||
            button.closest("section") ||
            button.parentElement;

        const text = card
            ? card.innerText.toLowerCase()
            : "";

        for (const key in analyses) {

            const match = analyses[key];

            if (
                text.includes(match.home.toLowerCase()) &&
                text.includes(match.away.toLowerCase())
            ) {
                return match;
            }

        }

        return null;
    }


    // ==============================
    // CRÉATION DU PANNEAU
    // ==============================

    function showAnalysis(data) {

        const oldPanel =
            document.getElementById("alpha-analysis-panel");

        if (oldPanel) {
            oldPanel.remove();
        }


        const panel =
            document.createElement("div");

        panel.id = "alpha-analysis-panel";

        panel.innerHTML = `

            <div class="alpha-overlay">

                <div class="alpha-modal">

                    <button class="alpha-close">
                        ×
                    </button>

                    <div class="alpha-header">

                        <div class="alpha-label">
                            ANALYSE ALPHA
                        </div>

                        <h2>
                            ${data.home}
                            <span>VS</span>
                            ${data.away}
                        </h2>

                        <div class="alpha-league">
                            ${data.league}
                        </div>

                    </div>


                    <div class="alpha-section">

                        <h3>📊 Probabilités</h3>

                        <div class="probabilities">

                            <div>
                                <strong>
                                    ${data.homeWin}%
                                </strong>
                                <span>
                                    ${data.home}
                                </span>
                            </div>

                            <div>
                                <strong>
                                    ${data.draw}%
                                </strong>
                                <span>
                                    Match nul
                                </span>
                            </div>

                            <div>
                                <strong>
                                    ${data.awayWin}%
                                </strong>
                                <span>
                                    ${data.away}
                                </span>
                            </div>

                        </div>

                    </div>


                    <div class="alpha-score">

                        <small>
                            🎯 SCORE ALPHA
                        </small>

                        <strong>
                            ${data.score}
                        </strong>

                        <span>
                            Score exact le plus probable
                        </span>

                    </div>


                    <div class="alpha-grid">

                        <div>
                            <small>⏱️ Mi-temps</small>
                            <strong>
                                ${data.halftime}
                            </strong>
                        </div>

                        <div>
                            <small>🏁 Fin du match</small>
                            <strong>
                                ${data.fulltime}
                            </strong>
                        </div>

                        <div>
                            <small>⚽ Total buts</small>
                            <strong>
                                ${data.goals}
                            </strong>
                        </div>

                        <div>
                            <small>🔥 Confiance</small>
                            <strong>
                                ${data.confidence}
                            </strong>
                        </div>

                    </div>


                    <div class="alpha-section">

                        <h3>🧠 Analyse Alpha</h3>

                        <p>
                            ${data.analysis}
                        </p>

                    </div>


                    <div class="alpha-section">

                        <h3>⭐ Point clé</h3>

                        <p>
                            ${data.keyPlayer}
                        </p>

                    </div>


                    <div class="alpha-risk">

                        <h3>⚠️ Risque</h3>

                        <p>
                            ${data.risk}
                        </p>

                    </div>

                </div>

            </div>
        `;


        document.body.appendChild(panel);


        // ==============================
        // FERMETURE
        // ==============================

        const close =
            panel.querySelector(".alpha-close");

        close.addEventListener("click", () => {
            panel.remove();
        });


        panel
            .querySelector(".alpha-overlay")
            .addEventListener("click", (event) => {

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
    // BOUTONS ANALYSE
    // ==============================

    const buttons =
        document.querySelectorAll("button");

    buttons.forEach(button => {

        const text =
            button.textContent
                .trim()
                .toLowerCase();

        if (
            text.includes("voir l'analyse") ||
            text.includes("voir l’analyse")
        ) {

            button.addEventListener("click", () => {

                const data =
                    findAnalysis(button);

                if (data) {

                    showAnalysis(data);

                } else {

                    alert(
                        "⚽ Alpha-Foot\n\n" +
                        "Analyse de ce match bientôt disponible."
                    );

                }

            });

        }

    });


    console.log(
        "✅ Moteur d'analyse Alpha prêt"
    );

});
