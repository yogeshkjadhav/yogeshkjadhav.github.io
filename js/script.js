angular.module('skWholesale', [])
.controller('MainCtrl', function($scope, $http, $timeout, $window) {
  $scope.activePage = 1;
  $scope.singleProductDetail = null;
  $scope.showPage = false;
  $scope.mobileNavClass = false;
  $scope.title = 'Product List';
  $scope.selectedBrand = null;
  $scope.selectedBrandRenew = [];
  $scope.toggleBrandDropdownClass = null;
  $scope.selectedBrandBreadCrumb = [];
  $scope.toggleSelectedBrandIndex = [0, 0, 0, 0, 0];
  $scope.copyright = new Date();
  $http.get("./stub/stub.json").then(function (response) {
    $timeout(() => {
      $scope.showPage = true;
    }, 2000);
    $scope.skDetails = response.data;
  });
  $scope.handlePageChange = function(menu, product = null) {
    $scope.scrollTop();
    $scope.mobileNavClass = false;
    $scope.title = 'Product List';
    switch(menu) {
      case 'Home':
        return $scope.activePage = 1;
      case 'Product':
        return $scope.activePage = 2;
      case 'Brand':
        $scope.title = menu;
        $scope.skDetails.branding[0].toggleClass = true;
        $scope.handleBreadCrumbArray($scope.skDetails.branding[0], 0);
        $scope.setSelectedBrand($scope.skDetails.branding[0]);
        $scope.selectedBrandRenew[0] = {
          'subItem': $scope.skDetails.branding[0].subItem.sort(),
          'haveSubSubCategory': $scope.skDetails.branding[0].haveSubSubCategory
        };
        $scope.toggleBrandNavClassRenewed($scope.skDetails.branding, 0, 'branding', 0);
        return $scope.activePage = 5;
      case 'Item Classification':
        $scope.title = 'Item Classification';
        $scope.skDetails.itemClassification[0].toggleClass = true;
        $scope.handleBreadCrumbArray($scope.skDetails.itemClassification[0], 0);
        $scope.setSelectedBrand($scope.skDetails.itemClassification[0]);
        return $scope.activePage = 6;
      default:
        return $scope.activePage = 1;
    }
  }
  $scope.productDetailsPage = function(product) {
    $scope.scrollTop();
    $scope.title = $scope.singleProductDetail.title;
    $scope.activePage = 3;
    $scope.singleProductDetail = product;
  }
  $scope.aboutUsPage = function() {
    $scope.scrollTop();
    $scope.title = 'About Us';
    $scope.activePage = 4;
  }
  $scope.handleMobileNav = function() {
    $scope.mobileNavClass = $scope.mobileNavClass ? false : true;
  }
  $scope.toggleBrandNavClass = function(brand, index, section) {
    $scope.toggleBrandDropdownClass = null;
    $scope.handleBreadCrumbArray(brand, index);
    section === 'branding' ? $scope.resetToggleClass($scope.skDetails.branding) :  $scope.resetToggleClass($scope.skDetails.itemClassification);
    if(brand.subItem && brand.subItem.length) {
      brand.toggleClass = true;
    }
    $scope.setSelectedBrand(brand);
  }
  $scope.toggleBrandNavClassRenewed = function(brand, index, section, level) {
    /*$scope.selectedBrandRenew[level] = { "subItem": brand.subItem, "haveSubSubCategory": brand.haveSubSubCategory };
    if(brand.haveSubSubCategory) {
      $scope.selectedBrandRenew[level + 1] = { "subItem": brand.subItem, "haveSubSubCategory": brand.haveSubSubCategory };
    } else {
      /*for(let i = $scope.toggleSelectedBrandIndex.length; i > 0; i++) {
        if(i > level) {
          $scope.selectedBrandRenew[i] = null;
          $scope.toggleSelectedBrandIndex.pop();
        }
      }*_/
    }*/
    /*if(level !== 0 && !$scope.toggleSelectedBrandIndex[level + 1]  && $scope.toggleSelectedBrandIndex[level + 1] !== 0) {
      $scope.toggleSelectedBrandIndex.push(0);
    }*/
    for(let i = 0; i < $scope.toggleSelectedBrandIndex.length; i++) {
      if(level < i) {
        $scope.toggleSelectedBrandIndex[i] = 0;
      } else {
        $scope.toggleSelectedBrandIndex[level] = index;
      }
    }
    $scope.resetToggleClassRenewed($scope.skDetails.branding, 0);
  }
  $scope.setSelectedBrand = function(setBrandObject) {
    $scope.handleBreadCrumbArray(setBrandObject, 2);
    $scope.selectedBrand = setBrandObject;
  }
  $scope.handleBreadCrumbArray = function(brand, index) {
    $scope.selectedBrandBreadCrumb.splice(index + 1);
    // $scope.selectedBrandBreadCrumb.push({"breadCrumb": brand.title});
    if($scope.selectedBrandBreadCrumb.indexOf(brand.title) === -1) {
      if($scope.selectedBrandBreadCrumb[index]) {
        $scope.selectedBrandBreadCrumb[index] = brand.title;
      } else {
        $scope.selectedBrandBreadCrumb.push(brand.title);
      }
    }
    $scope.scrollTop();
  }
  $scope.scrollTop = function() {
    $window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  $scope.resetToggleClassRenewed = function(brand, level) {
    for(let i = 0; i < brand.length; i++) {
      if(i !== $scope.toggleSelectedBrandIndex[level]) {
        brand[i].toggleClass = false;
      } else {
        brand[i].toggleClass = true;
      }
      if(brand[i].subItem && brand[i].subItem.length) {
        $scope.resetToggleClassRenewed(brand[i].subItem, (level + 1));
      }
    }
  }
  $scope.resetToggleClass = function(brand) {
    brand.toggleClass = false;
    if(brand.subItem && brand.subItem.length) {
      brand.subItem.map(singleBrand => {
        singleBrand.toggleClass = false;
        if(singleBrand.subItem && singleBrand.subItem.length) {
          $scope.resetToggleClass(singleBrand);
        }
      })
    } else {
      brand.map(singleBrand => {
        singleBrand.toggleClass = false;
        if(singleBrand.subItem && singleBrand.subItem.length) {
          $scope.resetToggleClass(singleBrand);
        }
      })
    }
  }
  $scope.toggleDropdownClass = function(param) {
    if(param) {
      $scope.toggleBrandDropdownClass = null;
    } else {
      $scope.toggleBrandDropdownClass = 'open';
    }
  }
});

/*
 * 1: Home page
 * 2: Product List page
 * 3: Product Details page
 * 4: About Us page
 * 5: Brand
 * 6: Item Classification
 */
