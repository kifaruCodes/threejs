import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// texture loader
const loader = new THREE.TextureLoader()
const height = loader.load('height.png')
const texture = loader.load('/texture.jpg')
const alpha = loader.load('/alpha.png')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.PlaneBufferGeometry(3, 3, 64, 64)

// Materials
const material = new THREE.MeshStandardMaterial({
    color : 'white',
    map: texture,
    displacementMap: height,
    displacementScale : .5,
    alphaMap: alpha,
    transparent: true,
    depthTest: false
})

// Mesh
const plane = new THREE.Mesh(geometry, material)
scene.add(plane)

plane.rotation.x = 181

gui.add(plane.rotation, 'x').min(0).max(600)

// Lights

const pointLight = new THREE.PointLight('#c3986f', 4)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

gui.add(pointLight.position, 'x').min(0).max(50)
gui.add(pointLight.position, 'y').min(0).max(50)
gui.add(pointLight.position, 'z').min(0).max(50)

const col = {
    color: '#2424A5'
}
gui.addColor(col, 'color').onChange(() => {
    pointLight.color.set(col.color)
})

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth * 0.7,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth * 0.7
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
camera.position.x = 0
camera.position.y = 0
camera.position.z = 6
scene.add(camera)

// gui.add(camera.position, 'x').min(0).max(50)
// gui.add(camera.position, 'y').min(0).max(50)
// gui.add(camera.position, 'z').min(0).max(50)
// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

document.addEventListener('mousemove', animateTerrain)
let mouseY = 0
function animateTerrain(event){
    mouseY = event.clientY
}

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    plane.rotation.z = .5 * elapsedTime
    plane.material.displacementScale = mouseY * .005

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()