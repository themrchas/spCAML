
app.factory('dataService', ['$q', function($q) {

//Routines to access data source from which table is created

var doLog = true;

    function getItem() {

        var requestTarget = "http://localhost:8080/sites/dev/socafdev/_api/Web/Lists/getByTitle('CountryLinks')/items?$select=URL"

        var deferred = $.Deferred();

        $.ajax({
            headers: { "Accept": "application/json; odata=verbose"},
            url: requestTarget,
            type: 'GET',
        })
            .done(function (response) {

                doLog && console.log(response);
                deferred.resolve(response);
            })
            .fail(function (response) {
                doLog && console.log('getItem call failed returned', response)
                deferred.reject(response);
            })

        return deferred.promise();
    }

    function getItemCaml(requestTarget,requestId) {

        //var requestTarget = "http://localhost:8080/sites/dev/socafdev/_api/Web/Lists/getByTitle('CountryLinks')/items?$select=URL";


        var deferred = $.Deferred();

        $.ajax({
            headers: { "Accept": "application/json; odata=verbose", "Content-Type": "application/JSON;odata=verbose", "X-RequestDigest":requestId},
            url: requestTarget,
            type: 'POST'
          //  data:payload
        })
            .done(function (response) {

                doLog && console.log('Received response',response);
                deferred.resolve(response);
            })
            .fail(function (response) {
                doLog && console.log('getItem call failed returned', response)
                deferred.reject(response);
            })

        return deferred.promise();
    }

    function getRequestDigest() {

    console.log('Getting request digest');
       var requestTarget = "http://localhost:8080/sp-dev-sp/sites/dev/socafdev/_api/contextinfo";
     // var requestTarget = "http://localhost:8080/sites/dev/socafdev/_api/contextinfo/"   

        var deferred = $.Deferred();

        $.ajax({
            headers: {
                 "Accept": "application/json; odata=verbose"
               // "X-RequestDigest": digest
            },
            url: requestTarget,
            method: 'POST',
        })
            .done(function (response) {

                doLog && console.log("Request digest is",response.d.GetContextWebInformation.FormDigestValue);
                deferred.resolve(response.d.GetContextWebInformation.FormDigestValue);
            })
            .fail(function (response) {
                doLog && console.log('Call failed returned', response)
                deferred.reject(response);
            })
        return deferred.promise();
    };

   


return {
    'getItem': getItem,
    'getRequestDigest':getRequestDigest,
    'getItemCaml': getItemCaml
};

}]);
