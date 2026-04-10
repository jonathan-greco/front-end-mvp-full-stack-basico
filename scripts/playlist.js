/**
CRUD: PLAYLISTS
*/
function carregarPlaylists() {
    var tbody = document.getElementById('tabela-playlists');

    if (playlists.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" class="vazio">Nenhuma playlist cadastrada.</td></tr>';
        return;
    }

    var html = '';
    for (var i = 0; i < playlists.length; i++) {
        html += '<tr>';
        html += '<td>' + playlists[i].nome + '</td>';
        html += '<td>' + (playlists[i].descricao || '-') + '</td>';

        // lista as músicas de cada playlist
        if (playlists[i].musicas != [] && playlists[i].musicas.length > 0) {
            html += '<td>';
            for (let posMusica = 0; posMusica < playlists[i].musicas.length; posMusica++) {
                html += '&bull; ' + playlists[i].musicas[posMusica].nome_musica + "<br>";

            }
            html += '</td>';
        }
        else {
            html += '<td> - </td>';
        }

        // exibe o comentario para cada playlist
        if (playlists[i].comentarios != [] && playlists[i].comentarios.length > 0) {
            html += '<td>';
            for (let posComentario = 0; posComentario < playlists[i].comentarios.length; posComentario++) {
                const comentario_corrente = playlists[i].comentarios[posComentario];

                html += '[' + comentario_corrente.nome_autor + ']: ' + comentario_corrente.texto + "<br>";

            }
            html += '</td>';
        }
        else {
            html += '<td> - </td>';
        }

        html += '<td class="acoes">';
        html += '<button class="btn-editar" onclick="editarPlaylist(' + playlists[i].id + ')">Editar</button>';
        html += '<button class="btn-excluir" onclick="excluirPlaylist(' + playlists[i].id + ')">Excluir</button>';
        html += '</td>';

        html += '</tr>';
    }

    tbody.innerHTML = html;
}

function salvarPlaylist(event) {
    event.preventDefault();

    var id = document.getElementById('playlist-id').value;
    var dados = {
        nome: document.getElementById('playlist-nome').value,
        descricao: document.getElementById('playlist-descricao').value
    };

    var metodo = id ? 'PUT' : 'POST';
    if (metodo == 'POST') {
        postDados('playlist', dados, function (erro) {
            if (erro) {
                mostrarMensagem(erro);
                return;
            }

            document.getElementById('playlist-nome').value = '';
            document.getElementById('playlist-descricao').value = '';
            mostrarMensagem('Playlist salva com sucesso.');
            carregarTudo();
        });
    }
    else {
        putDados('playlist?id=' + id, dados, function (erro) {
            if (erro) {
                mostrarMensagem(erro);
                return;
            }

            document.getElementById('playlist-nome').value = '';
            document.getElementById('playlist-descricao').value = '';
            mostrarMensagem('Playlist alterada com sucesso.');
            carregarTudo();
        });
    }
}

function editarPlaylist(id) {
    var item = playlists.find(function (p) {
        return String(p.id) === String(id);
    });
    if (!item) {
        mostrarMensagem('Playlist não encontrada.');
        return;
    }

    document.getElementById('playlist-id').value = item.id;
    document.getElementById('playlist-nome').value = item.nome;
    document.getElementById('playlist-descricao').value = item.descricao || '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function excluirPlaylist(id) {
    if (!confirm('Tem certeza que deseja excluir esta playlist?\n\nSe remover esta playlist, todos os comentários e músicas vinculadas também serão excluídas!')) return;

    deleteDados('playlist?id=' + id, function (erro) {
        if (erro) {
            mostrarMensagem(erro);
            return;
        }
        mostrarMensagem('Playlist excluída com sucesso.');
        carregarTudo();
    });
}

