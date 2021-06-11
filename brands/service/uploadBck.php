<?php
	/*if(!empty($_FILES['image'])){
		$ext = pathinfo($_FILES['image']['name'],PATHINFO_EXTENSION);
                $image = time().'.'.$ext;
                move_uploaded_file($_FILES["image"]["tmp_name"], '../img/brands/'.$image);
		echo "Image uploaded successfully as ".$image;
	}else{
		echo "Image Is Empty";
	}*/
	/*define('UPLOAD_DIR', '../img/brands/');
  $reqData = $_REQUEST['brandDetails'];
  $image_parts = explode(";base64,", $_REQUEST['image']);
  $image_type_aux = explode("image/", $image_parts[0]);
  $image_type = $image_type_aux[1];
  $image_base64 = base64_decode($image_parts[1]);
  $file = UPLOAD_DIR . uniqid() . '.png';
  file_put_contents($file, $image_base64);
  echo $reqData['brandDetails']['imageSource'];*/
  $postdata = file_get_contents("php://input");
  $conn = mysqli_connect("localhost","root","","skswholesale");
  if (!$conn) { die("Connection failed: " . mysqli_connect_error()); }
  else {
    $sql = "INSERT INTO photos (data) VALUES ('". $postdata ."')";
    if (mysqli_query($conn, $sql)) {
        print 'success';
    } else {
        print 'Failure';
    }
  }
  echo "asdddfadsfs";
?>
