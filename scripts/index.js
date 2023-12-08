const states={
    values:{
        heroName:"Nome do Herói",
        wins:0,
        ranking:"Ferro",
        defeats:0,
        balance:0,
    },
    views:{
        heroName: document.getElementById("heroName"),
        wins: document.getElementById("wins"),
        defeats: document.getElementById("defeats"),
        btnCalcular: document.getElementById("btnCalcular"),
        dataAreaCharacter: document.querySelector("#dataCharacter"),
    }
}

const validateWinsDefeats=(number)=>{
    if(isNaN(number)|| number<0){
        alert("Informe um valor válido! caso contrário, zero será atribuído como valor para a quantidade de vitórias.");
        return 0;
    }
    else{
        return number;
    }
    
}

const createElement = (element)=>{
    return document.createElement(element)
}

const removeResult=()=>{
    const dataAreaCharacter = states.views.dataAreaCharacter;
    const children = document.querySelectorAll(".data")
    children.forEach((child)=>{
        dataAreaCharacter.removeChild(child);
    })
}

const determineRanking = (wins, defeats)=>{
    const balanceWinsLosses = wins - defeats;
    if(balanceWinsLosses<=10){
        return "Ferro";
    }
    else if(balanceWinsLosses>=11 && balanceWinsLosses<=20){
        return "Bronze";
    }
    else if(balanceWinsLosses>=21 && balanceWinsLosses<=50){
        return "Prata";
    }
    else if(balanceWinsLosses>=51 && balanceWinsLosses<=80){
        return "Ouro";
    }
    else if(balanceWinsLosses>=81 && balanceWinsLosses<=90){
        return "Diamante";
    }
    else if(balanceWinsLosses>=91 && balanceWinsLosses<=100){
        return "Lendário";
    }
    else if(balanceWinsLosses>=101){
        return "Imortal";
    }

}

const calculateRankedMatch = (wins,defeats)=>{
    return determineRanking(wins,defeats);
}

const clearInput=()=>{
    states.views.heroName.value=""
    states.views.wins.value=""
    states.views.defeats.value=""
}

const createResult = () =>{
    const nameCharacter = createElement("td");
    const wd = createElement("td")
    const ranking = createElement("td")
    const dataAreaCharacter = states.views.dataAreaCharacter;
    
    nameCharacter.className = "data"
    wd.className = "data"
    ranking.className = "data"
    
    nameCharacter.innerText=states.values.heroName;
    wd.innerText=(states.values.balance);
    states.values.ranking = calculateRankedMatch(states.values.wins, states.values.defeats);
    ranking.innerText = states.values.ranking;
    dataAreaCharacter.append(nameCharacter, wd, ranking);
    
}


const handleClick=()=>{
    removeResult()
    states.values.heroName = states.views.heroName.value==""? "Nome do Herói" : states.views.heroName.value;
    states.values.wins = validateWinsDefeats(states.views.wins.value);
    states.values.defeats = validateWinsDefeats(states.views.defeats.value);
    states.values.balance = states.values.wins-states.values.defeats;
    createResult();
    clearInput();
    setTimeout(()=>{
        alert(`O herói tem um saldo de ${states.values.balance} e está no nível de ${states.values.ranking}`)
    },500);
}

states.views.btnCalcular.addEventListener("click",handleClick)