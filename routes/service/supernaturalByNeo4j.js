var neo4j = require('neo4j');
var host = 'localhost';
var db;

exports.init = function(){
  db = new neo4j.GraphDatabase('http://'+host+':7474');   
}

exports.mentions = function(req,res){  
  db.query(
      'START supernatural=node:Hashtag(\"name:#Supernatural~0.9\") '+
      'MATCH supernatural<-[:TAG]-t-[:MENTION]->user '+
      'RETURN user,count(user<-[:MENTION]-t) as cont '+
      'ORDER BY count(user<-[:MENTION]-t) desc '+
      'LIMIT 10 '
  ,function(err,nodes){
      var users = [];
      for(var i in nodes){

        var id = nodes[i]['user']['_data']['self'].split('/');
        id = id[id.length-1];        
        var type = nodes[i]['user']['_data']['data']['type'];
        var name = nodes[i]['user']['_data']['data']['name'];
        var cont = nodes[i]['cont'];       
        users.push({node : id, type : type , name : name,count : cont});

      }
      res.send({users : users});
      
  });
}

exports.hashtags = function(req,res){
  db.query(
    'START tag = node:Hashtag("name:#Supernatural~0.9") '+
    'MATCH otherTag<-[:TAG]-t-[:TAG]->tag '+
    'RETURN otherTag as tag, count(t-[:TAG]->otherTag) as cont '+
    'ORDER BY count(t-[:TAG]->otherTag) desc '+
    'LIMIT 10 '
  ,function(err,nodes){
      var tags = [];
      for(var i in nodes){

        var id = nodes[i]['tag']['_data']['self'].split('/');
        id = id[id.length-1];        
        var type = nodes[i]['tag']['_data']['data']['type'];
        var name = nodes[i]['tag']['_data']['data']['name'];        
        var cont = nodes[i]['cont'];
        tags.push({node : id, type : type , name : name,count : cont});

      }
      res.send({tags : tags});
      
  });
}
