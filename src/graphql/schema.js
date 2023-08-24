import { gql } from "apollo-server";

const typeDefs = gql`

    type User {
        id: Int!
        name: String!
        last_name: String!
        email: String!
        password: String!
        tel: String
        direction: String
        rol: String!
    }

    type Product {
        id: Int!
        uri: String!
        name: String!
        price: Float!
        quantity: Int!
        size: String!
        color: String!
        description: String!

    }

    type Cart {
        id: Int!
        id_product: Int!
        id_user: Int!
    }

    type Purchase {
        id: Int!
        id_product: Int!
        id_user: Int!
        deliver_set_time: String!
    }

    type Comments {
        id: Int!
        id_product: Int!
        id_user: Int!
        rate: String!
        comment: String!
        createBy: String!
    }

    type ProductByEachAdmin{
        name: String!
        email: String!
        quantity: Int!
    }

    type TopComments {
        votes: Int!
        rate: Int!
    }

    type Fetch_product_by_admin {
        id: Int!
        id_product: Int!
        id_user: Int!
    }

    type Mutation {
        addUser(name: String!, last_name: String!, email: String!, password: String!):Boolean!
        editUser(id: Int!, name: String!, last_name: String!, email: String!, password: String!, tel: String!, direction: String!): Boolean!
        deleteUser(id: Int!): Boolean!

        addProductFromUserToCart(id_user: Int!, id_product: Int!): Boolean!
        deleteProductFromCart(id_user: Int!, id_product: Int!): Boolean!
        deleteProduct(id: Int!): Boolean!
        editProduct(uri: String!, name: String!, price: Float!, quantity: Int!, size: String!, color: String!, description: String!): Boolean!
        addProduct(id_user: Int!, uri: String!, name: String!, price: Float!, quantity: Int!, size: String!, color: String!, description: String!): Boolean!
        
        purchase(id_user: Int!, id_product: [Int!]!): Boolean!
        cancelASinglePurhaseFromAdminToUser(id_user: Int!): Boolean!
        cancelPurhaseFromAdminToUser(id_user: Int!, id_purchase: Int!): Boolean!
        setUserToAdmin(id_user: Int!): Boolean!
        
        editComment( id_product: Int!, id_user: Int!, rate: String!, comment: String!, createBy: String!):Boolean!
        deleteComment(id_user: Int!, id_product: Int!): Boolean!
        addComment(id_product: Int!, id_user: Int!, rate: String!, comment: String!): Boolean!
    }

    type Query {
        getUser(email: String!, password: String!): User
        getQuantityOfUsers: Int!
        getUsers: [User!]!
        getProductsFromCart(id_user: Int!): [Product!]!
        getProducts: [Product!]!
        getQuantityOfProducts: Int!
        getComments(id_product: Int!): [Comments!]!
        getTopComments: [TopComments!]!
        getQuantityOfComments: Int!

        getAdminFromEachProduct: [ProductByEachAdmin!]!
        getFetchAdmin(id_user: Int!): User!

        getPurchase(id_user: Int!): [Product!]!
    }
    
`;

export default typeDefs;