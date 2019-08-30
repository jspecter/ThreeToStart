const starGroup = new THREE.Group();

const VERTICES = 667,
    MATERIALS = 8,
    PARTICLESYSTEMS = 24,
    MINDISTANCE = 600;

const starsGeometry = new THREE.Geometry();

for (let i = 0; i < VERTICES; i++) {
    const vector = new THREE.Vector3(
        Math.random() * 2 - 1 * MINDISTANCE,
        Math.random() * 2 - 1 * MINDISTANCE,
        Math.random() * 2 - 1 * MINDISTANCE
    );

    if (vector.length() < MINDISTANCE) {
        vector.setLength(MINDISTANCE);
    }

    starsGeometry.vertices.push(new THREE.Vector3(vector));
}

let starMaterials = [];

for (let i = 0; i < MATERIALS; i++) {
    starMaterials.push(
        new THREE.PointsMaterial({
            color: 0x101010 * (i + 1),
            size: (i % 2) + 1,
            sizeAttenuation: false
        })
    );
}

for (let i = 0; i < PARTICLESYSTEMS; i++) {
    let stars = new THREE.Points(starsGeometry, starMaterials[i % MATERIALS]);

    stars.rotation.y = i / (Math.PI * 2);
    starGroup.add(stars);
}

export default starGroup;
