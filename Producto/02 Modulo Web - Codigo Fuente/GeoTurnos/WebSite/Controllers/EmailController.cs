using System;
using System.Web.Mvc;

using Google.Apis.Gmail.v1;
using Google.Apis.Gmail.v1.Data;



namespace WebSite.Controllers
{
    public class EmailController : Controller
    {
        public ActionResult Oauth2CallBack()
        {
            throw new NotImplementedException();
        }

        public static Message SendMessager(GmailService service, string userId, Message email)
        {
            try
            {
                return service.Users.Messages.Send(email, userId).Execute();

            }
            catch (Exception)
            {
                throw new NotImplementedException();

            }
            return null;
        }

    }
}