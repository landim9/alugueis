const uri = "http://localhost:3000/clientes";
const msgs = document.getElementById('msgs');



// READ - CLientes
const dados = document.getElementById("dados");
fetch(uri)
  .then((res) => res.json())
  .then((res) => {
    res.forEach((cli) => {
      dados.innerHTML += `
                    <tr>
                        <td>${cli.cpf}</td>
                        <td>${cli.nome_cliente}</td>
                        <td>
                            <button onclick='del(${cli.cpf})'><ion-icon class="icon" name="trash-outline"></ion-icon></button>
                            <button onclick='window.location.href="./update.html?&cpf=${cli.cpf}&nome=${cli.nome_cliente}"'>
                            <ion-icon class="icon" name="create-outline"></ion-icon>
                            </button>
                        </td>
                    </tr>
                `;
    });
  });

//CREATE - Clientes
criar.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    cpf: criar.cpf.value,
    nome: criar.nome.value,
    telefone: criar.telefone.value,
  };

  fetch(uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  .then((res) => {
    if (!res.ok) {
      throw new Error("Erro ao cadastrar cliente: " + res.status);
    }
    return res;
  })
  .then((res) => {
    if (res.status === 201) {
      window.location.reload();
    } else {
      mensagens("Erro ao cadastrar cliente!");
    }
  })
  .catch((error) => {
    console.error("Erro de rede:", error);
    mensagens("Erro de rede ao tentar cadastrar cliente!");
  });
});



//CRUD - Delete
function del(cpf) {
  fetch(uri + '/' + cpf, {
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


//Confirma exclusão
// function confirmar(cpf) {
//   fetch(uri + '/' + cpf, {
//       method: 'DELETE'
//   })
//       .then(res => res.status)
//       .then(res => {
//           if (res == 204)
//               window.location.reload();
//           else
//               mensagens('Erro ao excluir cliente!');
//       });
// }

//Mostrar mensagens do sistema
function mensagens(msg, confirma) {
  document.querySelector('#msg').innerHTML = msg;
  document.querySelector('#cancela').classList.remove('oculto');
  if (confirma != undefined) {
      document.querySelector('#confirma').classList.remove('oculto');
      document.querySelector('#confirma').setAttribute("onclick", `confirmar('${confirma}')`);
  } else {
      document.querySelector('#confirma').classList.add('oculto');
  }
}