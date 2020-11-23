
import { IcosahedronBufferGeometry, MeshLambertMaterial, Mesh } from 'three'

export default class Sphere extends Mesh {

  constructor() {
    const geometry = new IcosahedronBufferGeometry(0.5, 4)
    const material = new MeshLambertMaterial( { color: 0xFF0080, wireframe: false } )
    super(geometry, material)
    
    this.material.color.setHex( 0xffffff * Math.random() )     
    this.position.set(Math.random() - 0.5, (Math.random() * 2) + 6, Math.random() - 0.5)
    this.castShadow = true
	this.receiveShadow = true
  }

}