const firePixelsArray = [];
const fireWidth = 40;
const fireHeigth = 40;
const fireColorsPalette = [['7,7,7'],['31,7,7'],['47,15,7'],['71,15,7'],['87,23,7'],['103,31,7'],['119,31,7'],['143,39,7'],['159,47,7'],['175,63,7'],['191,71,7'],['199,71,7'],['223,79,7'],['223,87,7'],['223,87,7'],['215,95,7'],['215,95,7'],['215,103,15'],['207,111,15'],['207,119,15'],['207,127,15'],['207,135,23'],['199,135,23'],['199,143,23'],['199,151,31'],['191,159,31'],['191,159,31'],['191,167,39'],['191,167,39'],['191,175,47'],['183,175,47'],['183,183,47'],['183,183,55'],['207,207,111'],['223,223,159'],['239,239,199'],['255,255,255']];

function start() {
	createFireDataStructure();
	createFireSource();
	renderFire();

	setInterval(calculateFirePropagation, 50)
}

function createFireDataStructure() {
	const numberOfPixels = fireWidth * fireHeigth;

	for (let i = 0; i < numberOfPixels; i++) {
		firePixelsArray[i] = 0
	}
}

function calculateFirePropagation() {
	for (let column = 0; column < fireWidth; column++) {
		for (let row = 0; row < fireHeigth; row++) {
			const pixelIndex = column + ( fireWidth * row )
			updateFireIntensityPerPixel(pixelIndex)
		}
	}

	renderFire()
}

function updateFireIntensityPerPixel(currentPixelindex) {
	const belowPixelIndex = currentPixelindex + fireWidth

	if (belowPixelIndex >= fireWidth * fireHeigth) {
		return 
	}

	const decay = Math.floor(Math.random() * 3)
	const belowPixelFireIntensity = firePixelsArray[belowPixelIndex]
	const newFireIntensity = 
	belowPixelFireIntensity - decay >= 0 ? belowPixelFireIntensity - decay : 0

	firePixelsArray[currentPixelindex - decay] = newFireIntensity
}

function renderFire() {
	const debug = false;

	let html ='<table cellpadding=0 cellspacing=0>'
	for (let row = 0; row < fireHeigth; row++) {
		html += '<tr>'
 
		for (let colum = 0; colum < fireWidth; colum ++) {
			const pixelIndex = colum + ( fireWidth * row);
			const fireIntensity = firePixelsArray[pixelIndex]

			if (debug === true) {

				html += '<td>'
				html += `<div class="pixel-index">${pixelIndex}</div>`
				html += fireIntensity
				html += '</td>'

			} else {
				const color = fireColorsPalette[fireIntensity]
				const colorString = `${color[0]}`
				html += `<td class="pixel" style="background-color: rgb(${colorString})">`
				html += '</td>'
			}

		}

		html += '</tr>'
	}

	html += '</table>'

	document.querySelector('#fireCanvas').innerHTML = html;
}

function createFireSource() {
	for (let column = 0; column <= fireWidth; column++) {
		const overFlowPixelIndex = fireWidth * fireHeigth;
		const pixelIndex = (overFlowPixelIndex - fireWidth) + column

		firePixelsArray[pixelIndex] = 36;
	}
}

start()