// Componente reutilizable para cualquier botón de la app.
// Recibe el texto del botón (title), una función para ejecutar
//  al hacer click (action) y si debe estar deshabilitado
// (disabled).
import "./Button.css"; // Importa estilos específicos para el botón
const buttonStyle = {
    backgroundColor: "#4CAF50", // Verde
    color: "white",
    border: "none",
    padding: "16px 32px",
    fontSize: "1.2rem",
    borderRadius: "90px",
    cursor: "pointer",
    transition: "background 0.2s",
    spaceBetween: "20px",
};

const Button = ({ title = "default-button", action, disabled = false }) => {
    // Renderiza un <button> estándar de HTML con los props recibidos.
    // onClick llama a la función action. El botón puede estar deshabilitado.
    return (
        <button style={buttonStyle} onClick={action} disabled={disabled}>
            {title}
        </button>
    );
};
export default Button;
