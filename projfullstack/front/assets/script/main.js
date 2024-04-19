const uri = "http://localhost:3000/clientes";
const msgs = document.getElementById('msgs');



// READ - Clientes
const tableBody = document.getElementById("dados");

fetch(uri)
  .then((res) => {
    if (!res.ok) {
      throw new Error("Erro ao obter clientes: " + res.status);
    }
    return res.json();
  })
  .then((clientes) => {
    clientes.forEach((cli) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${cli.cpf}</td>
        <td>${cli.nome_cliente}</td>
        <td>
            <button onclick='del("${cli.cpf}")'><ion-icon class="icon" name="trash-outline"></ion-icon></button>
            <button onclick='edit(this)' id="openModalBtn"><ion-icon class="icon" name="create-outline"></ion-icon></button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  })
  .catch((error) => {
    console.error("Erro ao obter clientes:", error);
    mensagens("Erro ao obter clientes!");
  });

// CREATE - Clientes
const criarForm = document.getElementById("criar");

criarForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    cpf: criarForm.cpf.value,
    nome: criarForm.nome.value,
    telefone: criarForm.telefone.value
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
    return res.json();
  })
  .then((res) => {
    mensagens("Cliente cadastrado com sucesso!");
    window.location.reload();
  })
  .catch((error) => {
    console.error("Erro ao cadastrar cliente:", error);
    mensagens("Erro ao cadastrar cliente!");
  });
});

// UPDATE - Clientes
function update(btn) {
  const row = btn.parentNode.parentNode;
  const cells = row.cells;
  const cpf = cells[0].innerText;
  const nome = cells[1].innerText;

  const data = {
    cpf: cpf,
    nome: nome,
  };

  fetch(uri, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then((res) => {
    if (!res.ok) {
      throw new Error("Erro ao atualizar cliente: " + res.status);
    }
    return res;
  })
  .then(() => {
    mensagens("Cliente atualizado com sucesso!");
  })
  .catch((error) => {
    console.error("Erro ao atualizar cliente:", error);
    mensagens("Erro ao atualizar cliente!");
  });
}

// DELETE - Clientes
function del(cpf) {
  fetch(uri + '/' + cpf, {
    method: 'DELETE'
  })
  .then((res) => {
    if (!res.ok) {
      throw new Error("Erro ao excluir cliente: " + res.status);
    }
    return res;
  })
  .then(() => {
    mensagens("Cliente excluído com sucesso!");
    window.location.reload();
  })
  .catch((error) => {
    console.error("Erro ao excluir cliente:", error);
    mensagens("Erro ao excluir cliente!");
  });
}

function mensagens(msg) {
  msgs.textContent = msg;
}



//Mostrar mensagens do sistema
function mensagens(msg, confirma) {
  var mensagemElement = document.querySelector('#msg');
  var cancelaElement = document.querySelector('#cancela');
  var confirmaElement = document.querySelector('#confirma');

  if (mensagemElement) {
      mensagemElement.textContent = msg;
  }

  if (cancelaElement) {
      cancelaElement.classList.remove('oculto');
  }

  if (confirmaElement) {
      if (confirma !== undefined) {
          confirmaElement.classList.remove('oculto');
          confirmaElement.addEventListener("click", function() {
              confirmar(confirma);
          });
      } else {
          confirmaElement.classList.add('oculto');
      }
  }
}


document.getElementById('openModalBtn').addEventListener('click', function() {
  var errorMessages = ["Error 1: Connection lost", "Error 2: Invalid input"];
  var errorModal = document.getElementById('errorModal');
  var errorMessagesContainer = document.getElementById('errorMessages');
  
  // Clear previous error messages
  errorMessagesContainer.innerHTML = '';
  
  // Populate error messages
  errorMessages.forEach(function(message) {
    var errorMessageNode = document.createElement('p');
    errorMessageNode.textContent = message;
    errorMessagesContainer.appendChild(errorMessageNode);
  });
  
  // Display modal
  errorModal.style.display = 'block';
});

document.querySelector('.close').addEventListener('click', function() {
  document.getElementById('errorModal').style.display = 'none';
});


//Tornar as células da linha tabela editáveis
function edit(btn) {
  let linha = btn.parentNode.parentNode;
  let celulas = linha.cells;
  for (let i = 0; i < celulas.length; i++) { // Começar o loop de i = 0 para editar todas as células
      celulas[i].setAttribute('contenteditable', 'true');
  }
  btn.innerHTML = '<ion-icon class="icon" name="checkmark-outline"></ion-icon>';
  btn.setAttribute('onclick', 'update(this)');
}

