const express = require('express');
const app = express();

app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs')

app.get('/',function(req,res){
    res.render('index.ejs');
});

app.listen(80,function(){
    console.log("Servidor Escutando na porta 80");
});
