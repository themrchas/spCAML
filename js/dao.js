
app.factory('dataService', ['$q', function($q) {

//Routines to access data source from which table is created

var doLog = true;

    function getItem() {

        var deferred = $.Deferred();

        $.ajax({
            headers: { 'X-Auth-Token': '2de870af0bd04b0099d82dfc08451bd4' },
            url: "https://api.football-data.org/v2/competitions/2002/teams",
            dataType: 'json',
            type: 'GET',
        })
            .done(function (response) {

                doLog && console.log(response);
                deferred.resolve(response.teams);
            })
            .fail(function (response) {
                doLog && console.log('getTeams call failed returned', response)
                deferred.reject(response);
            })

        return deferred.promise();
    }

    function getRequestDigest() {

       var requestTarget = "http://sp-dev-sp/sites/dev/socafdev/_api/contextinfo";
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

                doLog && console.log(response);
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
    'getRequestDigest':getRequestDigest
};

}]);
