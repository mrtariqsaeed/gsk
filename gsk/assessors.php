<?php
require "connection.php";

$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
    $request = json_decode($postdata);

    // Validate
    if ((int)$request->id < 1) {
    return http_response_code(400);
    }

    // Sanitize.
    $id = mysqli_real_escape_string($con, (int)$request->id);
    $assessors = [];
    $sql = "SELECT * FROM assessors WHERE type_id='$id' ORDER BY id";
    if($result = mysqli_query($con,$sql))
    {
        $i = 0;
        while($row = mysqli_fetch_assoc($result))
        {
            $assessors[$i]['id'] = $row['id'];
            $assessors[$i]['type_id'] = $row['type_id'];
            $assessors[$i]['mud_id'] = $row['mud_id'];
            $assessors[$i]['name'] = $row['name'];
            $i++;
        }
            
        echo json_encode($assessors);
    }
    else
    {
    http_response_code(404);
    }
}
?>