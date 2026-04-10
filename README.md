# 🎵 Gerenciador de Playlists

Aplicação front-end para gerenciamento de playlists, músicas e comentários, desenvolvida em HTML, CSS e JavaScript puro.

## Sobre o Projeto

Este é um sistema simples e funcional para organizar playlists musicais. A aplicação permite:

- Criar, editar e excluir **playlists** com nome e descrição
- Adicionar **músicas** vinculadas a playlists (com artista, álbum, ano e duração)
- Registrar **comentários** de usuários em playlists
- Navegação por abas intuitivas (*Playlists*, *Músicas*, *Comentários*)

A aplicação consome dados de uma **API externa** e exibe as informações em tabelas dinâmicas, com operações de CRUD completas.

---

## Funcionalidades

### Playlists
- Cadastro com nome e descrição
- Listagem em tabela com contagem de músicas e comentários
- Edição e exclusão de registros

### Músicas
- Vinculação a uma playlist existente
- Campos: nome, artista, álbum, ano e duração
- Listagem filtrada por playlist
- Edição e exclusão

### Comentários
- Associação a playlists
- Registro de usuário e texto do comentário
- Edição e exclusão

### Interface
- Navegação por abas com destaque visual
- Formulários com validação nativa do HTML5
- Mensagens (alertas) de feedback para o usuário

---

## Tecnologias Utilizadas

| Tecnologia | Descrição |
|-----------|-----------|
| **HTML5** | Estrutura da página |
| **CSS3** | Estilização com arquivo externo (`styles.css`) |
| **JavaScript ** | Lógica de frontend, manipulação do DOM e requisições HTTP |

> **Sem frameworks**: Projeto desenvolvido com HTML, CSS e JavaScript puro.

---

## Estrutura de Pastas

| Caminho | Descrição |
|---------|-----------|
| `projeto-playlist/` | Pasta raiz do projeto |
| `index.html` | Arquivo principal da aplicação |
| `styles.css` | Folha de estilos global |
| `scripts/` | Pasta com módulos JavaScript |
| `scripts/playlist.js` | Lógica de CRUD de playlists |
| `scripts/musica.js` | Lógica de CRUD de músicas |
| `scripts/comentario.js` | Lógica de CRUD de comentários |
| `scripts/utils.js` | Funções auxiliares e utilitárias |
| `README.md` | Documentação do projeto |

---

## Como Rodar o Projeto

### Pré-requisitos
- Backend API rodando em `http://127.0.0.1:5000` com os endpoints:

### Passos
1. Clone ou baixe este repositório:
   ```bash
   git clone https://github.com/jonathan-greco/front-end-mvp-full-stack-basico.git
   
   cd front-end-mvp-full-stack-basico
   ```

2. Abra o arquivo **index.html** diretamente no navegador:

3. Certifique-se de que o backend está rodando em http://127.0.0.1:5000.

## Autor

- Jonathan Greco Leite [@jonathan-greco](https://www.github.com/jonathan-greco)

Repositório do projeto MVP Full Stack Básico (Front-End) de Pós-graduação de Engenharia de Software, em 2026, da PUC-Rio.
