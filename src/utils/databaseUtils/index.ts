import mongoose from 'mongoose';

export async function connectToDatabase(databaseUrl: string) {
    try {
        console.log('Connecting to database...');
        const a = await mongoose.connect(databaseUrl);
        if (a) {
            console.log('Connected to database');
        }
        const db = mongoose.connection;
        db.on('error', (error) => console.error(error));
        db.once('open', () => console.log('Connected to Database'));
    } catch (error) {
        console.log('Error connecting to database: ', error);
    }
}