<?php
$content=file_get_contents("server.json");
$content=json_encode(json_decode($content));
file_put_contents("server_list.json",$content);
exit($content);
?>