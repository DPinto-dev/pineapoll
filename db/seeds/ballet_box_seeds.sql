

-- id, email
INSERT INTO creators
VALUES (default, 'lighthouse@gmail.com'),
(default, 'bigcheddar69@gmail.com');


-- id, name, description, code, creation_date, is_active, creator_id
INSERT INTO polls
VALUES (default, 'Best sandwich?', 'Which is best?', '97q49d', default, default, '1'),
(default, 'Where should we eat?', 'Which restaurant?', '9rq47y', default, default, '1'),
(default, 'Where should we go on vacation?', 'hottest vacay spot', '9rggdy', default, default, '2');


-- id, poll_id, name, serial_order
INSERT INTO poll_options
VALUES
(default, 1, 'Grilled Cheese', 1),
(default, 1, 'Ruban', 2),
(default, 1, 'Meatball', 3),
(default, 1, 'Veggie', 4),

(default, 2, 'Wing City', 1),
(default, 2, 'Buger Queen', 2),
(default, 2, 'Big johnnies shake and steak motel', 3),
(default, 2, 'Rainforest cafe', 4),

(default, 3, 'Greece', 1),
(default, 3, 'Italy', 2),
(default, 3, 'Bora Bora', 3),
(default, 3, 'Japan', 4);


-- id, poll_id, poll_option_id, user_id, rank
INSERT INTO poll_results
VALUES
(default, 1, 1, 1, 1),
(default, 1, 2, 1, 3),
(default, 1, 3, 1, 2),
(default, 1, 4, 1, 4),

(default, 1, 1, 1, 3),
(default, 1, 2, 1, 2),
(default, 1, 3, 1, 1),
(default, 1, 4, 1, 4),

(default, 1, 1, 1, 4),
(default, 1, 2, 1, 3),
(default, 1, 3, 1, 1),
(default, 1, 4, 1, 2),

(default, 1, 1, 1, 4),
(default, 1, 2, 1, 3),
(default, 1, 3, 1, 2),
(default, 1, 4, 1, 1),

(default, 2, 5, 1, 1),
(default, 2, 6, 1, 2),
(default, 2, 7, 1, 4),
(default, 2, 8, 1, 3),

(default, 2, 5, 1, 3),
(default, 2, 6, 1, 2),
(default, 2, 7, 1, 1),
(default, 2, 8, 1, 4),

(default, 2, 5, 1, 4),
(default, 2, 6, 1, 2),
(default, 2, 7, 1, 1),
(default, 2, 8, 1, 3),

(default, 2, 5, 1, 2),
(default, 2, 6, 1, 3),
(default, 2, 7, 1, 1),
(default, 2, 8, 1, 4)

(default, 3, 5, 1, 3),
(default, 3, 6, 1, 2),
(default, 3, 7, 1, 4),
(default, 3, 8, 1, 1),

(default, 3, 5, 1, 2),
(default, 3, 6, 1, 3),
(default, 3, 7, 1, 1),
(default, 3, 8, 1, 4),

(default, 3, 5, 1, 3),
(default, 3, 6, 1, 2),
(default, 3, 7, 1, 1),
(default, 3, 8, 1, 4),

(default, 3, 5, 1, 2),
(default, 3, 6, 1, 3),
(default, 3, 7, 1, 1),
(default, 3, 8, 1, 4);
