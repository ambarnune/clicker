import { useState } from "react";
import Button from "./components/Button";
import LevelSelector from "./components/Nivel";
import Timer from "./components/Temporizador";
import ClickCounter from "./components/Clicks";
import ResultsTable from "./components/Tabla";
//Todos los useState viven en App.jsx y se pasan como props a los componentes hijos
// Importar los componentes necesarios
// Button, Nivel, Temporizador, Clicks, Tabla

// Definir los niveles del juego
// Cada nivel tiene un nombre y un tiempo límite en segundos
const LEVELS = [
    { name: "Fácil", time: 20 },
    { name: "Medio", time: 10 },
    { name: "Difícil", time: 5 },
];

export default function App() {
    const [screen, setScreen] = useState("level"); // "level", "game", "results"
    // Estado para elegir nivel
    const [selectedLevel, setSelectedLevel] = useState(null);
    // Estado para el temporizador y contador de clicks
    const [timeLeft, setTimeLeft] = useState(0);
    const [clicks, setClicks] = useState(0);
    // Estado para resultados actuales
    const [currentResults, setCurrentResults] = useState([]);

    // Función para comenzar juego
    const startGame = () => {
        setClicks(0);
        setTimeLeft(selectedLevel.time);
        setScreen("game");
    };
    // Función para terminar juego
    const finishGame = () => {
        setCurrentResults((prev) => [...prev, { level: selectedLevel.name, clicks }]);
        setScreen("results");
    };

    // Función para reintentar juego
    const retryGame = () => {
        setClicks(0);
        setTimeLeft(selectedLevel.time);
        setScreen("game");
    };

    // Función para volver a inicio
    const goToStart = () => {
        setScreen("level");
        setSelectedLevel(null);
    };

    return (
        <div className="app">
            {screen === "level" && <LevelSelector levels={LEVELS} selectedLevel={selectedLevel} onSelectLevel={setSelectedLevel} />}
            {screen === "level" && selectedLevel && <Button title="Comenzar" action={startGame} />}
            {screen === "game" && (
                <>
                    <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} onFinish={finishGame} />
                    <ClickCounter count={clicks} />
                    <Button title="Click" action={() => setClicks((c) => c + 1)} />
                </>
            )}
            {screen === "results" && <ResultsTable results={currentResults} onRetry={retryGame} onBack={goToStart} />}
        </div>
    );
}

//primer intento sin los componentes:
// const App = () => {
//    const [counter, setCounter] = useState(0);
//    return (
//        <div className="app">
//            <h1>{counter}</h1>
//            <Button title="Agregar" action={() => setCounter(counter + 1)} />
//        </div>
//    );
//};
