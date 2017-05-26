let express = require("express");
let app = express();
const path = require("path");
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Define the Static Folder:

app.use(express.static(__dirname + '/public/dist'));
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/stars');
mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;
// define Post Schema
var StarSchema = new mongoose.Schema({
 name: {type: String, required: true, minlength: 2 },
 author: {type: String, required: true, minlength: 2 },
 discription: {type: String, required: true, minlength: 3 },
 notes: [{type: Schema.Types.ObjectId, ref: 'Note'}]
}, {timestamps: true });
// define Comment Schema
var NoteSchema = new mongoose.Schema({
 _star: {type: Schema.Types.ObjectId, ref: 'Star'},
 name: {type: String, required: true, minlength: 2 },
 author: {type: String, required: true, minlength: 2 },
 text: {type: String, required: true, minlength: 3 }
}, {timestamps: true });
// set our models by passing them their respective Schemas
mongoose.model('Star', StarSchema);
mongoose.model('Note', NoteSchema);
// store our models in variables
var Star = mongoose.model('Star');
var Note = mongoose.model('Note');

// Here we're hardcoding data for simplicity, but normally this would be modularized and the data would be coming from your database.
//var friends = [{name: "Kermit", color: "green"}, {name: "Miss Piggy", color: "pink"}, {name: "Gonzo", color: "blue"}];


// Routes could be modularized, but for now we'll put it here
// You can use your fat arrow functions if you like!
//app.get('/allItems', function(req, res){
  //Auction.find({}, function (err, friend){
    //console.log("server", friend)
    //res.json(friend);
  //})
//})


//process route
app.post('/createItem', function(req, res){
  console.log("POST DATA", req.body);
  //item ={productName:'',sellerName: '',startingBid:'',discription:'',endDate:''};

  var theItem = new Star({name: req.body.starName, discription: req.body.discription});
  console.log("NEW Star");
  theItem.save(function(err){
    if(err){
      console.log('error');
      console.log(theItem.errors);
      res.json('errors');
    }
    else{
      console.log('success');
      //res.redirect('/showall');
      res.json('ok');
    }
  })
});

app.post('/editItem/:id', function(req, res){
   console.log("EDIT ID");
   console.log(req.params.id);

   Star.update({_id: req.params.id}, {name:req.body.name, discription:req.body.name}, function(err){
     if(err){
       // console.log('error')
      //  console.log(friend.errors);
       console.log('errors')
     }
     else{
       console.log('success')
      //  console.log(friend);
       res.json('ok');
     };

   });
 });


 app.get('/getItem/:id', function(req, res){

    console.log("Server get auction id:",req.params.id);

    Star.findOne({_id: req.params.id} , function(err, theItem){
      if(err){
        console.log('error')
     }
     else{
       console.log('success')
       console.log(theItem);
       res.json(theItem)
     }

   });//findOne ends


  });//get ends

 app.get('/allItems', function(req, res){
  Star.find({})
  .populate('notes')
  .exec(function(err, items) {
    if(err){
      // console.log('error')
      console.log(items.errors);
      res.json('you have errors!')
    }
    else{
      console.log('success');
      console.log(items);
      res.json(items);
    }
  });

  });

app.get('*', (req, res) => {
    console.log("unknown route");
    res.sendFile(path.resolve('public/dist/index.html'));
})

app.listen(8000);
