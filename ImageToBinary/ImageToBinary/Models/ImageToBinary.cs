using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ImageToBinary.Models {

    #region Request        
        public class MediaItems {
            [JsonProperty("baseUrl")]
            public string BaseUrl { get; set; }
            [JsonProperty("filename")]
            public string Filename { get; set; }
            [JsonProperty("id")]
            public string Id { get; set; }
            [JsonProperty("mimeType")]
            public string MimeType { get; set; }
            [JsonProperty("productUrl")]
            public string ProductUrl { get; set; }
            [JsonProperty("mediaMetadata")]
            public MediaMetadata MediaMetadata { get; set; }
        }
        public class MediaMetadata {
            [JsonProperty("creationTime")]
            public string CreationTime { get; set; }
            [JsonProperty("height")]
            public string Height { get; set; }
            [JsonProperty("width")]
            public string Width { get; set; }
            [JsonProperty("photo")]
            public Photo Photo { get; set; }
        }
        public class Photo {
            [JsonProperty("apertureFNumber")]
            public string ApertureFNumber { get; set; }
            [JsonProperty("cameraMake")]
            public string CameraMake { get; set; }
            [JsonProperty("cameraModel")]
            public string CameraModel { get; set; }
            [JsonProperty("focalLength")]
            public string FocalLength { get; set; }
            [JsonProperty("isoEquivalent")]
            public string IsoEquivalent { get; set; }
        }
    #endregion
}