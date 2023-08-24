import { createPool } from "mysql2";
import fs from "fs";

const setPool = createPool({
    host: "localhost",
    database: "glosaje",
    user: "root",
    password: "",
    waitForConnections: true
});

const pool = setPool.promise();

const getConnection = async () => {
    // for (let i = 1; i < 15; i++){
    //     const data = {
    //         name: `Name${i}`,
    //         uri: `uri ${i}`,
    //         price: i * 1000,
    //         quantity: i,
    //         size: "xl",
    //         color: "blue",
    //         description: `Hiii${i}`
        
    //     }
    // await pool.query("INSERT INTO product SET ?", [data]);
    // }
    let i = 12;
    const data = {
        id_user: 21,
        name: `Name${i}`,
        uri: `uri ${i}`,
        price: i * 1000,
        quantity: i,
        size: "xl",
        color: "blue",
        description: `Hiii${i}`
    }
    // const pd = {
    //     id_product: [10, 11, 12, 14]
    // }
        // const [row] = await pool.query("UPDATE user SET ? WHERE id = ?", [{rol: "admin"}, 15]);
        const dc = {
            id_user: 14,
            id_product: 2,
            rate: 4,
            comment: "gooooood one222",
        }
        // const {id_user, comment, rate, id_product} = dc;
        // const [row] = await pool.query("INSERT INTO comments SET ?, createBy = ( SELECT name FROM user WHERE id = ? )", [dc, 2]);
        

        // const isAdmin = Object.values( row[0][0] )[0];
        // const change = "row.map(id => id.id_product)";
        fs.writeFileSync("data.json", JSON.stringify(row));
    console.log("set");

}

const createUsers = async () => {
    for (let i = 0; i <= 20; i++) {
        const user = {
            name: "sebastian" + i,
            last_name: "mc" + i,
            email: "sm@gmail.com" + i,
            password: "i23456789",
            tel: "i23" + i,
            direction: "i23" + i,
        }
        await pool.query("INSERT INTO user SET ?", [user]);
    }
}

const createProducts = async () => {
    for (let i = 0; i <= 20; i++) {
        const user = {
            name: "good product" + i,
            uri: "www.sebastian" + i,
            price: i * 1000,
            quantity: i * 5,
            size: "xxl",
            color: "blue",
            description: "i23" + i*1000,
        }
        await pool.query("INSERT INTO product SET ?", [user]);
    }
}

createProducts().then(() => console.log("successful")).catch((err) => console.log("Error found ", err.message));



// getConnection();

// export default pool;