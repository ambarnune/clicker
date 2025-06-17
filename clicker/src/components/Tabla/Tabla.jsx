//ResultsTable
// Componente que muestra la tabla de resultados y los botones para
// reintentar o volver al inicio.

export default function Tabla({ results, onRetry, onBack }) {
    return (
        <div className="results-container">
            <h2>Resultados</h2>
            {/* Lista de resultados de cada partida */}
            <table className="table">
                <thead>
                    <tr>
                        <th>Nivel</th>
                        <th>Clicks</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((result, idx) => (
                        <tr key={idx}>
                            <td>{result.level}</td>
                            <td>{result.clicks}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
