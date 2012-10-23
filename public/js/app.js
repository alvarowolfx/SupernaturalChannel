

angular.module('SupernaturalChannelApp', ['supernaturalServices','supernaturalDirectives']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/home', {templateUrl: 'partials/home.html',   controller: HomeController}).
      when('/hashtag', {templateUrl: 'partials/hashtag.html',   controller: TagController}).
      when('/mention', {templateUrl: 'partials/mention.html',   controller: UserController}).
      otherwise({redirectTo: '/home'});
}]);