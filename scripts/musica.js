/**
CRUD: MÚSICAS
*/
function carregarMusicas() {
    let tbody = document.getElementById('tabela-musicas');

    if (musicas.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="vazio">Nenhuma música cadastrada.</td></tr>';
        return;
    }

    let html = '';
    for (var i = 0; i < musicas.length; i++) {
        var playlistNome = '-';

        for (var j = 0; j < playlists.length; j++) {
            if (String(playlists[j].id) === String(musicas[i].playlist_id)) {
                playlistNome = playlists[j].nome;
                break;
            }
        }

        html += '<tr>';
        html += '<td>' + playlistNome + '</td>';
        html += '<td>' + (musicas[i].nome_musica || '-') + '</td>';
        html += '<td>' + (musicas[i].artista || '-') + '</td>';
        html += '<td>' + (musicas[i].album || '-') + '</td>';
        html += '<td>' + (musicas[i].ano || '-') + '</td>';
        html += '<td>' + (formatarDuracao(musicas[i].duracao) || '-') + '</td>';
        html += '<td class="acoes">';
        html += '<button class="btn-editar" onclick="editarMusica(' + musicas[i].id + ')">Editar</button>';
        html += '<button class="btn-excluir" onclick="excluirMusica(' + musicas[i].id + ')">Excluir</button>';
        html += '</td>';
        html += '</tr>';
    }

    tbody.innerHTML = html;
}

function salvarMusica(event) {
    event.preventDefault();
    const  id = document.getElementById('musica-id').value;
    const duracao = converteDuracaoParaSegundos(document.getElementById('musica-duracao').value);

    //verifica se o valor do campo duração está correto, se não, emite um alerta e interrompe o cadastro.
    if(!duracao){
        alert('Valor inváido para o campo Duração!\nCertifique-se de usar números no formato MM:SS');
        return;
    }

    const dados = {
        playlist_id: document.getElementById('musica-playlist').value,
        nome_musica: document.getElementById('musica-nome').value,
        artista: document.getElementById('musica-artista').value,
        album: document.getElementById('musica-album').value,
        ano: document.getElementById('musica-ano').value,
        duracao: duracao
    };

    const metodo = id ? 'PUT' : 'POST';
    if (metodo == 'POST') {
        postDados('musica', dados, function (erro) {
            if (erro) {
                mostrarMensagem(erro);
                return;
            }

            document.getElementById('musica-id').value = '';
            document.getElementById('musica-nome').value = '';
            document.getElementById('musica-artista').value = '';
            document.getElementById('musica-album').value = '';
            document.getElementById('musica-ano').value = '';
            document.getElementById('musica-duracao').value = '';
            mostrarMensagem('Música salva com sucesso.');
            carregarTudo();
        });
    }
    else {
        putDados('musica?id=' + id, dados, function (erro) {
            if (erro) {
                mostrarMensagem(erro);
                return;
            }

            document.getElementById('musica-id').value = '';
            document.getElementById('musica-nome').value = '';
            document.getElementById('musica-artista').value = '';
            document.getElementById('musica-album').value = '';
            document.getElementById('musica-ano').value = '';
            document.getElementById('musica-duracao').value = '';
            mostrarMensagem('Música alterada com sucesso.');
            carregarTudo();
        });
    }
}

function editarMusica(id) {
    const item = musicas.find(function (m) {
        return String(m.id) === String(id);
    });
    if (!item) {
        mostrarMensagem('Música não encontrada.');
        return;
    }

    document.getElementById('musica-id').value = item.id;
    document.getElementById('musica-playlist').value = item.playlist_id;
    document.getElementById('musica-nome').value = item.nome_musica || '';
    document.getElementById('musica-artista').value = item.artista || '';
    document.getElementById('musica-album').value = item.album || '';
    document.getElementById('musica-ano').value = item.ano || '';
    document.getElementById('musica-duracao').value = formatarDuracao(item.duracao)  || 0;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function excluirMusica(id) {
    if (!confirm('Tem certeza que deseja excluir esta música?')) return;

    deleteDados('musica?id=' + id, function (erro) {
        if (erro) {
            mostrarMensagem(erro);
            return;
        }
        mostrarMensagem('Música excluída com sucesso.');
        carregarTudo();
    });
}