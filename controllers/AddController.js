window.AddController = function($scope,$http,$location) {
    var apiUrl = 'http://localhost:3000/products';

    $scope.onSubmit = function(){
        // khoi tao bien valid de kiem tra du lieu hop le
        var valid=true;
        // kiem tra truong name
        if(!$scope.inputValue 
            || !$scope.inputValue.name // khongton tai
            || $scope.inputValue.name.length <6 // nho hon 6
            || $scope.inputValue.name.length >100 // lon hon 100
            ){
                 valid = false;
        }
        // kiem tra tuong des
        if(!$scope.inputValue 
            || !$scope.inputValue.description){
                valid=false;
        }
        // price
        if(!$scope.inputValue 
            || !$scope.inputValue.price
            ||isNaN($scope.inputValue.price)
            || !$scope.inputValue.price < 0
            ){
            valid=false;
        }
        if(valid){
            var newProduct = {
                ...$scope.inputValue
            }
            $http.post(apiUrl, newProduct).then(function ($response) {
                if($response.status == 201){
                    $location.path('/');
                }
            }, function (errors){
                console.log(errors);
            // console.log($response);
            })
        } else {
            alert('Du lieu khong hop le');
        }
        
    }
}