<?php
  $conn = mysqli_connect("localhost","justchill","mygroup2016@SK","skswholesale");
  if (!$conn) { die("Connection failed: " . mysqli_connect_error()); }
  else {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      $postdata = file_get_contents("php://input");
      $formData = json_decode($postdata);
      $imageSource = $formData->imageSource;
      $itemName = $formData->itemName;
      $brandName = $formData->brandName;
      $brandDescription = $formData->brandDescription;
      $srNo = isset($formData->srNo) ? $formData->srNo : md5($itemName.$brandName);
      $validationSql = "SELECT * FROM `photos` where `srNo` = '". $srNo ."'";
      $validationResult = mysqli_query($conn, $validationSql);
      if (mysqli_num_rows($validationResult) === 0) {
        if($formData->action === 'edit') {
          print 'Failure: Data not found';
        } else if($formData->action === 'add') {
          $insertSql = "INSERT INTO photos (srNo, itemName, brandName, brandDescription, 	imageSource) VALUES ('".md5($itemName.$brandName)."','". $itemName ."', '". $brandName ."', '". $brandDescription ."', '". json_encode($imageSource) ."')";
          if (mysqli_query($conn, $insertSql)) {
            print 'success';
          } else {
            print 'Failure: Failed to insert data';
          }
        } else {
          print 'Failure: Wrong Input';
        }
      } else {
        if($formData->action === 'edit') {
          $insertSql = "UPDATE photos SET srNo= '". md5($itemName.$brandName) ."', itemName= '". $itemName ."', brandName= '". $brandName ."', brandDescription= '". $brandDescription ."',	imageSource= '". json_encode($imageSource) ."' WHERE srNo= '". $srNo ."'";
          if (mysqli_query($conn, $insertSql)) {
            print 'success';
          } else {
            print 'Failure: Failed to update data';
          }
        } else if($formData->action === 'add') {
          print 'Failure: Record Already Present';          
        } else {
          print 'Failure: Wrong Input';
        }
      }
    }
  }
?>
