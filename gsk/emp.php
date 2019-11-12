<?php
require "connection.php";

$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
    $request = json_decode($postdata);

    if ((int)$request->id < 1 || trim($request->emp_type == '')) {
        return http_response_code(400);
    }

    $id = mysqli_real_escape_string($con, (int)$request->id);
    $type = mysqli_real_escape_string($con, trim($request->emp_type));

    $sql = "SELECT * FROM `$type` WHERE id='$id'";

    if($result = mysqli_query($con,$sql))
    {
        if(mysqli_num_rows($result) == 1)
        {
            $row = mysqli_fetch_object($result);
            echo json_encode($row);
        }else {
            http_response_code(500);
        }
    }
    else
    {
        http_response_code(404);
    }
}
?>