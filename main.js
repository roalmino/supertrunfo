//Objeto que representa as cartas. Este objeto possui uma sequência de chaves e valores, sendo que uma dessas chaves é como se fosse um objeto dentro de outro objeto que também possui chaves e valores.
var carta1 = {
  nome: 'Cosmic Queen Ashe',
  imagem: 'images/card-ashe.png',
  atributos: { 'Dano Físico': 4, 'Dano Mágico': 4, Defesa: 2 }
}
var carta2 = {
  nome: 'Blood Moon Aatrox',
  imagem: 'images/card-aatrox.png',
  atributos: { 'Dano Físico': 5, 'Dano Mágico': 2, Defesa: 3 }
}
var carta3 = {
  nome: 'Lord Veigar',
  imagem: 'images/card-veigar.png',
  atributos: { 'Dano Físico': 1, 'Dano Mágico': 8, Defesa: 1 }
}
var carta4 = {
  nome: 'True Damage Senna ',
  imagem: 'images/card-senna.png',
  atributos: { 'Dano Físico': 5, 'Dano Mágico': 3, Defesa: 2 }
}
var carta5 = {
  nome: 'Thunder Lord Ornn',
  imagem: 'images/card-ornn.png',
  atributos: { 'Dano Físico': 3, 'Dano Mágico': 2, Defesa: 5 }
}
var carta6 = {
  nome: 'Majestic Empress Morgana',
  imagem: 'images/card-morgana.png',
  atributos: { 'Dano Físico': 2, 'Dano Mágico': 5, Defesa: 3 }
}
var carta7 = {
  nome: 'Nightbringer Vladimir',
  imagem: 'images/card-vladimir.png',
  atributos: { 'Dano Físico': 2, 'Dano Mágico': 4, Defesa: 4 }
}
var carta8 = {
  nome: 'Lunar Eclipse Leona',
  imagem: 'images/card-leona.png',
  atributos: { 'Dano Físico': 1, 'Dano Mágico': 1, Defesa: 8 }
}
var carta9 = {
  nome: 'Tradidional Sejuani',
  imagem: 'images/card-sejuani.png',
  atributos: { 'Dano Físico': 4, 'Dano Mágico': 2, Defesa: 4 }
}
var carta10 = {
  nome: 'Ruined Pantheon',
  imagem: 'images/card-pantheon.png',
  atributos: { 'Dano Físico': 4, 'Dano Mágico': 3, Defesa: 3 }
}
//Array que irá armazenar todos os objetos que iremos criar com as informações das cartas
var cartas = [
  carta1,
  carta2,
  carta3,
  carta4,
  carta5,
  carta6,
  carta7,
  carta8,
  carta9,
  carta10
]

//Função que irá sortear as cartas. Isso poderia ser feito de forma direta, mas por questão de legibilidade e manutenção, criamos dentro de uma função que ficará responsável por aquela parte do código
//Criamos as variáveis cartaMaquina e cartaJogador fora das funções por questão de escopo, para permitir que elas possam ser acessadas mais tarde por outras partes do código.
var cartaMaquina
var cartaJogador
function sortearCarta() {
  //É necessário criar uma variável para ser o indice aleatório que determina a carta  da máquina e do jogador
  var indiceDaMaquina = parseInt(Math.random() * 10)
  cartaMaquina = cartas[indiceDaMaquina]

  var indiceDoJogador = parseInt(Math.random() * 10)
  //Verificar se a carta da máquina é a mesma do jogador
  while (indiceDaMaquina == indiceDoJogador) {
    indiceDoJogador = parseInt(Math.random() * 10)
  }
  cartaJogador = cartas[indiceDoJogador]

  //Agora, é necessário desabilitar o botão sortear para não ser possível fazer várias vezes e habilitar o outro botão para começar o jogo. Para desabilitar o botão, nos o acessamos através do getElementById e inserimos a propriedade disable=true e para habilitar o outro botão fazemos o mesmo.
  document.getElementById('btnSortear').disabled = true
  document.getElementById('btnJogar').disabled = false

  console.log(cartaJogador)

  //Função para mostrar na tela a imagem referente a carta do jogador, que irá aparecer logo apos a função sortear ser executada
  exibirCartaJogador()
}

//Função para exibir a carta e os atributos do jogador
function exibirCartaJogador() {
  var divCartaJogador = document.getElementById('carta-jogador')
  var nome = document.querySelector('.cartaJogador-subtitle')

  var imagem = `<img src="${cartaJogador.imagem}" style="width: inherit; height: inherit; position: absolute"/>`
  nome.innerHTML = cartaJogador.nome

  var tagHTML = '<div id="opcoes" class="carta-status">'
  var opcoesTexto = ''
  //Esse for é construido de maneira diferente, primeiro criamos uma variável e com a palavra chave 'in' queremos dizer para a função percorrer cada item do objeto e atribui-la a variável.
  for (var i in cartaJogador.atributos) {
    opcoesTexto +=
      "<input type='radio' name='atributo' value='" +
      i +
      "'>" +
      i +
      ' ' +
      cartaJogador.atributos[i] +
      '<br>'
  }

  // divCartaJogador.innerHTML = nome + '
  divCartaJogador.innerHTML = imagem + tagHTML + opcoesTexto + '</div>'
}

//Função para obter qual atributo está sendo escolhido no input
function obtemAtributoSelecionado() {
  var radioAtributo = document.getElementsByName('atributo')

  //É necessário o for para percorrer item por item e verificar se o atributo checked é igual a true e assim retornar o valor para onde essa função é chamada
  for (var i = 0; i < radioAtributo.length; i++)
    if (radioAtributo[i].checked == true) {
      return radioAtributo[i].value
    }
}

function jogar() {
  var atributoSelecionado = obtemAtributoSelecionado()
  var resultado = document.querySelector('#resultado')
  var valorJogador = cartaJogador.atributos[atributoSelecionado]
  var valorMaquina = cartaMaquina.atributos[atributoSelecionado]

  if (valorJogador > valorMaquina) {
    resultado.innerHTML = '<p class="resultado-final">Parabéns! Você ganhou</p>'
  } else if (valorMaquina > valorJogador) {
    resultado.innerHTML = '<p class="resultado-final">Que pena! Você perdeu</p>'
  } else {
    resultado.innerHTML = '<p class="resultado-final">Empatou!</p>'
  }
  exibirCartaMaquina()
}

function exibirCartaMaquina() {
  var divCartaMaquina = document.getElementById('carta-maquina')
  var nome = document.querySelector('.cartaMaquina-subtitle')

  var imagem = `<img src="${cartaMaquina.imagem}" style="width: inherit; height: inherit; position: absolute"/>`
  nome.innerHTML = cartaMaquina.nome

  var tagHTML = '<div id="opcoes" class="carta-status">'
  var opcoesTexto = ''

  for (var i in cartaJogador.atributos) {
    opcoesTexto += '<p>' + i + ' ' + cartaMaquina.atributos[i] + '</p>'
  }

  var nome = `<p class="carta-subtitle">${cartaMaquina.nome}</p>`
  divCartaMaquina.innerHTML = imagem + tagHTML + opcoesTexto + '</div>'
}
