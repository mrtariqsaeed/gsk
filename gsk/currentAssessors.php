<?php
/**
 * Returns the list of types.
 */
require 'connection.php';

$assessors = [];
$sql = "SELECT * FROM current_assessors ORDER BY id";
if($result = mysqli_query($con,$sql))
{
  $i = 0;
  while($row = mysqli_fetch_object($result))
  {
    $assessors[$i] = $row;
    $i++;
  }
  echo json_encode($assessors);
}
else
{
  http_response_code(404);
}
?>