CREATE TABLE IF NOT EXISTS pledges
(
  id      INT AUTO_INCREMENT
    PRIMARY KEY,
  user    INT                NOT NULL,
  project INT                NOT NULL,
  reward  INT                NULL,
  amount  DOUBLE DEFAULT '0' NOT NULL
);

CREATE INDEX pledges_projects_id_fk
  ON pledges (project);

CREATE INDEX pledges_rewards_id_fk
  ON pledges (reward);

CREATE INDEX pledges_users_id_fk
  ON pledges (user);

CREATE TABLE IF NOT EXISTS projects
(
  id          INT AUTO_INCREMENT
    PRIMARY KEY,
  creator     INT                                 NOT NULL,
  title       TEXT                                NOT NULL,
  subtitle    TEXT                                NOT NULL,
  description TEXT                                NOT NULL,
  target      DOUBLE DEFAULT '0'                  NOT NULL,
  image       TEXT                                NOT NULL,
  timestamp   TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX projects_users_id_fk
  ON projects (creator);

ALTER TABLE pledges
  ADD CONSTRAINT pledges_projects_id_fk
FOREIGN KEY (project) REFERENCES projects (id);

CREATE TABLE IF NOT EXISTS rewards
(
  id          INT AUTO_INCREMENT
    PRIMARY KEY,
  project     INT                NOT NULL,
  amount      DOUBLE DEFAULT '0' NOT NULL,
  description TEXT               NOT NULL,
  CONSTRAINT rewards_projects_id_fk
  FOREIGN KEY (project) REFERENCES projects (id)
);

CREATE INDEX rewards_projects_id_fk
  ON rewards (project);

ALTER TABLE pledges
  ADD CONSTRAINT pledges_rewards_id_fk
FOREIGN KEY (reward) REFERENCES rewards (id);

CREATE TABLE IF NOT EXISTS users
(
  id       INT AUTO_INCREMENT
    PRIMARY KEY,
  username VARCHAR(15) NOT NULL,
  password VARCHAR(30) NOT NULL,
  location VARCHAR(50) NULL,
  email    VARCHAR(50) NULL,
  CONSTRAINT users_username_uindex
  UNIQUE (username)
);

ALTER TABLE pledges
  ADD CONSTRAINT pledges_users_id_fk
FOREIGN KEY (user) REFERENCES users (id);

ALTER TABLE projects
  ADD CONSTRAINT projects_users_id_fk
FOREIGN KEY (creator) REFERENCES users (id);

