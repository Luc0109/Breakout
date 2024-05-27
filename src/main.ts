import { Actor, CollisionType, Color, Engine, vec, Text, Font } from "excalibur"

const game = new Engine({
	width: 800,
	height: 600
})

const barra = new Actor({
	x: 150,
	y: game.drawHeight - 40,
	width: 200,
	height:20,
	color: Color.Chartreuse
})

barra.body.collisionType = CollisionType.Fixed



game.add(barra)

game.input.pointers.primary.on("move",  (event) => {
	barra.pos.x = event.worldPos.x

})

const bolinha = new Actor({
	x:100,
	y:300,
	radius:10,
	color: Color.Black
})

bolinha.body.collisionType = CollisionType.Passive


const velocidadedaBolinha = vec(350, 350)

setTimeout(() => {
	bolinha.vel = velocidadedaBolinha
}, 1000)
	
bolinha.on("postupdate", () => {
	if (bolinha.pos.x < bolinha.width / 2) {
		bolinha.vel.x = velocidadedaBolinha.x
	}
	if (bolinha.pos.x + bolinha.width / 2 > game.drawWidth) {
		bolinha.vel.x = -velocidadedaBolinha.x  
	}

	if (bolinha.pos.y < bolinha.height / 2) {
		bolinha.vel.y = velocidadedaBolinha.y
	}
	//if (bolinha.pos.y + bolinha.height /2 > game.drawHeight) {
	//	bolinha.vel.y = -velocidadedaBolinha.y

	//}

	
})

game.add(bolinha)

const padding = 20

const xoffset = 65
const yoffset = 20

const colunas = 5
const linhas = 3

const corBloco = [Color.Red,  Color.Green, Color.Blue]

const larguraBloco = (game.drawWidth / colunas) - padding - (padding / colunas)
const alturaBloco = 30

const listaBlocos: Actor[] = []


for(let j = 0; j < linhas; j++) {
	for(let i = 0; i < colunas; i++) {
	listaBlocos.push(
		new Actor({

			x:xoffset + i * (larguraBloco + padding) + padding,
			y:yoffset + j * (alturaBloco + padding) + padding,
			width: larguraBloco,
			height: alturaBloco,
			color:corBloco[j]
		})
	)
}
}


listaBlocos.forEach( bloco => {
	bloco.body.collisionType = CollisionType.Active

	game.add(bloco)
})

let pontos = 0 

const textoPontos = new Text({
	text:"Hello Word0"
	font: new Font({ size: 30 })
})
const objetodetexto = new Actor ({

	x: game.drawWidth - 80,
	y: game.drawHeight - 15
})


	objetodetexto.graphics.use(textoPontos)

	game.add(objetodetexto)

 
let colidindo: boolean = false 
 


bolinha.on("collisionstart", (event) => {
	if(listaBlocos.includes(event.other) ) {
		event.other.kill()
	}

	let interseccao = event.contact.mtv.normalize()

	if (!colidindo) {
		colidindo = true

		if (Math.abs(interseccao.x) > Math.abs(interseccao.y)) {
			bolinha.vel.x = bolinha.vel.x * -1
		}else{
			bolinha.vel.y = bolinha.vel.y * -1
		}
	}
})

bolinha.on("collisionend", () => {
	colidindo = false
})

// Insere o actor barra no game
game.add(barra)

// Insere o actor bolinha no game
game.add(bolinha)

// adicionar os blocos
listaBlocos.forEach(bloco => {
	// define o tipo de colisor de cada bloco
	bloco.body.collisionType = CollisionType.Active
	game.add(bloco)
})

// npm run start
//iniciar jogo 
game.start()
game.start()
