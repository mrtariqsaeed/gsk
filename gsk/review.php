<?php
require 'connection.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);

  // Sanitize.
  $emp_id = mysqli_real_escape_string($con, (int)$request->emp_id);
  $emp_type = mysqli_real_escape_string($con, trim($request->emp_type));
  $assessor_id = mysqli_real_escape_string($con, (int)$request->assessor_id);
  $a = mysqli_real_escape_string($con, (int)$request->a);
  $b = mysqli_real_escape_string($con, (int)$request->b);
  $c = mysqli_real_escape_string($con, (int)$request->c);

  // Create.
  $sql = "INSERT INTO `report` (emp_id, emp_type, assessor_id, a, b, c) VALUES ('$emp_id', '$emp_type', '$assessor_id', '$a', '$b', '$c')";
  $sql2 = "UPDATE current_assessors SET status='1' WHERE assessor_id='$assessor_id'";

  if(mysqli_query($con,$sql) && mysqli_query($con,$sql2))
  {
    http_response_code(200);
  }
  else
  {
    http_response_code(500);
  }
}