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
    xhr.open('GET', URL_API + '/' + rota, true);

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
    xhr.open('DELETE', URL_API + '/' + rota, true);
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
    xhr.open('POST', URL_API + '/' + rota, true);
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
    xhr.open('PUT', URL_API + '/' + rota, true);
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

function formatarDuracao(segundos) {
  const min = Math.floor(segundos / 60);
  const seg = segundos % 60;
  return `${String(min).padStart(2, '0')}:${String(seg).padStart(2, '0')}`;
}

function converteDuracaoParaSegundos(formatoMMSS) {
  const partes = formatoMMSS.trim().split(':');
  
  if (partes.length !== 2) {
    throw new Error('Formato inválido. Use MM:SS');
  }

  const min = parseInt(partes[0], 10);
  const seg = parseInt(partes[1], 10);

  if (isNaN(min) || isNaN(seg) || seg < 0 || seg > 59) {
    throw new Error('Valores inválidos. Certifique-se de usar números no formato MM:SS');
  }

  return min * 60 + seg;
}