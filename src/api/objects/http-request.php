<?php
$uri = 'https://affiliate-api.flipkart.net/affiliate/offers/v1/dotd/json';
$ch = curl_init($uri);
curl_setopt_array($ch, array(
    CURLOPT_HTTPHEADER  => array('FkAffId: trenditoday','FkAffToken:3d15505b7a02439592413e30e7d35e87' ),
    CURLOPT_RETURNTRANSFER  =>true,
    CURLOPT_VERBOSE     => 1
));
$out = curl_exec($ch);
curl_close($ch);
// echo response output
echo $out;
?>