<?php
use Migrations\AbstractMigration;


class CreateTeamsWarningsLevels extends AbstractMigration
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
        $table = $this->table('teams_warnings_levels');
        // Foreign Keys
        $table->addColumn('warning_id', 'integer', array('signed'=> 'disable'))
        ->addForeignKey('warning_id','warnings','id',array('delete'=>'CASCADE', 'update'=>'NO_ACTION'))
        ->addColumn('team_id', 'integer', array('signed'=> 'disable'))
        ->addForeignKey('team_id','teams','id',array('delete'=>'CASCADE', 'update'=>'NO_ACTION'))
        ->addColumn('level_id', 'integer', array('signed'=> 'disable'))
        ->addForeignKey('level_id','levels','id',array('delete'=>'CASCADE', 'update'=>'NO_ACTION'))
        ->create();
    }
}
