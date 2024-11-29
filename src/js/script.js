// Game Variables
let charName = '';
let charClass = '';
let charHP = 100;
let enemyName = 'Erro Fatal';
let enemyHP = 50;
let enemyHPIncrement = 0; // Incremento inicial é 0
let isGameOver = false; // Controle do estado do jogo



// DOM Elements
const nameInput = document.getElementById('name');
const classSelect = document.getElementById('class');
const startGameButton = document.getElementById('start-game');
const charNameDisplay = document.getElementById('char-name');
const charClassDisplay = document.getElementById('char-class');
const charHPDisplay = document.getElementById('char-hp');
const enemyHPDisplay = document.getElementById('enemy-hp');
const logDisplay = document.getElementById('log');
const gameArea = document.getElementById('game-area');
const charCreation = document.getElementById('character-creation');

// Start Game
startGameButton.addEventListener('click', () => {
    charName = nameInput.value || 'Dev Anônimo';
    charClass = classSelect.value;

    charNameDisplay.textContent = charName;
    charClassDisplay.textContent = charClass.charAt(0).toUpperCase() + charClass.slice(1);

    charCreation.classList.add('hidden');
    gameArea.classList.remove('hidden');

    updateLog(`Bem-vindo, ${charName}! Prepare-se para lutar contra os bugs.`);
});

// Game Actions
function attack() {
  if (isGameOver) return; // Impede ações após o jogo terminar

  const damage = Math.floor(Math.random() * 20) + 5;
  enemyHP -= damage;
  enemyHP = Math.max(enemyHP, 0); // Impede valores negativos
  enemyHPDisplay.textContent = enemyHP;

  updateLog(`${charName} atacou o ${enemyName}, causando ${damage} de dano.`);

  if (enemyHP <= 0) {
      updateLog(`${charName} derrotou o ${enemyName}!`);
      isGameOver = true; // Marca o jogo como terminado
  } else {
      enemyAttack();
  }
}

function defend() {
    updateLog(`${charName} se defendeu e reduziu o dano do próximo ataque.`);
}

function heal() {
  const healAmount = Math.floor(Math.random() * 15) + 10;
    charHP += healAmount;
    charHP = Math.min(charHP, 100);
    charHPDisplay.textContent = charHP;

    updateLog(`${charName} usou uma poção e recuperou ${healAmount} HP.`);
}

// Enemy Attack
function enemyAttack() {
  if (charHP <= 0) return;// Impede o ataque se o personagem estiver morto
  const damage = Math.floor(Math.random() * 20) + 5;
    charHP -= damage;
    charHP = Math.max(charHP, 0);
    charHPDisplay.textContent = charHP;

    updateLog(`${enemyName} atacou ${charName}, causando ${damage} de dano.`);

    if (charHP <= 0) {
    updateLog(`${charName} foi derrotado! Fim de jogo.`);
    isGameOver = true; // Marca o jogo como terminado
}
}


// Log Updates
function updateLog(message) {
    logDisplay.innerHTML = `<p>${message}</p>`;
}

// DOM Elements
const characters = document.querySelectorAll('.character-card');

// Função para mostrar apenas o personagem selecionado
function showSelectedCharacter(selectedClass) {
    characters.forEach(character => {
        if (character.dataset.class === selectedClass) {
            character.classList.add('active');
        } else {
            character.classList.remove('active');
        }
    });
}

// Exemplo de como usar a função (ao iniciar o jogo)
document.getElementById('start-game').addEventListener('click', () => {
    const selectedClass = document.getElementById('class').value; // Valor da classe selecionada
    showSelectedCharacter(selectedClass);
});

// Seleciona os elementos do DOM
const scene = document.getElementById('scene');
const character = document.getElementById('character');

const restartGameButton = document.getElementById("restart-game");
const characterCreation = document.getElementById("character-creation");
const log = document.getElementById("log");

// Estados iniciais
const initialState = {
    charName: "",
    charClass: "",
    charHP: 100,
    enemyName: "Erro Fatal",
    enemyHP: 50,
    log: "O jogo começou! Enfrente os bugs!"
};

// Função para iniciar o jogo
startGameButton.addEventListener("click", () => {
    const name = charName.value.trim();
    const selectedClass = charClass.value;

    if (!name) {
        alert("Por favor, insira um nome para o personagem.");
        return;
    }

    // Configurar os status iniciais do personagem e do inimigo
    charNameDisplay.textContent = name;
    charClassDisplay.textContent = selectedClass.charAt(0).toUpperCase() + selectedClass.slice(1);
    charHP.textContent = initialState.charHP;
    enemyName.textContent = initialState.enemyName;
    enemyHP.textContent = initialState.enemyHP;

    // Mostrar a área de jogo e ocultar a criação de personagem
    characterCreation.classList.add("hidden");
    gameArea.classList.remove("hidden");

    // Atualizar o log
    log.innerHTML = `<p>${initialState.log}</p>`;
});

// Função para reiniciar o jogo
restartGameButton.addEventListener("click", () => {
  // Resetar os valores iniciais nas variáveis
  enemyHPIncrement += 50;
  charName = "";
  charClass = "";
  charHP = initialState.charHP;
  enemyHP = initialState.enemyHP+ enemyHPIncrement;

  isGameOver = false;  // Garantir que o jogo não esteja finalizado

  // Resetar os valores exibidos no DOM
  charNameDisplay.textContent = "";
  charClassDisplay.textContent = "";
  charHPDisplay.textContent = charHP; // Atualiza o valor no DOM
  enemyHPDisplay.textContent = enemyHP+ enemyHPIncrement;// Atualiza o valor no DOM

  // Resetar o input e a seleção
  nameInput.value = "";
  classSelect.value = "mago"; // Classe padrão

  // Ocultar a área de jogo e voltar à criação de personagem
  gameArea.classList.add("hidden");
  characterCreation.classList.remove("hidden");

  // Atualizar o log
  log.innerHTML = `<p>${initialState.log}</p>`;
});
