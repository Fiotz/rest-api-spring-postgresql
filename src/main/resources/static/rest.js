// ==========================================
// FUNÇÕES DE API PARA PRODUTOS
// ==========================================

async function asyncCriarProd(dadosProduto, proxsucesso, proxerro) {
    const URL = `/api/produtos`;
    const postRequest = {
        method: 'POST',
        body: JSON.stringify(dadosProduto),
        headers: { 'Content-type': 'application/json' }
    };
    fetch(URL, postRequest)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; } )
        .then(resposta => resposta.json())
        .then(jsonResponse => proxsucesso())
        .catch(proxerro);
}

async function asyncLerProds(proxsucesso, proxerro) {
    const URL = `/api/produtos`;
    fetch(URL)
      .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta;}) 
      .then(resposta => resposta.json())
      .then(jsonresponse => proxsucesso(jsonresponse))
      .catch(proxerro);
}

async function asyncLerProdById(id, proxsucesso, proxerro) {
    const URL = `/api/produtos/${id}`;
    fetch(URL)
      .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta;}) 
      .then(resposta => resposta.json())
      .then(jsonresponse => proxsucesso(jsonresponse))
      .catch(proxerro);
}

async function asyncAlterarProd(dadosProduto, proxsucesso, proxerro) {
    const URL = `/api/produtos/${dadosProduto.id}`;
    const putRequest = {
        method: 'PUT',
        body: JSON.stringify(dadosProduto),
        headers: { 'Content-type': 'application/json' }
    };
    fetch(URL, putRequest)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; } )
        .then(resposta => resposta.json())
        .then(jsonResponse => proxsucesso())
        .catch(proxerro);	        	
}

async function asyncApagarProd(id, proxsucesso, proxerro) {
    const URL = `/api/produtos/${id}`;
    const deleteRequest = {
        method: 'DELETE'
    };
    fetch(URL, deleteRequest)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; } )
        .then(resposta => proxsucesso())
        .catch(proxerro);	        		
}