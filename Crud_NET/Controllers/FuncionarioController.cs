using Crud_NET.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Crud_NET.Controllers
{
    public class FuncionarioController : Controller
    {
        #region Método para Listar Funcionario - READ

        // GET Funcionario/GetFuncionario
        public JsonResult GetFuncionario()
        {
            //listar a quantidade de funcionarios
            using(var db = new FuncionariosEntities())
            {
                List<Funcionario> listarFuncionarios = db.Funcionarios.ToList();
                //convertendo em Json
                return Json(listarFuncionarios, JsonRequestBehavior.AllowGet);
            }

        }
        #endregion

        #region Método para Adicionar Funcionário - CREATE
        //POST Funcionario/AdicionarFuncionario
        [HttpPost]
        public JsonResult AdicionarFuncionario(Funcionario funcionario)
        {
            if (funcionario!= null)
            {
                using (var db=new FuncionariosEntities())
                {
                    db.Funcionarios.Add(funcionario);
                    db.SaveChanges();

                    return Json(new { success = true });
                }
            }
            return Json(new { success = false });
        }
        #endregion

        #region Método para Atualizar funcionário - UPDATE
        [HttpPost]
        public JsonResult AtualizarFuncionario(Funcionario funcionario)
        {
            using(var db=new FuncionariosEntities())
            {
                var funcionarioAtualizado = db.Funcionarios.Find(funcionario.FuncionarioId);
                if(funcionarioAtualizado == null)
                {
                    //retorna msg se o id nao existir
                    return Json(new { success = false });
                }
                else
                {
                    funcionarioAtualizado.Nome = funcionario.Nome;
                    funcionarioAtualizado.Email = funcionario.Email;
                    funcionarioAtualizado.Cargo = funcionario.Cargo;

                    //salva alterações e retorna Json
                    db.SaveChanges();
                    return Json(new { success = true });
                }
            }
        }
        #endregion

        #region Método para Excluir Funcionário - DELETE

        [HttpPost]
        public JsonResult ExcluirFuncionario(int id)
        {
            using (var db = new FuncionariosEntities())
            {
                var funcionario = db.Funcionarios.Find(id);
                if (funcionario == null)
                {
                    return Json(new { success = false });
                }

                db.Funcionarios.Remove(funcionario);
                db.SaveChanges();

                return Json(new { success = true });
            }
        }
        #endregion
    }
}