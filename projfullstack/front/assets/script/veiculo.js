// READ - CLientes
const dados = document.getElementById("dados");
fetch("http://localhost:3000/veiculos")
  .then((res) => res.json())
  .then((res) => {
    res.forEach((cli) => {
      dados.innerHTML += `
                    <tr>
                        <td>${cli.placa}</td>
                        <td>${cli.modelo}</td>
                        <td>${cli.marca}</td>
                        <td>${cli.tipo}</td>
                        <td>${cli.diaria}</td>
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