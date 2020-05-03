# Visão Geral

Todos Social é um pequeno projeto de código aberto que implementa os conceitos básicos de rede e mídia sociais. Esse projeto é o frontend somente. A REST API backend foi desenvolvida com Laravel e pode ser vista aqui:

[Todos Social - Restful API](https://github.com/paduanton/todos-social)

A API possui todas funcionalidades básicas e documentadas, porém até o presente momento este projeto frontend consome somente parte do backend.

## Recursos
Os recursos que o frontend tem até o momento são:
- Autenticação (signup, login e logout)
- Listar, Cadastrar, Atualizar e excluir Todos
- Listar informações do usuário autenticado
- Listar e adicionar comentários de Todos

## Requisitos de sistema (Mac OS, Windows ou Linux)
* [Node.js e NPM](https://nodejs.org/en/download/)
* [Docker](https://www.docker.com/get-started)
* [Docker Compose](https://docs.docker.com/compose/install)


## Setup do projeto

Adicione a seguinte linha no arquivo hosts da sua máquina:
```
127.0.0.1       todos.social
```

Dentro do diretório do repositório, rode os seguintes comandos no bash:

Instalar dependências do projeto:
```
npm install
```

Montar e criar ambiente de dev local:
```
 docker-compose up --build
```

Lembrando que para funcionar corretamente, o backend citado no início já deve estar configurado e funcionando corretamente.

Para acessar a aplicação frontend acesse http://todos.social:4200/ no navegador.