(function () {
  angular.module('LunchcheckApp',[])
  .controller('LunchCheckController',LunchCheckController)
  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController($scope){
    $scope.items = "";
    var splitItems=function(){
      //Get the total number of food items entered
    var arrayOfItems=$scope.items.split(',');
    return arrayOfItems.length;
  };
    $scope.DisplayMessage=function(){
      var numberOfItems=splitItems();
      var message="";
      //Display messages based on number of items entered
      if($scope.items==""){
        message="Please Enter data first"
      }
      else if (numberOfItems <= 3) {
        message="Enjoy";
      }
      else {
        message="Too much!";
      }
      $scope.message = message;
    };
  }
})();
