<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// get database connection
include_once '../config/database.php';
 
// instantiate product object
include_once '../objects/blog.php';
 
$database = new Database();
$db = $database->getConnection();
 
$blog = new Blog($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));

$tagarray =json_decode(json_encode($data->tags), True);

// set product property values
$blog->title = $data->title;
$blog->content = $data->content;
$blog->status = $data->status;
$blog->category = $data->category;
$blog->tags = implode(',', $tagarray);
$blog->meta_keyword = $data->meta_keyword;
$blog->meta_description = $data->meta_description;
$blog->visits = $data->visits;
$blog->created_date = $data->created_date;
$blog->modified_date = $data->modified_date;
$blog->created_by = $data->created_by;

 
// create the product
if($blog->create()){
    echo '{';
        echo '"message": "Blog was created."';
        echo ',';
        echo '"status": "Success"';
        echo ',';
        echo '"statusCode": "1"';
    echo '}';
}
 
// if unable to create the product, tell the user
else{
    echo '{';
        echo '"message": "Unable to create blo."';
        echo ',';
        echo '"status": "Failed"';
        echo ',';
        echo '"statusCode": "0"';
    echo '}';
}
?>