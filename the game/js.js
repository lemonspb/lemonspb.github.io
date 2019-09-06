class People {
    constructor(name){
        this.name = name;
        this.hp = 100;
        this.fullHp = 100;
        this.dmg = 20;
    }
    attack(aim){
        aim.hp -= Math.random() * (5 - (-5)) + (-5) + this.dmg;
    }
}

const battleFinish = document.querySelector('.battle__finish');
const inputName = document.querySelector('.input__name');
const attackButton = document.querySelector('.battle__buttons-attack');
const p1 = new People();
const p2 = new People('толян');
const p1hp = document.querySelector('#player1-hp .battle__hp-bar');
const p2hp = document.querySelector('#player2-hp .battle__hp-bar');


attackButton.addEventListener('click', ()=>{
    p1.attack(p2);

    const width2 = parseInt((p2.hp/p2.fullHp)*100) > 0 ? parseInt((p2.hp/p2.fullHp)*100) + '%' : '0%';
    p2hp.style.width = width2;

    if (p2.hp <= 0) {
        attackButton.classList.add('hidden');
        battleFinish.innerText = 'You win!'
    } else {
        p2.attack(p1);
        const width1 = parseInt((p1.hp/p1.fullHp)*100) > 0 ? parseInt((p1.hp/p1.fullHp)*100) + '%' : '0%';
        p1hp.style.width = width1;
    }
    if (p1.hp <= 0) {
        attackButton.classList.add('hidden');
        battleFinish.innerText = 'You lose!'
    }

});

document.querySelector('.go').addEventListener('click', ()=>{
    const p1Name = document.querySelector('#player1-hp .battle__hp-name');
    const p2Name = document.querySelector('#player2-hp .battle__hp-name');

    p1Name.innerText = inputName.value !== '' ? inputName.value : 'Player 1';
    p2Name.innerText = p2.name !== '' ? p2.name : 'Player 2';
    p1.name = inputName.value;

    document.querySelector('.enter').classList.add('hidden');
    document.querySelector('.battle').classList.remove('hidden');
});

