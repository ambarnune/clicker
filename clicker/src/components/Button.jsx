const Button = ({ title = "default-button", action, disabled = false }) => {
    return (
        <button onClick={action} disabled={disabled}>
            {title}
        </button>
    );
};
export default Button;
