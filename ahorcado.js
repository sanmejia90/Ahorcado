var palabra = "Tamarindo"
var hombre, espacio;
var l;

//declaración de la clase ahorcado
var Ahorcado = function(con)
{

	//this son variables locales de la clase
	this.contexto = con;
	this.maximo = 5;
	this.intentos = 0;
	this.vivo= true;

	this.dibujar();

}

Ahorcado.prototype.dibujar = function()
{

	var dibujo = this.contexto;

	// dibujando el poste
	dibujo.beginPath();
	dibujo.moveTo(150,100);
	dibujo.lineTo(150,50);
	dibujo.lineTo(400,50);
	dibujo.lineTo(400,350);
	dibujo.lineWidth = 15;
	dibujo.strokeStyle = "#000000"
	dibujo.stroke();
	dibujo.closePath;

	if(this.intentos > 0)
	{
		//intentos = 1 --> rostro
		dibujo.beginPath();
		dibujo.arc(150,140,40,0,2*Math.PI,false);
		dibujo.strokeStyle = "#F00"
		dibujo.lineWidth =5;
		dibujo.stroke();
		dibujo.closePath();
	}
	if(this.intentos >1 )
	{
		//brazos
		dibujo.beginPath();
		dibujo.moveTo(150,180);
		dibujo.lineTo(150,250);
		dibujo.strokeStyle = "#F00"
		dibujo.lineWidth =5;
		dibujo.stroke();
		dibujo.closePath();

		if(this.intentos > 2)
		{
			//cuerpo
			dibujo.beginPath();
			dibujo.moveTo(120,220);
			dibujo.lineTo(150,180);
			dibujo.lineTo(180,220);
			dibujo.strokeStyle = "#F00"
			dibujo.lineWidth =5;
			dibujo.stroke();
			dibujo.closePath();

			if(this.intentos > 3)
			{
				//piernas
				dibujo.beginPath();
				dibujo.moveTo(120,290);
				dibujo.lineTo(150,250);
				dibujo.lineTo(180,290);
				dibujo.strokeStyle = "#F00"
				dibujo.lineWidth =5;
				dibujo.stroke();
				dibujo.closePath();

				if(this.intentos>4)
				{

					dibujo.beginPath();
					//Ojo izquierdo
					dibujo.moveTo(125,120);
					dibujo.lineTo(145,145);
					dibujo.moveTo(145,120);
					dibujo.lineTo(125,145);
					//Ojo derecho
					dibujo.moveTo(155,120);
					dibujo.lineTo(175,145);
					dibujo.moveTo(175,120);
					dibujo.lineTo(155,145);

					dibujo.strokeStyle="blue";
					dibujo.stroke();
					dibujo.lineWidth=5;

				}

			}
		}
	}

}

Ahorcado.prototype.trazar = function()
{
	this.intentos++;
	if(this.intentos>=this.maximo)
	{
		this.vivo = false;
		alert("Estas muerto!");
	}
	this.dibujar();
}



function iniciar()
{
	var canvas = document.getElementById("c");
	l = document.getElementById("letra");
	var b = document.getElementById("boton");
	canvas.width= 500;
	canvas.height = 400;
	var context = canvas.getContext("2d");
	hombre = new Ahorcado(context);
	
	espacio = new Array(palabra.length);
	//agregamos una funcion que se dispara al dar click al boton
	b.addEventListener("click", agregarLetra);
	
	mostrarPista(espacio);

}



function agregarLetra()
{
	var letra = l.value;
	mostrarPalabra(palabra, hombre, letra);	
}

function mostrarPalabra(palabra, ahorcado, letra)
{
	var pista = document.getElementById("pista");
	var encontrado = false
	var p;
	palabra = palabra.toUpperCase();
	letra = letra.toUpperCase();
	for(p in palabra)
	{
		if(letra == palabra[p])
		{
			espacio[p]= letra;
			encontrado = true;
		}
	}

	mostrarPista(espacio);

	//si no lo encontré
	if(!encontrado)
	{
		ahorcado.trazar();
	}

	if(!ahorcado.vivo)
	{
		pista.innerText = palabra;
	}

}

function mostrarPista(espacio)
{

	var pista = document.getElementById("pista");
	var texto ="";
	var i = 0
	var largo = espacio.length;

	for (i=0; i<largo; i++) 
	{
		if(espacio[i] != undefined)
		{
			texto = texto + espacio[i] + " ";
		}
		else
		{
			texto += "_ ";
		}

	}

	pista.innerText =texto;

}