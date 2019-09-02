import { earthGroup, earthMesh, cloudMesh, moonMesh } from './earthMoon.js';
import starGroup from './star.js';

const container = document.body;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(container.offsetWidth, container.offsetHeight);
container.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    container.offsetWidth / container.offsetHeight,
    1,
    4000
);
camera.position.set(0, 0, 10.333);
//点光源
const light = new THREE.PointLight(0xffffff, 2, 100);
light.position.set(-10, 0, 20);
scene.add(light);
scene.add(earthGroup);
scene.add(starGroup);

function step() {
    earthMesh.rotation.y += 0.01;
    cloudMesh.rotation.y += 0.008;
    moonMesh.rotation.y += 0.02;
    earthGroup.rotation.y -= 0.01;
    starGroup.rotation.x += 0.0005;
    starGroup.rotation.y += 0.0005;
    renderer.render(scene, camera);
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
