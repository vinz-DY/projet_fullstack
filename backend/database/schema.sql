
create table genre (
  id INT PRIMARY KEY AUTO_INCREMENT,
  label VARCHAR(255) NOT NULL
);



create table game (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL,
  year  VARCHAR(255) NOT NULL,
  console VARCHAR(255)NOT NULL,
  genre_id INT NOT NULL,
  CONSTRAINT fk_game_genre
  FOREIGN KEY (genre_id)
  REFERENCES genre(id)
);


INSERT INTO genre(label) VALUES ('Action');
INSERT INTO genre(label) VALUES ('Fighting');
INSERT INTO genre(label) VALUES ('Sport');

INSERT INTO game(title, image, year, console, genre_id) VALUES ('Alex kidd in miracle world','https://images.launchbox-app.com/e9a25f89-4489-48db-a4d1-ed95fbeaef07.jpg','1986','sega master system',1);
INSERT INTO game(title,image,year,console, genre_id) VALUES ('super mario bros','https://cdn02.nintendo-europe.com/media/images/05_packshots/games_13/nes_1/PS_NES_SuperMarioBros.jpg','1985','nintendo Nes',1);
INSERT INTO game(title,image,year,console, genre_id) VALUES ('fatal fury special','https://www.mobygames.com/images/covers/l/42665-fatal-fury-special-neo-geo-front-cover.jpg','1993','NEO GEO',2);
INSERT INTO game(title,image,year,console, genre_id) VALUES ('soccer brawl','https://romspure.cc/wp-content/uploads/2020/05/1589158208-b34c127a-9098-47ce-9d74-aa4c0c91c121.jpg','1992','NEO GEO',3);

