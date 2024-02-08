const express = require('express');
const cors = require('cors');

const app = express();
// create a port in this case we tell what port used 
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let data = []; 

// read
// al the information in the array get and show in the browser 
app.get('/api/task', (req, res) => {
    res.json(data);
});
//created
app.post('/api/task', (req, res) => {
    // create a constant where keep the array en push the data in the new var
    const newData = req.body;
    data.push(newData);
    res.status(201).json(newData);
});
//update
app.put('/api/task/:id', (req, res) => {
    // create a variable id, then other varible called updateData 
    //findIndex find the id this id find te informacion, then overwriten the same text 
    const id = req.params.id;
    const updatedData = req.body;
    const dataIndex = data.findIndex(item => item.id === id);
    if (dataIndex !== -1) {
        data[dataIndex] = { ...data[dataIndex], ...updatedData };
        res.json(data[dataIndex]);
    } else {
        res.status(404).json({ error: 'Elemento no encontrado' });
    }
});
//  delete 
app.delete('/api/task/:id', (req, res) => {
    const id = req.params.id;
    const dataIndex = data.findIndex(item => item.id === id);
    if (dataIndex !== -1) {
        //  splice help me delete the array 
        data.splice(dataIndex, 1);
        //this a toast confirm other process
        res.json({ message: 'Elemento eliminado exitosamente' });
    } else {
        res.status(404).json({ error: 'Elemento no encontrado' });
    }
});


// start server 
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});