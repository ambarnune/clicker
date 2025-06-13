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
// Defino los niveles disponibles con su nombre y tiempo asignado
const LEVELS = [
    { name: "Fácil", time: 10 },
    { name: "Medio", time: 7 },
    { name: "Difícil", time: 5 },
];

export default function App() {
    // Estado para controlar en qué pantalla está el usuario
    const [screen, setScreen] = useState("level"); // "level", "game", "results"

    // Estado para guardar el nivel seleccionado por el usuario
    const [selectedLevel, setSelectedLevel] = useState(null);

    // Estado para el tiempo restante de la partida actual
    const [timeLeft, setTimeLeft] = useState(0);

    // Estado que guarda la cantidad de clicks hechos durante la partida
    const [clicks, setClicks] = useState(0);

    // Estado para almacenar los resultados de todas las partidas jugadas
    const [currentResults, setCurrentResults] = useState([]);

    // Función para iniciar el juego con el nivel seleccionado
    const startGame = () => {
        setClicks(0); // Reseteo el contador de clicks
        setTimeLeft(selectedLevel.time); // Seteo el tiempo según el nivel
        setScreen("game"); // Cambio la pantalla a la del juego
    };

    // Función que se ejecuta al finalizar el tiempo de juego
    const finishGame = () => {
        // Agrego el resultado actual a la lista de resultados
        setCurrentResults((prev) => [...prev, { level: selectedLevel.name, clicks }]);
        setScreen("results"); // Cambio la pantalla a resultados
    };

    // Función para reintentar la partida en el mismo nivel
    const retryGame = () => {
        setClicks(0); // Reseteo los clicks
        setTimeLeft(selectedLevel.time); // Vuelvo a poner el tiempo según nivel
        setScreen("game"); // Vuelvo a la pantalla de juego
    };

    // Función para volver a la selección de nivel
    const goToStart = () => {
        setScreen("level"); // Cambio la pantalla a selección de nivel
        setSelectedLevel(null); // Deselecciono el nivel
    };

    // Renderizado condicional de componentes según pantalla
    return (
        <div className="app">
            {/* Pantalla de selección de nivel */}
            {screen === "level" && (
                <>
                    {/* Componente para elegir el nivel */}
                    <LevelSelector levels={LEVELS} selectedLevel={selectedLevel} onSelectLevel={setSelectedLevel} />
                </>
            )}
            {/* Botón para comenzar la partida solo si hay un nivel seleccionado y pantalla de selección de nivel */}
            {/* Pantalla de inicio con el botón "Comenzar" */}
            {screen === "start" && selectedLevel && <Button title="Comenzar" action={startGame} />}

            {/* Pantalla de juego */}
            {screen === "game" && (
                <>
                    {/* Componente que muestra el timer y controla el fin del juego */}
                    <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} onFinish={finishGame} />
                    {/* Componente que muestra la cantidad de clicks actuales */}
                    <ClickCounter count={clicks} />
                    {/* Botón para sumar clicks durante la partida */}
                    <Button title="Click" action={() => setClicks((c) => c + 1)} />
                </>
            )}

            {/* Pantalla de resultados */}
            {screen === "results" && <ResultsTable results={currentResults} onRetry={retryGame} onBack={goToStart} />}
        </div>
    );
}
