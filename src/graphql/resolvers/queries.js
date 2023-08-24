
const Query = {
    getUser: async (_, {email, password}, {pool}) => {
        const [row] = await pool.query("SELECT * FROM user WHERE email = ? AND password = ?", [email, password]);
        return row[0];
    },

    getQuantityOfUsers: async (_, args, {pool}) => {
        const [row] = await pool.query("SELECT COUNT(id) FROM user");
        return Object.values(row[0])[0];
    },

    getUsers: async (_, args, {pool}) => {
        const [rows] = await pool.query("SELECT * FROM user");
        return rows;
    },

    getProductsFromCart: async (_, {id_user}, {pool}) => {
        const [rows] = await pool.query("SELECT * FROM product WHERE id IN ( SELECT id_product FROM cart WHERE id_user = ? )", [id_user]);
        return rows;
    },

    getProducts: async (_, args, {pool}) => {
        const [rows] = await pool.query("SELECT * FROM product");
        return rows;
    },

    getQuantityOfProducts: async (_, args, {pool}) => {
        const [row] = await pool.query("SELECT COUNT(id) FROM product");
        return Object.values(row[0])[0];
    },

    getComments: async (_, {id_product}, {pool}) => {
        const [rows] = await pool.query("SELECT * FROM comments WHERE id_product = ?", [id_product]);
        return rows;
    },

    getTopComments: async (_, {id_product}, {pool}) => {
        const [rows] = await pool.query("SELECT COUNT(rate) AS 'votes', rate FROM comments WHERE id_product = ? GROUP BY rate", [id_product]);
        return rows;
    },

    getQuantityOfComments: async (_, args, {pool}) => {
        const [row] = await pool.query("SELECT COUNT(id) FROM comments");
        return Object.values(row[0])[0];
    },

    getAdminFromEachProduct: async (_, args, {pool}) => {
        const [row] = await pool.query(
            `SELECT u.name, u.email, COUNT(p.id) AS quantity FROM fetch_product_by_admin f 
            INNER JOIN user u ON u.id = f.id_user 
            INNER JOIN product p ON p.id = f.id_product
            GROUP BY u.email
            ORDER BY COUNT(p.id) DESC;`
            );

        return row;
    },

    getFetchAdmin: async (_, {id_user}, {pool}) => {
        const [row] = await pool.query("SELECT * FROM user WHERE id = ? AND rol = 'admin'", [id_user]);
        return row[0];
    },

    getPurchase: async (_, { id_user }, { pool }) => {
        const [row] = await pool.query("SELECT * FROM product WHERE id IN ( SELECT id_product FROM purchase WHERE id_user = ? )", [id_user]);
        return row;
    },
}

export default Query;