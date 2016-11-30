<?php
    require_once 'config.php';
    require_once 'database.php';
    $db = new database($pdo); //Create new DB --> Send the config


    if(!empty($_POST["consulta"])){
    	$consulta = $_POST["consulta"];
    }
    if(!empty($_POST["id"])){
    	$id = $_POST["id"];

    }if(!empty($_POST["team_id"])){
        $team_id = $_POST["team_id"];

    } if(!empty($_POST["level_id"])){
        $level_id = $_POST["level_id"];

    }if(!empty($_POST["posX"])){
        $posX = $_POST["posX"];

    }if(!empty($_POST["posY"])){
        $posY = $_POST["posY"];

    }if(!empty($_POST["tile"])){
        $tile = $_POST["tile"];

    }
    //echo $consulta;
    switch ($consulta) {
    	case 'users':
    		$rows = $db->getData('users');
    		break;

    	case 'teams':
    		$rows = $db->getData('teams',$id);
    		break;

        case 'one_team_level':
            $rows = $db->getData('teams',$id);
        
            break;
    	case 'level':
    		$rows = $db->getLevel($team_id);
    		break;

        case 'warnings':
            $rows = $db->getWarnings($team_id, $level_id);
            break;

        case 'insert_warnings':
            $rows = $db->insertWarnings($posX, $posY, $tile, $team_id, $level_id);
            break;

    	default:
    		# code...
    		break;
    }
    echo json_encode($rows);
    //print_r($rows)
?>