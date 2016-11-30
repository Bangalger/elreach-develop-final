<?php
use Migrations\AbstractMigration;

class CreateTeamsUsers extends AbstractMigration
{
    /**
     * Change Method.
     *
     * More information on this method is available here:
     * http://docs.phinx.org/en/latest/migrations.html#the-change-method
     * @return void
     */
    public function change()
    {
        $table = $this->table('teams_users');
        $table->addColumn('user_id', 'integer')
        ->addColumn('team_id', 'integer')
        ->create();

        $refTable = $this->table('teams_users');
        $refTable->addForeignKey('user_id', 'users', 'id', array('delete' => 'CASCADE', 'update'=>'NO_ACTION'))
        ->addForeignKey('team_id', 'teams', 'id', array('delete' => 'CASCADE', 'update'=>'NO_ACTION'))
        ->update();
    }
}
