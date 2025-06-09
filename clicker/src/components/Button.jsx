const Button = ({ title = "default-button", action }) => {
    return <button onClick={action}>{title}</button>;
};

export default Button;
