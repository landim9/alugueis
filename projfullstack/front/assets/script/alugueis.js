const uri = "http://localhost:3000/alugueis"

// READ - CLientes
const dados = document.getElementById("dados");
fetch(uri)
  .then((res) => res.json())
  .then((res) => {
    res.forEach((cli) => {
      dados.innerHTML += `
                    <tr>
                        <td>${cli.id}</td>
                        <td>${cli.placa}</td>
                        <td>${cli.cpf}</td>
                        <td>${cli.reserva}</td>
                        <td>${cli.retirada}</td>
                        <td>${cli.devolucao}</td>
                        <td>${cli.subtotal}</td>
                        <td>
                            <button onclick='del(${cli.id})'><ion-icon class="icon" name="trash-outline"></ion-icon></button>
                            <button onclick='window.location.href="./update.html?&cpf=${cli.cpf}&nome=${cli.nome_cliente}"'>
                            <ion-icon class="icon" name="create-outline"></ion-icon>
                            </button>
                        </td>
                    </tr>
                `;
    });
  });


  //CRUD - Delete
function del(id) {
  fetch(uri + '/' + id, {
    method: 'DELETE'
  })
  .then(res => {
    if (!res.ok) {
      throw new Error('Erro ao excluir cliente: ' + res.status);
    }
    return res;
  })
  .then(res => {
    if (res.status === 204) {
      window.location.reload();
    } else {
      mensagens('Erro ao excluir cliente!');
    }
  })
  .catch(error => {
    console.error('Erro de rede:', error);
    mensagens('Erro de rede ao tentar excluir cliente!');
  });
}
