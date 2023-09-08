export async function GET(){

    const users = {
        username: 'farid',
        password: '12345'
    }
    return new Response(JSON.stringify(users))
}