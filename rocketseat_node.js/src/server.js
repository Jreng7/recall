import http from 'node:http'

/**
 *  CABEÇALHOS (TANTO DA REQUISIÇÃO QUANTO DA RESPOSTA) => SÃO METADADOS!
 *  OS METADADOS SÃO INFORMAÇÕES PARA QUE CADA UM POSSA SABER LIDAR COM REQUISIÇÃO OU RESPOSTA.
 */

  async function handler (request, response) {

    const { method, url } = request

    const buffers = []

    for await (const chunk of request ) {
      buffers.push(chunk)
    }

    try {
      request.body = JSON.parse(Buffer.concat(buffers).toString())
    } catch { 
      request.body = null
    }

    // Criação de Usuários.
    if(method === 'POST' && url === '/users') {

      const { name, email } = request.body

      users.push({
        id: 1,
        name,
        email,
      })

      return response.writeHead('201').end('Usuário Criado com Sucesso!')
    }

    // Listagem de Usuários. 
    if(method === 'GET' && url === '/users') {
      
      return response
      .setHeader('Content-type', 'application/json')  
      .end(JSON.stringify(users))
    }

    return response.writeHead(404).end('Not Found')

}

const users = []

http.createServer(handler)
.listen(3333)