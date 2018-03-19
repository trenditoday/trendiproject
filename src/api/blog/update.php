<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/blog.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare product object
$blog = new Blog($db);
 
// get id of product to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of product to be edited
$blog->id = $data->id;
 
$tagarray = json_decode(json_encode($data->tags), True);

$catarray = json_decode(json_encode($data->selectedItems), True);
$map_catarray = array_map('current', $catarray);

// set product property values
$blog->title = $data->title;
$blog->content = $data->content;
$blog->status = $data->status;
$blog->category = implode(',', $map_catarray);
$blog->tags = implode(',', $tagarray);
$blog->meta_keyword = $data->meta_keyword;
$blog->meta_description = $data->meta_description;
$blog->visits = $data->visits;
$blog->created_date = $data->created_date;
$blog->modified_date = $data->modified_date;
$blog->created_by = $data->created_by;
 
// update the product
if($blog->update()){
    echo '{';
        echo '"message": "Blog was updated."';
    echo '}';
}
 
// if unable to update the product, tell the user
else{
    echo '{';
        echo '"message": "Unable to update blog."';
    echo '}';
}
?>