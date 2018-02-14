/*
* Descrição: arquivo responsável por carregar os dados via $http.get - do MVC Controller
* (onde transformará os dados via Json)
*/

funcionarioApp.service('funcionarioService', function ($http) {

    //Método responsãvel por listar todos os funcionarios: READ
    this.getTodosFuncionarios = function () {
        return $http.get("/Funcionario/GetFuncionario");
    }

    //Metodo responsável por Adicionar Funcionario: CREATE
    this.adicionarFuncionario = function (funcionario) {
        var request = $http({
            method: 'post',
            url: '/Funcionario/AdicionarFuncionario',
            data: funcionario
        });
        return request;
    },

        //Método responsável por atualizar Funcionario pelo id: UPDATE
        this.atualizaFuncionario = function (funcionario) {
        var request = $http({
            method: 'post',
            url: 'Funcionario/AtualizarFuncionario',
            data: funcionario
        });
        return request;
        }

    //Método responsável por Excluir Funcionário Por Id: Delete
    this.excluirFuncionario = function (AtualizadoFuncionarioId) {

        return $http.post('/Funcionario/ExcluirFuncionario/' + AtualizadoFuncionarioId);
    }
})