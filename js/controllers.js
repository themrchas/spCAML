
var app = angular.module("app1",[]);

    app.controller("ctrlCaml", ['$scope', 'dataService',function($scope,dataService) {  
 
  //  var sp = dataService.getItem();

    console.log('hellow world');

    $scope.test = "helloWorld";

    //Working CountryPagesContacts query
    //var targetUrl = "http://localhost:8080/sites/dev/socafdev/_api/Web/Lists/getByTitle('CountryPagesContacts')/GetItems(query=@v1)?";
    //var camlQuery =  { ViewXml: "<View><Query><OrderBy><FieldRef Name='SOFCategory' Ascending='TRUE'/></OrderBy><Where><Eq><FieldRef Name='Countries'/><Value Type='Text'>Germany</Value></Eq></Where></Query></View>" };  


    var targetUrl = "http://localhost:8080/sites/dev/socafdev/_api/Web/Lists/getByTitle('CountryLinks')/GetItems(query=@v1)?";

    //Working - query a single valued managed metadata field
    var camlQuery =  { ViewXml: "<View><Query><Where><Eq><FieldRef Name='Country'/><Value Type='TaxonomyFieldType'>Germany</Value></Eq></Where></Query></View>" };

    
    /*Working - query as '( A or B) and C' where A and B are multi valued managed metadata and C is a choice field
    var camlQuery =  { ViewXml: "<View><Query><Where><And><Or><Eq><FieldRef Name='Countries'/><Value Type='Text'>Germany</Value></Eq><Eq><FieldRef Name='Countries'/><Value Type='Text'>Africa</Value></Eq></Or><Eq><FieldRef Name='Choice'/><Value Type='Text'>facts</Value></Eq></And></Where></Query></View>" };
    */

    /* Working  - queries multi value managed metadata for value 'Germany'
    var camlQuery =  { ViewXml: "<View><Query><Where><Eq><FieldRef Name='Countries'/><Value Type='Text'>Germany</Value></Eq></Where></Query></View>" };
    */

    //Working  - query as 'A or B'; queries multi value managed metadata of using Or
   // var camlQuery =  { ViewXml: "<View><Query><Where><Or><Eq><FieldRef Name='Countries'/><Value Type='Text'>Germany</Value></Eq><Eq><FieldRef Name='Countries'/><Value Type='Text'>Africa</Value></Eq></Or></Where></Query></View>" };
    
  
   
    var requestBodyJSON = { "query" : { "__metadata": { "type" : "SP.CamlQuery" } , "ViewXml": camlQuery }};
  
    
 /* Working Country Links query using multi choice managed meta-data */
 // var targetUrl = "http://localhost:8080/sites/dev/socafdev/_api/Web/Lists/getByTitle('CountryLinks')/GetItems(query=@v1)?";
 // var camlQuery =  { ViewXml: "<View><Query><Where><Eq><FieldRef Name='testMMM'/><Value Type='Text'>Germany</Value></Eq></Where></Query></View>" };  







    
  // var camlQuery =  { ViewXml: "<View><Query><Where><In><FieldRef LookupId='True' Name='testMMM'/><Values><Value Type='LookupMulti'>Germany</Value><Value Type='LookupMulti'>Ghana</Value></Values></In></Where></Query></View>" };                 
     
 //var camlQuery =  { ViewXml: "<View><Query><Where><Contains><FieldRef LookupId='True' Name='testMMM'/><Value Type='LookupMulti'>Germany</Value></Contains></Where></Query></View>" };                 
  
    targetUrl += "@v1=" + JSON.stringify(camlQuery);
    
    console.log('Calling dataService to get ')
    dataService.getRequestDigest().then(function(requestId) {

      console.log('making call to SharePoint...');
      dataService.getItemCaml(targetUrl,requestId).then(function(data) {

        console.log('Returned data is',data);

       })
      })
      
}]);




