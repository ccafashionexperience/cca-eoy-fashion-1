/* global THREE */

window.addEventListener('load', init)
let scene
let camera
let renderer
let mesh
let material
let mouseX = 0, mouseY = 0;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

function init() {
  scene = new THREE.Scene()
  scene.background = new THREE.Color( 0xff0000 )
  scene.background = new THREE.Color( 0x000000 )

  
  camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000
    )
  
  camera.position.z = 5
  
  
  renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  
  // const controls = new THREE.OrbitControls(camera)
  // controls.enableZoom = true
  
  scene.add(new THREE.AmbientLight(0x404040)) 
  
  const sprite = new THREE.TextureLoader().load( './three/ball.png' );  
  const loader = new THREE.OBJLoader()
  loader.load('./three/temple.obj',
    (obj) => {
      material = new THREE.PointsMaterial( { size: .125, sizeAttenuation: true, map: sprite, alphaTest: 0.5, transparent: true } );
      material.color.setHSL( 0.75, 0.4, 0.6 );
      mesh = new THREE.Points(obj.children[0].geometry, material)
      mesh.position.y = -15
      scene.add(mesh)

    },
    (xhr) => {
      console.log(xhr)
    },
    (err) => {
      console.error("loading .obj went wrong, ", err)
    }
    )
  
  document.body.appendChild(renderer.domElement)
  animationLoop()

  document.body.style.touchAction = 'none';
  document.body.addEventListener( 'pointermove', onPointerMove );

  //

  window.addEventListener( 'resize', onWindowResize );  
}

function onWindowResize() {

  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function onPointerMove( event ) {

  if ( event.isPrimary === false ) return;

  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;

}


function animationLoop() {

  requestAnimationFrame(animationLoop)
  render();

}

function render() {

  const time = Date.now() * 0.00005;

  camera.position.x += ( mouseX - camera.position.x ) * 0.000008;
  camera.position.y += ( - mouseY - camera.position.y ) * 0.000008;

  camera.lookAt( scene.position );

  // const h = ( 360 * ( 1.0 + time ) % 360 ) / 360;
  // material.color.setHSL( h, 0.5, 0.5 );

  renderer.render(scene, camera)
  if(mesh) {
    mesh.rotation.y += 0.00005
    mesh.rotation.x -= 0.00005
    camera.position.z  -= 0.0005
  }

}

