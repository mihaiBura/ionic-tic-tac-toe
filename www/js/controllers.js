angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, GameEngine) {

    $scope.cells;
    $scope.win;

    $scope.setCell = function(index) {
        if (!$scope.win) {
            GameEngine.set(index);
            $scope.win = GameEngine.whoWon();
        }
    }

    $scope.restartGame = function() {
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
