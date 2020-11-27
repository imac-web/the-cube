
import { BoxGeometry, MeshBasicMaterial, MeshPhysicalMaterial, Mesh } from 'three'

export default class MagicalObject extends Mesh {

  constructor() {
    const geometry = new BoxGeometry(2, 2, 2);
    // const material = new MeshBasicMaterial( { color: 0xFF0080, wireframe: true } );
    const material = new MeshPhysicalMaterial( { color: 0xFF0080, wireframe: false, roughness: 1, metalness: 0, clearcoat: 1 } );
    super(geometry, material);
    
    this.position.x = 2
  }

  setGui(gui) {
    const params = {
      scale : 1,
      colors: {
        primary: '#FF0080'
      }
    }
    
    const magicalObjectFolder = gui.addFolder('MagicalObject');
    
    const magicalObjectFolderPosition = magicalObjectFolder.addFolder('Position');
    magicalObjectFolderPosition.add(this.position, 'x').min(-10).max(10);
    magicalObjectFolderPosition.add(this.position, 'y').min(-10).max(10);
    magicalObjectFolderPosition.add(this.position, 'z').min(-10).max(10);
  
    magicalObjectFolder.add(params, 'scale').min(0).max(1).onChange((value) => {
      this.scale.x = value
      this.scale.y = value
      this.scale.z = value
    })
    
    magicalObjectFolder.addColor(params.colors, 'primary').onChange((value) => {
      this.material.color.set(value)
    })
    
    magicalObjectFolder.add(this.material, "wireframe").listen()

    magicalObjectFolder.add(this.material, "roughness").min(0).max(1).onChange((value)=>{
      this.roughness = value
    })

    magicalObjectFolder.add(this.material, "metalness").min(0).max(1).onChange((value)=>{
      this.metalness = value
    })

    magicalObjectFolder.add(this.material, "clearcoat").min(0).max(1).onChange((value)=>{
      this.clearcoat = value
    })
  }

  update() {
    this.rotation.x += 0.01;
    this.rotation.y += 0.01;
  }
}