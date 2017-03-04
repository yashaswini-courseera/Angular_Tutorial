(function(){
  'use strict';


  angular.module("ShoppingListCheckOff",[])
  .controller("ToBuyController",ToBuyController)
  .controller("AlreadyBoughtController",AlreadyBoughtController)
  .service("ShoppingListCheckOffService",ShoppingListCheckOffService);

  ToBuyController.$inject=["ShoppingListCheckOffService"];
  function ToBuyController(ShoppingListCheckOffService)
  {
    var toBuyList = this;
    toBuyList.items = ShoppingListCheckOffService.showToBuyList();

    toBuyList.removeItem = function(itemIndex){
ShoppingListCheckOffService.removeitem(itemIndex);
    };
  }
  AlreadyBoughtController.$inject=["ShoppingListCheckOffService"];
function AlreadyBoughtController(ShoppingListCheckOffService)
{

  var alreadyBoughtList = this;
  alreadyBoughtList.items =ShoppingListCheckOffService.showBoughtList();

};
function ShoppingListCheckOffService()
{
  var service=this;
  var toBuyList=[];
  var alreadyBoughtList=[];
  service.showToBuyList=function(){
     toBuyList.push ({
        name:"Cookies",
        quantity:"10"
    },
    {
      name:"Coke bottles",
      quantity:"20"
    },
    {
      name:"Milk bottles",
      quantity:"5"
    },
    {
      name:"Bread Packets",
      quantity:"1"
    },
    {
      name:"Cheese blocks",
      quantity:"4"
    });
return toBuyList;
  };
  service.removeitem=function(ItemIndex){
    alreadyBoughtList.push(toBuyList[ItemIndex]);
    toBuyList.splice(ItemIndex,1);

  }
  service.showBoughtList=function(){
    return alreadyBoughtList;
  };
}
})();
