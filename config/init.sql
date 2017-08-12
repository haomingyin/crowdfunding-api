CREATE TABLE IF NOT EXISTS pledges ( id INT AUTO_INCREMENT PRIMARY KEY, user INT NOT NULL, project INT NOT NULL, reward INT NULL, amount INTEGER DEFAULT '0' NOT NULL, anonymous VARCHAR(5) DEFAULT "false" NOT NULL);
CREATE INDEX pledges_projects_id_fk ON pledges (project);
CREATE INDEX pledges_rewards_id_fk ON pledges (reward);
CREATE INDEX pledges_users_id_fk ON pledges (user);
CREATE TABLE projects ( id INT auto_increment PRIMARY key, title text NOT NULL, subtitle text NOT NULL, description text NOT NULL, target DOUBLE DEFAULT '0' NOT NULL, imageUri text NOT NULL, timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, open VARCHAR(5) DEFAULT 'true' NOT NULL );
ALTER TABLE pledges ADD CONSTRAINT pledges_projects_id_fk FOREIGN KEY (project) REFERENCES projects (id);
CREATE TABLE IF NOT EXISTS rewards ( id INT AUTO_INCREMENT PRIMARY KEY, project INT NOT NULL, amount INTEGER DEFAULT '0' NOT NULL, description TEXT NOT NULL, CONSTRAINT rewards_projects_id_fk FOREIGN KEY (project) REFERENCES projects (id) );
CREATE INDEX rewards_projects_id_fk ON rewards (project);
ALTER TABLE pledges ADD CONSTRAINT pledges_rewards_id_fk FOREIGN KEY (reward) REFERENCES rewards (id);
CREATE TABLE IF NOT EXISTS users ( id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(15) NOT NULL, password VARCHAR(30) NOT NULL, location VARCHAR(50) NULL, email VARCHAR(50) NULL, CONSTRAINT users_username_uindex UNIQUE (username) );
ALTER TABLE pledges ADD CONSTRAINT pledges_users_id_fk FOREIGN KEY (user) REFERENCES users (id);
CREATE TABLE IF NOT EXISTS creates ( creator INT NOT NULL, name VARCHAR(30) NOT NULL, project INT NOT NULL, CONSTRAINT creates_creator_project_pk PRIMARY KEY (creator, project), CONSTRAINT creates_users_id_fk FOREIGN KEY (creator) REFERENCES users (id), CONSTRAINT creates_projects_id_fk FOREIGN KEY (project) REFERENCES projects (id) );
CREATE OR REPLACE VIEW project_detail AS SELECT * FROM projects AS p LEFT JOIN (SELECT project, SUM(amount) AS "currentPledged", COUNT(*) AS "numberOfBackers" FROM pledges AS pl GROUP BY pl.project) AS pl ON p.id = pl.project;
INSERT INTO users (username, password, location, email) VALUES ('haoming', '12345', 'Christchurch', 'hyi25@uclive.ac.nz');