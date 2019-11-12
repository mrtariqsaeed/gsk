<?php
require "connection.php";

$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
    $request = json_decode($postdata);

    if ((int)$request->team_id < 1 || (int)$request->emp_id < 1 || trim($request->emp_type == '')) {
        return http_response_code(400);
    }

    $emp_id = mysqli_real_escape_string($con, (int)$request->emp_id);
    $team_id = mysqli_real_escape_string($con, (int)$request->team_id);
    $type = mysqli_real_escape_string($con, trim($request->emp_type));

    $res = [];
    $sql = "UPDATE current SET team_id='$team_id', emp_id='$emp_id', emp_type='$type'";

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