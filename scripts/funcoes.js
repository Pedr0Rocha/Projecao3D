$(document).ready(function(){
	plotCubo();
});

function configuraProjecao(){
	projecao = new Projecao();
    projecao.pontoVista = getPontoVista();
    projecao.planoProj = getPlanoProjecao();

    projecao.tipoProjecao = getTipoProjecao();

    projecao.numVertices = getNumVertices();
    var vertices = getVertices();
    for (var i = 0; i < vertices.length; i++)
        projecao.criaNovoVertice(vertices[i][0], vertices[i][1], vertices[i][2]);

    projecao.numSuperficies = getNumSuperficies();
    projecao.superficies = getSuperficies();

    projecao.Plot();
}

function configurarVertices(numV) {
	var numVertices;
	if (numV === undefined) {
		numVertices = document.getElementById("num-vertices").value;
	} else {
		document.getElementById("num-vertices").value = numV;
		numVertices = numV;
	}

	console.log("Numero de Vertices do Objeto: " + numVertices);

	var divParent = document.getElementById("vertices-div");
	divParent.innerHTML = "";
	for (var i = 1; i <= numVertices; i++) {
		divParent.innerHTML += 
		'<div id="vertice-' + i +
		'" class="col-xs-12">' +
	    '<label class="col-xs-3 text-center no-padding">V' + i + 
	    ':</label>' +
	    '<input id="v'+i+'-x" class="col-xs-3 no-padding" type="number" name="v'+i+'-x">' +
	    '<input id="v'+i+'-y" class="col-xs-3 no-padding" type="number" name="v'+i+'-y">' +
	    '<input id="v'+i+'-z" class="col-xs-3 no-padding" type="number" name="v'+i+'-z">' +
	    '</div>' 
    }	
}

function configurarSuperficies(numS) {
	var numSuperficies;
	if (numS === undefined) {
		numSuperficies = document.getElementById("num-superficies").value;
	} else {
		document.getElementById("num-superficies").value = numS; 
		numSuperficies = numS;
	}

	console.log("Numero de Superficies do Objeto: " + numSuperficies);

	var divParent = document.getElementById("superficies-div");
	divParent.innerHTML = "";
	for (var i = 1; i <= numSuperficies; i++) {
		divParent.innerHTML += 
		'<div id="superficie-' + i +
		'" class="col-xs-12">' +
	    '<label class="col-xs-3 text-center no-padding">S' + i + 
	    ':</label>' +
	    '<input id="s'+i+'" class="col-xs-3 no-padding" type="text" name="s'+i+'">' +
	    '</div>' 
    }	
}

function getPontoVista() {
    var pontoVista = {
        x: 0,
        y: 0,
        z: 0
    };
    pontoVista.x = document.getElementById("vista-x").value;
    pontoVista.y = document.getElementById("vista-y").value;
    pontoVista.z = document.getElementById("vista-z").value;

    return pontoVista;
}

function setPontoVista(x, y, z) {
    document.getElementById("vista-x").value = x;
    document.getElementById("vista-y").value = y;
    document.getElementById("vista-z").value = z;
}

function getPlanoProjecao() {
    var planoProj = { 
        p1: { x: 0, y: 0, z:0},
        p2: { x: 0, y: 0, z:0},
        p3: { x: 0, y: 0, z:0}
    };
    planoProj.p1.x = document.getElementById("plano-proj-p1x").value;
    planoProj.p1.y = document.getElementById("plano-proj-p1y").value;
    planoProj.p1.z = document.getElementById("plano-proj-p1z").value;

    planoProj.p2.x = document.getElementById("plano-proj-p2x").value;
    planoProj.p2.y = document.getElementById("plano-proj-p2y").value;
    planoProj.p2.z = document.getElementById("plano-proj-p2z").value;

    planoProj.p3.x = document.getElementById("plano-proj-p3x").value;
    planoProj.p3.y = document.getElementById("plano-proj-p3y").value;
    planoProj.p3.z = document.getElementById("plano-proj-p3z").value;

    return planoProj;
}

function setPlanoProjecao(p1, p2, p3) {
    document.getElementById("plano-proj-p1x").value = p1[0];
    document.getElementById("plano-proj-p1y").value = p1[1];
    document.getElementById("plano-proj-p1z").value = p1[2];

    document.getElementById("plano-proj-p2x").value = p2[0];
    document.getElementById("plano-proj-p2y").value = p2[1];
    document.getElementById("plano-proj-p2z").value = p2[2];

    document.getElementById("plano-proj-p3x").value = p3[0];
    document.getElementById("plano-proj-p3y").value = p3[1];
    document.getElementById("plano-proj-p3z").value = p3[2];
}

function getSuperficies() {
	var numSuperficies = parseInt(document.getElementById("num-superficies").value);
	
	var superficies = new Array();
	for (var i = 0; i < numSuperficies; i++) {
		var todasSuperficies = document.getElementById("s"+(i+1)).value;
		var cadaSuperficie = todasSuperficies.split("-");
		
		var superficie = new Array();
		for (var j = 0; j < cadaSuperficie.length; j++) {
			var numVertice = parseInt(cadaSuperficie[j]);
			var vertice = projecao.vertices[numVertice - 1];
			superficie.push({ vertice: [numVertice, vertice] });
		}
		superficies.push(superficie);
	} 
    return superficies;	
}

function setSuperficies(superficies) {
	for (var i = 0; i < superficies.length; i++) 
    	document.getElementById("s"+(i+1)).value = superficies[i];
}

function getVertices() {
	var numVertices = parseInt(document.getElementById("num-vertices").value);
	var vertices = new Array();
	for (var i = 0; i < numVertices; i++) {
    	var p1 = document.getElementById("v"+(i+1)+"-x").value;
    	var p2 = document.getElementById("v"+(i+1)+"-y").value;
    	var p3 = document.getElementById("v"+(i+1)+"-z").value;

    	var vertice = [p1, p2, p3];
    	vertices.push(vertice);
	}
	return vertices;
}

function setVertices(vertices) {
	for (var i = 0; i < vertices.length; i++) {
    	document.getElementById("v"+(i+1)+"-x").value = vertices[i][0];
    	document.getElementById("v"+(i+1)+"-y").value = vertices[i][1];
    	document.getElementById("v"+(i+1)+"-z").value = vertices[i][2];
	}
}

function getNumVertices() {
	return parseInt(document.getElementById("num-vertices").value);
}
function getNumSuperficies() {
	return parseInt(document.getElementById("num-superficies").value);
}

function getTipoProjecao() {
	return document.getElementById("tipo-projecao").value;
}