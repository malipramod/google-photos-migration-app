using GoogleAPIs.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;

namespace GooglePhotosServer.Controllers {
    public class AuthController : ApiController {
        protected string Parameters = string.Empty;
        
        public void Get(string queryString) {
            if(queryString != string.Empty) {
                char[] delimiterChars = { '=' };
                string[] words = queryString.Split(delimiterChars);
                string code = words[1];

                if(code != string.Empty) {
                    string clientId = ConfigurationManager.AppSettings["OAuthClientId"];
                    string clientSecret = ConfigurationManager.AppSettings["OAuthClientSecret"];
                    string apiKey = ConfigurationManager.AppSettings["APIKey"];
                    string redirectURL = "";
                    HttpWebRequest webRequest = (HttpWebRequest)WebRequest.Create("https://accounts.google.com/o/oauth2/token");
                    webRequest.Method = "POST";
                    Parameters = "code=" + code + "&client_id=" + clientId + "&client_secret=" + clientSecret + "&redirect_uri=" + redirectURL + "&grant_type=authorization_code";
                    byte[] byteArray = Encoding.UTF8.GetBytes(Parameters);
                    webRequest.ContentType = "application/x-www-form-urlencoded";
                    webRequest.ContentLength = byteArray.Length;
                    Stream postStream = webRequest.GetRequestStream();
                    postStream.Write(byteArray, 0, byteArray.Length);
                    postStream.Close();
                    WebResponse response = webRequest.GetResponse();
                    postStream = response.GetResponseStream();
                    StreamReader reader = new StreamReader(postStream);
                    string responseFromServer = reader.ReadToEnd();
                    GoogleAccessToken serStatus = JsonConvert.DeserializeObject<GoogleAccessToken>(responseFromServer);
                    if(serStatus != null) {
                        string accessToken = string.Empty;
                        accessToken = serStatus.access_token;

                        if(!string.IsNullOrEmpty(accessToken)) {
                            // This is where you want to add the code if login is successful.
                            GetgoogleplususerdataSer(accessToken);
                        }
                    }
                }
            }
        }

        public string ExecuteAPI() {
            string response = string.Empty;


            return response;
        }

        private async void GetgoogleplususerdataSer(string accessToken) {
            try {
                HttpClient client = new HttpClient();
                var urlProfile = "https://www.googleapis.com/oauth2/v1/userinfo?access_token=" + accessToken;

                client.CancelPendingRequests();
                HttpResponseMessage output = await client.GetAsync(urlProfile);

                if(output.IsSuccessStatusCode) {
                    string outputData = await output.Content.ReadAsStringAsync();
                    GoogleUserOutputData serStatus = JsonConvert.DeserializeObject<GoogleUserOutputData>(outputData);

                    if(serStatus != null) {
                        Console.Write(serStatus);
                    }
                }
            } catch(Exception ex) {
                Console.Write(ex.Message);
            }
        }
    }
}
