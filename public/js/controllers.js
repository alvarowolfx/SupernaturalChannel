
/* Controllers */

function TagController($scope,Hashtag){
	$scope.mainTag = '#Supernatural';
	$scope.progress = 10;
	$scope.hashtags = Hashtag.get({},function(tags){
		
		$scope.hashtags = tags['tags'];
		$scope.waiting = false;
		$scope.data = getData();

	});	
	
	$scope.waiting = true;

	function getData() {
		return  [ 
			{ 
			 	key : "Hashtags",
		  		values : $scope.hashtags
			}
		]; 	
 	}
}

function UserController($scope,User){
	
	$scope.mainTag = '#Supernatural';
	$scope.waiting = true;
	$scope.userGraph = {};
	$scope.users = User.get({},function(mentions){
		
		$scope.users = mentions['users'];
		$scope.waiting = false;
		$scope.data = getData();
		updateUserGraph();

	});	

	var updateUserGraph = function(){
				
		var nodes = [];
		var links = [];	
		var id = 99999;	
		for(var i in $scope.users){

			links.push({id : id, source : "0" , target : $scope.users[i]['node']});
			id += 1;
			nodes.push($scope.users[i]);
		}
		nodes.push({ node : "0", name : $scope.mainTag , count : 1});

		$scope.userGraph = {nodes : nodes , links : links};

	};

	function getData() {
		return  [ 
			{ 
			 	key : "Mentions",
		  		values : $scope.users
			}
		]; 	
 	}

	
}
function HomeController($scope){
	
	
}
function NavbarController($scope,$location){
	
	$scope.selected = function(page){
		var currentRoute = $location.path().substring(1) || 'home';		
        return currentRoute;
		
	};	
}
