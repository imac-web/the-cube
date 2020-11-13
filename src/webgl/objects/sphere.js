import { BoxGeometry, MeshBasicMaterial, Mesh } from 'three'

export default class sphere extends Mesh {

  constructor() {
    const geometry = new THREE.SphereGeometry( 500, 50, 50 );
    const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    const sphere = new THREE.Mesh( geometry, material );
    
    this.position.x = 0
  }

  setGui(gui) {
    const params = {
      scale : 1,
      colors: {
        primary: '#FF0080'
      }
    }
    
    const sphereFolder = gui.addFolder('MagicalObject');
    sphereFolder.add(this.position, 'x').min(-10).max(10);
  
    sphereFolder.add(params, 'scale').min(0).max(1).onChange((value) => {
      //this.cube.scale(value)
      this.scale.x = value
      this.scale.y = value
      this.scale.z = value
    })
    
    sphereFolder.addColor(params.colors, 'primary').onChange((value) => {
      this.material.color = new Color(value)
    })
  }

  update() {
    
  }
}