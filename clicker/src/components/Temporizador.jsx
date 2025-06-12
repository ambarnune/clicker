//Timer
import { useEffect } from "react";

export default function Timer({ timeLeft, setTimeLeft, onFinish }) {
    useEffect(() => {
        if (timeLeft <= 0) {
            onFinish();
            return;
        }
        //const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
        return () => clearTimeout(timer);
    }, [timeLeft, setTimeLeft, onFinish]);

    return <div>Tiempo restante: {timeLeft}s</div>;
}
