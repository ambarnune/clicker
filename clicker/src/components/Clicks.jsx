// Componente que muestra la cantidad actual de clicks realizados durante la partida.
// Recibe como prop el conteo de clicks y lo muestra.

export default function ClickCounter({ count }) {
    // Renderiza el número de clicks en pantalla
    return <div>Clicks: {count}</div>;
}
