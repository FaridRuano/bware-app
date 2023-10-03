import { query } from "@lib/db";

export async function GET(request) {

    const { searchParams } = new URL(request.url);
    const met = searchParams.get('met');

    let queryResult;

    if(met==='phones') {
        queryResult = await query({
            query: "SELECT * FROM cli_phones",
            values: [],
        })
    }
    else if(met==='emails') {
        queryResult = await query({
            query: "SELECT * FROM cli_emails",
            values: [],
        })
    }
    else{
        queryResult = await query({
            query: "SELECT * FROM clients",
            values: [],
        })
    }    

    let data = JSON.stringify(queryResult);
    return new Response(data, {
        status: 200,
    });
}

export async function POST(request) {
    try {
        const clientData = await request.json();

        // Insert the client data into the clients table
        const clientInsertResult = await query({
            query: 'INSERT INTO clients (cod, dni, type, name, dir) VALUES (?, ?, ?, ?, ?)',
            values: [clientData.cod, clientData.dni, clientData.type, clientData.name, clientData.dir]
            /* values: ['20316', '1805478523', '1', 'KEVIN ALVEAR', 'Ambato'], */
        })

        const result = clientInsertResult.affectedRows;
        let message = "";
        if (result) {
            message = "Success";
            // Insert emails into the cli_emails table
            for (const email of clientData.emails) {
                await query({
                    query: 'INSERT INTO cli_emails (cod, email) VALUES (?, ?)',
                    values: [clientData.cod, email]
                })
            }

            // Insert phones into the cli_phones table
            for (const phone of clientData.phones) {
                await query({
                    query: 'INSERT INTO cli_phones (cod, phone) VALUES (?, ?)',
                    values: [clientData.cod, phone]
                })
            }
        } else {
            message = "Error";
        }        

        // Return a success response
        return new Response(JSON.stringify({
            status: 200,
            data: {
                message: message
            }
        }))

    } catch(err) {
        return new Response(JSON.stringify({
            status: 500,
            data: 'Error: ', err,
        }))
    }
}

export async function DELETE(request) {
    try {
        const clientData = await request.json();

        const clientDeleteResult = await query({
            query: 'DELETE FROM clients WHERE cod = ?',
            values: [clientData]
        })

        const result = clientDeleteResult.affectedRows;

        let message = "";

        if (result) {
            message = "Success";
        } else {
            message = "Error";
        }

        return new Response(JSON.stringify({
            status: 200,
            data: {
                message: message
            }
        }));
    } catch(err) {
        return new Response(JSON.stringify({
            status: 500,
            data: 'Error: ', err,
        }))
    }
}