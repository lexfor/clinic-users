CREATE TABLE IF NOT EXISTS doctors (
id UUID NOT NULL,
cabinet VARCHAR(255) NOT NULL,
position VARCHAR(255) NOT NULL,
specialization_id UUID NOT NULL,
user_id UUID NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (specialization_id) REFERENCES specializations(id) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE);
