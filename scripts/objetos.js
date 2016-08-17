function plotCubo(){
    var numVertices = 8;
    var numSuperficies = 6;

    setPontoVista(10, 10, -10);

    var p1 = [1, 0, 0];
    var p2 = [0, 0, 0];
    var p3 = [0, 1, 0];

    setPlanoProjecao(p1, p2, p3);

    configurarVertices(numVertices);
    configurarSuperficies(numSuperficies);

    var vertices = new Array();
    var v1 = [0, 0, 0];
    vertices.push(v1);
    var v2 = [4, 0, 0];
    vertices.push(v2);
    var v3 = [4, 4, 0];
    vertices.push(v3);
    var v4 = [0, 4, 0];
    vertices.push(v4);
    var v5 = [0, 4, 4];
    vertices.push(v5);
    var v6 = [0, 0, 4];
    vertices.push(v6);
    var v7 = [4, 0, 4];
    vertices.push(v7);
    var v8 = [4, 4, 4];
    vertices.push(v8);

    setVertices(vertices);

    var superficies = new Array();
    var s1 = "6-7-8-5";
    superficies.push(s1);
    var s2 = "7-2-3-8";
    superficies.push(s2);
    var s3 = "2-1-4-3";
    superficies.push(s3);
    var s4 = "6-5-4-1";
    superficies.push(s4);
    var s5 = "2-7-6-1";
    superficies.push(s5);
    var s6 = "8-3-4-5";
    superficies.push(s6);

    setSuperficies(superficies);

    configuraProjecao();
}

function plotCasa(){
    var numVertices = 10;
    var numSuperficies = 7;

    setPontoVista(10, 10, -10);

    var p1 = [1, 0, 0];
    var p2 = [0, 0, 0];
    var p3 = [0, 1, 0];

    setPlanoProjecao(p1, p2, p3);

    configurarVertices(numVertices);
    configurarSuperficies(numSuperficies);

    var vertices = new Array();
    var v1 = [0, 0, 0];
    vertices.push(v1);
    var v2 = [10, 0, 0];
    vertices.push(v2);
    var v3 = [10, 0, 15];
    vertices.push(v3);
    var v4 = [0, 0, 15];
    vertices.push(v4);
    var v5 = [10, 8, 15];
    vertices.push(v5);
    var v6 = [0, 8, 15];
    vertices.push(v6);
    var v7 = [10, 8, 0];
    vertices.push(v7);
    var v8 = [0, 8, 0];
    vertices.push(v8);
    var v9 = [5, 13, 15];
    vertices.push(v9);
    var v10 = [5, 13, 0];
    vertices.push(v10);

    setVertices(vertices);

    var superficies = new Array();
    var s1 = "4-3-5-9-6";
    superficies.push(s1);
    var s2 = "3-2-7-5";
    superficies.push(s2);
    var s3 = "8-10-7-2-1";
    superficies.push(s3);
    var s4 = "6-8-1-4-6";
    superficies.push(s4);
    var s5 = "4-1-2-3";
    superficies.push(s5);
    var s6 = "9-10-8-6";
    superficies.push(s6);
    var s7 = "5-7-10-9-5";
    superficies.push(s7);

    setSuperficies(superficies);

    configuraProjecao();
}