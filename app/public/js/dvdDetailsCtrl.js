/**
 * Controllers.
 */
var dvdDetailsControllers = angular.module('dvdDetailsControllers', ['ngRoute']);


/**
 * DVD Details controllers.
 */
dvdDetailsControllers.controller('DvdDetailsCtrl', ['$scope', '$routeParams', '$location', 'Dvd', 'User', 'Rating',
    function ($scope, $routeParams, $location, Dvd, User, Rating) {
        console.log('Dvd Details controller');

        // Rating handle
        $scope.max = Rating.max;
        $scope.isReadonly = Rating.readOnly;

        if($routeParams.userName) {
            // We get owner chosen in the administration view
            $scope.owner = User.UserAccount.getOwner({'userName': $routeParams.userName}, function() {
                if($scope.owner.success) {
                    console.log('From administration');
                    // We get the owner in relation with the url parameter
                    $scope.owner = $scope.owner.owner;

                    // We call the getDvd function to have the DVD details
                    getDvd();
                }
            });
        }

        else {
            // We get the current owner
            $scope.owner = User.UserAccount.getCurrentOwner(function() {
                if($scope.owner.success) {
                    console.log('From DVD list');
                    console.log($scope.owner.owner);
                    $scope.owner = $scope.owner.owner;

                    // We call the getDvd function to have the DVD details
                    getDvd();
                }
            });
        }

        // We get the DVD
        getDvd = function() {
            // We use '$scope.owner.userName' and not '$routeParams.userName' because if we are in the normal route (not from the administration), the '$routeParams.userName' doesn't exist
            $scope.dvdSearch = Dvd.DvdDetails.getDvd( {'dvdTitle': $routeParams.dvdTitle, 'userName': $scope.owner.userName}, function() {
                if( $scope.dvdSearch.success )
                {
                    console.log('DVD got successfully');
                    console.log($scope.dvdSearch.dvd.dvd[0]);
                    $scope.dvd = $scope.dvdSearch.dvd.dvd[0];
                }
                else
                {
                    console.log('Error when getting the DVD');
                    $location.url('/dvd-list');
                }
            } );
        };

        /**
         * Redirection into the edit DVD html page.
         */
        $scope.editDvd = function(dvdName) {
            // If the editDvd route it's call from the DVD details administration, we call the administration edit view
            if($routeParams.userName) {
                $location.url('/editDvd/' + $scope.owner.userName + '/' + dvdName);
            }

            // Else, we call the standard editDvd route
            else {
                $location.url('/editDvd/' + dvdName);
            }
        };

        /**
         * Redirection into the DVD list html page.
         */
        $scope.back = function() {
            $location.url('/dvd-list');
        };
    }
]);