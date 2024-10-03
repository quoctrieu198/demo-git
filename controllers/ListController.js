window.ListController = function($scope,$http,$location){
    var apiUrl = 'http://localhost:3000/products';
    
    // khai bao ham
    $scope.getProducts = function(){
        $http.get(apiUrl).then(function($response){
            console.log($response.data);
            $scope.products = $response.data;
        })
    }


    $scope.getProducts();  // goi ham thuc thi( lay danh sach ve)
    $scope.onDetail = function(id){
        $location.path(`/detail/${id}`);
    }
    $scope.onEdit = function (id) {
        $location.path(`/edit/${id}`);
    }

    $scope.onDelete = function (id) {
        if (confirm('Are you sure?')) {
            $http.delete(`${apiUrl}/${id}`).then(function (res) {
                $scope.getProducts();
            })
        }
    }
}