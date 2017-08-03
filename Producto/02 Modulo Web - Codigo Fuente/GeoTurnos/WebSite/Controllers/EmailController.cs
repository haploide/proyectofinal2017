using System;
using System.Web.Mvc;

using Google.Apis.Auth.OAuth2;
using Google.Apis.Auth.OAuth2.Flows;
using Google.Apis.Auth.OAuth2.Mvc;
using Google.Apis.Gmail.v1;
using Google.Apis.Util.Store;


namespace WebSite.Controllers
{
    public class EmailController : Controller
    {
        public ActionResult Oauth2CallBack()
        {
            throw new NotImplementedException();
        }

    }
}