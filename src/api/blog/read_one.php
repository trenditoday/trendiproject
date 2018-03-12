<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/product.php';
 
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
    "name" => $blog->name,
    "description" => $blog->description,
    "price" => $blog->price,
    "category_id" => $blog->category_id,
    "category_name" => $blog->category_name
 
);
 
// make it json format
print_r(json_encode($blog_arr));
?>