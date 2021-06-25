<?php
  $conn = mysqli_connect("localhost","justchill","mygroup2016@SK","skswholesale");
  if (!$conn) { die("Connection failed: " . mysqli_connect_error()); }
  else {
    if($_REQUEST["txtAction"] == "login") {
      $sql = "SELECT * FROM `db_login` where `userEmail` = '" . $_REQUEST["userEmail"] . "'  and `userPassword` = '" . md5($_REQUEST["userPassword"]) . "'";
      $result = mysqli_query($conn, $sql);
      if (mysqli_num_rows($result) > 0) {
        header("Location: ../index.html#".base64_encode($_REQUEST["userEmail"]));
      } else {
        header("Location: ../login.html?resp=WrongUser");
      }
    } else {
      header("Location: ../login.html?resp=SystemError");
    }
    mysqli_close($conn);
  }
?>
