//thông số cần thay thế
const YOUTUBE_API_KEY = "AIzaSyAq0bUwHaTGSMslwmpsRBnf94r3mfTuGtY"; // Thay bằng API Key YouTube
const YOUTUBE_CHANNEL_ID = "UCv77Ms-JsS-m3Zi5jGW5nEQ"; // Thay bằng ID kênh YouTube
const FACEBOOK_PAGE_ID = "2229706643811633"; // Thay bằng ID fanpage Facebook
const FACEBOOK_ACCESS_TOKEN = "EAATT7nNkHcEBOwKHcoZBKaxpfhYmcuhHkQ5MuafC01hYZAsMweZB5kXmcBjpgiJyZBZBUnleZCpN8SZAnFZATw3V2uBeWkJllKAZAiDuogxG2ZAUjVh06DbtL3dkbysy5ZBe5MUYNgqQcbPyGE40Ffouuxuxr4CSrBROlkhwPXCsyfsXB3hb9M5jgkfKh3ScpIUu6BYZBTyNy5v7"; // Thay bằng token Facebook API

const youtubeAPI = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${YOUTUBE_CHANNEL_ID}&type=video&eventType=live&key=${YOUTUBE_API_KEY}`;
const facebookAPI = `https://graph.facebook.com/v12.0/${FACEBOOK_PAGE_ID}/live_videos?access_token=${FACEBOOK_ACCESS_TOKEN}`;

async function checkYouTubeLive() {
    try {
        let response = await fetch(youtubeAPI);
        let data = await response.json();

        if (data.items.length > 0) {
            const videoId = data.items[0].id.videoId;
            document.getElementById("stream-frame").src = `https://www.youtube.com/embed/${videoId}`;
            document.getElementById("live-stream").style.display = "block";
            document.getElementById("status-message").style.display = "none";
        } else {
            checkFacebookLive();
        }
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ YouTube API:", error);
        checkFacebookLive();
    }
}

async function checkFacebookLive() {
    try {
        let response = await fetch(facebookAPI);
        let data = await response.json();

        if (data.data.length > 0) {
            const liveVideoId = data.data[0].id;
            document.getElementById("stream-frame").src = `https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/${FACEBOOK_PAGE_ID}/videos/${liveVideoId}`;
            document.getElementById("live-stream").style.display = "block";
            document.getElementById("status-message").style.display = "none";
        } else {
            document.getElementById("status-message").innerText = "❌ Hiện tại không có livestream nào!";
        }
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ Facebook API:", error);
        document.getElementById("status-message").innerText = "⚠ Không thể kiểm tra livestream!";
    }
}

// Chạy kiểm tra livestream khi tải trang
checkYouTubeLive();

document.getElementById("youtube-live").innerHTML = `
    <iframe src="https://www.youtube.com/embed/live_stream?channel=${YOUTUBE_CHANNEL_ID}" frameborder="0" allowfullscreen></iframe>
`;
