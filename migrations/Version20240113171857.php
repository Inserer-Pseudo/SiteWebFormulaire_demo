<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240113171857 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE genre MODIFY genre_id INT NOT NULL');
        $this->addSql('DROP INDEX `primary` ON genre');
        $this->addSql('ALTER TABLE genre CHANGE genre_id id INT AUTO_INCREMENT NOT NULL');
        $this->addSql('ALTER TABLE genre ADD PRIMARY KEY (id)');
        $this->addSql('ALTER TABLE habitant ADD CONSTRAINT FK_9BADFD8B4296D31F FOREIGN KEY (genre_id) REFERENCES genre (id)');
        $this->addSql('CREATE INDEX IDX_9BADFD8B4296D31F ON habitant (genre_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE genre MODIFY id INT NOT NULL');
        $this->addSql('DROP INDEX `PRIMARY` ON genre');
        $this->addSql('ALTER TABLE genre CHANGE id genre_id INT AUTO_INCREMENT NOT NULL');
        $this->addSql('ALTER TABLE genre ADD PRIMARY KEY (genre_id)');
        $this->addSql('ALTER TABLE habitant DROP FOREIGN KEY FK_9BADFD8B4296D31F');
        $this->addSql('DROP INDEX IDX_9BADFD8B4296D31F ON habitant');
    }
}
