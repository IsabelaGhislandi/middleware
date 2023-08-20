const express = require("express")
const app = express()
//express nao entende o formato q a gente quer enviar pro backend, precisa dizer o json
app.use(express.json())

const items = []

//pegando da requisição uma informaçao, também um codigo (token barer)
function middleware(req, res, next) {
    console.log("Passou pelo middleware")
    //Barer token
    console.log(req.headers.authorization)

    console.log(String(req.headers.authorization).split(" ")) 

    const [,id] = String(req.headers.authorization).split(" ")
    console.log(id)

    //manipular a requisição e acrescentar na requisição
    req.user = {
        id
    }
    
    next()
}

function middlewarePost(req, res, next) {
    console.log("Middleware do post apenas")
  
    next()
}

function middlewareStop(req,res,next){
    res.json({ message: "Não rolou o middleware! Para tudo!"})
    next()
}

//utiliza o middleware pra toda as rotas
app.use(middleware)

//Criando uma rota get pra rota item. Antes de chegar nessa rota vai passar pelo middleware.
app.get("/item", (req, res) => {
    //a rota sempre devolve uma resposta
    res.json(items)
})

//segunda rota o mesmo, porem post, acessando a requesição do body vamos pegar o name e quantity
app.post("/item", middlewarePost, (req, res) => {
    const { name, quantity } = req.body
    items.push({name, quantity, user: req.user})
    
    res.status(201).json()
})

app.listen(3333, () => console.log("Server is online"))


