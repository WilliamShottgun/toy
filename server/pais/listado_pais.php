<?php

require_once '../DB/config_db.php';
$sql = 'SELECT * FROM pais ORDER BY idPais ASC';

mysql_select_db('toy');

// Al enviar la consulta más la conexión obtenemos, a través de la función mysql_query, un listado de cliente
$retval = mysql_query($sql, $conn);
if (!$retval) {
    die('Could not get data: ' . mysql_error());
}

$arr = array();
// Recorro fila a fila obtenida desde la base de datos 
while ($row = mysql_fetch_array($retval, MYSQL_ASSOC)) {
    $pais = array(
        "idPais" => $row['idPais'],
        "direccionPais" => utf8_encode($row['direccionPais']),
        "telefonoPais" => utf8_encode($row['telefonoPais']),
        "nombrePais" => utf8_encode($row['nombrePais']),
        "emailPais" => utf8_encode($row['emailPais']),
        "mapaPais" => utf8_encode($row['mapaPais'])
    );
    $arr[] = $pais;
}

// json_encode es una función de PHP que ransforma sus datos en json legibles para javascript
echo json_encode($arr);
mysql_close($conn);
