import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { color } from 'three/examples/jsm/nodes/Nodes.js'
// import GUI from 'lil-gui'


/**
 * Base
 */
// Debug
// const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
/**
 * Models
 */
const gltfLoader = new GLTFLoader()
gltfLoader.load(
    '/models/Car/BMW/BMWblend.gltf',
    (gltf) =>
    {
        const btnColors = document.querySelectorAll('.btn');
        const model = gltf.scene;
        scene.add(model)

        btnColors.forEach(btn => {
            btn.addEventListener("click",(e)=>{

                btnColors.forEach(btn => btn.classList.remove("activo"));
                e.currentTarget.classList.add("activo");

                const idColor = e.currentTarget.id
                model.getObjectByName("ARm4_hood_ARm4_main_0").material.color.setHex(idColor);
                    
            });
        })

    }    
)

/**
 * Floor
 */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(50, 50),
    new THREE.MeshStandardMaterial({
        color: '#444444',
        metalness: 0,
        roughness: 0.5
    })
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 3)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 5)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

const directionalLightOther = new THREE.DirectionalLight(0xffffff, 5)
directionalLightOther.castShadow = true
directionalLightOther.shadow.mapSize.set(1024, 1024)
directionalLightOther.shadow.camera.far = 15
directionalLightOther.shadow.camera.left = - 7
directionalLightOther.shadow.camera.top = 7
directionalLightOther.shadow.camera.right = 7
directionalLightOther.shadow.camera.bottom = - 7
directionalLightOther.position.set(-5, 5, -5)
scene.add(directionalLightOther)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(3, 2, 3.5)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0.75, 0)
controls.enableDamping = true
controls.maxPolarAngle = Math.PI/2
controls.minDistance = 2.7

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()