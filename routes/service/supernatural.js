var cradle = require('cradle');
var databaseName = 'supernatural';
var host = 'localhost';
var db;
var neoDb;

exports.init = function(){
  db = new(cradle.Connection)(host,5984,{
         cache: true,
         raw: false }).database(databaseName);    
}

exports.hashtags = function(req,res){
  db.view('hashtags/Hashtags',{group_level : 1 },function(err,docs){
      
      if(!err){
        
        docs.sort(function(a,b){
          return b['value'] - a['value'];
        });
        
        var tags = [];
        for(var i = 0 ; i < 10; i++){
          tags.push(docs[i]);
        }      
        
        res.send(tags);
      }else{
        console.log('Erro ao acessar view');
        console.log(err);
      }

  });
}

exports.mentions = function(req,res){
  db.view('mentions/Mentions',{group_level : 1 },function(err,docs){
      
      if(!err){

        docs.sort(function(a,b){
          return b['value'] - a['value'];
        });
        
        var ment = [];
        for(var i = 0 ; i < 10; i++){
          ment.push(docs[i]);
        }      
        
        res.send(ment);
      }else{
        console.log('Erro ao acessar view');
        console.log(err);
      }

  });
}
