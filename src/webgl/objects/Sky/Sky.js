import {ShaderMaterial, SphereGeometry, Mesh} from 'three'
import fragmentShader from './fragment.glsl'
import vertexShader from './vertex.glsl'



export default class Sky extends Mesh {
	constructor() {
		const geometry = new SphereGeometry(5, 128, 128)

		const material = new ShaderMaterial({
			vertexShader,
			fragmentShader
		})

		super(geometry, material)
    this.position.x = -2
	}
}
