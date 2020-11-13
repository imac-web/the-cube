varying vec3 vPosition;

void main() {

	float d = vPosition.y + 5. ;

	gl_FragColor = vec4((10.-d)/10., (10.-d)/10., 1., 1.);

}
