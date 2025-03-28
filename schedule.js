const SHEET_ID = "1YgUlwXkg3eyric0FPIPbLskKeJvZ8fW81U8iPmxlHPc";  // Thay bằng ID Google Sheet của bạn
const SHEET_NAME = "lichphatsong";  // Đặt tên sheet chính xác
const API_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`;

async function fetchSchedule() {
    try {
        let response = await fetch(API_URL);
        let text = await response.text();
        let json = JSON.parse(text.substring(47, text.length - 2)); // Google trả về JSON có phần thừa nên cần cắt

        let rows = json.table.rows;
        let tableBody = document.querySelector("#schedule-table tbody");
        tableBody.innerHTML = ""; // Xóa dữ liệu cũ (nếu có)

       function formatDate(value) {
    if (!value) return "N/A";

    // Nếu Google Sheets trả về số seri
    if (typeof value === "number") {
        let date = new Date((value - 25569) * 86400 * 1000);
        return date.toLocaleDateString("vi-VN");
    }

    // Nếu Google Sheets trả về chuỗi ngày dạng "dd/mm/yyyy"
    if (typeof value === "string" && value.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
        let parts = value.split("/");
        let date = new Date(parts[2], parts[1] - 1, parts[0]); // yyyy, mm (0-11), dd
        return isNaN(date) ? "N/A" : date.toLocaleDateString("vi-VN");
    }

    // Nếu Google Sheets trả về chuỗi ngày dạng "yyyy-mm-dd"
    if (typeof value === "string" && value.match(/^\d{4}-\d{2}-\d{2}$/)) {
        return new Date(value).toLocaleDateString("vi-VN");
    }

    return "N/A";
}


        rows.forEach(row => {
            let date = formatDate(row.c[0]?.v);
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

