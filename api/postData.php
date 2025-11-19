<?php
// api/postData.php?op=attendance
require 'config.php';
header('Content-Type: application/json');

$op = isset($_GET['op']) ? $_GET['op'] : '';
$input = json_decode(file_get_contents('php://input'), true);

if($op === 'attendance'){
    $tanggal = $input['tanggal'] ?? null;
    $data = $input['data'] ?? null;
    if(!$tanggal || !$data){
        echo json_encode(['success'=>false,'message'=>'Missing fields']);
        exit;
    }
    $safe_date = preg_replace('/[^0-9\-]/', '', $tanggal);
    $filename = DATA_DIR . 'attendance_' . $safe_date . '.json';
    $payload = ['tanggal'=>$safe_date,'data'=>$data,'savedAt'=>date('c')];
    file_put_contents($filename, json_encode($payload, JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE));
    echo json_encode(['success'=>true,'file'=>basename($filename)]);
    exit;
}

echo json_encode(['success'=>false,'message'=>'Unknown operation']);
?>
