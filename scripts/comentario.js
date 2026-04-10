/**
CRUD: COMENTÁRIOS
*/
function carregarComentarios() {
    var tbody = document.getElementById('tabela-comentarios');

    if (comentarios.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="vazio">Nenhum comentário cadastrado.</td></tr>';
        return;
    }

    var html = '';
    for (var i = 0; i < comentarios.length; i++) {
        var playlistNome = '-';

        for (var j = 0; j < playlists.length; j++) {
            if (String(playlists[j].id) === String(comentarios[i].playlist_id)) {
                playlistNome = playlists[j].nome;
                break;
            }
        }

        html += '<tr>';
        html += '<td>' + playlistNome + '</td>';
        html += '<td>' + (comentarios[i].nome_autor || '-') + '</td>';
        html += '<td>' + (comentarios[i].texto || '-') + '</td>';
        html += '<td class="acoes">';
        html += '<button class="btn-editar" onclick="editarComentario(' + comentarios[i].id + ')">Editar</button>';
        html += '<button class="btn-excluir" onclick="excluirComentario(' + comentarios[i].id + ')">Excluir</button>';
        html += '</td>';
        html += '</tr>';
    }

    tbody.innerHTML = html;
}

function salvarComentario(event) {
    event.preventDefault();
    var id = document.getElementById('comentario-id').value;

    var dados = {
        playlist_id: document.getElementById('comentario-playlist').value,
        nome_autor: document.getElementById('comentario-usuario').value,
        texto: document.getElementById('comentario-texto').value
    };

    var metodo = id ? 'PUT' : 'POST';
    if (metodo == 'POST') {
        postDados('comentario', dados, function (erro) {
            if (erro) {
                mostrarMensagem(erro);
                return;
            }

            document.getElementById('comentario-usuario').value = '';
            document.getElementById('comentario-texto').value = '';
            mostrarMensagem('Comentário salvo com sucesso.');
            carregarTudo();
        });
    }
    else {
        putDados('comentario?id=' + id, dados, function (erro) {
            if (erro) {
                mostrarMensagem(erro);
                return;
            }

            document.getElementById('comentario-usuario').value = '';
            document.getElementById('comentario-texto').value = '';
            mostrarMensagem('Comentário alterado com sucesso.');
            carregarTudo();
        });
    }
}

function editarComentario(id) {
    var item = comentarios.find(function (c) {
        return String(c.id) === String(id);
    });
    if (!item) {
        mostrarMensagem('Comentário não encontrado.');
        return;
    }

    document.getElementById('comentario-id').value = item.id;
    document.getElementById('comentario-playlist').value = item.playlist_id;
    document.getElementById('comentario-usuario').value = item.nome_autor || '';
    document.getElementById('comentario-texto').value = item.texto || '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function excluirComentario(id) {
    if (!confirm('Tem certeza que deseja excluir este comentário?')) return;

    deleteDados('comentario?id=' + id, function (erro) {
        if (erro) {
            mostrarMensagem(erro);
            return;
        }
        mostrarMensagem('Comentário excluído com sucesso.');
        carregarTudo();
    });
}
