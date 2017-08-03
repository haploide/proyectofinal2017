using System;
using System.Web.Mvc;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Auth.OAuth2.Flows;
using Google.Apis.Auth.OAuth2.Mvc;
using Google.Apis.Gmail.v1;



namespace WebSite.App_Start
{
    public class GmailFlowMetadata : FlowMetadata
    {
        private static readonly IAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow(new GoogleAuthorizationCodeFlow.Initializer
        {
            ClientSecrets= new ClientSecrets()
            {
                ClientId= "82642769106-7du00ntv8dbv3a59tgp26nrej2u3k6gr.apps.googleusercontent.com",
                ClientSecret= "FKrJ7mWGUuaypLh5cDJHfjO5"
            },
            Scopes = new[] { GmailService.Scope.GmailSend}
            


        });
        

        public override IAuthorizationCodeFlow Flow
        {
            get
            {
                return flow;
            }
        }

        public override string GetUserId(Controller controller)
        {
            var user = controller.Session["usuario"];
            if (user == null)
            {
                user = Guid.NewGuid();
                controller.Session["usuario"] = user;
            }
            return user.ToString();

        }
    }
}