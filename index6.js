// Kreirati vlastite GET, POST, PUT, DELETE API-je za rad s objektom 
//unutar vlastitog projekta

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let knjige = [
    {
        "id": 1,
        "naslov": "Lord of the Rings",
        "autor": "J.R.R. Tolkien",
        "god_izdanja": "1954",
        "izdavac": "Allen & Unwin"
    },
    {
        "id": 2,
        "naslov": "Funny Story",
        "autor": "Emily Henry",
        "god_izdanja": "2024",
        "izdavac": "Berkley"
    },
]
// ReAD -> GET API
app.get('/getKnjige', (request, response) => {
    return response.send('Popis knjiga');
});

app.get('/getKnjige/:id', (request, response) => {
    let id= request.params.id;
    let knjiga="";
    knjige.forEach(element => {
      if(element.id==id){
        knjiga= JSON.stringify(element);
      }
    });


    return response.send('Popis knjiga'+knjiga);
});
app.post('/addKnjiga', (request, response) => {
    
    const data = request.body;
    const id=data.id;
    const naslov = data.naslov;
    const autor = data.autor;
    const god_izdanja = data.god_izdanja;
    const izdavac = data.izdavac;

    let knjiga={ 
         "id": knjige.length+1,
        "naslov": naslov,
        "autor": autor,
        "god_izdanja": autor,
        "izdavac": izdavac
    };
    knjige.push(knjiga);
    return response.send("Dodavanje knjige. Novi popis:"+JSON.stringify(knjige));
        //+id+" " +naslov+" "+autor+
        //" "+god_izdanja+" "+izdavac);
});
app.put('/updateKnjiga', (request, response) => {
    return response.send('Azuriranje knjige');
});
app.put('/updateKnjiga/:id', (request, response) => {
    let id= request.params.id;

    const data = request.body;
    const naslov = data.naslov;
    const autor = data.autor;
    const god_izdanja = data.god_izdanja;
    const izdavac = data.izdavac;
    
    return response.send('Azuriranje knjige'+id+" "+naslov+" "+autor+" "+god_izdanja+" " +izdavac);
});

// DELETE -> DELETE API
app.delete('/deleteKnjiga', (request, response) => {
    return response.send('Brisanje knjige');
});

app.delete('/deleteKnjiga/:id', (request, response) => {
    let id= request.params.id;
 
   knjige.forEach(element => {
     if(element.id==id){
      knjige.pop(element); // nije dobro rijesenje!!! brise samo zadnju knjigu na listi
     }
   });

    return response.send('Brisanje knjige s id "+id+"Novi popis: ' +JSON.stringify(knjige));
});
app.listen(3001, () => {
    console.log("Server running on port 3001");
});

// kolokvij: lagani backend bez komplikacija... conzola, terminal, git hub (pull push), instalirati modul, RESTED(CRUD), URL i djelovi url-a,
// na pitanje "sta mozemo ocekivati u kolokviju" kaze "ovo.."
