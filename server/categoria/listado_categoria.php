<?php

require_once '../DB/config_db.php';
$valor_decodificado = json_decode(file_get_contents('php://input'), true);
$sql = 'SELECT * FROM categoria'
        . ' INNER JOIN categoria_pais ON categoria_idCategoria = idCategoria'
        . ' INNER JOIN pais ON pais_idPais = idPais'
        . ' WHERE idPais = '.$valor_decodificado['data']['idPais']
        . ' ORDER BY idCategoria DESC';

mysql_select_db('toy');

// Al enviar la consulta más la conexión obtenemos, a través de la función mysql_query, un listado de cliente
$retval = mysql_query($sql, $conn);
if (!$retval) {
    die('Could not get data: ' . mysql_error());
}

$arr = array();
// Recorro fila a fila obtenida desde la base de datos 
while ($row = mysql_fetch_array($retval, MYSQL_ASSOC)) {
    $categoria = array(
        "idCategoria" => $row['idCategoria'],
        "idCategoria_pais" => $row['idCategoria_pais'],
        "nombreCategoria" => utf8_encode($row['nombreCategoria']),
        
    );
    $arr[] = $categoria;
}

// json_encode es una función de PHP que ransforma sus datos en json legibles para javascript
echo json_encode($arr);
mysql_close($conn);
