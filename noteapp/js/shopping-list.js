/**
 * Created by vishnu on 01-12-2015.
 */

"use strict";

angular.module('myApp',[])

    .constant('MAX_LENGTH',50)

    .constant('MIN_LENGTH',2)

    .factory('helper', function($log){
        return{
            filterFieldArrayDone : function(thisArray,thisField,thisValue){
                var arrayToReturn=[];
                //$log.info(thisArray);

                for(var i=0;i<thisArray.length;i++){
                    if(thisArray[i].done==1){
                        arrayToReturn.push(thisArray[i][thisField]);
                    }
                }
                //$log.info(arrayToReturn);
                return arrayToReturn;
            }
        }
    })

    .controller('shoppinglistController',function($scope,$http,$log,helper,MAX_LENGTH,MIN_LENGTH){

        var urlInsert = "http://localhost:8008/noteapp/mod/insert.php";
        var urlSelect = "http://localhost:8008/noteapp/mod/select.php";
        var urlUpdate = "http://localhost:8008/noteapp/mod/update.php";
        var urlRemove = "http://localhost:8008/noteapp/mod/remove.php";

        function _dataInserted(data){
            return (data && !data.error && data.item);
        }

        $scope.items = [];
        $scope.types = [];

        $scope.item = '';
        $scope.qty = '';
        $scope.type = '';

        $scope.howManyMoreCNeed = function(){
            var charcters = (MIN_LENGTH - $scope.item.length);

            return (charcters > 0) ? charcters : 0;
        };

        $scope.howManyCRemaining = function(){
            var charcters = (MAX_LENGTH  - $scope.item.length);

            return (charcters > 0) ? charcters : 0;
        };

        $scope.howmManyCOver = function(){
            var charcters = (MAX_LENGTH  - $scope.item.length);

            return (charcters < 0) ? Math.abs(charcters) : 0;
        };

        $scope.minimumCharactersMet = function(){
            return ($scope.howManyMoreCNeed() == 0);
        };

        $scope.anyCharactersOver = function(){
            return ($scope.howmManyCOver()>0);
        };

        $scope.isNumberOfCharactersWithInTheRange = function(){
            return ($scope.minimumCharactersMet() && !$scope.anyCharactersOver());
        };

        $scope.submitForm = function(){
           // $log.info($scope.isNumberOfCharactersWithInTheRange());
            //$log.info($scope.qty);
            //$log.info($scope.qty.length > 0);
            //$log.info($scope.isNumberOfCharactersWithInTheRange() && $scope.qty > 0)
           return ($scope.isNumberOfCharactersWithInTheRange() && $scope.qty.length > 0 && $scope.type>0);
        };

        $scope.clear = function(){
            $scope.item = '';
            $scope.qty = '';
        };

        $scope.insert = function(){
            if($scope.submitForm()){

                var thisData = "item=" + $scope.item;
                thisData += "&qty=" + $scope.qty;
                thisData += "&type=" + $scope.type;

                $http({
                    method : 'POST',
                    url : urlInsert,
                    data : thisData,
                    headers : {'Content-Type' : 'application/x-www-form-urlencoded'}
                })
                    .success(function(data){
                        //$log.info(data);
                        if(_dataInserted(data)){
                           // $log.info(data);
                            $scope.items.push({
                                id : data.item.id,
                                item : data.item.item,
                                qty : data.item.qty,
                                type : data.item.type,
                                type_name : data.item.type_name,
                                done : data.item.done
                            });

                            $scope.clear();
                        }
                    })
                    .error(function(data,status,headers,config){
                        throw new Error('Somethig went wrong while inserting a record');
                    });
            }
        };

        $scope.select = function(){

            $http.get(urlSelect)
                .success(function(data){

                    if(data.items){
                        $scope.items = data.items;
                        //$log.info($scope.items);
                    }

                    if(data.types){
                        $scope.types = data.types;
                        //$log.info($scope.types);
                        $scope.type = $scope.types[0].id;
                        //$log.info($scope.type);
                    }
                })
                .error(function(data,status,headers,config){
                    throw new Error("Something wend hapnd while calling select");
                });
        };

        $scope.select();

        $scope.update = function(item){

            var thisData = "id=" + item.id;
            thisData += "&done=" + item.done;

            $http({
                method : 'POST',
                url : urlUpdate,
                data : thisData,
                headers : {'Content-Type' : 'application/x-www-form-urlencoded'}
            })
                .success(function(data){
                    $log.info(data);
                })
                .error(function(data,status,headers,config){
                    throw new Error('Somethig went wrong while updating a record');
                });

        };

        function _recordRemovedSuccess(data){
            return (data && !data.error);
        }

        $scope.remove = function (){

            //$log.info($scope.items);
            var removeIds = helper.filterFieldArrayDone($scope.items,'id',1);
            $log.info(removeIds);
            if(typeof removeIds !== 'undefined') {
                if (removeIds.length > 0) {
                    $http({
                        method: 'POST',
                        url: urlRemove,
                        data: "ids=" + removeIds.join('|'),
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    })
                        .success(function (data) {
                            $log.info(data)
                            if (_recordRemovedSuccess(data)) {
                                $scope.items = $scope.items.filter(function (item) {
                                    return item.done == 0;
                                })
                            }
                        })
                        .error(function (data, status, headers, config) {
                            throw new Error('Somethig went wrong while deleting a record');
                        });
                }
            }
        };

        $scope.print = function(){
            window.print();
        }

    });






