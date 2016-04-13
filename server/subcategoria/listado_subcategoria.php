<?php

require_once '../DB/config_db.php';
$valor_decodificado = json_decode(file_get_contents('php://input'), true);
$sql = 'SELECT * FROM sub_categoria'
        . ' INNER JOIN categoria_pais ON categoria_pais_idCategoria_pais = idCategoria_pais'
        . ' INNER JOIN pais ON pais_idPais = idPais'
        . ' INNER JOIN categoria ON categoria_idCategoria = idCategoria'
        . ' WHERE idCategoria_pais = ' . $valor_decodificado['data']['idCategoria_pais']
        . ' ORDER BY idSub_categoria DESC';

mysql_select_db('toy');

// Al enviar la consulta más la conexión obtenemos, a través de la función mysql_query, un listado de cliente
$retval = mysql_query($sql, $conn);
if (!$retval) {
    die('Could not get data: ' . mysql_error());
}

$arr = array();
// Recorro fila a fila obtenida desde la base de datos 
while ($row = mysql_fetch_array($retval, MYSQL_ASSOC)) {
    $sub_categoria = array(
        "idCategoria_pais" => $row['idCategoria_pais'],
        "idSub_categoria" => $row['idSub_categoria'],
        "nombreSub_categoria" => $row['nombreSub_categoria'],
        "nombreCategoria" => $row['nombreCategoria']
    );
    $arr[] = $sub_categoria;
}

// json_encode es una función de PHP que ransforma sus datos en json legibles para javascript
echo json_encode($arr);
mysql_close($conn);
