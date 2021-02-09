-- SELECT * FROM mysql_api_db.posts;
-- join  
SELECT users.username, users.id, posts.id, posts.title, posts.description, posts.photopath, posts.created, posts.fk_userid 
FROM users INNER JOIN posts ON users.id=posts.fk_userid;