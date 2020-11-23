
import { BoxGeometry, ShadowMaterial, Mesh } from 'three'

export default class Floor extends Mesh {

  constructor() {
    const geometry = new BoxGeometry(15, 1, 15);
    const material = new ShadowMaterial( { color: 0x111111 } );
    super(geometry, material);
    
    this.position.y = -5;
    this.receiveShadow = true;
  }
}