<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240113171332 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE genre MODIFY id INT NOT NULL');
        $this->addSql('DROP INDEX `primary` ON genre');
        $this->addSql('ALTER TABLE genre CHANGE id genre_id INT AUTO_INCREMENT NOT NULL');
        $this->addSql('ALTER TABLE genre ADD PRIMARY KEY (genre_id)');
        $this->addSql('ALTER TABLE habitant DROP genre_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE genre MODIFY genre_id INT NOT NULL');
        $this->addSql('DROP INDEX `PRIMARY` ON genre');
        $this->addSql('ALTER TABLE genre CHANGE genre_id id INT AUTO_INCREMENT NOT NULL');
        $this->addSql('ALTER TABLE genre ADD PRIMARY KEY (id)');
        $this->addSql('ALTER TABLE habitant ADD genre_id INT NOT NULL');
    }
}
