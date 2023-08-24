
const Mutation = {
    addUser: async (_, args, {pool} ) => {
        const [row] = await pool.query("INSERT INTO user SET ?", [args]);
        return !!(row.warningStatus);
    },

    editUser: async (_, {
        name,
        last_name,
        email,
        password,
        tel,
        direction,
        id
    }, { pool }) => {
        const data = {
            name,
            last_name,
            email,
            password,
            tel,
            direction
        }
        const [row] = await pool.query("UPDATE user SET ? WHERE id = ?", [data, id]);
        return !!(row.warningStatus);
    },

    deleteUser: async (_, { id }, { pool }) => {
        const [row] = await pool.query("DELETE FROM user WHERE id = ?", [id]);
        return !!(row.warningStatus);
    },

    addProductFromUserToCart: async (_, args, { pool }) => {
        const [row] = await pool.query("INSERT INTO cart SET ?", [args]);
        return !!(row.warningStatus);
    },

    deleteProductFromCart: async (_, { id_user, id_product }, { pool }) => {
        const [row] = await pool.query("DELETE FROM cart WHERE id_user = ? AND id_product = ?", [id_user, id_product]);
        return !!(row.warningStatus);
    },

    deleteProduct: async (_, { id }, { pool }) => {
        const [row] = await pool.query("DELETE FROM product WHERE id = ?", [id]);
        return !!(row.warningStatus);
    },

    editProduct: async (_, {
        uri,
        name,
        price,
        quantity,
        size,
        color,
        description,
        id
    }, { pool }) => {
        const data = {
            uri,
            name,
            price,
            quantity,
            size,
            color,
            description,
        }
        const [row] = await pool.query("UPDATE product SET ? WHERE id = ?", [data, id]);
        return !!(row.warningStatus);
    },

    addProduct: async (_, { id_user, uri, name, price, quantity, size, color, description }, { pool }) => {
        const [row] = await await pool.query(`
        CALL onAddProduct(
            ${id_user}, 
            '${name}', 
            '${uri}', 
            ${price}, 
            ${quantity}, 
            '${size}', 
            '${color}', 
            '${description}'
            )`
            );

        const isAdmin = Object.values( row[0][0] )[0];
        return isAdmin !== "admin";
    },

    purchase: async (_, {id_user, id_product}, { pool }) => {
        let values = [...id_product].map(q => `(${id_user}, ${q.toString()})`).join(",");
        const query = `INSERT INTO purchase(id_user, id_product) 
        VALUES${values}`;
        const [row] = await pool.query(query);
        return !!(row.warningStatus);
    },

    addComment: async (_, args, { pool }) => {
        const [row] = await await pool.query("INSERT INTO comments SET ?, createBy = ( SELECT name FROM user WHERE id = ? )", [args, args.id_user]);
        return !!(row.warningStatus);
    },

    deleteComment: async (_, { id_user, id_product }, { pool }) => {
        const [row] = await await pool.query("DELETE FROM comments WHERE id_user = ? AND id_product = ?", [id_user, id_product]);
        return !!(row.warningStatus);
    },

    editComment: async (_, {
        id_product,
        id_user,
        rate,
        comment,
        createBy
    }, { pool }) => {
        const data = {
            rate,
            comment,
            createBy
        }
        const [row] = await pool.query("UPDATE comments SET ? WHERE id_user = ? AND id_product = ?", [data, id_user, id_product]);
        return !!(row.warningStatus);
    },

    cancelASinglePurhaseFromAdminToUser: async (_, { id_user, id_product }, { pool }) => {
        const [row] = await pool.query("DELETE FROM purchase WHERE id_user = ? AND id_product = ?", [id_user, id_product]);
        return !!(row.warningStatus);
    },

    cancelPurhaseFromAdminToUser: async (_, { id_user }, { pool }) => {
        const [row] = await pool.query("DELETE FROM purchase WHERE id_user = ?", [id_user]);
        return !!(row.warningStatus);
    },

    setUserToAdmin: async (_, { id_user }, { pool }) => {
        const [row] = await pool.query("UPDATE user SET rol = 'admin' WHERE id = ?", [id_user]);
        return !!(row.warningStatus);
    },
}

export default Mutation;