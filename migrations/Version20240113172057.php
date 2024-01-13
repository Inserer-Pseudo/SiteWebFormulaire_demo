<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240113172057 extends AbstractMigration
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
        $this->addSql('ALTER TABLE habitant CHANGE genre_id genre_id_id INT NOT NULL');
        $this->addSql('ALTER TABLE habitant ADD CONSTRAINT FK_9BADFD8BC2428192 FOREIGN KEY (genre_id_id) REFERENCES genre (id)');
        $this->addSql('CREATE INDEX IDX_9BADFD8BC2428192 ON habitant (genre_id_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE genre MODIFY id INT NOT NULL');
        $this->addSql('DROP INDEX `PRIMARY` ON genre');
        $this->addSql('ALTER TABLE genre CHANGE id genre_id INT AUTO_INCREMENT NOT NULL');
        $this->addSql('ALTER TABLE genre ADD PRIMARY KEY (genre_id)');
        $this->addSql('ALTER TABLE habitant DROP FOREIGN KEY FK_9BADFD8BC2428192');
        $this->addSql('DROP INDEX IDX_9BADFD8BC2428192 ON habitant');
        $this->addSql('ALTER TABLE habitant CHANGE genre_id_id genre_id INT NOT NULL');
    }
}
