using ImageToBinary.Models;
using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Configuration;
using System.Web.Http;

namespace ImageToBinary.Controllers
{
    public class ImageToBinaryController : ApiController{
        public string Post(List<MediaItems> mediaItems) {
            string token = Request.Headers.Authorization.Parameter;
            if(token == string.Empty)
                return "Token is empty";
            WebClient wc = new WebClient();
            string APIURL = WebConfigurationManager.AppSettings["googleApiURL"];
            foreach(MediaItems mediaItem in mediaItems) {
                string file = Path.GetFileName(mediaItem.BaseUrl);
                wc.DownloadFile(mediaItem.BaseUrl,file);
                GetUploadToken("POST", APIURL + "uploads", token,mediaItem.Filename);
            }

            return token;
        }


        IRestResponse GetUploadToken(string methodType, string uri, string authToken, string fileName) {
            var client = new RestClient(uri + "uploads");
            var request = new RestRequest(Method.POST);
            request.AddHeader("X-Goog-Upload-Protocol", "raw");
            request.AddHeader("X-Goog-Upload-File-Name", fileName);
            request.AddHeader("Content-Type", "application/octet-stream");
            request.AddHeader("Authorization", "Bearer " + authToken);
            IRestResponse response = client.Execute(request);
            return response;
        }

        public HttpResponseMessage CallAPI(string methodType,string uri, string authToken, string body, string contentType= "application/json", bool getUploadToken = false) {
            #region api
            //GET & DELETE Patch
            if(methodType.ToLower() == "get" || methodType.ToLower() == "delete") {
                HttpResponseMessage resposnseFromServer = null;

                try {

                    HttpWebRequest httpWebRequestGet = createHttpRequest(uri, methodType, authToken);
                    string getResponse;
                    using(HttpWebResponse response = (HttpWebResponse)httpWebRequestGet.GetResponse())
                    using(Stream stream = response.GetResponseStream())
                    using(StreamReader reader = new StreamReader(stream)) {
                        getResponse = reader.ReadToEnd();
                    }
                    resposnseFromServer = Request.CreateResponse(HttpStatusCode.OK, JsonConvert.DeserializeObject(getResponse));
                } catch(WebException wex) {
                    using(var stream = wex.Response.GetResponseStream())
                    using(var reader = new StreamReader(stream)) {
                        var readerData = reader.ReadToEnd();
                        Console.WriteLine(reader.ReadToEnd());
                        resposnseFromServer = Request.CreateErrorResponse(HttpStatusCode.ExpectationFailed, readerData.ToString());
                    }
                } catch(Exception ex) {
                    resposnseFromServer = Request.CreateErrorResponse(HttpStatusCode.ExpectationFailed, ex.Message.ToString());
                }
                return resposnseFromServer;
            }

            byte[] data = Encoding.UTF8.GetBytes(body);
            HttpWebResponse myHttpWebResponse = null;
            HttpResponseMessage putResponseFromServer = null;

            HttpWebRequest httpWebRequest = createHttpRequest(uri, methodType, authToken, getUploadToken);
            try {

                httpWebRequest.ContentType = contentType;

                Stream requestStream = httpWebRequest.GetRequestStream();
                requestStream.Write(data, 0, data.Length);
                requestStream.Close();
                myHttpWebResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                Stream responseStream = myHttpWebResponse.GetResponseStream();
                StreamReader myStreamReader = new StreamReader(responseStream, Encoding.Default);
                string pageContent = myStreamReader.ReadToEnd();
                myStreamReader.Close();
                responseStream.Close();

                myHttpWebResponse.Close();
                putResponseFromServer = Request.CreateResponse(HttpStatusCode.OK, JsonConvert.DeserializeObject(pageContent));
            } catch(WebException wex) {
                using(var stream = wex.Response.GetResponseStream())
                using(var reader = new StreamReader(stream)) {
                    var readerData = reader.ReadToEnd();
                    Console.WriteLine(reader.ReadToEnd());
                    putResponseFromServer = Request.CreateErrorResponse(HttpStatusCode.ExpectationFailed, readerData.ToString());
                }
            } catch(Exception ex) {
                putResponseFromServer = Request.CreateErrorResponse(HttpStatusCode.ExpectationFailed, ex.Message.ToString());
            } finally {
                if(myHttpWebResponse != null) {
                    myHttpWebResponse.Close();
                    myHttpWebResponse = null;
                }
            }
            return putResponseFromServer;
            #endregion
        }

        public HttpWebRequest createHttpRequest(string uri, string methodType, string authToken,bool getUploadToken=false) {
            HttpWebRequest httpWebRequest = (HttpWebRequest)WebRequest.Create(uri);
            httpWebRequest.ServicePoint.Expect100Continue = false;

            httpWebRequest.Method = methodType;
            httpWebRequest.KeepAlive = true;
            httpWebRequest.Headers.Add("Authorization", "Bearer " + authToken);

            if(getUploadToken) {
                httpWebRequest.Headers.Add("X-Goog-Upload-Protocol", "raw");
                httpWebRequest.Headers.Add("X-Goog-Upload-File-Name", "IMG_20190126_1758.jpg");
                httpWebRequest.Headers.Add("Content-Type", "application/octet-stream " );
            }

            httpWebRequest.Headers.Add("Accept-Language", "en-US,en;q=0.8");
            httpWebRequest.Accept = "application/json, text/plain,text/html , */*";
            httpWebRequest.AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate;
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls |
                                       SecurityProtocolType.Tls11 |
                                       SecurityProtocolType.Tls12;
            return httpWebRequest;
        }

    }
}
