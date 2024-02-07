
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x888888); // Define o fundo como cinza
document.body.appendChild(renderer.domElement);


const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1).normalize();
scene.add(light);


const geometry = new THREE.IcosahedronGeometry(1, 0); 
const material = new THREE.MeshPhongMaterial({ color: 0xadd8e6 }); 
const d20 = new THREE.Mesh(geometry, material);
scene.add(d20);

camera.position.z = 5;


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
