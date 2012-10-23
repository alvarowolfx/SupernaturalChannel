
var cradle = require('cradle') 
  , twitter = require('ntwitter');

var credentials = require('./credentials.js');

var t = new twitter({
    consumer_key: credentials.consumer_key,
    consumer_secret: credentials.consumer_secret,
    access_token_key: credentials.access_token_key,
    access_token_secret: credentials.access_token_secret
});

/*
var supernaturalKeys = ['supernatural','#supernatural'];

t.stream('statuses/filter', { track : supernaturalKeys } , function(stream) {
  stream.on('data', function (data) {
    console.log(data.text);
  });

  stream.on('error',function(err){
    console.log('Deu erro no stream api')
    console.log(err);
  });
});

t.stream('statuses/filter', {follow : 'CW_Supernatural' } ,function(stream){

  stream.on('data', function (data) {
    console.log('Dados da CW')
    console.log(data.text);
  });

  stream.on('error',function(err){
    console.log('Deu erro no stream api (CW)')
    console.log(err);
  });
})
*/
var databaseName = 'supernatural';
var host = 'localhost';
var db;
var searchFunction = function(q,pagesNumber,resultsPerPage){

  db = new(cradle.Connection)(host).database(databaseName);  
  db.all({limit : 1 }, function(err,doc){
    for(var i = 1 ; i <= pagesNumber ; i++){
    
      var options = {include_entities : true , 
                     rpp : resultsPerPage, 
                     count : resultsPerPage , 
                     page : i }      
      
      if(doc){        
        options['max_id'] = doc[0]['id'];
      }      
      t.search(q, options , function(err,data){
        var page = i;
        if(!err){

          var tweets = data['results']; 

          for(var t in tweets){

            tweets[t]['_id'] = tweets[t]['id_str'];

          }
          db.save(tweets,function (err, res) {
            if(err){
              console.log('Erro ao salvar no CouchDB');
              console.log(err);          
            }else{    
              console.log('Salvando tweets');
            }
          }); 

        }else{

          console.log('Erro ao buscar tweets da página '+ page);
          console.log(err);
        }

      });
    }
  });


}
 exports.search = searchFunction;
