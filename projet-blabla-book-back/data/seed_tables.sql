-- SQLBook: Code
BEGIN;

INSERT INTO
  "user" (
    "firstname",
    "lastname",
    "username",
    "email",
    "password"
  )
VALUES
  (
    'Jo',
    'Lerigolo',
    'JoLerigolo',
    'jolerigolo@gmail.com',
    'password'
  ),
  (
    'Jean',
    'Lemarrant',
    'JeanLemarrant',
    'jeanlemarrant@gmail.com',
    'password'
  ),
  (
    'Jean-Marie',
    'Ledrole',
    'Ledrole',
    'jean-marieledrole@gmail.com',
    'password'
  );

INSERT INTO
  "univers" ("name")
VALUES
  ('Litterrature'),
  ('Manga'),
  ('Bande_Dessinée');

INSERT INTO "book" ("title", "author", "date_of_publication", "image", "summary", "univers_id") VALUES
  ('One Piece, Vol. 1', 'Eiichiro Oda', '1997-07-22', '/image/01.jpg', 'Luffy, un jeune garçon au chapeau de paille, rêve de devenir le Roi des Pirates en trouvant le légendaire trésor One Piece.', 2),
  ('Tintin au Tibet', 'Hergé', '1960-11-01','/image/02.jpg', 'Tintin part à la recherche de son ami Tchang, perdu dans les montagnes tibétaines.', 3),
  ('Astérix chez les Bretons', 'René Goscinny', '1966-09-14','/image/asterixbretagne.jpg', 'Astérix et Obélix voyagent en Bretagne pour aider leur cousin Anticlimax à résister à l''invasion romaine.', 3),
  ('Astérix et les Normands', 'René Goscinny', '1967-05-15','/image/asterixnormandie.png', 'Astérix et Obélix doivent apprendre aux Normands à connaître la peur avant qu''ils n''envahissent la Gaule.', 3),

  ('Orgueil et Préjugés', 'Jane Austen', '1813-01-28', '/image/03.jpg','L''histoire de l''indépendance et de la romance de l''héroïne Elizabeth Bennet.', 1),
  ('Naruto, Vol. 1', 'Masashi Kishimoto', '1999-09-21','/image/04.jpg','L''histoire de Naruto Uzumaki, un jeune ninja avec un rêve de devenir Hokage.', 2),
  ('1984', 'George Orwell', '1949-06-08', '/image/05.jpg','Un roman dystopique sur un avenir totalitaire et la surveillance omniprésente.', 1),
  ('Le Petit Prince', 'Antoine de Saint-Exupéry', '1943-04-06', '/image/06.jpg', 'Un conte poétique sur l''amitié et l''imagination d''un jeune prince venu d''une autre planète.', 1),
  ('Blake et Mortimer: Le Mystère de la Grande Pyramide', 'Edgar P. Jacobs', '1956-03-20', '/image/07.jpg', 'Une enquête palpitante de Blake et Mortimer dans une aventure pleine de mystères.', 3),
  ('Dragon Ball, Vol. 1', 'Akira Toriyama', '1984-12-03', '/image/08.jpg', 'Les premières aventures de Son Goku à la recherche des Dragon Balls.', 2),
  ('La Communauté de l''Anneau', 'J.R.R. Tolkien', '1954-07-29', '/image/09.jpg', 'L''histoire de la formation de la Communauté de l''Anneau et de leur départ de la Comté.', 1),
  ('Les Deux Tours', 'J.R.R. Tolkien', '1954-11-11', '/image/10.jpg', 'L''histoire de la poursuite de Frodon et de ses compagnons par les Nazgûl et de la bataille de Helm.', 1),
  ('Le Retour du Roi', 'J.R.R. Tolkien', '1955-10-20', '/image/11.jpg', 'L''histoire de la fin de la guerre de l''Anneau et du retour de l''Armeur en Gondor.', 1),

  ('Twilight : Fascination', 'Stephenie Meyer', '2005-10-05', '/image/12.jpg', 'L''histoire de Bella Swan et de son amour pour le vampire Edward Cullen.', 1),
  ('Twilight : Tentation', 'Stephenie Meyer', '2006-09-06', '/image/13.jpg', 'La suite de l''histoire de Bella et Edward, avec l''arrivée de nouveaux personnages et de nouveaux dangers.', 1),
  ('Twilight : Hésitation', 'Stephenie Meyer', '2007-08-08', '/image/14.jpg', 'Le troisième livre de la saga, où Bella doit choisir entre son amour pour Edward et son amitié pour le loup-garou Jacob Black.', 1),
  ('Twilight : Révélation', 'Stephenie Meyer', '2008-08-06', '/image/15.jpg', 'Le dernier livre de la saga, où Bella et Edward doivent affronter leurs ennemis et protéger leur amour.', 1),


  ('Harry Potter à l''école des sorciers', 'J.K. Rowling', '1997-06-26', '/image/16.jpg', 'L''histoire de Harry Potter, un jeune garçon qui découvre qu''il est sorcier.', 1),
  ('Harry Potter et la Chambre des secrets', 'J.K. Rowling', '1998-07-02', '/image/17.jpg', 'Le deuxième livre de la saga, où Harry doit affronter un nouveau danger à Hogwarts.', 1),
  ('Harry Potter et le Prisonnier d''Azkaban', 'J.K. Rowling', '1999-07-08', '/image/18.jpg', 'Le troisième livre de la saga, où Harry découvre la vérité sur son père et son passé.', 1),
  ('Harry Potter et la Coupe de feu', 'J.K. Rowling', '2000-07-08', '/image/19.jpg', 'Le quatrième livre de la saga, où Harry est sélectionné pour participer au Tournoi des Trois Sorciers.', 1),
  ('Harry Potter et l''Ordre du Phénix', 'J.K. Rowling', '2003-06-21', '/image/20.jpg', 'Le cinquième livre de la saga, où Harry doit affronter le retour de Voldemort.', 1),
  ('Harry Potter et le Prince de sang-mêlé', 'J.K. Rowling', '2005-07-16', '/image/21.jpg', 'Le sixième livre de la saga, où Harry découvre un ancien livre de potions qui lui permet de comprendre mieux son passé.', 1),
  ('Harry Potter et les Reliques de la Mort', 'J.K. Rowling', '2007-07-21', '/image/22.jpg', 'Le dernier livre de la saga, où Harry, Ron et Hermione doivent affronter Voldemort dans une bataille finale.', 1),
  ('Hunger Games', 'Suzanne Collins', '2008-09-14', '/image/23.jpg', 'Katniss Everdeen et Peeta Mellark sont de retour dans l''arène pour la deuxième édition des Hunger Games.', 1),
  ('Hunger Games : L''Embrasement', 'Suzanne Collins', '2009-09-01', '/image/24.jpg', 'Katniss Everdeen devient le symbole de la rébellion contre le gouvernement oppressif.', 1),
  ('Hunger Games : La Révolte', 'Suzanne Collins', '2009-09-01', '/image/25.jpg', 'Après avoir survécu à la 74e édition des Hunger Games, Katniss Everdeen et Peeta Mellark sont de retour dans leur district. Mais leur victoire a allumé une étincelle de rébellion dans les districts...', 1),
  ('Hunger Games : La Ballade du serpent et de l''oiseau chanteur', 'Suzanne Collins', '2020-05-19', '/image/26.jpg', 'Katniss Everdeen et Peeta Mellark se retrouvent à l''arêt pour la quatrième édition des Hunger Games.', 1);

INSERT INTO
  "possessed" ("user_id", "book_id", "status")
VALUES
  (1, 1, true),
  (1, 5, true),
  (2, 2, true),
  (2, 8, true),
  (3, 7, true),
  (3, 1, true);

INSERT INTO
  "want" ("user_id", "book_id")
VALUES
  (1, 1),
  (1, 2),
  (2, 3),
  (2, 1),
  (3, 3),
  (3, 4);

COMMIT;