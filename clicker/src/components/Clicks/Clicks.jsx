// Componente que muestra la cantidad actual de clicks realizados durante la partida.
// Recibe como prop el conteo de clicks y lo muestra --> orienta al jugador
import "./Clicks.css";
const buttonStyle = {
    backgroundColor: "#0d5eff",
    color: "white",
    border: "none",
    padding: "16px 32px",
    fontSize: "1.2rem",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background 0.2s",
};

const Button = ({ title = "default-button", action, disabled = false }) => {
    return (
        <button style={buttonStyle} onClick={action} disabled={disabled}>
            {title}
        </button>
    );
};
export default function Clicks({ count }) {
    // Renderiza el número de clicks en pantalla
    return <div style={{ textAlign: "center" }}>Clicks: {count}</div>;
}
