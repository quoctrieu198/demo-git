window.EditController = function ($scope,$http,$routeParams,$location) {
    var apiUrl = 'http://localhost:3000/products';
    var id = $routeParams.id

    $scope.getDetail = function () {
        $http.get(`${apiUrl}/${id}`).then(function ($response) {
            $scope.p = $response.data; //gán cho trang chi tiết
            $scope.inputValue = {
                name: $response.data.name,
                price: $response.data.price,
            }
        })
    }

    $scope.getDetail();

    $scope.onUpdate = function () {
        //khởi tạo biến valid để kiểm tra dữ liệu hợp lệ
        var valid = true;
        //kiểm tra trường name
        if (!$scope.inputValue //không tồn tại inputValue
            || !$scope.inputValue.name //inputValue.name trống
            || $scope.inputValue.name.length < 6 //inputValue.name ít hơn 6 ký tự
            || $scope.inputValue.name.length >100 //inputValue.name nhiều hơn 100 ký tự
        ) {
            valid = false;
        }
        //kiểm tra trường description
        if (!$scope.inputValue || !$scope.inputValue.description) {
            valid = false;
        }
        //kiểm tra trường price
        if (!$scope.inputValue || !$scope.inputValue.price //không tồn tại
            || isNaN($scope.inputValue.price) //không phải kiểu số
            || $scope.inputValue.price < 0 //là số âm
        ) {
            valid = false;
        }

        if (valid) {
            //lấy dữ liệu từ form
            var updateProduct = {
                ...$scope.inputValue
            }

            $http.put(
                `${apiUrl}/${id}`,
                updateProduct
            ).then(function (res) {
                if (res.status == 200) {
                    $location.path('/');
                }
            })
        } else {
            alert('Dữ liệu không hợp lệ');
        }
    }
}