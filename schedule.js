const CALENDAR_ID = "ec2a24c9dfd2017525d6749ffefb9151c146fadb7ab10cdc7c815915cdbc2785@group.calendar.google.com"; // ID lịch của bạn
const API_KEY = "AIzaSyAIX3ZUgdOxo5lxahs7OKPIZHtS9Ykkb58"; // API Key của bạn

async function loadSchedule() {
    let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}&orderBy=startTime&singleEvents=true`;

    try {
        let response = await fetch(url);
        let data = await response.json();
        
        let scheduleList = document.getElementById("schedule-list");
        scheduleList.innerHTML = ""; // Xóa danh sách cũ

        data.items.forEach(event => {
            let date = new Date(event.start.dateTime || event.start.date);
            let title = event.summary;
            let link = event.description || "#"; // Dùng mô tả làm link nếu có

            let listItem = document.createElement("li");
            listItem.innerHTML = `<strong>${formatDate(date)}:</strong> 
                <a href="${link}" target="_blank">${title}</a>`;
            scheduleList.appendChild(listItem);
        });

    } catch (error) {
        console.error("Lỗi tải lịch:", error);
        document.getElementById("schedule-list").innerHTML = "<li>Lỗi tải lịch phát sóng!</li>";
    }
}

// Hàm định dạng ngày tháng
function formatDate(date) {
    return date.toLocaleDateString("vi-VN", { weekday: "long", day: "2-digit", month: "2-digit", year: "numeric" });
}

// Gọi hàm khi tải trang
document.addEventListener("DOMContentLoaded", loadSchedule);
