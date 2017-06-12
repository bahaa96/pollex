const express = require("express")
const path = require("path")

const PORT = process.env.PORT || 3000
let app = express()

app.use((req, res, next)=>{
    if (req.headers["x-forwarded-proto"] === "https"){
        res.redirect("http://" + req.hostname + req.url)
    }else {
        next()
    }
})

app.use(express.static("public"))

app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(PORT, ()=> console.log("Listening........"))