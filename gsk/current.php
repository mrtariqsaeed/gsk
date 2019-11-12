<?php
/**
 * Returns the list of types.
 */
require 'connection.php';

$current = [];
$sql = "SELECT * FROM current ORDER BY id";
if($result = mysqli_query($con,$sql))
{
  if(mysqli_num_rows($result) == 1)
  {
    $row = mysqli_fetch_object($result);
    $current = $row;
  }
    
  echo json_encode($current);
}
else
{
  http_response_code(404);
}
?>