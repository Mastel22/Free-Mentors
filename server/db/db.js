import { Pool } from 'pg';
import User from '../models/user.model';
import dotenv from 'dotenv';

dotenv.config();

class Database{
    static dbConnection (){
        if (process.env.NODE_ENV === 'production') {
            return new Pool({
                connectionString: process.env.DATABASE_URL
            });
        }
        
        if (process.env.NODE_ENV === 'testing') {
            return new Pool({
                connectionString: process.env.TEST_DB_URL
            });
        }
    }

    async insertIntoUser(data){
        const con = Database.dbConnection();
        const newUser = await con.query(`Insert into users(firstName, lastName, email, password, address, bio, occupation, expertise, role) values(
            '${data.firstName}',
            '${data.lastName}',
            '${data.email}',
            '${data.password}',
            '${data.address}',
            '${data.bio}',
            '${data.occupation}',
            '${data.expertise}',
            '${data.role}'
        ) returning *`);
        await con.end();
        return newUser;
    }

    async insertIntoSession(data){
        const con = Database.dbConnection();
        const newSession = await con.query(`Insert into sessions(mentorId, menteeId, questions, menteeEmail, status) values(
            ${data.mentorId},
            ${data.menteeId},
            '${data.questions}',
            '${data.menteeEmail}',
            '${data.status}'
        ) returning *`);
        await con.end();
        return newSession;
    }
    async selectAll(table){
        const con = Database.dbConnection();
        const result = await con.query(`SELECT * FROM ${table}`);
        await con.end();
        return result;
    }
    async selectBy(table,column,value){
        const con = Database.dbConnection();
        const result = await con.query(`SELECT * FROM ${table} WHERE ${column}='${value}'`)
        await con.end();
        return result;
    }
    async updateSession(status,id,mentorId){
        const con = Database.dbConnection();
        const  result = await con.query(`UPDATE sessions SET status = '${status}' WHERE sessionId = ${id} AND mentorid = ${mentorId};`);
        await con.end();
        return result;
    }
    async updateMentee(role,id){
        const con = Database.dbConnection();
        const  result = await con.query(`UPDATE users SET role = '${role}' WHERE userId = ${id};`);
        await con.end();
        return result;
    }
    
    async selectCount(table, column, value){
        const con = Database.dbConnection();
        const result = await con.query(`SELECT COUNT(1) FROM ${table} WHERE ${column} = '${value}';`);
        await con.end();
        return result;
      }
    
    static async createScripts(){
        const con = Database.dbConnection();
        await con.query(`
            CREATE TABLE IF NOT EXISTS USERS (userId SERIAL,firstName VARCHAR(250),lastName VARCHAR(250),email VARCHAR(250), password VARCHAR(250), address VARCHAR (30), bio VARCHAR(250), occupation VARCHAR(250), expertise VARCHAR(250), role VARCHAR(250),PRIMARY KEY(userId));

            CREATE TABLE IF NOT EXISTS SESSIONS (sessionId SERIAL,menteeId INTEGER REFERENCES users(userId) ON DELETE CASCADE,mentorId INTEGER REFERENCES users(userId) ON DELETE CASCADE,questions VARCHAR (200),menteeEmail VARCHAR(300),status VARCHAR(250),PRIMARY KEY (sessionId));

            CREATE TABLE IF NOT EXISTS REVIEWS (sessionId INTEGER REFERENCES sessions(sessionId) ON DELETE CASCADE,menteeId INTEGER REFERENCES users(userId) ON DELETE CASCADE,mentorId INTEGER REFERENCES users(userId) ON DELETE CASCADE,menteefirstName VARCHAR(300),menteelastName VARCHAR(300),remark VARCHAR(300));
        `);
        const result = await con.query(`SELECT COUNT(1) FROM users WHERE email = 'admin@freementors.com';`)
        if (result.rows[0].count === '0') {
           const user = new User('Pierrette', 'Mastel', 'admin@freementors.com', '$2b$10$u5/7UoGq1cPDVcgGqyPaAuq6XscR9CFI.Vcg9oGcba9LVp940J9FS', 'KK 183', '5years of web developments', 'Web Developer', '3years developing apps', 'admin');
            await con.query(`Insert into users(firstName, lastName, email, password, address, bio, occupation, expertise, role) values(
            '${user.firstName}',
            '${user.lastName}',
            '${user.email}',
            '${user.password}',
            '${user.address}',
            '${user.bio}',
            '${user.occupation}',
            '${user.expertise}',
            '${user.role}'
        ) returning *`);
        }
        await con.end();
    }

    static async deleteTestTables(){
        const con = Database.dbConnection();
        await con.query(`DROP TABLE IF EXISTS USERS,SESSIONS,REVIEWS CASCADE;`);
        await con.end();
    }

}

export default Database;