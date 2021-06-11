angular.module('skWholesale', [])
.controller('MainCtrl', function($scope, $http, $timeout, $window, $rootScope, $location) {
  $scope.activePage = 'Dashboard';
  $scope.mobileNavClass = false;
  $scope.key = $location.hash();
  $rootScope.userEmail = atob($scope.key);
  $scope.userProfile = false;
  $scope.toggleUserProfile = function() {
    $scope.userProfile = $scope.userProfile ? false : true;
  }
  /*if(!$rootScope.userEmail) {
    $window.location.href = './login.html';
  }*/
  $http.get("./stub/stub.json").then(function (response) {
    $timeout(() => {
      $scope.showPage = true;
    }, 2000);
    $scope.inventoryResp = response.data;
  });
  $scope.handlePageChange = function(menu, product = null) {
    $scope.scrollTop();
    $scope.title = 'Product List';
    $scope.activePage = menu;
  }
  $scope.scrollTop = function() {
    $window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  $scope.checkForActiveNag = function(nav, selectedNav) {
    return nav === selectedNav ? true : false;
  }
  $scope.handleMobileNav = function() {
    $scope.mobileNavClass = $scope.mobileNavClass ? false : true;
  }
  $scope.logout = function() {
    $rootScope.userEmail = null;
    $window.location.href = './login.html';
  }
  
  $scope.action = 'list';
    $scope.loader = false;
    $scope.sortFilter = 'Rice';
    $scope.notification = {
      msg: null
    };
    /*if(!$rootScope.userEmail) {
      $window.location.href = './login.html';
    }*/
    $scope.clearBrandObject = function() {
      $scope.brandDetails = {
        srNo: null,
        imageSource: [],
        itemName: null,
        brandName: null,
        brandDescription: null
      };
    }
    $scope.fetchData = function() {
      $scope.loader = true;
      $http.get("./service/database.php?txtTable=photos").then(function (response) {
        $scope.inventoryResp = {
          brandData: response.data
        }
        $scope.inventoryResp.brandData.forEach(brand => {
          brand['imageSource'] = JSON.parse(brand['imageSource']);
        });
        $scope.loader = false;
      });
      $http.get("./stub/stub.json").then(function (response) {
        $scope.stubData = response.data;
      });
    }
    $scope.changeAction = function(action) {
      $scope.action = action;
    }
    $scope.fetchData();
    /*Image upload module*/
    $scope.files = [];
    $scope.selectedFiles = [];
    $scope.clearBrandObject();
    $scope.submit = function() {
    };
    $scope.uploadedFile = function(element) {
      var reader = new FileReader();
      if($scope.brandDetails.imageSource.length < 4) {
        $scope.selectedFiles.push(element.files[0]);
        reader.onload = function(event) {
          if($scope.brandDetails.imageSource.length < 4 && $scope.brandDetails.imageSource.indexOf(event.target.result) === -1) {
            $scope.brandDetails.imageSource[$scope.brandDetails.imageSource.length] = event.target.result
            $scope.$apply(function($scope) {
              $scope.files = element.files;
            });
          } else {
            $scope.notification.msg = 'Duplicate Image';
          }
        }
        reader.readAsDataURL(element.files[0]);
      }
    }
    $scope.uploadImageAPI = function() {
      $scope.brandDetails.action = 'add';
      $http({
        method  : 'POST',
        url     : './service/upload.php',
        data : $scope.brandDetails,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(function successCallback(response) { 
        $scope.closeForm('list');
      });
    }
    $scope.removeSelection = function(index) {
      $scope.brandDetails.imageSource.splice(index, 1);
    }
    $scope.closeForm = function(action) {
      $scope.action = action;
      if($scope.action !== 'view' && $scope.action !== 'editview') {
        $scope.clearBrandObject();
      }
      $scope.fetchData();
    }
    $scope.handleAction = function(action, brand) {
      $scope.action = null;
      if(action === 'delete') {
        $scope.param = brand.srNo;
        $scope.action = 'list';
      } else if(action === 'edit') {
        brand.action = 'edit';
        $http({
          method  : 'POST',
          url     : './service/upload.php',
          data : brand,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function successCallback(response) { 
          $scope.closeForm('list');
        });
        $scope.action = 'list';
      } else if(action === 'add') {
        $scope.uploadImageAPI();
      } else {
        $scope.brandDetails = brand;
        $scope.action = action;
      }
      $http.get("./service/database.php?txtTable=photos&txtAction="+action+"&txtData="+$scope.param).then(function (response) {
        $scope.closeForm($scope.action);
      });
    }
});
