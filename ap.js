const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

app.use(bodyParser.urlencoded({ extended: true }));

const uri = '<mongodb+srv://parth2012dixit:<ad121964>@cluster2.qfrlqib.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2>';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/submit-form', async (req, res) => {
    try {
    
        await client.connect();
        const db = client.db('MedPort');
        const collection = db.collection('Parth1');
        const formData = req.body;
        await collection.insertOne(formData);
        console.log('Form Data:', formData);
        res.redirect('/thank-you');
    } catch (error) {
        console.error('Error submitting form:', error);
        res.status(500).send('Internal Server Error');
    } finally {
        await client.close();
    }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
