const INSERT_CLIENT_QUERY = 'INSERT INTO clients (cod, dni, type, name, dir) VALUES (?, ?, ?, ?, ?)';
const INSERT_EMAIL_QUERY = 'INSERT INTO cli_emails (client_id, email) VALUES (?, ?)';
const INSERT_PHONE_QUERY = 'INSERT INTO cli_phones (client_id, phone) VALUES (?, ?)';

