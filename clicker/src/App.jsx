import { useState, useCallback } from "react";
import { useEffect } from "react";
import Button from "./components/Button/Button";
import LevelSelector from "./components/Nivel/Nivel";
import Temporizador from "./components/Timer/Temporizador";
import Clicks from "./components/Clicks/Clicks";
import ResultsTable from "./components/Tabla/Tabla";
//Todos los useState viven en App.jsx y se pasan como props a los componentes hijos
// Importar los componentes necesarios: Button, Nivel, Temporizador, Clicks, Tabla
// Los niveles del juego
// Defino los niveles disponibles con su nombre y tiempo asignado
const LEVELS = [
    { name: "Fácil", time: 8 },
    { name: "Medio", time: 4 },
    { name: "Difícil", time: 1 },
];

export default function App() {
    // Estado para controlar en qué pantalla está el usuario
    const [screen, setScreen] = useState("level"); // 4 secciones: nivel, empezar, juego y resultados

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
        setScreen("game"); // Cambio la pantalla a la del juego -->(provisorio hasta lograr la screen de comienzo)
    };

    // Función que se ejecuta al finalizar el tiempo de juego
    const finishGame = useCallback(() => {
        setCurrentResults((prev) => [...prev, { level: selectedLevel.name, clicks }]);
        setScreen("results");
    }, [selectedLevel, clicks, setCurrentResults, setScreen]);

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

    // HECHO CON COPILOT:
    // useEffect para manejar el temporizador del juego
    // Este efecto se activa cuando la pantalla es "game"
    useEffect(() => {
        if (screen === "game") {
            const interval = setInterval(() => {
                setTimeLeft((prevTime) => {
                    // Restamos 0.01
                    if (prevTime <= 0.01) {
                        clearInterval(interval);
                        finishGame();
                        return 0;
                    }
                    return +(prevTime - 0.01).toFixed(2); // Redondeamos a 2 decimales
                });
            }, 10); // 10ms = 0.01 segundos

            return () => clearInterval(interval);
        }
    }, [screen, finishGame]);

    // Renderizado condicional de componentes según pantalla
    return (
        <div>
            <div className="app">
                {/* Pantalla de selección de nivel */}
                {screen === "level" && (
                    <>
                        {/* Solo selector de nivel */}
                        <LevelSelector
                            levels={LEVELS}
                            selectedLevel={selectedLevel}
                            onSelectLevel={(level) => {
                                setSelectedLevel(level);
                                setScreen("start"); // Pasa a pantalla "start" luego de seleccionar nivel
                            }}
                        />
                    </>
                )}
                {/* Nueva pantalla: solo botón comenzar */}
                {screen === "start" && selectedLevel && <Button title="Comenzar" action={startGame} />}

                {/* Pantalla de juego - REHECHA CON COPILOT */}
                {screen === "game" && (
                    <>
                        {/* Timer y clicks visibles durante la partida */}
                        <Temporizador timeLeft={timeLeft} setTimeLeft={setTimeLeft} onFinish={finishGame} />
                        <Clicks count={clicks} />
                        <Button title="Click" action={() => setClicks((prev) => prev + 1)} />
                    </>
                )}

                {/* Pantalla de resultados */}
                {screen === "results" && (
                    <>
                        <ResultsTable results={currentResults} />
                        <Button title="Volver a inicio" action={goToStart} />
                        <Button title="Reiniciar" action={retryGame} />
                    </>
                )}
            </div>
        </div>
    );
}
