# For Review: 
- review useparams alternative with drop down?
- react select implementation


# REFERENCE MySQL Stored Procedures and Tables:

USE blogs;

-- tables

CREATE TABLE Blogs (

	id INT AUTO_INCREMENT PRIMARY KEY,
    title Text not null,
	content Text not null,
    authorid INT NOT NULL,
	_created datetime default current_timestamp NOT NULL
);

CREATE TABLE Authors (
	id INT auto_increment PRIMARY KEY,
	name varchar(32) NOT NULL,
	email varchar(64) NOT NULL unique,
	_created datetime default current_timestamp NOT NULL    
);

CREATE TABLE Tags (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name varchar(32) NOT NULL unique,
	_created datetime default current_timestamp NOT NULL
);

CREATE TABLE BlogTags (
	blogid INT NOT NULL,
    tagid INT NOT NULL,
	FOREIGN KEY (tagid) REFERENCES Tags(id),
    FOREIGN KEY (blogid) REFERENCES Blogs(id),
    PRIMARY KEY (blogid, tagid)

## test SQL

INSERT INTO Authors (name, email) VALUES ( 'Simon', 'author@lol.com');
INSERT INTO Blogs (id, title, content, authorid) VALUES ('1', 'This is a test title', 'This is test content', '11');
INSERT INTO Blogs (title, content, authorid) VALUES ('This is a test title2', 'This is test content2', 1);
INSERT INTO Tags (name) VALUES ('React'), ('TypeScript');
INSERT INTO BlogTags (blogid, tagid) VALUES (1,1), (2,1), (3,2);

INSERT INTO BlogTags SET `tagid` = 8, `blogid` = 1; 

## -- DESCRIBE

describe Authors;
describe BlogTags;
describe Blogs;

## -- SELECT

SELECT * FROM Blogs;
SELECT * FROM BlogTags;
SELECT * FROM Authors;
SELECT * FROM Tags;

# spGetBlogsByAuthorId(?) 

CALL spGetBlogsByAuthorId();
SELECT * FROM Blogs;
SELECT * FROM Authors;
DELIMITER //
CREATE PROCEDURE spGetBlogsByAuthorId(spauthorid INT)
BEGIN
	SELECT BlogTags.blogid as blog_id, BlogTags.tagid as tag_id ,b.title as title, b.content as content, b._created as blog_created,
		Authors.id as a_id, Authors.name as a_name, Authors.email as a_email, t.name as tag_name, t._created as tag_created 
		FROM BlogTags
		JOIN Tags t
		ON t.id=BlogTags.tagid
		JOIN Blogs b
		ON b.id=BlogTags.blogid
		JOIN Authors
		ON b.authorid=Authors.id
			WHERE Authors.id=spauthorid;
END//

DELIMITER //;


# -- Stored Procedure --   THIS WORKS VV

CALL spGetBlogById();

SELECT * FROM Blogs;

DELIMITER //
CREATE PROCEDURE spGetBlogById(spblogid INT)
	BEGIN
		SELECT BlogTags.blogid as blog_id, BlogTags.tagid as tag_id,
        b.title as title, b.content as content, b._created as blog_created,
        a.name as a_name,a.email as a_email, 
        t.name as tag_name, t._created as tag_created 
        FROM BlogTags
            JOIN Tags t
            ON t.id=BlogTags.tagid
                JOIN Blogs b
                ON b.id=BlogTags.blogid
                    JOIN Authors a
                    ON b.authorid=a.id
                    WHERE BlogTags.blogid=spblogid;
    END //

DELIMITER //;

# -- creating spGetBlogsByTagId(?)

CALL spGetBlogsByTagId();

DELIMITER //
CREATE PROCEDURE spGetBlogsByTagId(sptagid INT)
	BEGIN
    
    SELECT BlogTags.blogid as blog_id, BlogTags.tagid as tag_id ,b.title as title, b.content as content, b._created as blog_created,
a.name as a_name,a.email as a_email, t.name as tag_name, t._created as tag_created 
FROM BlogTags
JOIN Tags t
ON t.id=BlogTags.tagid
JOIN Blogs b
ON b.id=BlogTags.blogid
JOIN Authors a
ON b.authorid=a.id
WHERE BlogTags.tagid=sptagid
ORDER BY b._created DESC;
    
END //

DELIMITER //;



-- creating spGetBlogsByTagId(?)