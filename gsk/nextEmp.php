<?php
require "connection.php";

$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
    $request = json_decode($postdata);

    if ((int)$request->id < 1 ) {
        return http_response_code(400);
    }

    $id = mysqli_real_escape_string($con, (int)$request->id);

    $res = [];
    $sql = "UPDATE current SET emp_id='$id'";
    $sql2 = "UPDATE current_assessors SET status='0'";

    if(mysqli_query($con,$sql) && mysqli_query($con,$sql2))
    {
        http_response_code(200);
        $res['message'] = 'Success!';
        echo json_encode($res);
    }
    else
    {
        http_response_code(404);
    }
}
?>