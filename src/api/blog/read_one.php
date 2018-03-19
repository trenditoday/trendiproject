<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/blog.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare product object
$blog = new Blog($db);
 
// set ID property of product to be edited
$blog->id = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of product to be edited
$blog->readOne();
 
// create array
$blog_arr = array(
    "id" =>  $blog->id,
    "title" => $blog->title,
    "content" => $blog->content,
    "status" => $blog->status,
    "category" => explode(",",$blog->category),
    "tags" => $blog->tags,
    "meta_keyword" =>  $blog->meta_keyword,
    "meta_description" => $blog->meta_description,
    "visits" => $blog->visits,
    "status" => $blog->status,
    "created_date" => $blog->created_date,
    "modified_date" => $blog->modified_date,
    "created_by" => $blog->created_by
);
 
// make it json format
print_r(json_encode($blog_arr));
?>