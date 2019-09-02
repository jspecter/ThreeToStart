const earthGroup = new THREE.Group();
const NSegments = 120;

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
const moonMap = new THREE.TextureLoader().load('../image/bao.jpg');
// 创建几何球体
const geometry = new THREE.SphereBufferGeometry(1, 32, 32);
const cloudGeometry = new THREE.SphereBufferGeometry(1.005, 32, 32);
const moonGeometry = new THREE.SphereBufferGeometry((1 / 3.2) * 1.2, 32, 32);
const lineGeometry = new THREE.Geometry();
for (let i = 0; i < NSegments; i++) {
    const radius = 356000 / 6371 - 1;
    const x = radius * Math.cos((i / 120) * 2 * Math.PI);
    const z = radius * Math.sin((i / 120) * 2 * Math.PI);
    lineGeometry.vertices.push(new THREE.Vector3(x, 0, z));
}

console.log(lineGeometry);

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
const lineMaterial = new THREE.LineBasicMaterial({
    color: 0xaaaaaa
});

// 将几何体和材质绑定到网格
const earthMesh = new THREE.Mesh(geometry, shaderMaterial);
const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
const lineMesh = new THREE.Line(lineGeometry, lineMaterial);

const distance = 356400 / 6371;
moonMesh.position.set(Math.sqrt(distance / 2), 0, -Math.sqrt(distance / 2));

earthMesh.rotation.z = 0.42;
cloudMesh.rotation.z = 0.42;
moonMesh.rotation.y = Math.PI;
//earthGroup.rotation.z = 0.1;
//earthGroup.rotation.x = 0.089;

earthGroup.add(earthMesh);
earthGroup.add(cloudMesh);
earthGroup.add(moonMesh);
earthGroup.add(lineMesh);

export { earthGroup, earthMesh, cloudMesh, moonMesh, lineMesh };
