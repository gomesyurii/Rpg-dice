// Cria um novo objeto de cena
var scene = new THREE.Scene();

// Cria uma câmera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Cria um renderizador
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Cria a geometria do icosaedro (D20)
var geometry = new THREE.IcosahedronGeometry(1, 0);

// Cria o material
var material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});

// Cria o objeto de malha (mesh)
var d20 = new THREE.Mesh(geometry, material);

// Adiciona o D20 à cena
scene.add(d20);

// Função de animação
function animate() {
    requestAnimationFrame(animate);

    // Rotaciona o D20
    d20.rotation.x += 0.01;
    d20.rotation.y += 0.01;

    // Renderiza a cena
    renderer.render(scene, camera);
}

function rollDice() {
    var dice = document.getElementById('dice');
    dice.className = 'dice spin';
    setTimeout(function() {
        dice.className = 'dice';
    }, 3000);
}

// Inicia a animação
animate();