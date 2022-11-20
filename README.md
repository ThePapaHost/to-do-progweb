# Task List

Aplicativo feito em React, com conexão ao Firestore (Firebase).
Ele utiliza o [material design](https://mui.com) para facilitar o desenvolvimento.

A aplicação persiste logins no `localStorage` criando uma session.

## Como rodar
1. Instale as dependencias
```
yarn, node.js, git
```
2. Modifique o arquivo `firebase.config.js`
```js
const firebaseConfig = {
  apiKey: "<sua api key>",
  authDomain: "<seu auth domain>",
  databaseURL: "<sua database url>",
  projectId: "<seu projeto id>",
  storageBucket: "<seu storage bucket>",
  messagingSenderId: "<seu msg id>",
  appId: "<seu app id>"
};
```
Como achar essas informações?
* Adicione o Firestore ao projeto
* Adicione um app do tipo web
* Configure o SDK com NPM
* Copie o arquivo gerado e atualize os dados

3. Rode o projeto
```
yarn start
```

## Banco de dados
Temos dois documentos
1. Users
```json
{
    "email": string,
    "name": string,
    "password": string
}
```

2. Tasks
```json
{
    "category": string,
    "color": string,
    "status": string,
    "title": string,
    "user": string
}
```
Onde `user` é o ID do usuário

## Páginas
Temos apenas quatro páginas

1. Home

Tela principal do App, onde temos as funções de criar tarefa e listar tarefas

2. SignIn

Tela autenticamos o usuário

3. SignUp

Tela onde criamos um novo usuário

4. TaskEdit

Tela onde editamos uma tarefa

## Componentes

1. Copyright

Exibe um copyright simples

2. CustomInput

Um Input personalizado utilizando o MUI como base

3. Header

Header que contém o título do app, ícone e input de busca

4. SearchInput

Um Input para o Header do tipo busca personalizado utilizando o MUI

5. TaskAdd

Partial da Home, onde temos a view de uma tarefa

6. TaskList

Partial da Home, onde listamos as tarefas existentes. 
Quando essa página é renderizada a partir da busca (Usuário digitou algo na busca e clicou enter), ela filtra os resultados baseados no termo e mostra o termo na tela.

## Helpers

1. TaskCategory

Contém as categorias possíveis das tarefas e as traduções
```json
    ["WORK", "RECREATION", "STUDY"]
    ["Trabalho", "Lazer", "Estudo"]
```

2. TaskColors

Contém as cores possíveis das tarefas
```json
    ["red", "yellow", "green"]
```

3. TaskStatus

Contém os status possíveis da tarefa e as traduções
```json
    ["TODO", "DONE", "CANCELED"]
    ["Pendente", "Realizado", "Cancelado"]
```