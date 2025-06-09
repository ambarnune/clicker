// CONTADOR DE TIEMPO
const [intervalId, setIntervalId] = useState(0);
const [mainMiliseconds, setMainMiliseconds] = useState(0);
const playTimer = () => { 

  if(intervalId) {
    clearInterval(intervalId);
    setIntervalId(0);
  }
  
  const newIntervalId = setInterval( () =>{
    setMainMiliseconds( mainMiliseconds => mainMiliseconds + 1000 )
  }, 1000)
  
  setIntervalId(newIntervalId);
}

const resetTimer = () =>{
  setMainMiliseconds(0)
  if(intervalId) {
    clearInterval(intervalId);
    setIntervalId(0);
  }
}

return (
  <div className="container middle">
    { 
      stateGame === 0 ?
      <MainScreen 
        setStart={changeStateGame} 
        level={level} 
        changeDifficulty={changeDifficulty} 
      /> : stateGame === 1 ?
      <GameScreen 
        numCards={cardsByLevel[level]} 
        setRestart = {restartGame}
        setFinish={changeStateGame} 
        time={mainMiliseconds}
      /> : <FinishScreen setRestart={restartGame} />
    }
  </div>
);
