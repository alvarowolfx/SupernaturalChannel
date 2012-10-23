/*
	Services
*/
angular.module('supernaturalServices', ['ngResource']).
    factory('Hashtag', function($resource){
  		return $resource('/service/hashtags', {}, {
    				query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
 	 	});
	})
	.factory('User', function($resource){
  		return $resource('/service/mentions', {}, {
    				query: {method:'GET', params:{phoneId:'phones'}, isArray:true}    				
	 	});
	 });