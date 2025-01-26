const { log } = require('console');
const fs = require('fs');

// fs.writeFile('new.txt', "Hey I am new here", function(err){ // file create krny ka tariqa
//     if(err){
//         console.log(err);
        
//     }else{
//         console.log("Done");
        
//     }
// })


// fs.appendFile('new.txt', " and what about you", function(err){ // created file me data add krny ka tariqa
//     if(err){
//         console.log(err);
        
//     }else{
//         console.log("Done");
        
//     }
// })


fs.rename('new.txt', 'Hello.txt', function(err){ // created file ko rename krny ka tariqa
    if(err){
        console.log(err);
        
    }else{
        console.log("Done");
        
    }
})

