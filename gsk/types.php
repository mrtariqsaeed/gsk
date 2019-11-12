<?php
/**
 * Returns the list of types.
 */
require 'connection.php';

$types = [];
$sql = "SELECT * FROM assessors_types ORDER BY id";
if($result = mysqli_query($con,$sql))
{
  $i = 0;
  while($row = mysqli_fetch_object($result))
  {
    $types[$i] = $row;
    $i++;
  }
    
  echo json_encode($types);
}
else
{
  http_response_code(404);
}
?>