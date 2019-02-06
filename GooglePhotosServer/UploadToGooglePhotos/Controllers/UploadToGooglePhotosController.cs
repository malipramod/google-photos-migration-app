using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Threading.Tasks;
using System.Web.Configuration;
using System.Web.Http;
using UploadToGooglePhotos.Models;

namespace UploadToGooglePhotos.Controllers {
    public class UploadToGooglePhotosController : ApiController {

        public MediaItemCreate Post(MediaItemRequest mediaItemRequest) {
            string token = Request.Headers.Authorization.Parameter;
            List<UploadTokenModel> uploadTokens = new List<UploadTokenModel>();
            string APIURL = WebConfigurationManager.AppSettings["googleApiURL"];
            MediaItemCreate responses = new MediaItemCreate();

            if(token == string.Empty) {
                NewMediaItemResult newMediaItemResult = new NewMediaItemResult() {
                    Status = new Status() {
                        Message = "Token Is Empty"
                    }
                };
                responses.NewMediaItemResults.Add(newMediaItemResult);
                return responses;
            }

            List<Task> task = new List<Task>();
            foreach(MediaItems mediaItem in mediaItemRequest.MediaItems) {
                var runningTask = Task.Run(() => {
                    WebClient wc = new WebClient();
                    string file = Path.GetFileName(mediaItem.BaseUrl);
                    byte[] imageBytes = wc.DownloadData(new Uri(mediaItem.BaseUrl));
                    UploadTokenModel uploadToken = new UploadTokenModel() {
                        Description = mediaItem.Filename,
                        UploadToken = GetUploadToken("POST", APIURL + "uploads", token, mediaItem.Filename, imageBytes).Content
                    };
                    uploadTokens.Add(uploadToken);
                });
                task.Add(runningTask);
            }
            Task.WaitAll(task.ToArray());

            BatchCreateModel batchCreateModel = new BatchCreateModel() {
                AlbumId = mediaItemRequest.AlbumId,
                NewMediaItems = new List<NewMediaItem>()
            };
            foreach(UploadTokenModel uploadToken in uploadTokens) {

                NewMediaItem newMedia = new NewMediaItem() {
                    Description = uploadToken.Description,
                    SimpleMediaItem = new SimpleMediaItem()
                };
                newMedia.SimpleMediaItem.UploadToken = uploadToken.UploadToken;
                batchCreateModel.NewMediaItems.Add(newMedia);
            }

            responses = UploadMedia(APIURL + "mediaItems:batchCreate", token, batchCreateModel, mediaItemRequest.AlbumId);


            return responses;
        }

        MediaItemCreate UploadMedia(string uri, string authToken, BatchCreateModel body, string albumId) {
            MediaItemCreate result = new MediaItemCreate();

            try {
                var client = new RestClient(uri);
                var request = new RestRequest(Method.POST);
                request.AddHeader("Content-Type", "application/json");
                request.AddHeader("Authorization", "Bearer " + authToken);
                request.AddParameter("", JsonConvert.SerializeObject(body), ParameterType.RequestBody);
                var res = client.Execute(request);
                return JsonConvert.DeserializeObject<MediaItemCreate>(res.Content);// (NewMediaItemResult)client.Execute(request);
            } catch(Exception ex) {
                NewMediaItemResult newMediaItemResult = new NewMediaItemResult() {
                    Status = new Status()
                };
                newMediaItemResult.Status.Message = ex.Message;
                result.NewMediaItemResults.Add(newMediaItemResult);
                return result;
            }
        }

        IRestResponse GetUploadToken(string methodType, string uri, string authToken, string fileName, byte[] body) {
            IRestResponse response = null;
            try {
                var client = new RestClient(uri);
                var request = new RestRequest(Method.POST);
                request.AddHeader("X-Goog-Upload-Protocol", "raw");
                request.AddHeader("X-Goog-Upload-File-Name", fileName);
                request.AddHeader("Content-Type", "application/octet-stream");
                request.AddHeader("Authorization", "Bearer " + authToken);
                request.AddParameter(fileName, body, ParameterType.RequestBody);
                return client.Execute(request);
            } catch(Exception ex) {
                response.ErrorMessage = ex.Message;
                return response;
            }
        }
    }
}
