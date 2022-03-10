const multer=require('multer');
const express=require('express');
const path=require('path');

const app=express();

var storage = multer.diskStorage(
    {
        destination: './uploads/',
        filename: function ( req, file, cb ) {
            cb( null, file.originalname);
        }
    }
);


var upload=multer({storage:storage});

const redirect=(req,res)=>{
	res.sendFile(path.join(__dirname,'public/viz.html'));
}

app.get('/download', function(req, res){
    const file = `${__dirname}/output.csv`;
    res.download(file); // Set disposition and send it.
  });



// app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/uploadFile.html'));
})

app.post('/upload',upload.single('file'),redirect);

app.listen(3000);