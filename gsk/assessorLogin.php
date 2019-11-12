<?php
require "connection.php";

$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
    $request = json_decode($postdata);

    if ((int)$request->id < 1 || trim($request->name == '')) {
        return http_response_code(400);
    }

    $id = mysqli_real_escape_string($con, (int)$request->id);
    $name = mysqli_real_escape_string($con, trim($request->name));

    $res = [];
    $sql = "INSERT INTO current_assessors (assessor_id, name, status) VALUES ('$id', '$name', '0')";

    if($result = mysqli_query($con,$sql))
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