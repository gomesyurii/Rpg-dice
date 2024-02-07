
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x888888);
document.body.appendChild(renderer.domElement);


const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1).normalize();
scene.add(light);


const geometry = new THREE.IcosahedronGeometry(1, 0);
const material = new THREE.MeshPhongMaterial({ color: 0x00ff00  });
const d20 = new THREE.Mesh(geometry, material);
scene.add(d20);

camera.position.z = 5;

let isRolling = false;


function rollDice() {
    let diceType = prompt("Escolha o tipo de dado (D6, D8, D10, D12 ou D20):").toUpperCase();
    let modifier = prompt("Digite o valor do modificador (opcional):");
    let result = 0;

    if (diceType === null) return;

    modifier = parseInt(modifier) || 0;

    switch (diceType) {
        case 'D6':
            result = Math.floor(Math.random() * 6) + 1;
            break;
        case 'D8':
            result = Math.floor(Math.random() * 8) + 1;
            break;
        case 'D10':
            result = Math.floor(Math.random() * 10) + 1;
            break;
        case 'D12':
            result = Math.floor(Math.random() * 12) + 1;
            break;
        case 'D20':
            result = Math.floor(Math.random() * 20) + 1;
            break;
        default:
            alert("Tipo de dado inválido.");
            return;
    }


    result += modifier;


    alert(`Resultado do ${diceType}: ${result}`);
}


document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        rollDice();
    }
});


function onClick() {
    if (!isRolling) {
        isRolling = true;


        const originalSpeed = 0.01;
        const acceleratedSpeed = 0.05;

        setTimeout(() => {
            isRolling = false;
            const result = Math.floor(Math.random() * 20) + 1;
            alert(`Resultado do D20: ${result}`);
        }, 1000);

        function animateAccelerated() {
            if (isRolling) {
                requestAnimationFrame(animateAccelerated);
                d20.rotation.x += acceleratedSpeed;
                d20.rotation.y += acceleratedSpeed;
                renderer.render(scene, camera);
            }
        }


        animateAccelerated();


        setTimeout(() => {
            d20.rotation.x = 0;
            d20.rotation.y = 0;
        }, 1000);
    }
}


document.addEventListener('click', onClick, false);

function onMouseMove(event) {

    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;


    d20.position.x = mouseX * 5;
    d20.position.y = mouseY * 5;
}

document.addEventListener('mousemove', onMouseMove, false);

function animate() {
    requestAnimationFrame(animate);
    d20.rotation.x += 0.01;
    d20.rotation.y += 0.01;


    renderer.render(scene, camera);
}

animate();


