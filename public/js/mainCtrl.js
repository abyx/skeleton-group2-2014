<!-- App -->


angular.module("app").controller('MainCtrl', function ($scope, $rootScope, ngDialog,$http) {
    $rootScope.jsonData = '{"foo": "bar"}';
    $rootScope.theme = 'ngdialog-theme-default';

    $scope.sender = {text: "sender"};
    $scope.msgContent={text: "content"};

    $scope.openMessage = function ()
    {

        $http.get('/WhatsOut?username=5').
            success(function(data, status, headers, config)
            {
                console.log('data'+data);
                if(data.sender==null) return;
                console.log("data.sender - ",data.sender);
                $scope.sender.text=data.sender;
                console.log("data.content - ",data.content);
                $scope.msgContent.text=data.content;
                // this callback will be called asynchronously
                // when the response is available

                ngDialog.openConfirm({
                    template: 'modalDialogId',
                    className: 'ngdialog-theme-default',
                    //controller: 'MessageCtrl',
                    scope: $scope
                }).then(function (value) {
                    console.log('Modal promise resolved. Value: ', value);
                }, function (reason) {
                    console.log('Modal promise rejected. Reason: ', reason);
                });

            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });





    };


    $scope.sendMessage = function () {
        console.log("in send message ");
        $http.post('/WhatsOut',{sender:'Ronen',content:'Hello',date:'2014-12-30 20:00:00' }).
            success(function(data, status, headers, config) {
                console.log("success");

            }).
            error(function(data, status, headers, config) {

                console.log("failed");
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

    };

    $scope.PollNewMessage = function () {
        console.log("start Poll ");
        myPoller();


    };

    function myPoller() {
        console.log('polling')
        $scope.openMessage();
        setTimeout(myPoller, 10000);
    }


    $rootScope.$on('ngDialog.opened', function (e, $dialog) {
        console.log('ngDialog opened: ' + $dialog.attr('id'));
    });

    $rootScope.$on('ngDialog.closed', function (e, $dialog) {
        console.log('ngDialog closed: ' + $dialog.attr('id'));
    });

    $rootScope.$on('ngDialog.closing', function (e, $dialog) {
        console.log('ngDialog closing: ' + $dialog.attr('id'));
    });




});