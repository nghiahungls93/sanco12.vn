const SHEET_ID = "1aBcD_123xyz45678AbcD";  // Thay bằng ID Google Sheet của bạn
const SHEET_NAME = "Sheet1";  // Đặt tên sheet chính xác
const API_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`;

async function fetchSchedule() {
    try {
        let response = await fetch(API_URL);
        let text = await response.text();
        let json = JSON.parse(text.substring(47, text.length - 2)); // Google trả về JSON có phần thừa nên cần cắt

        let rows = json.table.rows;
        let tableBody = document.querySelector("#schedule-table tbody");
        tableBody.innerHTML = ""; // Xóa dữ liệu cũ (nếu có)

        rows.forEach(row => {
            let date = row.c[0]?.v || "N/A";
            let time = row.c[1]?.v || "N/A";
            let content = row.c[2]?.v || "N/A";

            let tr = document.createElement("tr");
            tr.innerHTML = `<td>${date}</td><td>${time}</td><td>${content}</td>`;
            tableBody.appendChild(tr);
        });
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ Google Sheets:", error);
    }
}

// Gọi hàm để tải lịch phát sóng khi trang được mở
fetchSchedule();
