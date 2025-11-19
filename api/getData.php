<?php
// api/getData.php?file=siswa
require 'config.php';
header('Content-Type: application/json');

$file = isset($_GET['file']) ? preg_replace('/[^a-z0-9_-]/i','',$_GET['file']) : '';
$path = DATA_DIR . $file . '.json';
if(!file_exists($path)){
    echo json_encode(['success'=>false,'message'=>'File not found']);
    exit;
}
$data = file_get_contents($path);
echo json_encode(['success'=>true,'data'=>json_decode($data, true)]);
?>
