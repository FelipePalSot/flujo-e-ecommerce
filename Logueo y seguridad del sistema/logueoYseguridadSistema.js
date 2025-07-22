let N = 0; 
const MAX_ATTEMPTS = 4;


const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('login-button');
const messageContainer = document.getElementById('message-container');


loginButton.addEventListener('click', handleLogin);

function handleLogin() {
   
    const userCredential = usernameInput.value;
    const passwordCredential = passwordInput.value;

   
    const hashSecret = "ABC123";
    const hashFinal = userCredential + passwordCredential + hashSecret;
    let foundKey = null;

    
    const hashStore = {
        hashZero: "userStudent0passwordStudent0ABC123",
        hashOne: "userStudent1passwordStudent1ABC123",
        hashTwo: "userStudent2passwordStudent2ABC123",
        hashThree: "userStudent3passwordStudent3ABC123",
        hashFour: "userStudent4passwordStudent4ABC123",
        hashFive: "userStudent5passwordStudent5ABC123",
    };

    
    for (const key in hashStore) {
        if (hashStore[key] === hashFinal) {
            foundKey = key;
            break;
        }
    }

   
    if (foundKey) {
        messageContainer.innerHTML = "Credenciales Correctas. Accediendo...";
        messageContainer.className = 'message success';
        disableForm();
    } else {
        N++;
        if (N < MAX_ATTEMPTS) {
            messageContainer.innerHTML = `❌ Credenciales incorrectas. Intento ${N} de ${MAX_ATTEMPTS}.`;
            messageContainer.className = 'message error';
        } else {
            messageContainer.innerHTML = `🚨 EL LOGIN HA SIDO BLOQUEADO (Máximo de ${N} intentos alcanzado).`;
            messageContainer.className = 'message lockout';
            disableForm();
        }
    }
}