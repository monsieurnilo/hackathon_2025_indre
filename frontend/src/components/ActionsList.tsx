const actions = [
    {
        title: "Visualiser la couverture médicale",
        items: [
            "Carte interactive avec les données de couverture médicale",
            "Consulter les zones médicalement sous-dotées",
        ],
    },
    {
        title: "Observations sur les communes",
        items: [
            "Consulter les données de chaque commune : population, médecins disponibles",
            "Comparer les indicateurs locaux",
        ],
    },
    {
        title: "Recommandations d'actions",
        items: [
            "Propositions d'actions en fonction des indicateurs",
            "Indice de pertinence des interventions par commune",
        ],
    },
];

const ActionList = () => {
    return (
        <main className="container">
            <h1>Documentation des fonctionnalités</h1>
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
        </main>
    );
};

export default ActionList;
