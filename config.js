export const sequelizeconfig = {
    username: "root", // Utilizatorul bazei de date
    password: "parola", // Parola bazei de date
    database: "your_database_name", // Numele bazei de date
    host: "localhost",
    dialect: "mariadb",
    dialectOptions: {
        options: {
            trustedConnection: true,
        },
    },
};
