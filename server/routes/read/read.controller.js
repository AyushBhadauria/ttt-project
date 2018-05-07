var fs = require('fs')
var http = require('http');
const api="http://terriblytinytales.com/test.txt"
exports.getFile= function(req, res) {
    var file = fs.createWriteStream("file.txt");
    var request = http.get(api, function(response) {
      response.pipe(file);
      var count=Number(req.params.count)
      let mf = 1;
      let m = 0;
      let item;
      let resArray=[]
      fs.readFile('file.txt', function(err, data) {
          if(err) throw err;
          var array = data.toString().split(" ");
          for(i in array) {
             array.push(i)
          
          }
  for(let k=1;k<=count;k++){
  
  for (let i=0; i<array.length; i++)
  {
          for (let j=i; j<array.length; j++)
          {
                  if (array[i] == array[j])
                   m++;
                  if (mf<m)
                  {
                    mf=m; 
                    item = array[i];
                  }
          }
          m=0;
          
  }
  
  array = array.filter(e => e !== item);
  resArray.push({item:item,count:mf});
  item=''
  mf=1
  
  }
  
  fs.unlink('file.txt',(err,response)=>{
   if (err) throw err;
   else{
        res.json(resArray);
   }
  })
  });
    });

}