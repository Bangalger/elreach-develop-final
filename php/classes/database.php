<?php
    class database
    {
        function __construct($pdo)
        {
            $this->pdo = $pdo;
        }

        function getData($table,$id=null) //Get all data and recive parameter
        {   
            switch ($table) {
                case 'users':
                    $query = $this->pdo->prepare('SELECT * FROM users');
                    break;
                case 'teams' :
                    //$query = $this->pdo->prepare('SELECT * FROM users, teams_users WHERE teams_users.user_id = 2 ');
                    $query = $this->pdo->prepare('SELECT teams_users.team_id FROM teams_users WHERE teams_users.user_id='.$id);
                    break;
                default:
                    # code...
                    break;
            }
            
            $query->execute();
            return $query->fetchAll(PDO::FETCH_ASSOC);

        }

        function getLevel( $team_id = null){
            $query = $this->pdo->prepare('SELECT * FROM teams INNER JOIN levels_teams ON teams.id=levels_teams.team_id INNER JOIN levels ON levels_teams.level_id = levels.id WHERE teams.id='.$team_id);
            $query->execute();
            return $query->fetchAll(PDO::FETCH_ASSOC);

        }

        function getWarnings($team_id=null, $level_id=null){
            $query = $this->pdo->prepare("SELECT * FROM warnings INNER JOIN teams_warnings_levels ON teams_warnings_levels.warning_id = warnings.id WHERE teams_warnings_levels.team_id ='$team_id' AND teams_warnings_levels.level_id ='$level_id'");
            $query->execute();
            return $query->fetchAll(PDO::FETCH_ASSOC);
        }


        function insertWarnings($posX=null, $posY=null, $tile=null,$team_id=null, $level_id=null){
            $query = $this->pdo->prepare("INSERT INTO warnings (posX,posY,tile) VALUES ('$posX','$posY','$tile')");
            $query->execute();
            $newId = $this->pdo->lastInsertId();
            $query = $this->pdo->prepare("INSERT INTO teams_warnings_levels (warning_id,team_id,level_id) VALUES ('$newId','$team_id','$level_id')");
            $query->execute();
        }
    }
?>