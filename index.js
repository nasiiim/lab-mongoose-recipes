const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    // return Recipe.deleteMany()
  })
  .then(() => {
    Recipe.create(data[2])
    .then((newRecepie)=>{
          console.log(newRecepie.title)}
    )
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })

///Iteration 3 - Insert multiple recipes

 .then(()=>{
    Recipe.insertMany(data)
    .then((res)=> res.forEach((recipe)=>{
      console.log(recipe.title)
    }))
 })
 .catch(error => {
  console.error('Error connecting to the database', error);
})

 
//////////////Iteration 4 - Update recipe

 .then(()=>{
   Recipe.findByIdAndUpdate({title : "Rigatoni alla Genovese"}, {duration : 100} )
   .then(() => console.log("The update was done!"))
 })
   .catch(error => {
      console.error('Error connecting to the database', error);
    })
  

///////////////////////Iteration 5 - Remove a recipe

.then(()=>{
  Recipe.deleteOne({title : "Carrot Cake"})
  .then(()=> console.log("The delete was done!"))
})
.catch(error => {
  console.error('Error connecting to the database', error);
})

///////////////////Iteration 6 - Close the Database
.finally(()=>
mongoose.connection.close()
)