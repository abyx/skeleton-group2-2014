angular.module('app', ['ngRoute', 'ngDialog']);

// Example of how to set default values for all dialogs
angular.module("app").config(['ngDialogProvider', function (ngDialogProvider) {
  ngDialogProvider.setDefaults({
    className: 'ngdialog-theme-default',
    plain: false,
    showClose: true,
    closeByDocument: true,
    closeByEscape: true,
    appendTo: false,
    preCloseCallback: function () {
      console.log('default pre-close callback');
    }
  });
}]);
/*
angular.module('app').config(function($routeProvider) {

  $routeProvider
    .when('/', {
      templateUrl: 'home.html',
      controller: 'HomeCtrl'
    })
    .when('/view1/:argument?', {
      templateUrl: 'tester.html',
      controller: 'View1Ctrl'
    })
    .when('/view2', {
      templateUrl: 'view2.html',
      controller: 'View2Ctrl'
    })
    .otherwise({redirectTo: '/'});
});
*/
angular.module('app').controller('MessageCtrl', function($scope) {
  $scope.greeting = 'ששי';

  $scope.model = {
    text: ''
  };

  $scope.sender1 = {
    text: 'רונן הורוביץ'
  };


  $scope.msgContent1 = {
    text: 'כיף באזרחות'
  };

  $scope.buttonClicked = function() {
    if ($scope.model.text === '') {
      alert('Please enter text in the input field');
    } else {
      alert('Heya, ' + $scope.model.text);
    }
  };

  $scope.init = function() {
    console.log("initttttttttttt");

  }



});