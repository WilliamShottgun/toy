<?php

require_once '../DB/config_db.php';
$valor_decodificado = json_decode(file_get_contents('php://input'), true);
$sql = 'SELECT * FROM producto'
        . ' INNER JOIN sub_categoria ON sub_categoria_idSub_categoria = idSub_categoria'
        . ' INNER JOIN categoria_pais ON categoria_pais_idCategoria_pais = idCategoria_pais'
        . ' INNER JOIN pais ON pais_idPais = idPais'
        . ' INNER JOIN categoria ON categoria_pais.categoria_idCategoria = idCategoria'
        . ' WHERE idSub_categoria = ' . $valor_decodificado['data']['idSub_categoria']
        . ' ORDER BY idProducto ASC';

mysql_select_db('toy');

// Al enviar la consulta más la conexión obtenemos, a través de la función mysql_query, un listado de cliente
$retval = mysql_query($sql, $conn);
if (!$retval) {
    die('Could not get data: ' . mysql_error());
}

$arr = array();
// Recorro fila a fila obtenida desde la base de datos 
while ($row = mysql_fetch_array($retval, MYSQL_ASSOC)) {
    $producto = array(
        "idProducto" => utf8_encode($row['idProducto']),
        "nombreProducto	" => utf8_encode($row['nombreProducto']),
        "descProducto" => utf8_encode($row['descProducto']),
        "imgProducto" => utf8_encode($row['imgProducto']),
        "destacadoProducto" => utf8_encode($row['destacadoProducto']),
        "sub_categoria_idSub_categoria" => utf8_encode($row['sub_categoria_idSub_categoria']),
        "categoria_idCategoria" => utf8_encode($row['categoria_idCategoria']),
        "nombreSub_categoria" => utf8_encode($row['nombreSub_categoria'])
    );
    $arr[] = $producto;
}

// json_encode es una función de PHP que transforma sus datos en json legibles para javascript
echo json_encode($arr);
mysql_close($conn);
