const actions = [
    {
        title: "Visualiser la couverture médicale",
        items: [
            "Afficher une carte interactive des zones couvertes et non couvertes par des professionnels de santé.",
            "Comparer les ratios médecins/population par région à l'aide de graphiques ou tableaux.",
        ],
    },
    {
        title: "Observations sur les communes",
        items: [
            "Consulter les données de chaque commune : population, médecins disponibles.",
            "Comparer les indicateurs locaux entre communes pour identifier les écarts.",
        ],
    },
    {
        title: "Recommandations d'actions",
        items: [
            "Long terme : Encourager les étudiants avec des CESP, stages, et améliorer l'attractivité des zones.",
            "Court terme : Offrir des primes, regrouper les professionnels (maisons de santé, centres solidaires), installer des bornes de téléconsultation ou mobiliser des médecins itinérants.",
        ],
    },
];

const links = [
    {
        label: "Lien vers recommandations long terme",
        url: "https://www.indy.fr/guide/creation-entreprise/financer/aides/aides-pour-les-professions-medicales-et-paramedicales/aides-installation-deserts-medicaux/#:~:text=Cette%20aide%20est%20dégressive%20si,d%27exercice%20libéral%20par%20semaine.",
    },
    {
        label: "Lien vers recommandations court terme",
        url: "https://www.senat.fr/rap/r21-589/r21-589_mono.html",
    },
];

const ActionList = () => {
    return (
        <main className="container">
            <h1>Documentation des fonctionnalités</h1>
            <p>Voici une liste des fonctionnalités et recommandations pour améliorer la couverture médicale.</p>
            <p>Cette liste est divisée en trois sections principales : </p>
            <ul>
                <li>Visualiser la couverture médicale</li>
                <li>Observations sur les communes</li>
                <li>Recommandations d'actions</li>
            </ul>
            <p>Chaque section contient des actions spécifiques que vous pouvez entreprendre.</p>
            <p>Enfin, des liens vers des recommandations plus détaillées sont fournis.</p>
            {actions.map((action, index) => (
                <section key={index}>
                    <h2>{action.title}</h2>
                    <ul>
                        {action.items.map((item, subIndex) => (
                            <li key={subIndex}>{item}</li>
                        ))}
                    </ul>
                </section>
            ))}
            <section>
                <h2>Liens vers les recommandations</h2>
                <ul>
                    {links.map((link, index) => (
                        <li key={index}>
                            <a href={link.url} target="_blank" rel="noopener noreferrer">
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
};

export default ActionList;
