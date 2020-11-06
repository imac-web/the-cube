
import { BoxGeometry, MeshBasicMaterial, Mesh } from 'three'

export default class MagicalObject extends Mesh {

  constructor() {
    const geometry = new BoxGeometry(2, 2, 2);
    const material = new MeshBasicMaterial( { color: 0xFF0080, wireframe: true } );
    super(geometry, material);
    
    this.position.x = 2
  }

  update() {
    this.rotation.x += 0.01;
    this.rotation.y += 0.01;
  }
}