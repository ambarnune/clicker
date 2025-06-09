import { useState } from "react";
import Button from "./components/Button";

const App = () => {
    const [counter, setCounter] = useState(0);
    return (
        <div className="app">
            <h1>{counter}</h1>
            <Button title="Agregar" action={() => setCounter(counter + 1)} />
            <Button title="Restar" action={() => setCounter(counter - 1)} />
            <Button title="Dividir" action={() => setCounter(counter / 2)} />
            <Button title="Duplicar" action={() => setCounter(counter * 2)} />
        </div>
    );
};

export default App;
