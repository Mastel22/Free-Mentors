import { Pool } from 'pg';


class Database{
    dbConnection (){
        return new Pool({
            connectionString: 'postgres://postgres:Almighty@127.0.0.1:5432/Free-Mentors' 
        });
    }

    async insertIntoUser(data){
        const con = this.dbConnection();
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
        const con = this.dbConnection();
        const newSession = await con.query(`Insert into sessions(mentorId, menteeId, questions, menteeEmail, status) values(
            ${data.mentorId},
            ${data.menteeId},
            ${data.questions},
            ${data.menteeeEmail},
            ${data.status}
        ) returning *`);
        await con.end();
        return newSession;
    }
    async selectAll(table){
        const con = this.dbConnection();
        const result = await con.query(`SELECT * FROM ${table}`);
        await con.end();
        return result;
    }
    async selectBy(table,column,value){
        const con = this.dbConnection();
        const result = await con.query(`SELECT * FROM ${table} WHERE ${column}=${value}`)
        await con.end();
        return result;
    }
    async updateSession(status,id){
        const con = this.dbConnection();
        const  result = await con.query(`UPDATE sessions SET status = '${status}' WHERE sessionId = ${id};`);
        await con.end();
        return result;
    }
    
    async selectCount(table, column, value){
        const con = this.dbConnection();
        const result = await con.query(`SELECT COUNT(1) FROM ${table} WHERE ${column} = '${value}';`);
        await con.end();
        return result;
      }
    
    async createScripts(){
        const con = this.dbConnection();
        await con.query(`
            CREATE TABLE IF NOT EXISTS USERS (userId SERIAL,firstName VARCHAR(250),lastName VARCHAR(250),email VARCHAR(250), password VARCHAR(250), address VARCHAR (30), bio VARCHAR(250), occupation VARCHAR(250), expertise VARCHAR(250), role VARCHAR(250),PRIMARY KEY(userId));

            CREATE TABLE IF NOT EXISTS SESSIONS (sessionId SERIAL,menteeId INTEGER REFERENCES users(userId) ON DELETE CASCADE,mentorId INTEGER REFERENCES users(userId) ON DELETE CASCADE,menteeEmail VARCHAR(300),status VARCHAR(250),PRIMARY KEY (sessionId));

            CREATE TABLE IF NOT EXISTS REVIEWS (sessionId INTEGER REFERENCES sessions(sessionId) ON DELETE CASCADE,menteeId INTEGER REFERENCES users(userId) ON DELETE CASCADE,mentorId INTEGER REFERENCES users(userId) ON DELETE CASCADE,menteefirstName VARCHAR(300),menteelastName VARCHAR(300),remark VARCHAR(300));
        `);
        con.end();
    }

}

export default Database;