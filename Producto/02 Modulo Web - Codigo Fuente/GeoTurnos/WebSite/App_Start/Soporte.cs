using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebSite.Models;

namespace WebSite.App_Start
{
    public enum TipoUsuario
    {
        _Todos,
        Administrador=1,
        Entidad=2,
        Prestatario=3
    }
    public enum EstadoUsuario
    {
        Activo=4,
        DeBaja=5

    }
    public enum EstadoEmpresa
    {
        Activa=1,
        PendienteDeActivacion=2,
        Suspendida=3

    }
    public enum EstadoClientePrestatario
    {
        Activo=6,
        Suspendido=7

    }
    public class UsuarioLogueado
    {
        private string usuario;
        private TipoUsuario tipoUsuario;
        private Empresa empresa;
        private Cliente prestatario;

        public string Usuario{ get; set; }

        public TipoUsuario TipoUsuario { get; set; }

        public Empresa Empresa { get; set; }

        public Cliente Prestatario { get; set; }

        public UsuarioLogueado()
        {

        }
        public UsuarioLogueado(string usuario, TipoUsuario tipoUsuario, Empresa empresa, Cliente prestatario)
        {
            this.usuario = usuario;
            this.tipoUsuario = tipoUsuario;
            this.empresa = empresa;
            this.prestatario = prestatario;
        }
    }

    public class AutorizadoAttribute : AuthorizeAttribute
    {
        public new TipoUsuario Roles { get; set; }
        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            if ((httpContext.Session["usuarioLogin"] == null)|| !(httpContext.Session["usuarioLogin"] is UsuarioLogueado))
            {
                return false;
            }
            else
            {
                if (Roles == TipoUsuario._Todos)
                {
                    return true;
                }
                else
                {
                    UsuarioLogueado usuarioLogin = httpContext.Session["usuarioLogin"] as UsuarioLogueado;

                    if(Roles== usuarioLogin.TipoUsuario)
                    {
                        return true;
                    }
                }
            }
            return false;
            
            
        }
    }
}