export const pointsCalculation = (predictedResult, actualResult) => {
    if (predictedResult === actualResult) {
        return 3;
    } else {
        predArray = predictedResult.split('-');
        actArray = actualResult.split('-');
        const predWinner = findWinner(predArray[0], predArray[1]);
        const actualWinner = findWinner(actArray[0], actArray[1]);
        if(predWinner !== actualWinner) {
            return 0;
        } else {
            const gamePoints = findCloseScore(predArray, actArray);
            return gamePoints;
        }
    }
}

const findWinner = (teamAScore, teamBScore) => {
    if(parseInt(teamAScore) > parseInt(teamBScore)) {
        return 'teamA'
    } else if(parseInt(teamAScore) < parseInt(teamBScore)) {
        return 'teamB'
    } else {
        return 'draw'
    }
}

const findCloseScore = (predArray, actArray) => {
    if(Math.abs(parseInt(predArray[0]) - parseInt(actArray[0])) > 2 &&
        Math.abs(parseInt(predArray[0]) - parseInt(actArray[0])) > 2) {
        return 1.5;
    } else {
        return 1;
    }
}