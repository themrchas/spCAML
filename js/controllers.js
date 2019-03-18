
var app = angular.module("app1",[]);

    app.controller("ctrlCaml", ['$scope', 'dataService',function($scope,dataService) {  
 
  //  var sp = dataService.getItem();

    console.log('hellow world');

    $scope.test = "helloWorld";


    //var targetUrl = "http://localhost:8080/sites/dev/socafdev/_api/Web/Lists/getByTitle('CountryLinks')/items?$select=URL";
    var targetUrl = "http://localhost:8080/sites/dev/socafdev/_api/Web/Lists/getByTitle('CountryLinks')/GetItems(query=@v1)?";
   // var camlQuery =  "<View><Query><Where><Eq><FieldRef Name='Country'/><Value Type='TaxonomyFieldType'>{{countryMM}}</Value></Eq></Where></Query></View>";
   var requestBodyJSON = { "query" : { "__metadata": { "type" : "SP.CamlQuery" } , "ViewXml": camlQuery }};
  //  requestBodyString = "@v1=" + JSON.stringify(requestBodyJSON );

   //var camlQuery =  { ViewXml: "<View><Query><Where><Eq><FieldRef Name='CountryMM'/><Value Type='TaxonomyFieldType'>Germany</Value></Eq></Where></Query></View>" };                 
    
   var camlQuery =  { ViewXml: "<View><Query><Where><In><FieldRef Name='testMMM' LookupId='TRUE' /><Values><Value Type='Integer'>4</Value></Values></In></Where></Query></View>" };                 
    

  // var camlQuery =  { ViewXml: "<View><Query><Where><In><FieldRef LookupId='True' Name='testMMM'/><Values><Value Type='LookupMulti'>Germany</Value><Value Type='LookupMulti'>Ghana</Value></Values></In></Where></Query></View>" };                 
     
 //var camlQuery =  { ViewXml: "<View><Query><Where><Contains><FieldRef LookupId='True' Name='testMMM'/><Value Type='LookupMulti'>Germany</Value></Contains></Where></Query></View>" };                 
  
    targetUrl += "@v1=" + JSON.stringify(camlQuery);
    
    dataService.getRequestDigest().then(function(requestId) {

      dataService.getItemCaml(targetUrl,requestId).then(function(data) {

        console.log('Returned data is',data);

       })
      })
      
}]);




