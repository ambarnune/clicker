//LevelSelector
import Button from "./Button";

export default function LevelSelector({ levels, selectedLevel, onSelectLevel }) {
    return (
        <div>
            <h2>Selecciona un nivel:</h2>
            {levels.map((level) => (
                <Button
                    key={level.name}
                    title={level.name}
                    action={() => onSelectLevel(level)}
                    disabled={selectedLevel && selectedLevel.name === level.name}
                />
            ))}
        </div>
    );
}
