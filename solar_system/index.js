import { earthGroup, earthMesh, cloudMesh, moonMesh } from './earthMoon.js';
import starGroup from './star.js';
import { sunGroup } from './sun.js';

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
camera.position.set(0, 0, 2000.333);
//点光源
const light = new THREE.PointLight(0xffffff, 2, 100);
light.position.set(-10, 0, 20);
scene.add(light);
//scene.add(earthGroup);
scene.add(starGroup);

const distance = 149597870 / 696300;
earthGroup.position.set(Math.sqrt(distance / 2), 0, -Math.sqrt(distance / 2));

sunGroup.add(earthGroup);
scene.add(sunGroup);

function step() {
    earthMesh.rotation.y += 0.01;
    cloudMesh.rotation.y += 0.008;
    moonMesh.rotation.y += 0.02;
    earthGroup.rotation.y -= 0.01;
    starGroup.rotation.x += 0.0005;
    starGroup.rotation.y += 0.0005;

    sunGroup.rotation.y -= 0.01;

    renderer.render(scene, camera);
    requestAnimationFrame(step);
}
requestAnimationFrame(step);

renderer.domElement.addEventListener('wheel', e => {
    const { deltaY } = e;
    const { x, y, z } = camera.position;
    camera.position.set(x, y, deltaY > 0 ? z + 100 : z - 100);
});
