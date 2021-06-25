<?php
  $conn = mysqli_connect("localhost","justchill","mygroup2016@SK","skswholesale");
  if (!$conn) { die("Connection failed: " . mysqli_connect_error()); }
  else {
    if(isset($_REQUEST['txtAction'])) {
      if($_REQUEST["txtAction"] == "delete") {
        if(isset($_REQUEST['txtData'])) {
          $sql = "Delete from ". $_REQUEST["txtTable"] ." where srNo = '". $_REQUEST['txtData'] ."'";
          echo $sql;
          if (mysqli_query($conn, $sql)) {
            print 'success';
          } else {
            print 'Failure';
          }
        }
      }
    } else {
      $condition = '';
      if(isset($_REQUEST['itemName']) && isset($_REQUEST['brandName'])) {
        $condition = " where `srNo` = '".md5($_REQUEST["itemName"].$_REQUEST["brandName"])."'";
      }
      $sql = "SELECT * FROM ". $_REQUEST["txtTable"] ." ". $condition;
      $result = mysqli_query($conn, $sql);
      if (mysqli_num_rows($result) > 0) {
        while($row = mysqli_fetch_assoc($result)) {
          $rows[] = $row;
        }
        print json_encode($rows);
      } else {
        print json_encode([]);
      }
      exit;
    }
  }
?>
