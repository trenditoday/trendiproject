<?php
class Blog{
 
    // database connection and table name
    private $conn;
    private $table_name = "trends_blog";
 
    // object properties
    public $id;
    public $title;
    public $content;
    public $status;
    public $category;
    public $tags;
    public $meta_keyword;
    public $meta_description;
    public $visits;
    public $created_date;
    public $modified_date;
    public $created_by;
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
	// read products
    function read(){
    
        // select all query
        $query = "SELECT
                    b.id, b.title, b.content, b.status, b.category, b.tags, b.meta_keyword, b.meta_description, b.visits, b.created_date, b.modified_date, b.created_by
                FROM
                    " . $this->table_name . " b
                    
                ORDER BY
                    b.created_date DESC";
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    // create product
    function create(){
    
        // query to insert record
        $query = "INSERT INTO
                    " . $this->table_name . "
                SET
                    title=:title, content=:content, status=:status, category=:category, tags=:tags, meta_keyword=:meta_keyword, meta_description=:meta_description, visits=:visits, created_date=:created_date, modified_date=:modified_date, created_by=:created_by";
    
        // prepare query
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $this->title=htmlspecialchars(strip_tags($this->title));
        $this->content=$this->content;
        $this->status=htmlspecialchars(strip_tags($this->status));
        $this->category=htmlspecialchars(strip_tags($this->category));
        $this->tags=$this->tags;
        $this->meta_keyword=htmlspecialchars(strip_tags($this->meta_keyword));
        $this->meta_description=htmlspecialchars(strip_tags($this->meta_description));
        $this->visits=htmlspecialchars(strip_tags($this->visits));
        $this->created_date=htmlspecialchars(strip_tags($this->created_date));
        $this->modified_date=htmlspecialchars(strip_tags($this->modified_date));
        $this->created_by=htmlspecialchars(strip_tags($this->created_by));
    
        // bind values
        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":content", $this->content);
        $stmt->bindParam(":status", $this->status);
        $stmt->bindParam(":category", $this->category);
        $stmt->bindParam(":tags", $this->tags);
        $stmt->bindParam(":meta_keyword", $this->meta_keyword);
        $stmt->bindParam(":meta_description", $this->meta_description);
        $stmt->bindParam(":visits", $this->visits);
        $stmt->bindParam(":created_date", $this->created_date);
        $stmt->bindParam(":modified_date", $this->modified_date);
        $stmt->bindParam(":created_by", $this->created_by);
    
        // execute query
        if($stmt->execute()){
            return true;
        }
    
        return false;
        
    }

    // used when filling up the update product form
    function readOne(){
    
        // query to read single record

         $query = "SELECT
                    b.id, b.title, b.content, b.status, b.category, b.tags, b.meta_keyword, b.meta_description, b.visits, b.created_date, b.modified_date, b.created_by
                FROM
                    " . $this->table_name . " b
                WHERE
                    b.id = ?
                    LIMIT
                    0,1";
    
        // prepare query statement
        $stmt = $this->conn->prepare( $query );
    
        // bind id of product to be updated
        $stmt->bindParam(1, $this->id);
    
        // execute query
        $stmt->execute();
    
        // get retrieved row
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
    
        // set values to object properties
        $this->title = $row['title'];
        $this->content = $row['content'];
        $this->status = $row['status'];
        $this->category = $row['category'];
        $this->tags = $row['tags'];
        $this->meta_keyword = $row['meta_keyword'];
        $this->meta_description = $row['meta_description'];
        $this->visits = $row['visits'];
        $this->created_date = $row['created_date'];
        $this->modified_date = $row['modified_date'];
        $this->created_by = $row['created_by'];
    }

    // update the product
    function update(){
    
        // update query
        $query = "UPDATE
                    " . $this->table_name . "
                SET
                    title=:title, content=:content, status=:status, category=:category, tags=:tags, meta_keyword=:meta_keyword, meta_description=:meta_description, visits=:visits, created_date=:created_date, modified_date=:modified_date, created_by=:created_by
                WHERE
                    id = :id";
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->title=htmlspecialchars(strip_tags($this->title));
        $this->content=$this->content;
        $this->status=htmlspecialchars(strip_tags($this->status));
        $this->category=htmlspecialchars(strip_tags($this->category));
        $this->tags=htmlspecialchars(strip_tags($this->tags));
        $this->meta_keyword=htmlspecialchars(strip_tags($this->meta_keyword));
        $this->meta_description=htmlspecialchars(strip_tags($this->meta_description));
        $this->visits=htmlspecialchars(strip_tags($this->visits));
        $this->created_date=htmlspecialchars(strip_tags($this->created_date));
        $this->modified_date=htmlspecialchars(strip_tags($this->modified_date));
        $this->created_by=htmlspecialchars(strip_tags($this->created_by));
        $this->id=htmlspecialchars(strip_tags($this->id));
    
        // bind values
        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":content", $this->content);
        $stmt->bindParam(":status", $this->status);
        $stmt->bindParam(":category", $this->category);
        $stmt->bindParam(":tags", $this->tags);
        $stmt->bindParam(":meta_keyword", $this->meta_keyword);
        $stmt->bindParam(":meta_description", $this->meta_description);
        $stmt->bindParam(":visits", $this->visits);
        $stmt->bindParam(":created_date", $this->created_date);
        $stmt->bindParam(":modified_date", $this->modified_date);
        $stmt->bindParam(":created_by", $this->created_by);
        $stmt->bindParam(':id', $this->id);
    
        // execute the query
        if($stmt->execute()){
            return true;
        }
    
        return false;
    }

    // delete the product
    function delete(){
    
        // delete query
        $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
    
        // prepare query
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $this->id=htmlspecialchars(strip_tags($this->id));
    
        // bind id of record to delete
        $stmt->bindParam(1, $this->id);
    
        // execute query
        if($stmt->execute()){
            return true;
        }
    
        return false;
        
    }

    // search products
    function search($keywords){
    
        // select all query
        $query = "SELECT
                    c.name as category_name, p.id, p.name, p.description, p.price, p.category_id, p.created
                FROM
                    " . $this->table_name . " p
                    LEFT JOIN
                        categories c
                            ON p.category_id = c.id
                WHERE
                    p.name LIKE ? OR p.description LIKE ? OR c.name LIKE ?
                ORDER BY
                    p.created DESC";
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $keywords=htmlspecialchars(strip_tags($keywords));
        $keywords = "%{$keywords}%";
    
        // bind
        $stmt->bindParam(1, $keywords);
        $stmt->bindParam(2, $keywords);
        $stmt->bindParam(3, $keywords);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    // read products with pagination
    public function readPaging($from_record_num, $records_per_page){
    
        // select query
        $query = "SELECT
                    c.name as category_name, p.id, p.name, p.description, p.price, p.category_id, p.created
                FROM
                    " . $this->table_name . " p
                    LEFT JOIN
                        categories c
                            ON p.category_id = c.id
                ORDER BY p.created DESC
                LIMIT ?, ?";
    
        // prepare query statement
        $stmt = $this->conn->prepare( $query );
    
        // bind variable values
        $stmt->bindParam(1, $from_record_num, PDO::PARAM_INT);
        $stmt->bindParam(2, $records_per_page, PDO::PARAM_INT);
    
        // execute query
        $stmt->execute();
    
        // return values from database
        return $stmt;
    }

    // used for paging products
    public function count(){
        $query = "SELECT COUNT(*) as total_rows FROM " . $this->table_name . "";
    
        $stmt = $this->conn->prepare( $query );
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
    
        return $row['total_rows'];
    }
}