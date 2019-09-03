const sunGroup = new THREE.Group();

const sunMap = new THREE.TextureLoader().load('../image/lavatile.jpg');
const noiseMap = new THREE.TextureLoader().load('../image/cloud.png');

sunMap.wrapS = sunMap.wrapT = THREE.RepeatWrapping;
noiseMap.wrapS = noiseMap.wrapT = THREE.RepeatWrapping;

const uniforms = {
    time: { type: 'f', value: 1.0 },
    texture1: { type: 't', value: noiseMap },
    texture2: { type: 't', value: sunMap }
};

const vertexShader = `
    varying vec2 texCoord;

    void main(){
       texCoord = uv;
       gl_Position = modelViewMatrix * vec4(position,1.0) * projectionMatrix;
    }
`;

const fragmentShader = ` 
    uniform float time;

    uniform sampler2D texture1;
    uniform sampler2D texture2;

    varying vec2 texCoord;

    void main( void ) {
        vec4 noise = texture2D( texture1,texCoord );

        vec2 T1 = texCoord + vec2( 1.5, -1.5 ) * time * 0.01;
        vec2 T2 = texCoord + vec2( -0.5, 2.0 ) * time * 0.01;

        T1.x -= noise.r * 2.0;
        T1.y += noise.g * 4.0;
        T2.x += noise.g * 0.2;
        T2.y += noise.b * 0.2;
        
        float p = texture2D( texture1, T1 * 2.0 ).a + 0.25;

        vec4 color = texture2D( texture2, T2 );
        vec4 temp = color * 2.0 * ( vec4( p, p, p, p ) ) + ( color * color );
        gl_FragColor = temp;
    }
`;

const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader
});

const geometry = new THREE.SphereBufferGeometry(109, 64, 64);
const sunMesh = new THREE.Mesh(geometry, material);

const light = new THREE.PointLight(0xffffff, 1.2, 10000);

sunGroup.add(sunMesh);
sunGroup.add(light);

const clock = new THREE.Clock();

function step() {
    const delta = clock.getDelta();
    uniforms.time.value += delta * 2;
    requestAnimationFrame(step);
}
requestAnimationFrame(step);

export { sunGroup };
