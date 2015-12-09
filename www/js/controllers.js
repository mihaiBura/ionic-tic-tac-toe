angular.module('starter.controllers', ['ionic.service.analytics'])

.controller('DashCtrl', function($scope, $ionicAnalytics, GameEngine) {

  $scope.cells;
  $scope.win;

  $scope.setCell = function(index) {
    if (!$scope.win) {
      GameEngine.set(index);
      $scope.win = GameEngine.whoWon();
    }
  }

  $scope.restartGame = function() {
    if ($scope.win) {
      $ionicAnalytics.track('Winner-' + $scope.win);
    }
    GameEngine.startNewGame();
    $scope.cells = GameEngine.getCells();
    $scope.win = '';
  }

  GameEngine.play();
  $scope.restartGame();
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
