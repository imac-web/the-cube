import { Scene, PerspectiveCamera, WebGLRenderer, Color, AmbientLight, SpotLight, Clock } from 'three'
import { GridEffect,BloomEffect,NoiseEffect, EffectComposer, EffectPass, RenderPass } from "postprocessing";

import { OrbitControls } from './controls/OrbitControls'

import MagicalObject from './objects/MagicalObject'
import Blob from './objects/blob/Blob'
import SkySphere from './objects/skySphere/SkySphere'

import {webglGuiFolder} from '../utils/gui'

export default class Webgl {
	constructor() {
		this.start = this.start.bind(this)
		this.onResize = this.onResize.bind(this)

		this.scene = new Scene()
		this.camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
		// this.camera = new OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 10000 );
		this.renderer = new WebGLRenderer({
			powerPreference: "high-performance",
			antialias: false,
			stencil: false,
			depth: false
		})
		this.renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( this.renderer.domElement );

		this.controls = new OrbitControls(this.camera, this.renderer.domElement);

		this.light = new AmbientLight( 0x404040, 2 ); // soft white light
		this.scene.add(this.light);
		this.spotlight = new SpotLight( 0xffffff );
		this.spotlight.position.set(10, 10, -10)
		this.scene.add(this.spotlight);

		this.cube = new MagicalObject()
		this.scene.add( this.cube );

		this.blob = new Blob()
		this.scene.add( this.blob );
		this.sky = new SkySphere({
			colorUp: 0x7ee5fc,
			colorDown: 0x1844d7
		})
		this.scene.add( this.sky );

		this.camera.position.z = 5;

		this.time = 0

		this.setGui();

		window.addEventListener('resize', this.onResize);

		this.effects = {}

		this.composer = new EffectComposer(this.renderer);
		this.composer.addPass(new RenderPass(this.scene, this.camera));

		this.effects.grid = new GridEffect({
			scale: 1.0,
			lineWidth: 0.0
		})
		this.composer.addPass(new EffectPass(this.camera, this.effects.grid));

		this.effects.bloom = new BloomEffect({
			intensity: 10,
			luminanceThreshold: 0.8
		})
		this.composer.addPass(new EffectPass(this.camera, this.effects.bloom));

		this.composer.addPass(new EffectPass(this.camera, new NoiseEffect()));


		this.clock = new Clock();

	}

	setGui() {

		const params = {
			bloom: {
				intensity: 10,
				luminanceThreshold: 0.8,
			},
			grid: {
				scale: 1.0,
				lineWidth: 0.0,
			}
		}

		this.cube.setGui(webglGuiFolder)
		this.blob.setGui(webglGuiFolder)

		const postProcessing = webglGuiFolder.addFolder('Post-processing')
		const bloom = postProcessing.addFolder('Bloom')

		bloom.add(params.bloom, 'intensity').onChange((value) => {
			this.effects.bloom.intensity = value
		})
		bloom.add(params.bloom, 'luminanceThreshold').onChange((value) => {
			this.effects.bloom.luminanceThreshold = value
		})

		const grid = postProcessing.addFolder('Grid')
		grid.add(params.grid, 'scale').onChange((value) => {
			this.effects.grid.setScale(value)
		})
		grid.add(params.grid, 'lineWidth').onChange((value) => {
			this.effects.grid.setLineWidth(value)
		})
	}

	onResize () {
		this.camera.aspect = window.innerWidth / window.innerHeight
		this.camera.updateProjectionMatrix()
		this.renderer.setSize( window.innerWidth, window.innerHeight )
		/* resize composer */
	}

	start () {
		requestAnimationFrame( this.start );
		this.time += 0.01;

		this.cube.update()
		this.blob.update(this.time)

		this.controls.update();

		this.composer.render(this.clock.getDelta());
	}
}
