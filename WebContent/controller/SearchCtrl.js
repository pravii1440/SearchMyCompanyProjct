/**
 * Created by Vijay Praveen on 11/08/2018.
 */
(function () {
    'use strict';

   var myApp = angular.module('myApp',['ngRoute']).controller('searchMyCompCtrl',searchMyCompCtrl);

   
     
   function searchMyCompCtrl($scope,$http,$location,$window) {  
    
	   $scope.intialize = function(){
		   
		  $scope.intialView = true;
	   }
	   
	   $scope.companyLookUp = function(companyName){
		   
		   if(companyName.length > 2){
			   $scope.lookUpList = "showList";
		   $http({
     		    method : "GET",
     		    url : "https://daas-qa-sig-api.circleback.com/service/contactcloud/companies/autocomplete?company_name="+companyName,
     		   headers : {
     	                'Content-Type' : 'application/json'
     	                  }
     		}).then(function success(dataList){     			
     			$scope.companiesList = dataList.data.searchResults;     			
     		},function error(response){
     			$scope.lookUpList = " ";
     		} );
	   }else{
		   $scope.lookUpList = " ";
	   }
		   
	   };
	   
	   $scope.displayDetails = function(companyName){
		  
		   angular.forEach($scope.companiesList, function(obj) {				
				 if(companyName === obj.companyName){
					 $scope.selectedCompanyName = obj.companyName;
				     $scope.selectedCompanyIds = obj.companyIds;
				     $scope.intialView = false;
				 }
				});
	   };
	   
	   $scope.displaySearch = function(){
		   
		   $window.location.href = '/SearchMyCompany/';
	   }
    };
   
})();
