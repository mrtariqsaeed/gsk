<?php
/**
 * Returns the list of types.
 */
require 'connection.php';

$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
    $request = json_decode($postdata);

    if (trim($request->emp_type == '')) {
        return http_response_code(400);
    }

    $type = mysqli_real_escape_string($con, trim($request->emp_type));

    $IDs = [];
    $sql = "SELECT id FROM `$type` ORDER BY id";
    if($result = mysqli_query($con,$sql))
    {
        $i = 0;
        while($row = mysqli_fetch_assoc($result))
        {
            $IDs[$i] = (int)$row['id'];
            $i++;
        }
            
        echo json_encode($IDs);
    }
    else
    {
        http_response_code(404);
    }
}
?>