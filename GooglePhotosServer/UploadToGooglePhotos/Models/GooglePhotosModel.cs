using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace UploadToGooglePhotos.Models {
    #region Request        
    public class MediaItemRequest {
        [JsonProperty("albumId")]
        public string AlbumId { get; set; }
        [JsonProperty("mediaItems")]
        public List<MediaItems> MediaItems { get; set; }
    }
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

    #region Response
    public partial class MediaItemCreate {
        [JsonProperty("newMediaItemResults")]
        public List<NewMediaItemResult> NewMediaItemResults { get; set; }
    }

    public partial class NewMediaItemResult {
        [JsonProperty("uploadToken")]
        public string UploadToken { get; set; }

        [JsonProperty("status")]
        public Status Status { get; set; }

        [JsonProperty("mediaItem")]
        public MediaItem MediaItem { get; set; }
    }

    public partial class MediaItem {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("productUrl")]
        public Uri ProductUrl { get; set; }

        [JsonProperty("mimeType")]
        public string MimeType { get; set; }

        [JsonProperty("mediaMetadata")]
        public MediaMetadata MediaMetadata { get; set; }

        [JsonProperty("filename")]
        public string Filename { get; set; }
    }

    public partial class Status {
        [JsonProperty("message")]
        public string Message { get; set; }
    }
    #endregion

    #region Common Models
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

    public class UploadTokenModel {
        public string Description { get; set; }
        public string UploadToken { get; set; }
    }
    #endregion

    #region BatchCreateModel
    public partial class BatchCreateModel {
        [JsonProperty("albumId")]
        public string AlbumId { get; set; }

        [JsonProperty("newMediaItems")]
        public List<NewMediaItem> NewMediaItems { get; set; }
    }

    public partial class NewMediaItem {
        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("simpleMediaItem")]
        public SimpleMediaItem SimpleMediaItem { get; set; }
    }

    public partial class SimpleMediaItem {
        [JsonProperty("uploadToken")]
        public string UploadToken { get; set; }
    }
    #endregion
}