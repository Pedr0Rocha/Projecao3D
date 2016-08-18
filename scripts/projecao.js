objetoPlotado = new plotarObjeto();
projecao = new Projecao();

function Projecao(){
    this.pontoVista = {
        x: 0,
        y: 0,
        z: 0
    };

    this.viewport = { 
        umin: 50, 
        vmin: 50, 
        umax: 550, 
        vmax: 450
    };

    this.numVertices = 0;
    this.vertices = new Array();

    this.planoProj = { 
        p1: { x: 0, y: 0, z:0},
        p2: { x: 0, y: 0, z:0},
        p3: { x: 0, y: 0, z:0}
    };

    this.numSuperficies = 0;
    this.superficies = new Array();

    this.tipoProjecao = "";

    this.criaNovoVertice = function(x, y, z) {
        this.vertices.push({
            "x": x, 
            "y": y, 
            "z": z 
        });
    }

    this.anguloRotacao = 0;
    this.eixoRotacao = "";

    this.Plot = function() {
        var r0 = this.planoProj.p2;

        var normal = this.getNormal(this.planoProj.p1, this.planoProj.p2, this.planoProj.p3);
        var d0 = r0.x * normal[0] + r0.y * normal[1] + r0.z * normal[2];

        if (this.tipoProjecao === "paralela") {
            this.pontoVista.x = 0;
            this.pontoVista.y = 0;
            this.pontoVista.z = 1;
            setPontoVista(0, 0, 1);
        }

        var a = this.pontoVista.x;
        var b = this.pontoVista.y;
        var c = this.pontoVista.z;

        var d1 = a * normal[0] + b * normal[1] + c * normal[2];
        var d = d0 - d1;
        
        var verticesMatriz = this.getVerticesMatriz();
        var matrizAplicada = [];   

        var anguloRad = this.anguloRotacao * (Math.PI/180);
        
        var matrizRotacao;
        if (this.eixoRotacao != "z") { 
            matrizRotacao = [
                [ Math.cos(anguloRad), -Math.sin(anguloRad), 0, 0],
                [ Math.sin(anguloRad),  Math.cos(anguloRad), 0, 0],
                [            0,             0, 1, 0],
                [            0,             0, 0, 1]
            ];
        }
        
        if (this.eixoRotacao != "y") { 
            matrizRotacao = [
                [ Math.cos(anguloRad), 0, Math.sin(anguloRad), 0],
                [                   0, 1,                   0, 0],
                [-Math.sin(anguloRad), 0, Math.cos(anguloRad), 0],
                [                   0, 0,                   0, 1]
            ];
        }        

        if (this.eixoRotacao != "x") { 
            matrizRotacao = [
                [ 1,                    0,                    0, 0],
                [ 0,  Math.cos(anguloRad), -Math.sin(anguloRad), 0],
                [ 0,  Math.sin(anguloRad),  Math.cos(anguloRad), 0],
                [ 0,                    0,                    0, 1]
            ];
        }

        if (this.anguloRotacao != 0) 
            matrizAplicada = this.multiplicaMatriz(matrizRotacao, verticesMatriz);
        
        var matrizPerspectiva = [
                    [ d + a * normal[0],     a * normal[1],     a * normal[2], -a * d0],
                    [     b * normal[0], d + b * normal[1],     b * normal[2], -b * d0],
                    [     c * normal[0],     c * normal[1], d + c * normal[2], -c * d0],
                    [         normal[0],         normal[1],         normal[2],     -d1]
        ];

        var matrizParalela = [
                    [  d1 - a * normal[0],    -a * normal[1],     -a * normal[2], a * d0],
                    [     -b * normal[0], d1  -b * normal[1],     -b * normal[2], b * d0],
                    [     -c * normal[0],     -c * normal[1],  d1 -c * normal[2], c * d0],
                    [                  0,                 0,                  0,      d1]
        ];

        if (this.tipoProjecao === "perspectiva") 
            if (this.anguloRotacao != 0)  
                matrizAplicada = this.multiplicaMatriz(matrizPerspectiva, matrizAplicada);
            else
                matrizAplicada = this.multiplicaMatriz(matrizPerspectiva, verticesMatriz);
        else
            if (this.anguloRotacao != 0)  
                matrizAplicada = this.multiplicaMatriz(matrizParalela, matrizAplicada);
            else
                matrizAplicada = this.multiplicaMatriz(matrizParalela, verticesMatriz);


        matrizAplicada = this.transformaParaCartesiano(matrizAplicada);

        for (var i = 0; i < this.numVertices; i++) 
            matrizAplicada[1][i] = -matrizAplicada[1][i];

        matrizAplicada = this.janelaViewPort(matrizAplicada);
        this.plotMatriz(matrizAplicada);
    }

    this.getMin = function(matriz){
        var min = { x: Number.POSITIVE_INFINITY, y: Number.POSITIVE_INFINITY };
        for (var i = 0; i < this.numVertices; i++) { 
            if (matriz[0][i] < min.x) min.x = matriz[0][i];
            if (matriz[1][i] < min.y) min.y = matriz[1][i];
        }
        return min;
    }

    this.getMax = function(matriz){
        var max = { x: Number.NEGATIVE_INFINITY, y: Number.NEGATIVE_INFINITY };
        for (var i = 0; i < this.numVertices; i++) {
            if (matriz[0][i] > max.x) max.x = matriz[0][i];
            if (matriz[1][i] > max.y) max.y = matriz[1][i];
        }
        return max;
    }

    this.plotMatriz = function(matriz) {
        objetoPlotado.clear();
        for (var i = 0; i < this.numSuperficies; i++) {
            for (var j = 0; j < this.superficies[i].length - 1; j++) {
                var vertice1 = parseInt(this.superficies[i][j].vertice);
                var vertice2 = parseInt(this.superficies[i][j+1].vertice);
                var ponto1 = { x: matriz[0][vertice1-1], y: matriz[1][vertice1-1] };
                var ponto2 = { x: matriz[0][vertice2-1], y: matriz[1][vertice2-1] };
                if (j == 0) {
                    var vert = parseInt(this.superficies[i][this.superficies[i].length -1].vertice);
                    pt = { x: matriz[0][vert-1], y: matriz[1][vert-1] };
                    objetoPlotado.conecta(ponto1, pt);
                }
                objetoPlotado.conecta(ponto1, ponto2);
            }
        }
    }

    this.multiplicaMatriz = function(matriz, verticesMatriz) {
        var matrizAplicada = [];
        for (var i = 0; i < matriz.length; i++) {
            matrizAplicada.push([]);
            for (var j = 0; j < this.numVertices; j++) {
                var novoValor = 0;
                for (var k = 0; k < matriz.length; k++)
                    novoValor += matriz[i][k] * verticesMatriz[k][j];
                matrizAplicada[i].push(novoValor);
            }
        }
        return matrizAplicada;
    }

    this.getVerticesMatriz = function() {
        var verticesMatriz = [[], [], [], []];
        for (var i = 0; i < this.numVertices; i++) {
            verticesMatriz[0].push(this.vertices[i].x);
            verticesMatriz[1].push(this.vertices[i].y);
            verticesMatriz[2].push(this.vertices[i].z);
            verticesMatriz[3].push(1);
        }
        return verticesMatriz;
    }

    this.getNormal = function(p1, p2, p3) {
        var normal = new Array();

        var u = [p2.x - p1.x, p2.y - p1.y, p2.z - p1.z];
        var v = [p3.x - p1.x, p3.y - p1.y, p3.z - p1.z];

        var s1 = u[1]*v[2] - u[2]*v[1];
        normal.push(s1);
        var s2 = u[2]*v[0] - u[0]*v[2];
        normal.push(s2);
        var s3 = u[0]*v[1] - u[1]*v[0];
        normal.push(s3);
        
        return normal;
    }

    this.transformaParaCartesiano = function(matriz) {
        var matrizAplicada = [[], [], []];
        for (var i = 0; i < this.numVertices; i++) {
            matrizAplicada[0].push(matriz[0][i] / matriz[3][i]);
            matrizAplicada[1].push(matriz[1][i] / matriz[3][i]);
            matrizAplicada[2].push(1);
        }
        return matrizAplicada;
    }

    this.janelaViewPort = function(matriz) {
        var min = this.getMin(matriz);
        var max = this.getMax(matriz);

        var umin = this.viewport.umin;
        var vmin = this.viewport.vmin;
        var umax = this.viewport.umax;
        var vmax = this.viewport.vmax;

        var matrizViewPort = [
            [(umax - umin) / (max.x - min.x), 0, (-min.x * (umax - umin) / (max.x - min.x)) + umin],
            [0, (vmax - vmin) / (max.y - min.y), (-min.y * (vmax - vmin) / (max.y - min.y)) + vmin],
            [0,  0,  1]
        ];
        
        return this.multiplicaMatriz(matrizViewPort, matriz);
    }

}

function plotarObjeto() {
    var canvas = new jsgl.Panel(document.getElementById("canvas"));

    this.conecta = function(ponto1, ponto2) {
        var linha = canvas.createLine();
        linha.setStartPointXY(ponto1.x, ponto1.y);
        linha.setEndPointXY(ponto2.x, ponto2.y);

        with(linha.getStroke()) {
            setColor('rgb(35,35,58)');
            setWeight(1);
        }
        canvas.addElement(linha);
    }

    this.clear = function(){
        canvas.clear();
    }
}
