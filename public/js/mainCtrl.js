<!-- App -->


angular.module("app").controller('MainCtrl', function ($scope, $rootScope, ngDialog,$http) {
    $rootScope.jsonData = '{"foo": "bar"}';
    $rootScope.theme = 'ngdialog-theme-default';

    $scope.sender = {text: "sender"};
    $scope.msgContent={text: "content"};
    $scope.owner = {text: "owner"};

    $scope.openMessage = function ()
    {

        $http.get('/WhatsOut?username=5').
            success(function(data, status, headers, config)
            {
                console.log('data'+data);
                if(data.sender==null) return;
                console.log("data.sender - ",data.sender);
                $scope.sender.text=data.sender;
                console.log('data.owner '+data.owner);
                $scope.owner.text= data.owner;
                console.log("data.content - ",data.content);
                $scope.msgContent.text=data.content;
                // this callback will be called asynchronously
                // when the response is available
                play();
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
$scope.hideAllMessages=function(){
    $scope.AllMessages=null;
}

    $scope.getAllMessages = function () {
        console.log("in getAllMessages ");
        $http.get('/WhatsOut/All?username=5').
            success(function(data, status, headers, config)
            {
                $scope.AllMessages=data;
                console.log('dataSender '+data[1].sender);
                console.log('dataContent '+data[1].message);


            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });





    };


    $scope.sendMessage = function () {
        console.log("in send message ");
        $http.post('/WhatsOut',{sender:'Ronen',content:'שלום',date:'2014-12-30 20:00:00' ,callType: 'sms' }).
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
        setTimeout(myPoller, 2000);
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

    function play() {
        console.log('in play');
        /*var foo = new Sound("/samsung_whistle_ringtone2.mp3", 100, true);
        foo.start();
        foo.stop();
        foo.start();
        foo.init(100, false);
        foo.remove();*/

        new Audio("/samsung_whistle_ringtone2.mp3").play();
    }

    function Sound (source,volume,loop)
    {
        this.source=source;
        this.volume=volume;
        this.loop=loop;
        var son;
        this.son=son;
        this.finish=false;
        this.stop=function()
        {
            document.body.removeChild(this.son);
        }
        this.start=function()
        {
            if(this.finish)return false;
            this.son=document.createElement("embed");
            this.son.setAttribute("src",this.source);
            this.son.setAttribute("hidden","true");
            this.son.setAttribute("volume",this.volume);
            this.son.setAttribute("autostart","true");
            this.son.setAttribute("loop",this.loop);
            document.body.appendChild(this.son);
        }
        this.remove=function()
        {
            document.body.removeChild(this.son);
            this.finish=true;
        }
        this.init=function(volume,loop)
        {
            this.finish=false;
            this.volume=volume;
            this.loop=loop;
        }
    }

});