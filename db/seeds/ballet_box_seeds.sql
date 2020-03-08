

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
(default, 1, 1, 'xr5', 1),
(default, 1, 2, 'xr5', 3),
(default, 1, 3, 'xr5', 2),
(default, 1, 4, 'xr5', 4),

(default, 1, 1, '7h5', 3),
(default, 1, 2, '7h5', 2),
(default, 1, 3, '7h5', 1),
(default, 1, 4, '7h5', 4),

(default, 1, 1, '9k2', 4),
(default, 1, 2, '9k2', 3),
(default, 1, 3, '9k2', 1),
(default, 1, 4, '9k2', 2),

(default, 1, 1, 'ks6', 4),
(default, 1, 2, 'ks6', 3),
(default, 1, 3, 'ks6', 2),
(default, 1, 4, 'ks6', 1),

(default, 2, 5, 'k0a', 1),
(default, 2, 6, 'k0a', 2),
(default, 2, 7, 'k0a', 4),
(default, 2, 8, 'k0a', 3),

(default, 2, 5, 's2l', 3),
(default, 2, 6, 's2l', 2),
(default, 2, 7, 's2l', 1),
(default, 2, 8, 's2l', 4),

(default, 2, 5, 'g5f', 4),
(default, 2, 6, 'g5f', 2),
(default, 2, 7, 'g5f', 1),
(default, 2, 8, 'g5f', 3),

(default, 2, 5, 'p0a', 2),
(default, 2, 6, 'p0a', 3),
(default, 2, 7, 'p0a', 1),
(default, 2, 8, 'p0a', 4)

(default, 3, 5, 'ha7', 3),
(default, 3, 6, 'ha7', 2),
(default, 3, 7, 'ha7', 4),
(default, 3, 8, 'ha7', 1),

(default, 3, 5, 'a9s', 2),
(default, 3, 6, 'a9s', 3),
(default, 3, 7, 'a9s', 1),
(default, 3, 8, 'a9s', 4),

(default, 3, 5, '99a', 3),
(default, 3, 6, '99a', 2),
(default, 3, 7, '99a', 1),
(default, 3, 8, '99a', 4),

(default, 3, 5, 'la0', 2),
(default, 3, 6, 'la0', 3),
(default, 3, 7, 'la0', 1),
(default, 3, 8, 'la0', 4);
