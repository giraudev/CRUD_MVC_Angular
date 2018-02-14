/*
* Descrição: Este arquivo irá conter o código do 'funcionarioApp' a qual controlará os módulos de 'funcionarios'
*/

//Controller - Funcionarios
funcionarioApp.controller('funcionarioCtrl', function ($scope, funcionarioService) {

    // Aqui estamos carregando todos os dados gravados do Funcionario quando a pág for recarregada:
    carregarFuncionario();

    //Metodo responsavel por carregar todos os funcionarios quando a pagina for recarregada
    function carregarFuncionario() {
        var listarFuncionarios = funcionarioService.getTodosFuncionarios();

        listarFuncionarios.then(function (d) {
            //se tudo der certo
            $scope.Funcionarios = d.data;
        },
            function () {
                alert("Ocorreu um erro ao tentar listar todos os funcionarios");
            });
    }

    //Método responsavel por adicionar cada propriedade de um novo funcionario
    $scope.adicionarFuncionario = function () {
        var funcionario = {
            funcionarioId: $scope.funcionarioId,
            nome: $scope.nome,
            email: $scope.email,
            cargo: $scope.cargo
        };

        var adicionarInfos = funcionarioService.adicionarFuncionario(funcionario);

        adicionarInfos.then(function (d) {
            if (d.data.success === true) {
                carregarFuncionario();
                alert("Funcionario adicionado com sucesso!");

                $scope.limparDados();
            }
            else { alert("Funcionario não adicionado!"); }
        },
            function () {
                alert("Erro ocorrido ao tentar adicionar um novo funcionario!")
            });
    }
    $scope.limparDados = function () {
        $scope.funcionarioId = '',
            $scope.nome = '',
            $scope.email = '',
            $scope.cargo = '';
    }

    //Método responsavel por atualizar funcionario pelo Id:
    $scope.atualizarFuncionarioPorId = function (funcionario) {
        $scope.AtualizadoFuncionarioId = funcionario.FuncionarioId;
        $scope.AtualizadoNome = funcionario.AtualizadoNome;
        $scope.AtualizadoEmail = funcionario.AtualizadoEmail;
        $scope.AtualizadoCargo = funcionario.AtualizadoCargo;
        

    }

    //Método responsável por atualizar dados do Funcionario:
    $scope.atualizarFuncionario - function () {
        var funcionario = {
            FuncionarioId: $scope.AtualizadoFuncionarioId,
            Nome: $scope.AtualizadoNome,
            Email: $scope.AtualizadoEmail,
            Cargo: $scope.AtualizadoCargo
        };

        var atualizarInfos = funcionarioService.atualizarFuncionario(funcionario);
        atualizarInfos.then(function (d) {
            if (d.data.success === true) {
                carregarFuncionario();

                alert("Funcionário Atualizado com sucesso!");
            }
            else {
                alert("Funcionário não Atualizado");
            }
        }, function () {
            alert("Ocorreu um erro ao tentar atualizar o funcionário");
        });

    }

    //Método responsavel por Limpar os Dados depois de Atualizar funcionário:
    $scope.limparDadosAtualizados = function () {
        $scope.AtualizadoFuncionarioId = '';
        $scope.AtualizadoNome = '';
        $scope.AtualizadoEmail = '';
        $scope.AtualizadoCargo = '';
    }

    //Método responsável por excluir o Funcionario pelo Id:
    $scope.excluirFuncionario = function (AtualizadoFuncionarioId) {

        var excluirInfos = funcionarioService.excluirFuncionario($scope.AtualizadoFuncionarioId);
        excluirInfos.then(function (d) {

            if (d.data.success === true) {
                carregarFuncionarios();

                alert("Funcionário excluído com Sucesso!");
            }
            else {
                alert("Funcionário não excluído!");
            }
        });
    }
});
