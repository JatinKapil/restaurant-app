'use strict';

angular.module('confusionApp')
    .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {

        $scope.dishes = menuFactory.getDishes();
        $scope.tab = 1;
        $scope.filtText = "";
        $scope.showDetails = false;
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

        var dish = menuFactory.getDish(parseInt($stateParams.id, 10));
        $scope.dish = dish;

    }])
    .controller('DishCommentController', ['$scope', function($scope) {

        $scope.commentObject = {
            rating: 5,
            comment: "",
            author: "",
            date: ""
        };
        $scope.submitComment = function() {
            //Step 2: This is how you record the date
            $scope.commentObject.date = new Date().toISOString();
            // Step 3: Push your comment into the dish's comment array
            $scope.dish.comments.push($scope.commentObject);
            //Step 4: reset your form to pristine
            $scope.commentForm.$setPristine();
            //Step 5: reset your JavaScript object that holds your comment
            $scope.commentObject = {
                rating: 5,
                comment: "",
                author: "",
                date: ""
            };
        };
    }])
    .controller('IndexController', ['$scope', '$stateParams', 'corporateFactory', 'menuFactory', function($scope, $stateParams, corporateFactory, menuFactory) {

        var leader = corporateFactory.getLeader();
        $scope.leader = leader;
        var promotion = menuFactory.getPromotion(0);
        $scope.promotion = promotion;
        var dish = menuFactory.getDish(0);
        $scope.dish = dish;

    }])
    .controller('AboutController', ['$scope', '$stateParams', 'corporateFactory', function($scope, $stateParams, corporateFactory) {

        var leaders = corporateFactory.getLeaders();
        $scope.leaders = leaders;

    }]);
