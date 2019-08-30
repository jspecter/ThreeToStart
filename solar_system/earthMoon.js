const earthGroup = new THREE.Group();

// 载入纹理图片
const surfaceMap = new THREE.TextureLoader().load(
    '../image/earth_surface_2048.jpg'
);
const normalMap = new THREE.TextureLoader().load(
    '../image/earth_normal_2048.jpg'
);
const specularMap = new THREE.TextureLoader().load(
    '../image/earth_specular_2048.jpg'
);
const cloudMap = new THREE.TextureLoader().load(
    '../image/earth_clouds_1024.png'
);
const moonMap = new THREE.TextureLoader().load('../image/moon_1024.jpg');
// 创建几何球体
const geometry = new THREE.SphereBufferGeometry(1, 32, 32);
const cloudGeometry = new THREE.SphereBufferGeometry(1.005, 32, 32);
const moonGeometry = new THREE.SphereBufferGeometry((1 / 3.2) * 1.2, 32, 32);
// 创建材质
const shaderMaterial = new THREE.MeshPhongMaterial({
    map: surfaceMap,
    normalMap,
    specularMap
});
const cloudMaterial = new THREE.MeshLambertMaterial({
    map: cloudMap,
    transparent: true
});
const moonMaterial = new THREE.MeshPhongMaterial({
    map: moonMap
});
// 将几何体和材质绑定到网格
const sphere = new THREE.Mesh(geometry, shaderMaterial);
const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);

const distance = 356400 / 6371;
moonMesh.position.set(Math.sqrt(distance / 2), 0, -Math.sqrt(distance / 2));

sphere.rotation.z = 0.42;
cloudMesh.rotation.z = 0.42;
moonMesh.rotation.y = Math.PI;
earthGroup.rotation.z = 0.1;

earthGroup.add(sphere);
earthGroup.add(cloudMesh);
earthGroup.add(moonMesh);
earthGroup.rotation.x = 0.089;

export { earthGroup, sphere, cloudMesh };
