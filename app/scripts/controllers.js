'use strict';

angular.module('confusionApp')
    .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {

        $scope.tab = 1;
        $scope.filtText = "";
        $scope.showDetails = false;
        $scope.showMenu = false;
        $scope.message = "Loading ...";
        menuFactory.getDishes().query(
            function(response) {
                $scope.dishes = response;
                $scope.showMenu = true;
            },
            function(response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            });

        $scope.toggleDetails = function() {
            $scope.showDetails = !$scope.showDetails;
        };
        $scope.isSelected = function(checkTab) {
            return ($scope.tab === checkTab);
        };
        $scope.select = function(setTab) {
            $scope.tab = setTab;

            if (setTab === 2) {
                $scope.filtText = "appetizer";
            } else if (setTab === 3) {
                $scope.filtText = "mains";
            } else if (setTab === 4) {
                $scope.filtText = "dessert";
            } else {
                $scope.filtText = "";
            }

        };
    }])
    .controller('ContactController', ['$scope', function($scope) {
        $scope.feedback = {
            mychannel: "",
            firstName: "",
            lastName: "",
            agree: false,
            email: ""
        };
        var channels = [{
            value: "tel",
            label: "Tel."
        }, {
            value: "Email",
            label: "Email"
        }];
        $scope.channels = channels;
        $scope.invalidChannelSelection = false;
    }])
    .controller('FeedbackController', ['$scope', function($scope) {
        $scope.sendFeedback = function() {
            console.log($scope.feedback);
            if ($scope.feedback.agree && ($scope.feedback.mychannel === "") && !$scope.feedback.mychannel) {
                $scope.invalidChannelSelection = true;
                console.log('incorrect');
            } else {
                $scope.invalidChannelSelection = false;
                $scope.feedback = {
                    mychannel: "",
                    firstName: "",
                    lastName: "",
                    agree: false,
                    email: ""
                };
                $scope.feedback.mychannel = "";
                $scope.feedbackForm.$setPristine();
                console.log($scope.feedback);
            }
        };
    }])
    .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

        $scope.dish = {};
        $scope.showDish = false;
        $scope.message = "Loading ...";
        $scope.dish = menuFactory.getDishes().get({
                id: parseInt($stateParams.id, 10)
            })
            .$promise.then(
                function(response) {
                    $scope.dish = response;
                    $scope.showDish = true;
                },
                function(response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                }
            );
    }])
    .controller('DishCommentController', ['$scope', 'menuFactory', function($scope, menuFactory) {

        $scope.commentObject = {
            rating: 5,
            comment: "",
            author: "",
            date: ""
        };
        $scope.submitComment = function() {
            $scope.commentObject.date = new Date().toISOString();
            console.log($scope.commentObject);
            $scope.dish.comments.push($scope.commentObject);

            menuFactory.getDishes().update({
                id: $scope.dish.id
            }, $scope.dish);
            $scope.commentForm.$setPristine();
            $scope.commentObject = {
                rating: 5,
                comment: "",
                author: "",
                date: ""
            };
        };
    }])
    .controller('IndexController', ['$scope', '$stateParams', 'corporateFactory', 'menuFactory', function($scope, $stateParams, corporateFactory, menuFactory) {

        var leader = corporateFactory.getLeader(3);
        $scope.leader = leader;

        $scope.showPromo = false;
        $scope.message = "Loading ...";
        $scope.promotion = menuFactory.getPromotion().get({
                id: 0
            })
            .$promise.then(
                function(response) {
                    $scope.promotion = response;
                    $scope.showPromo = true;
                },
                function(response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                }
            );


        $scope.showDish = false;
        $scope.message = "Loading ...";
        $scope.dish = menuFactory.getDishes().get({
                id: 0
            })
            .$promise.then(
                function(response) {
                    $scope.dish = response;
                    $scope.showDish = true;
                },
                function(response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                }
            );

    }])
    .controller('AboutController', ['$scope', '$stateParams', 'corporateFactory', function($scope, $stateParams, corporateFactory) {

        var leaders = corporateFactory.getLeaders();
        $scope.leaders = leaders;

    }]);
