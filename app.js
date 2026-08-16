// ==========================================
// ALPHA-FOOT — APP.JS V5
// Moteur principal de l'application
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("⚽ Alpha-Foot V5 démarré");

    // -------------------------------
    // ANIMATION D'APPARITION
    // -------------------------------

    const cards = document.querySelectorAll(
        ".match-card, .card, section"
    );

    cards.forEach((card, index) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        card.style.transition = "opacity 0.5s ease, transform 0.5s ease";

        setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }, 100 + index * 100);
    });


    // -------------------------------
    // BOUTONS "VOIR L'ANALYSE"
    // -------------------------------

    const analysisButtons = document.querySelectorAll(
        "button, .analysis-button"
    );

    analysisButtons.forEach(button => {

        const text = button.textContent.trim().toLowerCase();

        if (
            text.includes("voir l'analyse") ||
            text.includes("voir l’analyse")
        ) {

            button.addEventListener("click", () => {

                alert(
                    "⚽ Analyse Alpha\n\n" +
                    "L'analyse détaillée du match sera bientôt disponible."
                );

            });

        }

    });


    // -------------------------------
    // HEURE LOCALE
    // -------------------------------

    function updateTime() {

        const timeElements = document.querySelectorAll(
            "[data-alpha-time]"
        );

        const now = new Date();

        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");

        const currentTime = `${hours}:${minutes}`;

        timeElements.forEach(element => {
            element.textContent = currentTime;
        });
    }

    updateTime();

    setInterval(updateTime, 60000);


    // -------------------------------
    // MESSAGE DE CONNEXION
    // -------------------------------

    console.log(
        "Alpha-Foot : système prêt."
    );

});
