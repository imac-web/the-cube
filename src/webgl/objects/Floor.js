
import { BoxBufferGeometry, MeshLambertMaterial, Mesh } from 'three'

export default class Floor extends Mesh {

  constructor() {
    const geometry = new BoxBufferGeometry(25, 10, 25)
    const material = new MeshLambertMaterial( { color: 0x2EFF00, wireframe: false } )
    super(geometry, material);
    
    this.position.y = -8
    /*this.rotation.x += 0.1*/
    this.receiveShadow = true
  }
}