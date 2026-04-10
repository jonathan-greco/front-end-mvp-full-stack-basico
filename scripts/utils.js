function mostrarMensagem(texto) {
    if (!texto) {
        return;
    }
    alert(texto);
}

function trocarAba(nome, botao) {
    var abas = document.querySelectorAll('.aba');
    var botoes = document.querySelectorAll('.menu button');

    for (var i = 0; i < abas.length; i++) {
        abas[i].classList.remove('ativo');
    }

    for (var j = 0; j < botoes.length; j++) {
        botoes[j].classList.remove('ativo');
    }

    document.getElementById(nome).classList.add('ativo');
    botao.classList.add('ativo');
}

function getDados(rota, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', API_BASE_URL + '/' + rota, true);

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            callback(null, JSON.parse(xhr.responseText));
        } else {
            callback('Erro ao carregar ' + rota, null);
        }
    };

    xhr.onerror = function () {
        callback('Erro de conexão ao carregar ' + rota, null);
    };

    xhr.send();
}

function deleteDados(rota, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', API_BASE_URL + '/' + rota, true);
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            callback(null, true);
        } else {
            callback('Erro ao excluir ' + rota, null);
        }
    };
    xhr.onerror = function () {
        callback('Erro de conexão ao excluir ' + rota, null);
    };
    xhr.send();
}

function postDados(rota, dados, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', API_BASE_URL + '/' + rota, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            callback(null, JSON.parse(xhr.responseText));
        } else {
            callback('Erro ao salvar ' + rota, null);
        }
    };

    xhr.onerror = function () {
        callback('Erro de conexão ao salvar ' + rota, null);
    };

    // Converte o objeto para o formato URL-encoded
    var encodedData = new URLSearchParams(dados).toString();
    xhr.send(encodedData);
}

function putDados(rota, dados, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', API_BASE_URL + '/' + rota, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            callback(null, JSON.parse(xhr.responseText));
        } else {
            callback('Erro ao salvar ' + rota, null);
        }
    };

    xhr.onerror = function () {
        callback('Erro de conexão ao salvar ' + rota, null);
    };

    // Converte o objeto para o formato URL-encoded
    var encodedData = new URLSearchParams(dados).toString();
    xhr.send(encodedData);
}

function carregarSelects() {
    var opcoes = '<option value="">Selecione uma playlist</option>';

    for (var i = 0; i < playlists.length; i++) {
        opcoes += '<option value="' + playlists[i].id + '">' + playlists[i].nome + '</option>';
    }

    document.getElementById('musica-playlist').innerHTML = opcoes;
    document.getElementById('comentario-playlist').innerHTML = opcoes;
}