CREATE TABLE user(
    id INT AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(15) NOT NULL,
    tel VARCHAR(15),
    direction VARCHAR(100),
    rol VARCHAR(10) DEFAULT "user",
    PRIMARY KEY (id),
    CONSTRAINT CHECK( LENGTH(password) BETWEEN 8 AND 15)
);

CREATE TABLE product (
    id INT AUTO_INCREMENT,
    uri VARCHAR(150) NOT NULL,
    name VARCHAR(20) NOT NULL,
    price FLOAT NOT NULL,
    quantity INT NOT NULL,
    size VARCHAR(10) NOT NULL,
    color VARCHAR(20) NOT NULL,
    description VARCHAR(150),
    PRIMARY KEY (id)
);

INSERT INTO cart SET ? [ids];

CREATE TABLE cart (
    id INT AUTO_INCREMENT,
    id_product INT,
    id_user INT,
    CONSTRAINT FOREIGN KEY(id_product) REFERENCES product(id) ON DELETE SET NULL,
    CONSTRAINT FOREIGN KEY(id_user) REFERENCES user(id) ON DELETE SET NULL,
    PRIMARY KEY (id)
);

SELECT * FROM cart WHERE id = id_user; => [numbers]
SELECT * FROM product WHERE id IN (numbers);

CREATE TABLE purchase(
    id INT AUTO_INCREMENT,
    id_user INT,
    id_product INT,
    CONSTRAINT FOREIGN KEY (id_user) REFERENCES user(id) ON DELETE SET NULL,
    CONSTRAINT FOREIGN KEY (id_product) REFERENCES product(id) ON DELETE SET NULL,
    PRIMARY KEY(id),
    deliver_set_time timestamp DEFAULT current_timestamp
);

CREATE TABLE fetch_product_by_admin(
    id INT AUTO_INCREMENT,
    id_product INT,
    id_user INT,
    CONSTRAINT FOREIGN KEY(id_user) REFERENCES user(id) ON DELETE SET NULL,
    CONSTRAINT FOREIGN KEY(id_product) REFERENCES product(id) ON DELETE SET NULL,
    PRIMARY KEY (id)
);

SELECT *, COUNT( SELECT id FROM product WHERE id IN (SELECT id_product FROM fetch_product_by_admin 
WHERE id_user = ?) ) 
FROM user WHERE id = IN (SELECT id_user FROM fetch_product_by_admin); 

CREATE TABLE comments(
    id INT AUTO_INCREMENT,
    rate INT(1) NOT NULL,
    comment VARCHAR(200) NOT NULL,
    createBy VARCHAR(20) NOT NULL,
    id_product INT,
    id_user INT,
    CONSTRAINT FOREIGN KEY(id_product) REFERENCES product(id) ON DELETE SET NULL,
    CONSTRAINT FOREIGN KEY(id_user) REFERENCES user(id) ON DELETE SET NULL,
    PRIMARY KEY (id)

);

DELIMITER $$
CREATE PROCEDURE onAddproduct(in userId INT, 
in onName VARCHAR(20), in onUri VARCHAR(150), in onPrice FLOAT, 
in onQuantity INT, in onSize VARCHAR(10), in onColor VARCHAR(20), 
in onDescription VARCHAR(200)
)
BEGIN
START TRANSACTION;
SELECT @isAdmin := rol FROM user WHERE id = userId;
IF ( @isAdmin = "admin" ) THEN 
INSERT INTO product(name, uri, price, quantity, size, color, description)
VALUES (onName, onUri, onPrice, onQuantity, onSize, onColor, onDescription);

SELECT @getProductById := LAST_INSERT_ID();

INSERT INTO fetch_product_by_admin(id_user, id_product) 
VALUES(userId, @getProductById );
COMMIT;

ELSE
ROLLBACK;
END IF;
END$$
DELIMITER ;
