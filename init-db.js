const fs = require('fs');
const { pool } = require('./config/database');

(async () => {
    try {
        const sql = fs.readFileSync('./init.sql', 'utf8');
        await pool.query(sql);
        console.log('✅ init.sql berhasil dijalankan');
    } catch (err) {
        console.error('❌ Gagal menjalankan init.sql:', err);
    } finally {
        pool.end();
    }
})();