
create table genre (
  id INT PRIMARY KEY AUTO_INCREMENT,
  label VARCHAR(255) NOT NULL
);

create table musicStyle (
  id INT PRIMARY KEY AUTO_INCREMENT,
  label VARCHAR(255) NOT NULL
);



create table disc (
  id INT PRIMARY KEY AUTO_INCREMENT,
  artist VARCHAR(255)NOT NULL,
  title VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL,
  year  INT(4) NOT NULL,
  color VARCHAR(100) NOT NULL,
  musicStyle_id INT NOT NULL,
  CONSTRAINT fk_disc_musicStyle
  FOREIGN KEY (musicStyle_id)
  REFERENCES musicStyle(id)
);


create table game (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL,
  year  INT(4) NOT NULL,
  console VARCHAR(255)NOT NULL,
  genre_id INT NOT NULL,
  CONSTRAINT fk_game_genre
  FOREIGN KEY (genre_id)
  REFERENCES genre(id)
);

INSERT INTO musicStyle(label) VALUES ('Rock');
INSERT INTO musicStyle(label) VALUES ('Pop');
INSERT INTO musicStyle(label) VALUES ('Pop-Rock');
INSERT INTO musicStyle(label) VALUES ('Rap');
INSERT INTO musicStyle(label) VALUES ('Motown');
INSERT INTO musicStyle(label) VALUES ('SoundTrack');
INSERT INTO musicStyle(label) VALUES ('Funck');
INSERT INTO musicStyle(label) VALUES ('80s');


INSERT INTO disc(artist, title, image, year, color, musicStyle_id) VALUES ('placebo',"without you i'm nothing","https://www.srcvinyl.com/media/catalog/product/cache/9/image/9df78eab33525d08d6e5fb8d27136e95/p/l/placebo_without_coverar_3000dpi300rgb1000169992.jpg",2015,'yellow',1);
INSERT INTO disc(artist, title, image, year, color, musicStyle_id) VALUES ('orelsan',"civilisation","https://ladistilleriemusicale.fr/wp-content/uploads/2021/11/ab67616d0000b27358ba1ea637001f9a15e55a92-400x400.jpeg",2021,'Black',4);




INSERT INTO genre(label) VALUES ('Plateformer');
INSERT INTO genre(label) VALUES ('VS Fighting');
INSERT INTO genre(label) VALUES ('Sport');
INSERT INTO genre(label) VALUES ("Beat'em All");
INSERT INTO genre(label) VALUES ("Shoot'em Up");
INSERT INTO genre(label) VALUES ("Action");
INSERT INTO genre(label) VALUES ("Racing");
INSERT INTO genre(label) VALUES ("Motion Video");
INSERT INTO genre(label) VALUES ("Adventure");
INSERT INTO genre(label) VALUES ("RPG");
INSERT INTO genre(label) VALUES ("Puzzle");

INSERT INTO game(title, image, year, console, genre_id) VALUES ('Alex kidd in miracle world','https://images.launchbox-app.com/e9a25f89-4489-48db-a4d1-ed95fbeaef07.jpg',1986,'sega master system',1);
INSERT INTO game(title,image,year,console, genre_id) VALUES ('super mario bros','https://cdn02.nintendo-europe.com/media/images/05_packshots/games_13/nes_1/PS_NES_SuperMarioBros.jpg',1985,'nintendo Nes',1);
INSERT INTO game(title,image,year,console, genre_id) VALUES ('fatal fury special','https://www.mobygames.com/images/covers/l/42665-fatal-fury-special-neo-geo-front-cover.jpg',1993,'NEO GEO',2);
INSERT INTO game(title,image,year,console, genre_id) VALUES ('soccer brawl','https://romspure.cc/wp-content/uploads/2020/05/1589158208-b34c127a-9098-47ce-9d74-aa4c0c91c121.jpg',1992,'NEO GEO',3);
INSERT INTO game(title,image,year,console, genre_id) VALUES ('world heroes 2 jet','https://cdn.mobygames.com/covers/657987-world-heroes-2-jet-neo-geo-front-cover.jpg',1994,'NEO GEO',2);
INSERT INTO game(title,image,year,console, genre_id) VALUES ('mortal kombat','http://4.bp.blogspot.com/_ip2NCacCsrU/SrWWzwtFYpI/AAAAAAAAA3g/ocVjtMxuZRk/s400/600full-mortal-kombat-cover.jpg',1993,'megadrive',2);
INSERT INTO game(title,image,year,console, genre_id) VALUES ('quackshot','http://www.gamemuseum.es/wp-content/uploads/2017/11/Portada-768x1046.jpg',1991,'megadrive',1);
INSERT INTO game(title,image,year,console, genre_id) VALUES ('mega man','https://www.gamexchange.co.uk/images/pictures/products/md/md305-(product-zoom).jpg?v=3aeed0c4',1994,'megadrive',1);
INSERT INTO game(title,image,year,console, genre_id) VALUES ('the king of fighters 94',"https://upload.wikimedia.org/wikipedia/en/e/e4/The_King_of_Fighters_'94_arcade_flyer.jpg",1994,'NEO GEO',2);
INSERT INTO game(title,image,year,console, genre_id) VALUES ('aladdin',"https://i.pinimg.com/originals/b7/fb/8d/b7fb8dcb85136aad58bb417e23899799.jpg",1993,'megadrive',1);

